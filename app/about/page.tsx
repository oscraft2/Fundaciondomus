import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Sobre Fundación Romus</h1>
          <p className="text-xl text-gray-300">
            Conoce nuestra historia, nuestra identidad y nuestro compromiso con la fe y la comunidad.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-romus-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Nuestra Historia</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              La Fundación Romus es una organización católica internacional fundada sobre los principios de la fe cristiana, la solidaridad y el compromiso con el bienestar humano. Con raíces profundas en la tradición católica italiana, nuestra fundación representa la continuación de siglos de servicio y dedicación a la comunidad.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Inspirada en los valores evangélicos de compasión, justicia y caridad, Romus trabaja incansablemente para fortalecer la fe, proteger la familia y promover el desarrollo integral de las personas en comunidades alrededor del mundo.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Nuestro nombre, Romus, evoca la solidez, la estabilidad y el fundamento firme que proporciona la fe cristiana a toda nuestra obra. Somos una voz católica comprometida con la transformación social desde los valores del Evangelio.
            </p>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Identidad Institucional</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Identidad */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-romus-dark mb-4">Identidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Somos una fundación católica internacional radicada en principios cristianos, con la misión de promover el desarrollo integral de la persona humana y el fortalecimiento de la sociedad a través de los valores del Evangelio.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-romus-dark mb-4">Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Una sociedad donde los valores cristianos de justicia, paz y fraternidad guíen las acciones de las personas y comunidades, creando un mundo más compasivo y equitativo para todos.
              </p>
            </div>

            {/* Misión */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-romus-dark mb-4">Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Fortalecer la fe católica, proteger la familia, promover la educación cristiana y realizar acciones sociales concretas que atiendan a los más necesitados.
              </p>
            </div>
          </div>

          {/* Core Commitments */}
          <div className="bg-romus-light p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-romus-dark mb-6">Nuestros Compromisos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Defender los valores cristianos y la dignidad humana',
                'Fortalecer la familia como institución fundamental',
                'Promover la justicia social y la solidaridad',
                'Educar en la fe y el desarrollo integral',
                'Servir a los más vulnerables',
                'Colaborar con otras instituciones católicas'
              ].map((commitment, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-romus-gold flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{commitment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 md:py-24 bg-romus-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Presencia Internacional</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Como organización católica internacional, la Fundación Romus mantiene una presencia activa en múltiples países, colaborando con diocesis, parroquias y otras organizaciones católicas para multiplicar el impacto de nuestra misión.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Nuestro fundamento en la tradición católica italiana nos conecta con una riqueza espiritual milenaria, mientras que nuestro compromiso internacional nos permite ser una voz católica relevante en el mundo contemporáneo.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-romus-dark text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres Conocer Más?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Descubre nuestra misión y valores, y descubre cómo puedes ser parte de nuestro trabajo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mission"
              className="bg-romus-gold text-romus-dark px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all inline-block"
            >
              Leer Sobre Nuestra Misión
            </Link>
            <Link
              href="/contact"
              className="border-2 border-romus-gold text-romus-gold px-8 py-3 rounded-lg font-bold hover:bg-romus-gold hover:text-romus-dark transition-all inline-block"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
