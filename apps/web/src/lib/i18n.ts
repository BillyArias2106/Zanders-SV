export const locales = ['es', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'
export const languageCookieName = 'app-language'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español'
}

export const normalizeLocale = (value: unknown): Locale | null =>
  typeof value === 'string' && locales.includes(value as Locale)
    ? (value as Locale)
    : null

export const getAlternateLocale = (locale: Locale): Locale =>
  locale === 'es' ? 'en' : 'es'

const dictionary = {
  en: {
    contact: {
      callOrWrite: 'Call or write us',
      email: 'Email address',
      firstName: 'First name',
      invalidServerResponse: 'Invalid server response.',
      lastName: 'Last name',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending...',
      subject: 'Subject',
      submitError: 'We could not send the message. Please try again.',
      submitReview: 'Review the fields and try again.',
      submitSuccess:
        'Message sent. It was also saved in the admin panel.',
      unableToConnect: 'We could not connect to the contact server.',
      phone: 'Contact number'
    },
    footer: {
      pages: 'Pages',
      privacy: 'Privacy',
      social: 'Social',
      terms: 'Terms'
    },
    language: {
      aria: 'Site language',
      switchTo: 'Switch language to {{language}}'
    },
    navigation: {
      main: 'Main',
      mobile: 'Main mobile',
      openMenu: 'Open menu'
    }
  },
  es: {
    contact: {
      callOrWrite: 'Llámanos o escríbenos',
      email: 'Tu correo electrónico',
      firstName: 'Nombre',
      invalidServerResponse: 'Respuesta inválida del servidor.',
      lastName: 'Apellido',
      message: 'Tu mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      subject: 'Asunto',
      submitError: 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
      submitReview: 'Revisa los campos e intenta enviarlo otra vez.',
      submitSuccess:
        'Mensaje enviado. También quedó guardado en el panel administrativo.',
      unableToConnect: 'No se pudo conectar con el servidor de contacto.',
      phone: 'Tu número de contacto'
    },
    footer: {
      pages: 'Páginas',
      privacy: 'Privacidad',
      social: 'Redes',
      terms: 'Términos'
    },
    language: {
      aria: 'Idioma del sitio',
      switchTo: 'Cambiar idioma a {{language}}'
    },
    navigation: {
      main: 'Principal',
      mobile: 'Principal móvil',
      openMenu: 'Abrir menú'
    }
  }
} satisfies Record<
  Locale,
  {
    contact: Record<string, string>
    footer: Record<string, string>
    language: Record<string, string>
    navigation: Record<string, string>
  }
>

export type UITranslations = (typeof dictionary)[Locale]

export const getUIText = (locale: Locale) => dictionary[locale]
