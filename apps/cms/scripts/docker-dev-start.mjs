import { spawn } from 'node:child_process'

import postgres from 'postgres'

const databaseUrl = process.env.DATABASE_URL
const schemaResetEnabled = process.env.DOCKER_DEV_SCHEMA_RESET !== 'false'

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: process.env,
      shell: false,
      stdio: 'inherit'
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} ${args.join(' ')} exited with ${code}`))
    })
  })

const createDbClient = () => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required for the Docker CMS startup check.')
  }

  return postgres(databaseUrl, {
    idle_timeout: 5,
    max: 1
  })
}

const usersTableExists = async () => {
  const sql = createDbClient()

  try {
    const result = await sql`select to_regclass('public.users') as table_name`
    return result[0]?.table_name === 'users'
  } finally {
    await sql.end({ timeout: 5 })
  }
}

const resetPublicSchema = async () => {
  const sql = createDbClient()

  try {
    await sql`drop schema if exists public cascade`
    await sql`create schema public`
    await sql`grant all on schema public to public`
  } finally {
    await sql.end({ timeout: 5 })
  }
}

const runMigrations = async () => {
  console.log('Docker dev startup: running Payload migrations...')
  await run('pnpm', ['--filter', '@starter/cms', 'migrate'])
}

const startDevServer = () => {
  const child = spawn('pnpm', ['--filter', '@starter/cms', 'dev'], {
    env: process.env,
    shell: false,
    stdio: 'inherit'
  })

  const forwardSignal = (signal) => {
    if (!child.killed) {
      child.kill(signal)
    }
  }

  process.on('SIGINT', () => forwardSignal('SIGINT'))
  process.on('SIGTERM', () => forwardSignal('SIGTERM'))

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
      return
    }

    process.exit(code ?? 0)
  })
}

try {
  await runMigrations()

  if (!(await usersTableExists())) {
    if (!schemaResetEnabled) {
      throw new Error('Migration finished, but public.users does not exist.')
    }

    console.warn(
      'Migration state is inconsistent: public.users does not exist. Resetting the local Docker development schema.'
    )
    await resetPublicSchema()
    await runMigrations()
  }

  if (!(await usersTableExists())) {
    throw new Error('public.users still does not exist after resetting and rerunning migrations.')
  }

  console.log('Docker dev startup: public.users verified. Starting CMS...')
  startDevServer()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
