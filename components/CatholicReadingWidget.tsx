'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Loader2, AlertCircle } from 'lucide-react'
import { getCatholicReadingCached } from '@/lib/catholicApi'
import type { CatholicReading } from '@/lib/catholicApi'
import { useTranslations } from 'next-intl'

export default function CatholicReadingWidget() {
  const t = useTranslations('home.dailyReading')
  const [reading, setReading] = useState<CatholicReading | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchReading = async () => {
      try {
        setLoading(true)
        const data = await getCatholicReadingCached()
        setReading(data)
        if (!data) setError(true)
      } catch (err) {
        console.error('Error fetching reading:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchReading()
  }, [])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 flex items-center justify-center min-h-[300px]"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-romus-gold animate-spin" size={32} />
          <p className="text-gray-300">{t('loading')}</p>
        </div>
      </motion.div>
    )
  }

  if (error || !reading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 flex items-center justify-center min-h-[300px]"
      >
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="text-red-400" size={32} />
          <p className="text-gray-300">{t('error')}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-romus-gold/10 via-slate-900 to-slate-800" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-romus-gold/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-romus-gold rounded-lg flex items-center justify-center">
            <Book className="text-romus-dark" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">{t('title')}</h3>
        </div>

        <div className="space-y-6 text-gray-100">
          {reading.gospel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-romus-gold font-bold mb-2 text-lg">{t('gospel')}</h4>
              <p className="leading-relaxed italic text-gray-300">
                "{reading.gospel}"
              </p>
            </motion.div>
          )}

          {reading.readings && reading.readings.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-romus-gold font-bold mb-2 text-lg">{t('readings')}</h4>
              <div className="space-y-3">
                {reading.readings.map((reading, idx) => (
                  <p key={idx} className="text-gray-300 leading-relaxed">
                    {reading}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Meditate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 bg-romus-gold text-romus-dark font-bold rounded-lg hover:bg-opacity-90 transition-all"
        >
          🙏 Meditar
        </motion.button>
      </div>
    </motion.div>
  )
}
