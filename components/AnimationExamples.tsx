'use client'

import { motion } from 'framer-motion'
import {
  ScrollReveal,
  ParallaxSection,
  FloatingElement,
  PulseGradient,
  HoverCard3D,
  StaggerContainer,
  StaggerItem,
  GlowEffect,
  ScrollProgressBar
} from './Animations'

/**
 * EJEMPLO 1: Hero Animado
 */
export function AnimatedHero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Scroll Progress */}
      <ScrollProgressBar />

      {/* Blob de fondo */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-romus-gold/10 rounded-full blur-3xl"
      />

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white font-serif"
        >
          Fundación Romus
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Una organización católica internacional comprometida con la fe y la comunidad
        </motion.p>

        {/* Botones con hover glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201, 169, 97, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-romus-gold text-romus-dark font-bold rounded-lg"
          >
            Conoce Más
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201, 169, 97, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-romus-gold text-romus-gold font-bold rounded-lg"
          >
            Donar Ahora
          </motion.button>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12"
        >
          <p className="text-gray-400 mb-2">Scroll para ver más</p>
          <motion.svg
            className="w-6 h-6 mx-auto text-romus-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  )
}

/**
 * EJEMPLO 2: Valores con Stagger
 */
export function AnimatedValues() {
  const values = [
    { icon: '⛪', title: 'Fe', desc: 'Valores cristianos fundamentales' },
    { icon: '👥', title: 'Comunidad', desc: 'Fortalecemos lazos comunitarios' },
    { icon: '❤️', title: 'Compasión', desc: 'Servicio a los necesitados' }
  ]

  return (
    <section className="py-20 bg-romus-light">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16 font-serif">
            Nuestros Valores
          </h2>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <StaggerItem key={idx}>
                <HoverCard3D>
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity }}
                      className="text-6xl mx-auto"
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                    <p className="text-gray-300">{value.desc}</p>
                  </div>
                </HoverCard3D>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

/**
 * EJEMPLO 3: Impacto Stats con Parallax
 */
export function AnimatedStats() {
  return (
    <ParallaxSection offset={100}>
      <section className="py-20 bg-gradient-to-r from-romus-dark to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Países' },
              { number: '100K+', label: 'Beneficiarios' },
              { number: '25+', label: 'Años' },
              { number: '1000+', label: 'Voluntarios' }
            ].map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <motion.div
                  whileInView={{ scale: [0.8, 1] }}
                  className="text-center"
                >
                  <motion.div
                    className="text-4xl font-bold text-romus-gold mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ParallaxSection>
  )
}

/**
 * EJEMPLO 4: Blog Posts Animados
 */
export function AnimatedBlogCard({
  title,
  image,
  category
}: {
  title: string
  image: string
  category: string
}) {
  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ y: -10 }}
        className="group relative overflow-hidden rounded-2xl"
      >
        {/* Imagen con overlay animado */}
        <motion.img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Overlay gradient animado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6"
        >
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="text-romus-gold text-sm font-bold"
            >
              {category}
            </motion.p>
            <h3 className="text-white font-bold text-lg">{title}</h3>
          </div>
        </motion.div>
      </motion.div>
    </ScrollReveal>
  )
}

/**
 * EJEMPLO 5: Contacto con Glow
 */
export function AnimatedContactSection() {
  return (
    <section className="py-20 bg-romus-light">
      <div className="max-w-2xl mx-auto px-4">
        <ScrollReveal>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center font-serif">
              ¿Quieres Contactarnos?
            </h2>

            {/* Card con glow */}
            <GlowEffect>
              <div className="bg-white p-8 rounded-lg space-y-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 40px rgba(201, 169, 97, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-gradient-to-r from-romus-gold to-yellow-500 text-romus-dark font-bold rounded-lg text-lg"
                >
                  Enviar Mensaje
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 40px rgba(201, 169, 97, 0.2)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 border-2 border-romus-gold text-romus-dark font-bold rounded-lg text-lg"
                >
                  Donar Ahora
                </motion.button>
              </div>
            </GlowEffect>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
