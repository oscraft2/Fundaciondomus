import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

// Initialize Firebase Admin SDK (Server-side only)
let firebaseApp = getApps()[0]

if (!firebaseApp) {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(
        process.env.FIREBASE_ADMIN_SDK_KEY || '{}',
        'base64'
      ).toString()
    )

    firebaseApp = initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    })
  } catch (error) {
    console.error('Firebase initialization error:', error)
  }
}

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

// Security utility functions
export const verifyFirebaseToken = async (token: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(token)
    return {
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
      customClaims: decodedToken.customClaims || {}
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return {
      success: false,
      uid: null,
      email: null,
      customClaims: {}
    }
  }
}

// Get user role
export const getUserRole = async (uid: string) => {
  try {
    const user = await auth.getUser(uid)
    return user.customClaims?.role || 'viewer'
  } catch (error) {
    console.error('Error getting user role:', error)
    return 'viewer'
  }
}

// Set user role (admin only)
export const setUserRole = async (uid: string, role: 'admin' | 'editor' | 'viewer') => {
  try {
    await auth.setCustomUserClaims(uid, { role })
    return { success: true }
  } catch (error) {
    console.error('Error setting user role:', error)
    return { success: false, error }
  }
}

// Log security event
export const logSecurityEvent = async (event: {
  userId?: string
  action: string
  resource: string
  status: 'success' | 'failure'
  ipAddress?: string
  userAgent?: string
  details?: Record<string, any>
}) => {
  try {
    await db.collection('security_logs').add({
      ...event,
      timestamp: new Date(),
      createdAt: new Date()
    })
  } catch (error) {
    console.error('Error logging security event:', error)
  }
}
