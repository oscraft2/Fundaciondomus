'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * 1. SCROLL REVEAL
 * Elementos que aparecen con animación al scroll
 */
export function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

/**
 * 2. PARALLAX SECTION
 * Efecto de parallax en scroll
 */
export function ParallaxSection({
  children,
  offset = 50
}: {
  children: React.ReactNode
  offset?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end center']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

/**
 * 3. ANIMATED COUNTER
 * Contador que se anima
 */
export function AnimatedCounter({
  from = 0,
  to = 100,
  duration = 2,
  suffix = ''
}: {
  from?: number
  to: number
  duration?: number
  suffix?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.25']
  })

  const count = useTransform(scrollYProgress, [0, 1], [from, to])

  return (
    <motion.span ref={ref}>
      <motion.span
        className="font-bold text-romus-gold"
        onChange={(latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix
          }
        }}
      >
        {from}
      </motion.span>
    </motion.span>
  )
}

/**
 * 4. FLOATING ELEMENTS
 * Elementos que flotan suavemente
 */
export function FloatingElement({
  children,
  delay = 0,
  duration = 4
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * 5. TYPEWRITER TEXT
 * Texto que se escribe solo
 */
export function TypewriterText({ text }: { text: string }) {
  const characters = text.split('')

  return (
    <span>
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: idx * 0.05
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

/**
 * 6. PULSE GRADIENT
 * Gradiente que pulsa
 */
export function PulseGradient({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="bg-gradient-to-r from-romus-gold via-yellow-400 to-romus-gold rounded-lg p-8"
    >
      {children}
    </motion.div>
  )
}

/**
 * 7. SCROLL PROGRESS BAR
 * Barra que muestra progreso de scroll
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left'
      }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-romus-gold to-yellow-500 z-50"
    />
  )
}

/**
 * 8. HOVER CARD 3D
 * Card con efecto 3D en hover
 */
export function HoverCard3D({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        rotateX: 10,
        rotateY: 10,
        scale: 1.05
      }}
      transition={{ duration: 0.3 }}
      style={{
        perspective: '1200px'
      }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 cursor-pointer"
    >
      {children}
    </motion.div>
  )
}

/**
 * 9. STAGGER CONTAINER
 * Contenedor que anima hijos con delay
 */
export const StaggerContainer = motion.create(({ children, staggerDelay = 0.1 }: any) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
  >
    {children}
  </motion.div>
))

export const StaggerItem = motion.create(({ children }: any) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </motion.div>
))

/**
 * 10. GLOW EFFECT
 * Efecto de brillo animado
 */
export function GlowEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 20px rgba(201, 169, 97, 0.3)',
          '0 0 40px rgba(201, 169, 97, 0.6)',
          '0 0 20px rgba(201, 169, 97, 0.3)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="rounded-lg"
    >
      {children}
    </motion.div>
  )
}

/**
 * 11. BLOB ANIMATION
 * Blob que se deforma
 */
export function BlobAnimation() {
  return (
    <motion.div
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '70% 30% 40% 60% / 30% 70% 60% 30%',
          '60% 40% 30% 70% / 60% 30% 70% 40%'
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity
      }}
      className="w-72 h-72 bg-gradient-to-r from-romus-gold to-yellow-500"
    />
  )
}

/**
 * 12. SHIMMER EFFECT
 * Efecto de brillo deslizante
 */
export function ShimmerEffect() {
  return (
    <motion.div
      animate={{
        backgroundPosition: ['0% center', '100% center', '0% center']
      }}
      transition={{
        duration: 3,
        repeat: Infinity
      }}
      style={{
        backgroundSize: '200% 100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
      }}
      className="absolute inset-0 rounded-lg"
    />
  )
}
