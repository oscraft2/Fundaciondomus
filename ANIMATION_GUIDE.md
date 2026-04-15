# 🎬 Guía de Animaciones - Fundación Romus

Animaciones modernas que elevan la experiencia del usuario a nivel profesional.

---

## 📦 Componentes de Animación Disponibles

### 1. **ScrollReveal** - Revelar elementos en scroll

```tsx
import { ScrollReveal } from '@/components/Animations'

<ScrollReveal delay={0.2}>
  <h2>Aparece cuando scrolleas</h2>
</ScrollReveal>
```

**Uso**: Títulos, secciones, contenido importante

---

### 2. **ParallaxSection** - Efecto parallax en scroll

```tsx
<ParallaxSection offset={50}>
  <section>
    Contenido que se mueve con parallax
  </section>
</ParallaxSection>
```

**Uso**: Secciones de impacto, fondo dinámico

---

### 3. **FloatingElement** - Elementos que flotan

```tsx
<FloatingElement delay={0.5} duration={4}>
  <Icon />
</FloatingElement>
```

**Uso**: Iconos, decoraciones, elementos destacados

---

### 4. **PulseGradient** - Gradiente que pulsa

```tsx
<PulseGradient>
  <p>Contenido que pulsa</p>
</PulseGradient>
```

**Uso**: Llamadas a acción, ofertas especiales

---

### 5. **AnimatedCounter** - Contador animado

```tsx
<AnimatedCounter from={0} to={1000} suffix="+" />
```

**Uso**: Estadísticas, números de impacto

---

### 6. **HoverCard3D** - Card con efecto 3D

```tsx
<HoverCard3D>
  <div>Contenido con efecto 3D</div>
</HoverCard3D>
```

**Uso**: Cards de servicios, testimonios

---

### 7. **GlowEffect** - Efecto de brillo

```tsx
<GlowEffect>
  <div>Elemento con brillo animado</div>
</GlowEffect>
```

**Uso**: Botones destacados, contacto

---

### 8. **ScrollProgressBar** - Barra de progreso

```tsx
<ScrollProgressBar />
```

**Uso**: En layout.tsx (global)

---

### 9. **StaggerContainer + StaggerItem** - Stagger de hijos

```tsx
<StaggerContainer staggerDelay={0.1}>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerContainer>
```

**Uso**: Listas, grids, múltiples elementos

---

### 10. **BlobAnimation** - Blob que se deforma

```tsx
<BlobAnimation />
```

**Uso**: Fondos decorativos, elementos artísticos

---

---

## 🎯 Ejemplos de Uso Completo

### Página de Inicio Mejorada

```tsx
'use client'

import { AnimatedHero, AnimatedValues, AnimatedStats } from '@/components/AnimationExamples'

export default function Home() {
  return (
    <>
      <AnimatedHero />
      <AnimatedValues />
      <AnimatedStats />
    </>
  )
}
```

### Sección de Blog

```tsx
import { AnimatedBlogCard } from '@/components/AnimationExamples'
import { ScrollReveal } from '@/components/Animations'

export function BlogSection({ posts }) {
  return (
    <section className="py-20">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-12">Blog</h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map(post => (
          <AnimatedBlogCard
            key={post.id}
            title={post.title}
            image={post.image}
            category={post.category}
          />
        ))}
      </div>
    </section>
  )
}
```

---

## ✨ Mejores Prácticas

### 1. **No animes TODO**
```tsx
// ✅ BUENO: Elementos clave tienen animaciones
<ScrollReveal>
  <h2>Título importante</h2>
</ScrollReveal>

// ❌ MALO: Animar cada elemento cansa
<ScrollReveal><p>texto</p></ScrollReveal>
<ScrollReveal><p>más texto</p></ScrollReveal>
```

### 2. **Duración apropiada**
```tsx
// Scroll animations: 0.3-0.8s
// Entrance animations: 0.6-1.2s
// Infinite animations: 2-4s
```

### 3. **Rendimiento**
- Usa `will-change` en CSS para animaciones complejas
- Limita animaciones simultáneas
- Usa `GPU acceleration` (transform, opacity)

```tsx
// ✅ RÁPIDO: Transform y opacity
<motion.div animate={{ y: 50, opacity: 0.5 }} />

// ❌ LENTO: Width y height
<motion.div animate={{ width: '100%', height: 500 }} />
```

### 4. **Accesibilidad**
```tsx
// Respeta preferencias de usuario
import { useReducedMotion } from 'framer-motion'

export function Component() {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      animate={{ y: shouldReduce ? 0 : 50 }}
    />
  )
}
```

---

## 🎬 Secuencias de Animaciones

### Hero con Stagger

```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

<motion.div variants={container} initial="hidden" animate="visible">
  <motion.h1 variants={item}>Título</motion.h1>
  <motion.p variants={item}>Subtítulo</motion.p>
  <motion.button variants={item}>CTA</motion.button>
</motion.div>
```

---

## 🎨 Efectos Combinados

### Botón "Magic"

```tsx
<motion.button
  whileHover={{
    scale: 1.05,
    boxShadow: '0 0 30px rgba(201, 169, 97, 0.6)',
  }}
  whileTap={{ scale: 0.95 }}
  className="relative px-8 py-4 bg-romus-gold rounded-lg overflow-hidden"
>
  {/* Shimmer effect */}
  <motion.div
    className="absolute inset-0 bg-white/20"
    animate={{
      x: ['-100%', '100%'],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: 0.5,
    }}
  />

  <span className="relative">Donar</span>
</motion.button>
```

### Card con Animaciones Múltiples

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -10,
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  }}
  className="p-6 rounded-lg bg-white"
>
  <motion.img
    src={image}
    whileHover={{ scale: 1.05 }}
    className="w-full rounded-lg"
  />
  <h3>Título</h3>
  <p>Descripción</p>
</motion.div>
```

---

## 📊 Animaciones por Sección

### Navbar
- Fade in on scroll
- Highlight active link
- Menu open animation

### Hero
- Title stagger
- Floating elements
- Scroll indicator bounce

### Valores
- Scroll reveal
- Rotate icon
- Hover 3D effect

### Stats
- Parallax background
- Counter animation
- Scale on view

### Blog
- Card hover zoom
- Image scale
- Overlay fade

### CTA
- Glow effect
- Pulse button
- Animated icons

---

## 🔧 Instalación / Setup

Ya está todo incluido en el proyecto:

```bash
# Animations.tsx está en components/
# AnimationExamples.tsx tiene ejemplos listos
# Framer Motion ya está en package.json
```

---

## 📚 Recursos

- [Motion.dev Official Docs](https://motion.dev/)
- [Framer Motion Examples](https://motion.dev/examples)
- [CSS Scroll Effects](https://prismic.io/blog/css-scroll-effects)
- [Parallax Scroll Examples](https://www.memberstack.com/blog/14-of-the-best-parallax-scroll-examples-for-2025)

---

## 🚀 Próximos Pasos

### Implementar en:

1. **Página Inicio** → AnimatedHero + AnimatedValues + AnimatedStats
2. **Sección Blog** → AnimatedBlogCard
3. **Header** → ScrollProgressBar + smooth transitions
4. **Contacto** → AnimatedContactSection
5. **About** → ScrollReveal en cada sección

---

## ⚡ Performance Tips

1. **Lazy load heavy animations**
   ```tsx
   import dynamic from 'next/dynamic'
   const AnimatedHero = dynamic(() => import('@/components/AnimationExamples').then(m => m.AnimatedHero))
   ```

2. **Reduce motion for users**
   ```tsx
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
   ```

3. **Monitor Core Web Vitals**
   - LCP: Keep hero animations < 3.6s
   - CLS: Avoid layout shifts
   - INP: Keep interactions < 200ms

---

**¡Tu web ahora es 10x más hermosa! 🎨✨**
