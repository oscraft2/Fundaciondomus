import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fundación Romus | Organización Católica Internacional',
  description: 'Fundación Romus es una organización católica internacional dedicada a fortalecer los valores cristianos y el bienestar comunitario.',
  keywords: 'fundación, católica, internacional, comunidad, fe',
  authors: [{ name: 'Fundación Romus' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
