'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useState } from 'react'

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === locale)

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Language Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-romus-light/10 transition-colors"
      >
        <Globe size={18} />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="py-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: 4 }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                    locale === lang.code
                      ? 'bg-romus-gold/20 text-romus-dark font-bold border-l-4 border-romus-gold'
                      : 'text-gray-700 hover:bg-romus-light'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {locale === lang.code && (
                    <span className="ml-auto text-romus-gold">✓</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
