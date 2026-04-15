# 🚀 Guía de Instalación - Fundación Romus

Una web moderna, segura y multiidioma para la Fundación Romus.

## 📋 Requisitos Previos

- Node.js 18+ ([descargar](https://nodejs.org/))
- npm o yarn
- Cuenta Firebase gratuita ([crear aquí](https://firebase.google.com/))
- Git

---

## 1️⃣ Clonar Repositorio

```bash
git clone https://github.com/oscraft2/fundaciondomus.git
cd fundaciondomus
```

---

## 2️⃣ Instalar Dependencias

```bash
npm install
```

O con yarn:
```bash
yarn install
```

---

## 3️⃣ Configurar Firebase

### Paso 1: Crear proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Crear proyecto"
3. Nombre: `Fundacion Romus`
4. Activa Google Analytics (opcional)
5. Crear proyecto

### Paso 2: Obtener credenciales

1. En el proyecto, ve a **Project Settings** (rueda de engranaje)
2. Ve a pestaña **"Service Accounts"**
3. Haz click en **"Generate new private key"**
4. Se descargará un JSON - **GUÁRDALO EN SEGURO**

### Paso 3: Codificar credenciales

```bash
# En macOS/Linux:
cat /ruta/al/service-account.json | base64 | tr -d '\n' | pbcopy

# En Windows PowerShell:
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content /ruta/al/service-account.json -Raw))) | Set-Clipboard
```

---

## 4️⃣ Crear archivo .env.local

```bash
cp .env.example .env.local
```

Luego edita `.env.local`:

```env
# PUBLIC - Sí, pueden ser públicas (Firebase lo permite)
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# PRIVADO - Nunca subir a Git
FIREBASE_ADMIN_SDK_KEY=la_cadena_base64_que_copiaste
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Fundación Romus
```

### Encontrar las credenciales públicas:

1. En Firebase Console, ve a **Project Settings**
2. Selecciona tu app web (o crea una con el ícono `</>`  )
3. Copia el objeto `firebaseConfig`

---

## 5️⃣ Configurar Firestore

### Crear Base de Datos

1. En Firebase Console, ve a **Firestore Database**
2. Click en **"Crear base de datos"**
3. Selecciona:
   - Región: `us-east1` (o la más cercana)
   - Modo: **"Empezar en modo test"** (por ahora)
4. Click en **"Crear"**

### Copiar Reglas de Seguridad

1. En Firestore, ve a **Rules**
2. Reemplaza todo el contenido con el de `firestore.rules`
3. Click en **"Publicar"**

---

## 6️⃣ Configurar Almacenamiento (Storage)

1. En Firebase, ve a **Storage**
2. Click en **"Comenzar"**
3. Selecciona tu región
4. Acepta los términos y crea

---

## 7️⃣ Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🌍 Cambiar Idioma

El sitio soporta 3 idiomas automáticamente:
- 🇪🇸 Español (default)
- 🇮🇹 Italiano
- 🇺🇸 English

Usa el selector de idiomas en la esquina superior derecha.

---

## 📝 Crear tu Primer Post

### Via Admin Panel (Próximamente):

1. Ve a `/admin`
2. Login con credenciales admin
3. Click en "Crear Post"
4. Rellena el formulario
5. Publica

### Manualmente (Ahora):

```javascript
// En Firebase Console > Firestore > Crear colección
db.collection('posts').add({
  title: "Primer Post",
  slug: "primer-post",
  excerpt: "Un resumen corto",
  content: "# Contenido en Markdown",
  category: "Fe",
  language: "es",
  author: "Tu Nombre",
  authorId: "user_id",
  featuredImage: "URL_de_imagen",
  status: "published",
  publishedAt: new Date(),
  createdAt: new Date(),
  featured: false,
  languages: ["es"],
  tags: ["fe", "reflexión"]
})
```

---

## 🔐 Variables de Entorno - Explicadas

| Variable | Tipo | Donde obtenerla | Es Secreto? |
|----------|------|-----------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Público | Firebase Console > Project Settings | ❌ No |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Público | Firebase Console | ❌ No |
| `FIREBASE_ADMIN_SDK_KEY` | Secreto | Service Accounts (base64) | ✅ SÍ |
| `FIREBASE_STORAGE_BUCKET` | Público | Firebase Console | ❌ No |

**Regla simple:** Si comienza con `NEXT_PUBLIC_`, es público. Si no, es secreto.

---

## 📱 Características Implementadas

✅ Diseño moderno con Framer Motion  
✅ Blog con grid asimétrico  
✅ Multiidioma (es, it, en)  
✅ Lecturas católicas del día  
✅ Formulario de contacto seguro  
✅ Rate limiting y validación  
✅ Sanitización XSS  
✅ TypeScript type-safe  
✅ SEO optimizado  
✅ Mobile-responsive  

---

## 🚀 Deploy a Firebase Hosting

```bash
# Instala Firebase CLI
npm install -g firebase-tools

# Autentica
firebase login

# Configura tu proyecto
firebase init

# Responde:
# ✔ Firestore: Y
# ✔ Storage: Y
# ✔ Hosting: Y
# ✔ Project: Tu proyecto

# Build y deploy
npm run build
firebase deploy
```

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor local

# Build
npm run build        # Compila para producción
npm run start        # Inicia modo producción

# Auditoría
npm audit           # Revisa vulnerabilidades
npm audit --fix     # Intenta arreglarlasautomáticamente

# Linting
npm run lint        # Revisa código
```

---

## 🆘 Troubleshooting

### Error: "Firebase config not found"

→ Verifica que `.env.local` esté en la raíz y tiene las variables correctas.

### Error: "Firestore permission denied"

→ Asegúrate que las Firestore Rules están publicadas correctamente.

### Blog posts no aparecen

→ Verifica que están en colección `posts` con `status: "published"`.

### Cambio de idioma no funciona

→ Limpia cache: Ctrl+Shift+Delete (o ⌘+Shift+Delete en Mac)

---

## 📚 Documentación Adicional

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-intl](https://next-intl-docs.vercel.app/)

---

## ❓ ¿Preguntas?

Revisa:
- `SECURITY_ARCHITECTURE.md` - Seguridad
- `README.md` - Descripción general
- Issues en GitHub

---

**¡Listo para lanzar! 🚀**
