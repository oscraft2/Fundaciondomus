import DOMPurify from 'isomorphic-dompurify'

// Sanitize HTML content to prevent XSS
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'del', 'code', 'pre',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img', 'figure', 'figcaption',
      'blockquote', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    FORCE_BODY: true,
  })
}

// Sanitize plain text input
export const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 5000) // Limit length
}

// Validate image URL is from allowed domains
export const isValidImageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)

    const ALLOWED_DOMAINS = [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'images.pexels.com'
    ]

    return ALLOWED_DOMAINS.some(domain =>
      parsed.hostname.includes(domain)
    ) || parsed.protocol === 'data:'
  } catch {
    return false
  }
}

// Rate limiting helper
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()

  isAllowed(key: string, limit: number = 100, windowMs: number = 900000): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []

    // Remove old attempts
    const recentAttempts = attempts.filter(time => now - time < windowMs)

    if (recentAttempts.length >= limit) {
      return false
    }

    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)

    return true
  }

  reset(key: string) {
    this.attempts.delete(key)
  }
}

export const rateLimiter = new RateLimiter()

// Secure password validation
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters
  // At least one uppercase letter
  // At least one lowercase letter
  // At least one number
  // At least one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  return regex.test(password)
}

// Escape HTML entities
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return text.replace(/[&<>"']/g, char => map[char])
}

// Generate secure random token
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''

  if (typeof window === 'undefined') {
    // Node.js - use crypto
    const crypto = require('crypto')
    token = crypto.randomBytes(length).toString('hex')
  } else {
    // Browser - use crypto API
    const arr = new Uint8Array(length)
    crypto.getRandomValues(arr)
    token = Array.from(arr, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  return token
}

// Validate email
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email) && email.length <= 254
}

// CSRF token management
let csrfToken: string | null = null

export const getCsrfToken = (): string => {
  if (!csrfToken) {
    csrfToken = generateSecureToken()
  }
  return csrfToken
}

export const validateCsrfToken = (token: string): boolean => {
  return token === csrfToken
}
