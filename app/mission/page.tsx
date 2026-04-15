import Link from 'next/link'
import { Flame, BookOpen, HandHeart, Zap, Users, Smartphone } from 'lucide-react'

export default function Mission() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Nuestra Misión y Valores</h1>
          <p className="text-xl text-gray-300">
            Comprometidos con transformar vidas a través de la fe y la solidaridad.
          </p>
        </div>
      </section>

      {/* Main Mission */}
      <section className="py-16 md:py-24 bg-romus-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Nuestra Misión</h2>
          <div className="bg-white p-10 rounded-lg shadow-lg border-l-4 border-romus-gold">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <span className="font-bold text-romus-gold">Fundación Romus</span> existe para fortalecer la fe católica, proteger y fortalecer la familia, promover la educación cristiana integral, y realizar acciones sociales concretas que atiendan a los más necesitados y vulnerables.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Creemos que la transformación de la sociedad comienza con personas transformadas por el Evangelio, familias sólidas en valores cristianos, y comunidades que viven la fraternidad y la justicia.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Pilares Estratégicos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <Flame className="text-romus-dark" size={28} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Fe y Espiritualidad</h3>
              <p className="text-gray-600">
                Fortalecemos la fe católica como fundamento para una vida plena y significativa, promoviendo la oración, los sacramentos y el crecimiento espiritual.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <Users className="text-romus-dark" size={28} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Familia y Comunidad</h3>
              <p className="text-gray-600">
                Protegemos la familia como célula fundamental de la sociedad, ofreciendo apoyo, recursos educativos y espacios de comunión y fortalecimiento.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-romus-dark" size={28} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Educación Cristiana</h3>
              <p className="text-gray-600">
                Promovemos una educación integral que forma la mente, el corazón y el espíritu según los valores del Evangelio y la doctrina católica.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <HandHeart className="text-romus-dark" size={28} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Acción Social</h3>
              <p className="text-gray-600">
                Realizamos programas concretos de ayuda social, atendiendo a los pobres, enfermos, desplazados y marginados con compasión y dignidad.
              </p>
            </div>

            {/* Pilar 5 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-romus-dark" size={28} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Justicia Social</h3>
              <p className="text-gray-600">
                Promovemos una sociedad más justa donde se respete la dignidad de cada persona y se garanticen derechos fundamentales para todos.
              </p>
            </div>

            {/* Pilar 6 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-romus-gold rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="text-romus-dark" size={28} />
              </div>
              <h3 className="text-xl font-bold text-romus-dark mb-3">Innovación Pastoral</h3>
              <p className="text-gray-600">
                Utilizamos nuevas herramientas y métodos para llevar el mensaje cristiano a los corazones, especialmente de las nuevas generaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-romus-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Valores Fundamentales</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Caridad',
                description: 'El amor al prójimo guía todas nuestras acciones. Servimos movidos por el amor cristiano, sin buscar reconocimiento, sino el bien de otros.'
              },
              {
                title: 'Justicia',
                description: 'Trabajamos por una sociedad donde se respeten los derechos de todos, especialmente de los más vulnerables y marginados.'
              },
              {
                title: 'Integridad',
                description: 'Actuamos con transparencia, honestidad y coherencia entre nuestras palabras y acciones, viviendo según los principios que predicamos.'
              },
              {
                title: 'Comunión',
                description: 'Creemos en el poder de la unidad. Colaboramos con otras organizaciones católicas y comunidades para multiplicar nuestro impacto.'
              },
              {
                title: 'Esperanza',
                description: 'Confiamos en el poder transformador de Cristo. Incluso ante dificultades, mantenemos la esperanza en un futuro mejor.'
              },
              {
                title: 'Responsabilidad',
                description: 'Somos mayordomos responsables de los recursos que nos confían. Administramos con cuidado para maximizar nuestro impacto social.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold text-romus-dark mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Principios Orientadores</h2>
          <div className="space-y-4">
            {[
              'Escuchamos atentamente las necesidades de las comunidades a las que servimos.',
              'Actuamos con rapidez y eficacia ante las crisis humanitarias.',
              'Promovemos el desarrollo integral de la persona humana en todas sus dimensiones.',
              'Respetamos la dignidad, autonomía y culturas de quienes ayudamos.',
              'Buscamos soluciones sostenibles que empoderen a las personas a largo plazo.',
              'Nos guiamos siempre por la doctrina social de la Iglesia Católica.'
            ].map((principle, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-romus-light rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-romus-gold rounded-full flex items-center justify-center">
                    <span className="text-romus-dark text-sm font-bold">{index + 1}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="accent-gradient text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Juntos Hacemos la Diferencia</h2>
          <p className="text-xl mb-8 text-gray-100">
            Cada acción cuenta. Cada donativo, voluntario y oración es parte de una transformación más grande.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-romus-dark text-romus-gold px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
          >
            Únete a Nosotros
          </Link>
        </div>
      </section>
    </div>
  )
}
