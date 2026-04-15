import { z } from 'zod'

// Schema for liturgical calendar events
const LiturgicalEventSchema = z.object({
  date: z.string().date().optional(),
  day: z.string().optional(),
  title: z.string(),
  rank: z.string().optional(),
  color: z.string().optional(),
  type: z.string().optional(),
  id: z.string().optional(),
})

const LiturgicalDaySchema = z.object({
  date: z.string(),
  weekday: z.string().optional(),
  season: z.string().optional(),
  weekNumber: z.number().optional(),
  celebrations: z.array(LiturgicalEventSchema).optional(),
  information: z.string().optional(),
  cycle: z.object({
    A: z.boolean().optional(),
    B: z.boolean().optional(),
    C: z.boolean().optional(),
    weekOfYear: z.number().optional(),
  }).optional(),
})

export type LiturgicalEvent = z.infer<typeof LiturgicalEventSchema>
export type LiturgicalDay = z.infer<typeof LiturgicalDaySchema>

// Get liturgical calendar for a specific date
export const getLiturgicalDay = async (date: string): Promise<LiturgicalDay | null> => {
  try {
    // Validate date format
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date format')
    }

    // Fetch with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(
      `http://calapi.inadiutorium.cz/api/v0/en/calendars/general/${date}`,
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
      console.error(`Liturgical Calendar API error: ${response.status}`)
      return null
    }

    const data = await response.json()

    // Validate data
    const validated = LiturgicalDaySchema.safeParse(data)

    if (!validated.success) {
      console.error('Invalid liturgical day data:', validated.error)
      return null
    }

    return validated.data
  } catch (error) {
    console.error('Error fetching liturgical day:', error)
    return null
  }
}

// Get liturgical calendar for entire month
export const getLiturgicalMonth = async (year: number, month: number): Promise<LiturgicalDay[]> => {
  try {
    // Validate year and month
    if (year < 1970 || year > 9999) {
      throw new Error('Invalid year')
    }
    if (month < 1 || month > 12) {
      throw new Error('Invalid month')
    }

    const days: LiturgicalDay[] = []
    const daysInMonth = new Date(year, month, 0).getDate()

    // Fetch each day (with rate limiting)
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const liturgicalDay = await getLiturgicalDay(dateStr)

      if (liturgicalDay) {
        days.push(liturgicalDay)
      }

      // Rate limiting: 100ms delay between requests
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return days
  } catch (error) {
    console.error('Error fetching liturgical month:', error)
    return []
  }
}

// Get liturgical calendar for entire year
export const getLiturgicalYear = async (year: number): Promise<Map<number, LiturgicalDay[]>> => {
  try {
    if (year < 1970 || year > 9999) {
      throw new Error('Invalid year')
    }

    const monthsData = new Map<number, LiturgicalDay[]>()

    // Fetch all 12 months (with rate limiting)
    for (let month = 1; month <= 12; month++) {
      const monthDays = await getLiturgicalMonth(year, month)
      monthsData.set(month, monthDays)

      // Delay between months
      if (month < 12) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    return monthsData
  } catch (error) {
    console.error('Error fetching liturgical year:', error)
    return new Map()
  }
}

// Get upcoming celebrations/feast days
export const getUpcomingCelebrations = async (days: number = 30): Promise<LiturgicalDay[]> => {
  try {
    const celebrations: LiturgicalDay[] = []
    const today = new Date()

    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)

      const dateStr = date.toISOString().split('T')[0]
      const liturgicalDay = await getLiturgicalDay(dateStr)

      if (
        liturgicalDay &&
        liturgicalDay.celebrations &&
        liturgicalDay.celebrations.length > 0
      ) {
        celebrations.push(liturgicalDay)
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return celebrations
  } catch (error) {
    console.error('Error getting upcoming celebrations:', error)
    return []
  }
}

// Cache for calendar data
const calendarCache = new Map<string, { data: LiturgicalDay | null; expires: number }>()

export const getLiturgicalDayCached = async (
  date: string,
  cacheTTL = 86400000 // 24 hours in milliseconds
): Promise<LiturgicalDay | null> => {
  // Check cache
  const cached = calendarCache.get(date)
  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  // Fetch fresh data
  const data = await getLiturgicalDay(date)

  // Store in cache
  calendarCache.set(date, {
    data,
    expires: Date.now() + cacheTTL
  })

  return data
}

// Cleanup old cache entries
export const cleanupCalendarCache = () => {
  const now = Date.now()
  for (const [key, value] of calendarCache.entries()) {
    if (value.expires < now) {
      calendarCache.delete(key)
    }
  }
}

// Run cleanup periodically
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupCalendarCache, 3600000) // Every hour
}
