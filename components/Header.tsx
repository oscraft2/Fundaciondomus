'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-romus-gold rounded-lg flex items-center justify-center">
              <span className="text-romus-dark font-bold text-lg">R</span>
            </div>
            <span className="hidden sm:inline font-serif text-xl font-bold text-romus-dark">
              Fundación Romus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-romus-gold font-medium">
              Inicio
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-romus-gold font-medium">
              Sobre Nosotros
            </Link>
            <Link href="/mission" className="text-gray-700 hover:text-romus-gold font-medium">
              Misión
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-romus-gold font-medium">
              Contacto
            </Link>
            <Link
              href="/contact#donate"
              className="bg-romus-gold text-romus-dark px-6 py-2 rounded-lg hover:bg-opacity-90 font-bold transition-all"
            >
              Donar
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-700 hover:text-romus-gold py-2">
              Inicio
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-romus-gold py-2">
              Sobre Nosotros
            </Link>
            <Link href="/mission" className="text-gray-700 hover:text-romus-gold py-2">
              Misión
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-romus-gold py-2">
              Contacto
            </Link>
            <Link
              href="/contact#donate"
              className="bg-romus-gold text-romus-dark px-6 py-2 rounded-lg font-bold text-center"
            >
              Donar
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
