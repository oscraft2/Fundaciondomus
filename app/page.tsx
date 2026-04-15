import Link from 'next/link'
import { Heart, Users, Target, Lightbulb, Globe, Hand } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Fundación Romus
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Una organización católica internacional comprometida con fortalecer los valores cristianos, la familia y el bienestar comunitario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="bg-romus-gold text-romus-dark px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all inline-block"
            >
              Conoce Más
            </Link>
            <Link
              href="/contact#donate"
              className="border-2 border-romus-gold text-romus-gold px-8 py-3 rounded-lg font-bold hover:bg-romus-gold hover:text-romus-dark transition-all inline-block"
            >
              Apoya Nuestra Misión
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-romus-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Nuestros Valores Fundamentales</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fe */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-romus-dark" size={24} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Fe</h3>
              <p className="text-gray-600">
                Creemos en los valores cristianos como fundamento para una sociedad más justa y equitativa.
              </p>
            </div>

            {/* Comunidad */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <Users className="text-romus-dark" size={24} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Comunidad</h3>
              <p className="text-gray-600">
                Fortalecemos los lazos comunitarios y promovemos el bien común a través del servicio y el apoyo mutuo.
              </p>
            </div>

            {/* Compasión */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-romus-dark" size={24} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Compasión</h3>
              <p className="text-gray-600">
                Actuamos con compasión hacia los más necesitados, siguiendo el ejemplo de Cristo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Qué Hacemos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Apoyo Familiar */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-romus-gold">
                  <Hand className="h-6 w-6 text-romus-dark" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-romus-dark mb-2">Apoyo Familiar</h3>
                <p className="text-gray-600">
                  Ofrecemos programas y recursos para fortalecer la familia como núcleo fundamental de la sociedad.
                </p>
              </div>
            </div>

            {/* Educación Católica */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-romus-gold">
                  <Lightbulb className="h-6 w-6 text-romus-dark" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-romus-dark mb-2">Educación Católica</h3>
                <p className="text-gray-600">
                  Promovemos la educación cristiana y el desarrollo integral de la persona según los valores evangélicos.
                </p>
              </div>
            </div>

            {/* Acción Social */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-romus-gold">
                  <Users className="h-6 w-6 text-romus-dark" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-romus-dark mb-2">Acción Social</h3>
                <p className="text-gray-600">
                  Trabajamos en proyectos comunitarios que atienden a los más vulnerables y promueven la justicia social.
                </p>
              </div>
            </div>

            {/* Alcance Global */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-romus-gold">
                  <Globe className="h-6 w-6 text-romus-dark" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-romus-dark mb-2">Alcance Internacional</h3>
                <p className="text-gray-600">
                  Como organización internacional, colaboramos con otras instituciones católicas para multiplicar nuestro impacto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="accent-gradient text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Deseas Unirte a Nuestra Misión?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Juntos podemos hacer una diferencia en la vida de muchas personas. Tu apoyo es fundamental para continuar con nuestro trabajo.
          </p>
          <Link
            href="/contact#donate"
            className="inline-flex items-center gap-2 bg-romus-dark text-romus-gold px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
          >
            <Heart size={20} />
            Donar Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
