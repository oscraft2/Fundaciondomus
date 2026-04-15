'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t = useTranslations('nav')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/mission', label: t('mission') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-romus-gold to-yellow-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-romus-gold/50 transition-shadow">
                <span className="text-romus-dark font-bold text-lg">R</span>
              </div>
              <span className="hidden sm:inline font-serif text-lg font-bold bg-gradient-to-r from-romus-dark to-romus-gold bg-clip-text text-transparent">
                Romus
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-romus-gold px-3 py-2 font-medium transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-romus-gold group-hover:w-full transition-all" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Donate Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact#donate"
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-romus-gold to-yellow-500 text-romus-dark px-6 py-2 rounded-lg hover:shadow-lg shadow-romus-gold/30 font-bold transition-all"
              >
                <Heart size={16} />
                {t('donate')}
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 flex flex-col gap-2 overflow-hidden"
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-romus-gold py-3 px-4 block rounded-lg hover:bg-romus-light/50 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  href="/contact#donate"
                  className="text-romus-dark bg-gradient-to-r from-romus-gold to-yellow-500 px-4 py-3 rounded-lg font-bold text-center block w-full flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart size={16} />
                  {t('donate')}
                </Link>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
