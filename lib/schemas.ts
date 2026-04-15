import { z } from 'zod'

// Blog Post Schema
export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, 'Título debe tener al menos 5 caracteres').max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido').optional(),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(50).max(50000),
  category: z.enum(['Fe', 'Comunidad', 'Educación', 'Acción Social']),
  language: z.enum(['es', 'it', 'en']),
  authorId: z.string().min(1),
  authorName: z.string().min(1).max(100),
  featuredImage: z.string().url().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().optional(),
})

export type Post = z.infer<typeof PostSchema>

// Contact Form Schema
export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s]*$/, 'Solo letras y espacios permitidos'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
  language: z.enum(['es', 'it', 'en']).optional(),
})

export type ContactForm = z.infer<typeof ContactFormSchema>

// Donation Schema
export const DonationSchema = z.object({
  amount: z.number().positive().min(1).max(100000),
  currency: z.enum(['USD', 'EUR', 'MXN']).default('USD'),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  recurring: z.boolean().default(false),
  frequency: z.enum(['monthly', 'quarterly', 'yearly']).optional(),
})

export type Donation = z.infer<typeof DonationSchema>

// User/Admin Schema
export const UserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
  createdAt: z.date().optional(),
  lastLogin: z.date().optional(),
})

export type User = z.infer<typeof UserSchema>

// Query Schemas
export const PostQuerySchema = z.object({
  category: z.enum(['Fe', 'Comunidad', 'Educación', 'Acción Social']).optional(),
  language: z.enum(['es', 'it', 'en']).optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
  search: z.string().max(100).optional(),
  featured: z.boolean().optional(),
})

export type PostQuery = z.infer<typeof PostQuerySchema>

// Safe Parse Helper
export const safeParse = <T,>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data)

  if (!result.success) {
    return {
      success: false as const,
      error: result.error.flatten(),
      data: null
    }
  }

  return {
    success: true as const,
    data: result.data,
    error: null
  }
}
