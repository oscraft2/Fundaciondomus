'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Heart,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  CheckCircle,
  ArrowUp
} from 'lucide-react'

export default function FooterAnimated() {
  const t = useTranslations('footer')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with email service (Sendgrid, Mailchimp)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <footer className="relative bg-gradient-to-b from-romus-dark to-slate-950 text-white overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-romus-gold rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-romus-gold/20 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        {/* Newsletter Section - Premium */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-romus-gold/10 via-transparent to-romus-gold/5 border-b border-romus-gold/20 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Newsletter text with emojis */}
              <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold font-serif">
                  ✉️ Suscríbete a Nuestro Newsletter
                </h3>
                <p className="text-gray-300 text-lg">
                  Recibe reflexiones semanales, noticias y actualizaciones directo en tu buzón
                </p>
                <p className="text-romus-gold text-sm font-bold">
                  🎁 Además: Acceso a recursos exclusivos
                </p>
              </motion.div>

              {/* Newsletter form with better UX */}
              <motion.div variants={itemVariants} className="space-y-3">
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-romus-gold/30 text-white placeholder:text-gray-400 focus:outline-none focus:border-romus-gold focus:bg-white/20 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-romus-gold to-yellow-500 text-romus-dark font-bold rounded-lg hover:shadow-lg hover:shadow-romus-gold/50 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <Send size={18} />
                    <span className="hidden sm:inline">Suscribir</span>
                  </motion.button>
                </form>

                {/* Success message */}
                <motion.div
                  animate={subscribed ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  className="text-green-400 text-sm flex items-center gap-2"
                >
                  {subscribed && (
                    <>
                      <CheckCircle size={16} />
                      ¡Suscripción exitosa! 🎉
                    </>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          >
            {/* About Section with Social */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-gradient-to-br from-romus-gold to-yellow-500 rounded-lg flex items-center justify-center"
                >
                  <span className="text-romus-dark font-bold text-lg">R</span>
                </motion.div>
                <h3 className="font-serif text-lg font-bold text-romus-gold">
                  Fundación Romus
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('about')}
              </p>

              {/* Social Icons Animated */}
              <div className="flex gap-3 pt-2">
                {[
                  { icon: Facebook, href: '#facebook', label: 'Facebook', color: 'hover:text-blue-400' },
                  { icon: Twitter, href: '#twitter', label: 'Twitter', color: 'hover:text-sky-400' },
                  { icon: Instagram, href: '#instagram', label: 'Instagram', color: 'hover:text-pink-400' },
                  { icon: Linkedin, href: '#linkedin', label: 'LinkedIn', color: 'hover:text-blue-500' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    variants={socialVariants}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.3, y: -5, rotateZ: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full bg-romus-gold/10 border border-romus-gold/30 flex items-center justify-center text-romus-gold transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-romus-gold mb-6 text-lg flex items-center gap-2">
                🔗 {t('quickLinks')}
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Inicio', href: '/' },
                  { label: 'Sobre Nosotros', href: '/about' },
                  { label: 'Misión', href: '/mission' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contacto', href: '/contact' },
                ].map((link, idx) => (
                  <motion.li
                    key={idx}
                    variants={linkVariants}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-romus-gold transition-colors relative group inline-flex"
                    >
                      {link.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-romus-gold group-hover:w-full transition-all"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info with Icons */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-romus-gold mb-6 text-lg flex items-center gap-2">
                💬 {t('contact')}
              </h4>
              <div className="space-y-4">
                <motion.a
                  whileHover={{ x: 5 }}
                  href="mailto:info@fundacionromus.org"
                  className="flex items-start gap-3 text-gray-400 hover:text-romus-gold transition-colors group"
                >
                  <Mail size={18} className="mt-1 flex-shrink-0 text-romus-gold" />
                  <div>
                    <p className="text-sm font-bold">Email</p>
                    <p className="text-xs break-all">info@fundacionromus.org</p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="flex items-start gap-3 text-gray-400 hover:text-romus-gold transition-colors"
                >
                  <MapPin size={18} className="mt-1 flex-shrink-0 text-romus-gold" />
                  <div>
                    <p className="text-sm font-bold">Ubicación</p>
                    <p className="text-xs">Italia 🇮🇹</p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="flex items-start gap-3 text-gray-400 hover:text-romus-gold transition-colors"
                >
                  <Globe size={18} className="mt-1 flex-shrink-0 text-romus-gold" />
                  <div>
                    <p className="text-sm font-bold">Alcance</p>
                    <p className="text-xs">50+ países 🌍</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Resources/Legal */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-romus-gold mb-6 text-lg flex items-center gap-2">
                📚 Recursos
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Privacidad', href: '#' },
                  { label: 'Términos', href: '#' },
                  { label: 'Políticas', href: '#' },
                  { label: 'Donaciones', href: '/contact#donate' },
                  { label: 'Voluntariado', href: '#' },
                ].map((link, idx) => (
                  <motion.li
                    key={idx}
                    variants={linkVariants}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-romus-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Donate CTA - Premium */}
            <motion.div variants={itemVariants} className="flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-bold text-romus-gold mb-4 text-lg flex items-center gap-2">
                  ❤️ Apoya
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Tu generosidad transforma vidas en el mundo entero
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact#donate"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-romus-gold to-yellow-500 text-romus-dark px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-romus-gold/50 transition-all"
                >
                  <Heart size={18} />
                  Donar Ahora
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-t border-romus-gold/20 my-8"
            style={{ transformOrigin: 'left' }}
          />

          {/* Bottom Section with Back to Top */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center gap-6 text-gray-400 text-sm"
          >
            <motion.div variants={itemVariants} className="space-y-1">
              <p>
                © {new Date().getFullYear()} Fundación Romus. Todos los derechos reservados.
              </p>
              <p className="text-xs text-gray-500">
                {t('tagline')}
              </p>
            </motion.div>

            {/* Back to Top Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-romus-gold hover:text-yellow-400 transition-colors"
            >
              <span className="text-xs">Volver arriba</span>
              <ArrowUp size={16} />
            </motion.button>

            {/* Language indicator */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-romus-gold/70"
            >
              🌍 3 idiomas: Español • Italiano • English
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
