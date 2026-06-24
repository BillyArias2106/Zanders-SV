'use client'

import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginsRegistered = false

if (typeof window !== 'undefined' && !pluginsRegistered) {
  gsap.registerPlugin(ScrollTrigger, Observer)
  pluginsRegistered = true
}

export { gsap, Observer, ScrollTrigger }
