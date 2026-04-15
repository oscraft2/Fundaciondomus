import { NextRequest, NextResponse } from 'next/server'
import { safeParse, ContactFormSchema } from '@/lib/schemas'
import { db, logSecurityEvent } from '@/lib/firebase'
import { rateLimiter } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'

    if (!rateLimiter.isAllowed(ip, 5, 3600000)) {
      await logSecurityEvent({
        action: 'CONTACT_SPAM',
        resource: 'contact_form',
        status: 'failure',
        ipAddress: ip,
        details: { reason: 'rate_limit_exceeded' }
      })

      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()

    const validationResult = safeParse(ContactFormSchema, body)

    if (!validationResult.success) {
      await logSecurityEvent({
        action: 'CONTACT_INVALID',
        resource: 'contact_form',
        status: 'failure',
        ipAddress: ip,
        details: { errors: validationResult.error }
      })

      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error },
        { status: 400 }
      )
    }

    const { name, email, subject, message, language = 'es' } = validationResult.data

    // Additional security checks
    if (message.includes('http') || message.includes('script')) {
      await logSecurityEvent({
        action: 'CONTACT_SUSPICIOUS',
        resource: 'contact_form',
        status: 'failure',
        ipAddress: ip,
        details: { reason: 'suspicious_content' }
      })

      return NextResponse.json(
        { error: 'Message contains invalid content' },
        { status: 400 }
      )
    }

    // Save to Firestore
    try {
      const docRef = await db.collection('contact_submissions').add({
        name,
        email,
        subject,
        message,
        language,
        createdAt: new Date(),
        ipAddress: ip,
        userAgent: request.headers.get('user-agent'),
        read: false
      })

      // Log successful submission
      await logSecurityEvent({
        action: 'CONTACT_SUBMIT',
        resource: 'contact_form',
        status: 'success',
        ipAddress: ip,
        details: { docId: docRef.id, email }
      })

      // TODO: Send confirmation email to user
      // TODO: Send notification to admin

      return NextResponse.json(
        { success: true, message: 'Thank you for your message!' },
        { status: 200 }
      )
    } catch (dbError) {
      console.error('Database error:', dbError)

      await logSecurityEvent({
        action: 'CONTACT_DB_ERROR',
        resource: 'contact_form',
        status: 'failure',
        ipAddress: ip,
        details: { error: String(dbError) }
      })

      return NextResponse.json(
        { error: 'Failed to save message. Please try again later.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact API error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
