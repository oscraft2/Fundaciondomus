import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { safeParse, PostQuerySchema, type Post } from '@/lib/schemas'

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const queryData = {
      category: searchParams.get('category'),
      language: searchParams.get('language'),
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
      search: searchParams.get('search'),
      featured: searchParams.get('featured') === 'true',
    }

    // Validate query parameters
    const validationResult = safeParse(PostQuerySchema, queryData)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validationResult.error },
        { status: 400 }
      )
    }

    const { category, language, limit, offset, search, featured } = validationResult.data

    // Build Firestore query
    let query = db.collection('posts')
      .where('status', '==', 'published')
      .orderBy('publishedAt', 'desc')

    // Apply filters
    if (category) {
      query = query.where('category', '==', category) as any
    }

    if (language) {
      query = query.where('languages', 'array-contains', language) as any
    }

    if (featured) {
      query = query.where('featured', '==', true) as any
    }

    // Execute query
    const snapshot = await query.limit(limit + 1).offset(offset).get()

    // Parse results
    const posts: Post[] = []
    snapshot.forEach(doc => {
      posts.push({
        id: doc.id,
        ...doc.data() as Omit<Post, 'id'>
      })
    })

    // Handle search filter (simple client-side search if needed)
    let filteredPosts = posts
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower)
      )
    }

    // Check if there are more results
    const hasMore = filteredPosts.length > limit
    const results = filteredPosts.slice(0, limit)

    return NextResponse.json(
      {
        success: true,
        data: results,
        pagination: {
          limit,
          offset,
          hasMore,
          total: results.length
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Posts API error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST endpoint for creating posts (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // This would be verified by middleware/Firebase Auth
    // For now, just validate the data

    const body = await request.json()

    // Validate would happen here with PostSchema
    // Then save to Firestore

    return NextResponse.json(
      { error: 'Not implemented yet' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Create post error:', error)

    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
