import Link from 'next/link'
import { Heart, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-romus-dark text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-xl font-bold text-romus-gold mb-4">
              Fundación Romus
            </h3>
            <p className="text-gray-300 text-sm">
              Organización católica internacional dedicada a fortalecer los valores cristianos y el bienestar comunitario.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-romus-gold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-romus-gold">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-romus-gold">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-gray-300 hover:text-romus-gold">
                  Misión
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-romus-gold">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-romus-gold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">info@fundacionromus.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">Italia</span>
              </li>
            </ul>
          </div>

          {/* Donate */}
          <div>
            <h4 className="font-bold text-romus-gold mb-4">Apoya Nuestra Misión</h4>
            <Link
              href="/contact#donate"
              className="inline-flex items-center gap-2 bg-romus-gold text-romus-dark px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all"
            >
              <Heart size={18} />
              Donar Ahora
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Fundación Romus. Todos los derechos reservados.
            </p>
            <p className="mt-2 text-xs">
              Organización católica internacional | Comprometida con la fe y la comunidad
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
