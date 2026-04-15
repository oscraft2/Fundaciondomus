'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ContactFormSchema, type ContactForm } from '@/lib/schemas'
import { sanitizeText } from '@/lib/security'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SecureContactForm() {
  const t = useTranslations('contact.form')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactFormSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      setIsError(false)

      // Sanitize text inputs
      const sanitizedData = {
        ...data,
        name: sanitizeText(data.name),
        message: sanitizeText(data.message),
      }

      // Send to server API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)
      reset()

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsError(true)
      setTimeout(() => setIsError(false), 5000)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg space-y-6"
    >
      {/* Success Message */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3"
        >
          <CheckCircle size={20} />
          <span>{t('success')}</span>
        </motion.div>
      )}

      {/* Error Message */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-3"
        >
          <AlertCircle size={20} />
          <span>{t('error')}</span>
        </motion.div>
      )}

      {/* Name Field */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          {t('name')}
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none transition ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tu nombre"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {t('email')}
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none transition ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </motion.div>

      {/* Subject Field */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          {t('subject')}
        </label>
        <input
          {...register('subject')}
          type="text"
          id="subject"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none transition ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Asunto de tu mensaje"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t('message')}
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none transition resize-none ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tu mensaje..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-romus-gold to-yellow-500 text-romus-dark py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Send size={18} />
        {isSubmitting ? 'Enviando...' : t('send')}
      </motion.button>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        Tu información es segura y nunca será compartida.
      </p>
    </motion.form>
  )
}
