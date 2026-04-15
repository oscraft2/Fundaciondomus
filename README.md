# Fundación Romus - Sitio Web Oficial 🙏

Sitio web **ultra-moderno**, **seguro** y **multiidioma** para la Fundación Romus, una organización católica internacional.

## ✨ Características Principales

### 🎨 Diseño Moderno
- **Framer Motion**: Animaciones profesionales y fluidas
- **Bento Grid**: Layout asimétrico y moderno
- **Glassmorphism**: Efectos de vidrio elegantes
- **Gradientes dinámicos**: Paleta de colores oro y azul
- **Dark/Light Mode**: Soporte completo

### 📱 Responsive & Accesibilidad
- Mobile-first responsive (móvil, tablet, desktop)
- Optimizado para velocidad y SEO
- Cumple estándares WCAG

### 🌍 Multiidioma (i18n)
- 🇪🇸 Español (por defecto)
- 🇮🇹 Italiano
- 🇺🇸 Inglés
- Cambio de idioma en tiempo real
- Rutas localizadas automáticas

### 📚 Blog Moderno
- Cards hermosas con efectos hover
- Grid asimétrico Bento (responsive)
- Búsqueda y filtrado por categoría
- Lectura estimada automática
- Compartir en redes sociales
- Newsletter subscription

### ⛪ Integraciones Católicas
- **Lecturas Diarias**: API de lecturas católicas
- **Calendario Litúrgico**: Festividades y solemnidades
- **Widget de Meditación**: Acceso a oración diaria

### 🔐 Seguridad Empresarial
- **OWASP Top 10**: Mitigación completa
- **Validación Zod**: Schema validation
- **Sanitización XSS**: Prevención de ataques
- **Rate Limiting**: Protección DDoS
- **Firebase Security Rules**: Control de acceso granular
- **Encriptación**: HTTPS + CSP headers
- **Auditoría**: Security logging completo

## 🛠️ Stack Tecnológico Profesional

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 3
- **Animaciones**: Framer Motion
- **State Management**: Zustand
- **Componentes**: shadcn/ui + custom components
- **Icons**: Lucide React
- **Tema**: Oro (#C9A961) + Azul Oscuro (#1a1a2e)

### Backend & Base de Datos
- **Firebase**: Firestore + Storage + Auth
- **Firebase Admin SDK**: Para operaciones servidor
- **Validación**: Zod schemas
- **Seguridad**: Firestore Security Rules

### APIs Integradas
- **Catholic Readings API**: Lecturas diarias del misal
- **Church Calendar API**: Calendario litúrgico
- **Google Translate (opcional)**: Para traducción automática

### Internacionalización
- **next-intl**: Multiidioma profesional
- **Soporta**: Español, Italiano, Inglés
- **Localización**: Rutas y contenido por idioma

### Herramientas de Desarrollo
- **Linting**: ESLint + Prettier
- **Validación**: Zod + TypeScript
- **Auditoría**: npm audit
- **Testing**: Jest (preparado)

## 🚀 Quick Start

### Instalación Rápida (5 minutos)

```bash
# 1. Clona el repo
git clone https://github.com/oscraft2/fundaciondomus.git
cd fundaciondomus

# 2. Instala dependencias
npm install

# 3. Configura variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales de Firebase

# 4. Inicia servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) ✅

### Guía Completa de Setup

Para instrucciones detalladas de Firebase, variables de entorno y despliegue:
👉 **[Ver SETUP_GUIDE.md](./SETUP_GUIDE.md)**

### Comandos Disponibles

```bash
npm run dev      # Desarrollo local (localhost:3000)
npm run build    # Compilar para producción
npm run start    # Ejecutar build de producción
npm run lint     # Validar código
npm audit        # Revisar vulnerabilidades
firebase deploy  # Deploy a Firebase Hosting
```

## 📁 Estructura del Proyecto

```
fundaciondomus/
├── app/
│   ├── api/                      # API Routes
│   │   ├── contact/route.ts      # Formulario de contacto
│   │   └── posts/route.ts        # Obtener posts del blog
│   ├── [locale]/                 # Rutas multiidioma
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Inicio
│   │   ├── about/page.tsx        # Sobre nosotros
│   │   ├── mission/page.tsx      # Misión
│   │   ├── blog/page.tsx         # Listado blog
│   │   ├── blog/[slug]/page.tsx  # Post individual
│   │   └── contact/page.tsx      # Contacto
│   ├── globals.css
│   └── layout.tsx                # Layout raíz
│
├── components/
│   ├── Header.tsx                # Navegación + Language Switcher
│   ├── Footer.tsx                # Pie de página
│   ├── BlogCard.tsx              # Tarjeta de blog
│   ├── BlogGrid.tsx              # Grid asimétrico Bento
│   ├── CatholicReadingWidget.tsx # Lectura del día
│   ├── LanguageSwitcher.tsx      # Selector de idioma
│   └── SecureContactForm.tsx     # Formulario validado
│
├── lib/
│   ├── schemas.ts                # Zod validation schemas
│   ├── firebase.ts               # Firebase Admin SDK
│   ├── catholicApi.ts            # API de lecturas católicas
│   ├── liturgicalCalendarApi.ts  # API de calendario
│   ├── security.ts               # Utilidades seguridad
│   └── rateLimit.ts              # Rate limiting
│
├── messages/
│   ├── es.json                   # Textos en español
│   ├── it.json                   # Textos en italiano
│   └── en.json                   # Textos en inglés
│
├── middleware.ts                  # Protección de rutas
├── routing.ts                     # Configuración i18n
├── i18n.ts                        # Config multiidioma
├── firestore.rules                # Reglas de seguridad
├── SECURITY_ARCHITECTURE.md       # Documentación seguridad
├── SETUP_GUIDE.md                 # Guía de instalación
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎨 Personalización

### Cambiar Colores
Edita `tailwind.config.ts`:
```typescript
colors: {
  'romus-gold': '#C9A961',
  'romus-dark': '#1a1a2e',
}
```

### Agregar Contenido
- **Página de Inicio**: `app/page.tsx`
- **Sobre Nosotros**: `app/about/page.tsx`
- **Misión**: `app/mission/page.tsx`
- **Contacto**: `app/contact/page.tsx`

## 📱 Responsividad

El sitio está optimizado para:
- ✅ Móvil (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

## 🚀 Despliegue en Producción

### Opción 1: Firebase Hosting (Recomendado) ⭐

```bash
# Instala Firebase CLI
npm install -g firebase-tools

# Autentica y configura
firebase login
firebase init

# Deploy
npm run build
firebase deploy
```

**Ventajas:**
- Integración directa con Firestore
- CDN global automático
- SSL gratuito
- Escalabilidad automática
- Custom domains

### Opción 2: Vercel

```bash
npm install -g vercel
vercel
```

### Opción 3: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

---

## 🎯 Roadmap (Próximas Fases)

### ✅ Completado
- [x] Diseño moderno con Framer Motion
- [x] Blog con grid asimétrico
- [x] APIs católicas integradas
- [x] Multiidioma (es, it, en)
- [x] Seguridad OWASP completa
- [x] Formulario de contacto seguro
- [x] Rate limiting y validación

### 🔄 En Progreso
- [ ] Admin panel completo (crear/editar posts)
- [ ] Autenticación Firebase Admin
- [ ] Dashboard de analytics
- [ ] Email notifications

### 📋 Próximamente
- [ ] Comentarios en posts (Firestore)
- [ ] Sistema de donaciones integrado (Stripe)
- [ ] Versión móvil app (React Native)
- [ ] Integración con WhatsApp API
- [ ] Notificaciones push
- [ ] Caché inteligente con Redis
- [ ] CDN con Cloudflare
- [ ] Análisis de performance
- [ ] A/B testing

---

## 🔐 Seguridad

Este proyecto implementa **seguridad empresarial**:

### Protecciones Implementadas
✅ **XSS Prevention**: Sanitización HTML con DOMPurify  
✅ **CSRF Protection**: Tokens CSRF validados  
✅ **SQL/NoSQL Injection**: Validación con Zod  
✅ **Rate Limiting**: 5 requests/hora por IP  
✅ **HTTPS**: TLS 1.3 en producción  
✅ **Headers Seguros**: CSP, X-Frame-Options, etc.  
✅ **Input Validation**: Validación en cliente y servidor  
✅ **Audit Logging**: Todos los eventos se registran  

### Documentación de Seguridad
👉 **[Ver SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md)**

---

## 📝 Desarrollo

### Crear un nuevo formulario
El formulario de contacto está en `app/contact/page.tsx`. Para integrar con un backend:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
  // Procesar respuesta
}
```

### Agregar nuevas páginas
1. Crea una carpeta: `app/nueva-pagina/`
2. Crea el archivo: `page.tsx`
3. Usa el componente Header y Footer automáticamente

## 🔐 Seguridad

- Datos sensibles en variables de entorno
- Validación de formularios en cliente y servidor
- TypeScript para type-safety

## 📧 Contacto

Para preguntas sobre este sitio:
- Email: info@fundacionromus.org
- Web: [Fundación Romus](https://fundacionromus.org)

## 📄 Licencia

© 2024 Fundación Romus. Todos los derechos reservados.

---

**Desarrollado con ❤️ para la Fundación Romus**
