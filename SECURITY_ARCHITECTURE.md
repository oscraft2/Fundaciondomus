# 🔐 Plan de Seguridad Web - Fundación Romus

## 1. OWASP Top 10 - Mitigación Completa

### A01: Injection (SQL, NoSQL, Command Injection)
**Riesgo:** Aunque usamos Firestore (no SQL), NoSQL injection es posible
**Solución:**
```typescript
// ✅ SEGURO: Validación + Typing
type PostQuery = {
  category?: string
  limit?: number
}

// Validar entrada antes de usarla
const validatePostQuery = (input: unknown): PostQuery => {
  if (typeof input !== 'object' || input === null) throw new Error('Invalid query')
  const { category, limit } = input as Record<string, unknown>
  
  // Solo valores permitidos
  const VALID_CATEGORIES = ['Fe', 'Comunidad', 'Educación', 'Acción Social']
  if (category && !VALID_CATEGORIES.includes(String(category))) {
    throw new Error('Invalid category')
  }
  
  return {
    category: String(category),
    limit: Math.min(Number(limit) || 10, 100) // Max 100
  }
}

// ❌ INSEGURO:
db.collection('posts').where('category', '==', req.query.category)
```

### A02: Broken Authentication
**Solución:**
```typescript
// ✅ Firebase Auth + Custom Claims
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Solo admin puede crear posts
const isAdmin = (user) => {
  return user?.customClaims?.role === 'admin'
}

// Proteger rutas
export async function middleware(request) {
  const token = request.cookies.get('__session')?.value
  
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}
```

### A03: Injection (XSS)
**Solución:**
```typescript
// ✅ Sanitizar HTML en posts
import DOMPurify from 'isomorphic-dompurify'

const sanitizeContent = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
    KEEP_CONTENT: true
  })
}

// ✅ Usar next/image para imágenes
<Image src={post.image} alt={post.title} priority />

// ❌ INSECURO:
<div dangerouslySetInnerHTML={{ __html: post.content }} />
```

### A04: Insecure Deserialization
**Solución:**
```typescript
// ✅ Validar datos con Zod
import { z } from 'zod'

const PostSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10).max(50000),
  category: z.enum(['Fe', 'Comunidad', 'Educación', 'Acción Social']),
  language: z.enum(['es', 'it', 'en']),
  authorId: z.string().uuid(),
  featuredImage: z.string().url().optional()
})

const createPost = async (data: unknown) => {
  const validated = PostSchema.parse(data) // Lanza error si es inválido
  return await db.collection('posts').add(validated)
}
```

### A05: Broken Access Control
**Solución:**
```typescript
// ✅ Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts públicos: leer sí, escribir no
    match /posts/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Usuarios: solo leer el propio perfil
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Admin: acceso total
    match /{document=**} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### A06: Vulnerable Components
**Solución:**
```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "firebase": "^10.0.0",
    "zod": "^3.22.0",
    "isomorphic-dompurify": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0"
  },
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit --fix"
  }
}
```

### A07: Authentication Bypass
**Solución:**
```typescript
// ✅ Token verification
import { getAuth } from 'firebase-admin/auth'

export async function verifyFirebaseToken(token: string) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    return decodedToken
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// ✅ API Routes protegidas
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split('Bearer ')[1]
    if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })
    
    const user = await verifyFirebaseToken(token)
    if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    
    // Procesar POST
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
```

### A08: Data Integrity Failures
**Solución:**
```typescript
// ✅ Timestamps + validación
const createPost = async (data: ValidatedPost) => {
  const now = admin.firestore.FieldValue.serverTimestamp()
  
  return await db.collection('posts').add({
    ...data,
    createdAt: now,
    updatedAt: now,
    status: 'draft', // Siempre comienza como borrador
    viewCount: 0,
    version: 1 // Control de versiones
  })
}
```

### A09: Logging & Monitoring
**Solución:**
```typescript
// ✅ Registrar eventos sensibles
import * as admin from 'firebase-admin'

const logSecurityEvent = async (event: {
  userId: string
  action: string
  resource: string
  timestamp: Date
  ipAddress: string
}) => {
  await db.collection('security_logs').add({
    ...event,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })
}

// Uso:
await logSecurityEvent({
  userId: user.uid,
  action: 'POST_CREATE',
  resource: 'posts',
  timestamp: new Date(),
  ipAddress: request.ip || 'unknown'
})
```

### A10: SSRF (Server-Side Request Forgery)
**Solución:**
```typescript
// ✅ Validar URLs antes de usarlas
const isValidImageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    const ALLOWED_DOMAINS = [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'your-cdn.com'
    ]
    return ALLOWED_DOMAINS.some(domain => parsed.hostname.includes(domain))
  } catch {
    return false
  }
}
```

---

## 2. Headers de Seguridad HTTP

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: firebasestorage.googleapis.com;
      font-src 'self' data:;
      connect-src 'self' firestore.googleapis.com identitytoolkit.googleapis.com cpbjr.github.io calapi.inadiutorium.cz;
      frame-ancestors 'self';
      base-uri 'self';
      form-action 'self';
    `
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=(), microphone=(), camera=()'
  }
]

module.exports = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  }
}
```

---

## 3. Configuración Segura de Variables de Entorno

```env
# .env.local (NUNCA commitar)
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_ADMIN_SDK_KEY=xxx (servidor solo)

# CORS
NEXT_PUBLIC_API_URL=https://fundacionromus.org

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

---

## 4. Rate Limiting & DDoS Protection

```typescript
// lib/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '15 min'),
})

// Uso en API Route:
export async function POST(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  // Procesar...
}
```

---

## 5. Integración Segura de APIs Externas

### Catholic Readings API
```typescript
// lib/catholicApi.ts
import { z } from 'zod'

const CatholicReadingSchema = z.object({
  date: z.string().date(),
  readings: z.array(z.string()),
  gospel: z.string(),
  psalm: z.string()
})

export const getCatholicReading = async (date: string) => {
  try {
    // Validar fecha
    new Date(date).toISOString()
    
    const response = await fetch(
      `https://api.catholicreading.com/readings/${date}`,
      {
        headers: { 'User-Agent': 'FundacionRomus/1.0' },
        signal: AbortSignal.timeout(5000) // Timeout
      }
    )
    
    if (!response.ok) throw new Error('API error')
    
    const data = await response.json()
    return CatholicReadingSchema.parse(data) // Validar
  } catch (error) {
    console.error('Catholic API error:', error)
    return null
  }
}
```

### Church Calendar API
```typescript
// lib/calendarApi.ts
const CalendarEventSchema = z.object({
  date: z.string(),
  name: z.string(),
  rank: z.string(),
  color: z.string()
})

export const getLiturgicalCalendar = async (year: number) => {
  try {
    if (year < 1970 || year > 9999) throw new Error('Invalid year')
    
    const response = await fetch(
      `http://calapi.inadiutorium.cz/api/v0/en/calendars/general/${year}`,
      { signal: AbortSignal.timeout(5000) }
    )
    
    if (!response.ok) throw new Error('Calendar API error')
    
    const data = await response.json()
    // Validar cada evento
    return z.array(CalendarEventSchema).parse(data.days || [])
  } catch (error) {
    console.error('Calendar API error:', error)
    return []
  }
}
```

---

## 6. Checklist de Implementación Segura

### Fase 1: Base (Semana 1)
- [ ] Configurar Firebase Security Rules
- [ ] Implementar Zod para validación
- [ ] Agregar headers de seguridad
- [ ] Configurar CORS correctamente
- [ ] Proteger variables de entorno

### Fase 2: Autenticación (Semana 1-2)
- [ ] Firebase Authentication setup
- [ ] Custom claims para roles (admin)
- [ ] JWT token verification
- [ ] Protected API routes
- [ ] Login/Logout secure

### Fase 3: APIs & Data (Semana 2)
- [ ] Integrar Catholic Readings API (validada)
- [ ] Integrar Church Calendar API (validada)
- [ ] Sanitizar todo HTML user-generated
- [ ] Rate limiting en APIs
- [ ] Input validation en todas partes

### Fase 4: Monitoreo (Semana 2-3)
- [ ] Security logging
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Audit logs en Firestore
- [ ] Alertas de actividad sospechosa

### Fase 5: Testing (Semana 3)
- [ ] Pruebas de inyección
- [ ] XSS testing
- [ ] CSRF testing
- [ ] Pen testing básico
- [ ] Validar Security Headers

### Fase 6: Deploy Seguro (Semana 3-4)
- [ ] HTTPS con TLS 1.3
- [ ] Certificados válidos
- [ ] Firewall (Cloudflare)
- [ ] DDoS protection
- [ ] Backup automáticos

---

## 7. Herramientas de Testing Seguridad

```bash
# Auditar dependencias
npm audit
npm audit --fix

# Testing de seguridad
npm install --save-dev snyk
snyk test

# OWASP ZAP
# Descargar desde: https://www.zaproxy.org/

# Security headers check
# https://securityheaders.com/
# https://ssl-labs.com/ssltest/
```

---

## 8. Incident Response Plan

1. **Detectar:** Security logs + monitoring
2. **Contener:** Desactivar acceso comprometido
3. **Investigar:** Revisar logs, auditoría
4. **Remediar:** Parchear vulnerabilidad
5. **Recuperar:** Restaurar desde backup
6. **Aprender:** Post-mortem y mejoras

---

## Referencias OWASP
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
