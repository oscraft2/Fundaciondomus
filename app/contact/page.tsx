'use client'

import { useState } from 'react'
import { Mail, MapPin, Heart } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-xl text-gray-300">
            ¿Deseas conectar con nosotros? Nos encantaría escucharte.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-romus-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Formas de Contactarnos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Email */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-romus-gold rounded-lg flex items-center justify-center">
                  <Mail className="text-romus-dark" size={24} />
                </div>
                <h3 className="text-xl font-bold text-romus-dark">Email</h3>
              </div>
              <p className="text-gray-600 mb-2">Escríbenos directamente a:</p>
              <p className="text-romus-dark font-bold text-lg">info@fundacionromus.org</p>
            </div>

            {/* Location */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-romus-gold rounded-lg flex items-center justify-center">
                  <MapPin className="text-romus-dark" size={24} />
                </div>
                <h3 className="text-xl font-bold text-romus-dark">Ubicación</h3>
              </div>
              <p className="text-gray-600 mb-2">Nos encontramos en:</p>
              <p className="text-romus-dark font-bold text-lg">Italia</p>
              <p className="text-gray-600 text-sm mt-2">Organización internacional con alcance global</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-romus-dark mb-6">Envíanos un Mensaje</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none"
                  placeholder="Asunto de tu mensaje"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romus-gold focus:border-transparent outline-none resize-none"
                  placeholder="Tu mensaje..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-romus-gold text-romus-dark py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Apoya Nuestra Misión</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {/* Small Donation */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-romus-gold">
              <h3 className="text-2xl font-bold text-romus-dark mb-2">Donación Pequeña</h3>
              <p className="text-3xl text-romus-gold font-bold mb-4">$25</p>
              <p className="text-gray-600 mb-6">Ayuda con necesidades inmediatas</p>
              <button className="w-full bg-romus-gold text-romus-dark py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all">
                Donar
              </button>
            </div>

            {/* Regular Donation */}
            <div className="bg-romus-gold p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform md:scale-105">
              <div className="inline-block bg-romus-dark text-romus-gold px-3 py-1 rounded-full text-xs font-bold mb-2">
                Más Popular
              </div>
              <h3 className="text-2xl font-bold text-romus-dark mb-2">Donación Regular</h3>
              <p className="text-3xl text-romus-dark font-bold mb-4">$100</p>
              <p className="text-romus-dark mb-6">Impacto duradero en programas sociales</p>
              <button className="w-full bg-romus-dark text-romus-gold py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all">
                Donar
              </button>
            </div>

            {/* Large Donation */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-romus-gold">
              <h3 className="text-2xl font-bold text-romus-dark mb-2">Donación Sustancial</h3>
              <p className="text-3xl text-romus-gold font-bold mb-4">$500+</p>
              <p className="text-gray-600 mb-6">Transforma vidas y comunidades</p>
              <button className="w-full bg-romus-gold text-romus-dark py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all">
                Donar
              </button>
            </div>
          </div>

          {/* Other Ways to Help */}
          <div className="bg-romus-light p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-romus-dark mb-6 text-center">Otras Formas de Apoyar</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Heart className="text-romus-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-romus-dark">Donación Mensual</p>
                  <p className="text-gray-600 text-sm">Contribuye regularmente a nuestros programas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="text-romus-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-romus-dark">Voluntariado</p>
                  <p className="text-gray-600 text-sm">Únete a nuestro equipo y colabora en terreno</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="text-romus-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-romus-dark">Difusión</p>
                  <p className="text-gray-600 text-sm">Comparte nuestra misión con tu comunidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="accent-gradient text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Gracias por Tu Interés</h2>
          <p className="text-xl text-gray-100">
            Cada contribución, por pequeña que sea, marca una diferencia en la vida de quienes servimos.
          </p>
        </div>
      </section>
    </div>
  )
}
