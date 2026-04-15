import { z } from 'zod'

// Schemas for validation
const CatholicReadingSchema = z.object({
  date: z.string().date().optional(),
  readings: z.array(z.string()).optional(),
  gospel: z.string().optional(),
  psalm: z.string().optional(),
  title: z.string().optional(),
  firstReading: z.string().optional(),
  secondReading: z.string().optional(),
  gospelReadings: z.array(z.string()).optional(),
})

export type CatholicReading = z.infer<typeof CatholicReadingSchema>

// Get daily Catholic reading
export const getCatholicReading = async (date?: string): Promise<CatholicReading | null> => {
  try {
    // Validate date format if provided
    if (date) {
      new Date(date).toISOString()
    }

    const queryDate = date || new Date().toISOString().split('T')[0]

    // Fetch with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(
      `https://cpbjr.github.io/catholic-readings-api/readings/${queryDate}.json`,
      {
        signal: controller.signal,
        headers: {
          'User-Agent': 'FundacionRomus/1.0',
          'Accept': 'application/json'
        }
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error(`Catholic API error: ${response.status}`)
      return null
    }

    const data = await response.json()

    // Validate data structure
    const validated = CatholicReadingSchema.safeParse(data)

    if (!validated.success) {
      console.error('Invalid Catholic reading data:', validated.error)
      return null
    }

    return validated.data
  } catch (error) {
    console.error('Error fetching Catholic reading:', error)
    return null
  }
}

// Get Catholic readings for date range
export const getCatholicReadingsBatch = async (
  dates: string[]
): Promise<Map<string, CatholicReading | null>> => {
  const results = new Map<string, CatholicReading | null>()

  // Limit to prevent abuse
  const limitedDates = dates.slice(0, 30)

  for (const date of limitedDates) {
    const reading = await getCatholicReading(date)
    results.set(date, reading)
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  return results
}

// Cache implementation (in-memory, can be upgraded to Redis)
const readingCache = new Map<string, { data: CatholicReading | null; expires: number }>()

export const getCatholicReadingCached = async (
  date?: string,
  cacheTTL = 3600000 // 1 hour in milliseconds
): Promise<CatholicReading | null> => {
  const cacheKey = date || new Date().toISOString().split('T')[0]

  // Check cache
  const cached = readingCache.get(cacheKey)
  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  // Fetch fresh data
  const data = await getCatholicReading(date)

  // Store in cache
  readingCache.set(cacheKey, {
    data,
    expires: Date.now() + cacheTTL
  })

  return data
}

// Cleanup old cache entries
export const cleanupReadingCache = () => {
  const now = Date.now()
  for (const [key, value] of readingCache.entries()) {
    if (value.expires < now) {
      readingCache.delete(key)
    }
  }
}

// Run cleanup periodically
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupReadingCache, 3600000) // Every hour
}
