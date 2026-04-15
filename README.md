# Fundación Romus - Sitio Web Oficial

Sitio web moderno y familiar para la Fundación Romus, una organización católica internacional.

## 🎯 Características

- **Diseño Moderno**: Interfaz limpia, elegante y profesional
- **Responsive**: Se adapta perfectamente a cualquier dispositivo
- **Multilingüe**: Base preparada para múltiples idiomas
- **Secciones Completas**:
  - Página de Inicio con valores fundamentales
  - Sobre Nosotros con identidad institucional
  - Misión y Valores estratégicos
  - Contacto y Donaciones
  - Footer con información de contacto

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14+ con TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: React 18
- **Icons**: Lucide React
- **Tema de Color**: Oro (#C9A961) y Azul Oscuro (#1a1a2e)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/oscraft2/fundaciondomus.git
cd fundaciondomus
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
fundaciondomus/
├── app/
│   ├── layout.tsx          # Layout global
│   ├── globals.css         # Estilos globales
│   ├── page.tsx            # Página de inicio
│   ├── about/page.tsx      # Sobre nosotros
│   ├── mission/page.tsx    # Misión y valores
│   └── contact/page.tsx    # Contacto y donaciones
├── components/
│   ├── Header.tsx          # Componente de navegación
│   └── Footer.tsx          # Componente de pie de página
├── package.json
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

## 🚀 Despliegue

### Con Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Con Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Compilar para producción
```bash
npm run build
npm run start
```

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
