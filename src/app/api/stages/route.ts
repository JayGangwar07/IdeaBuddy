import { NextRequest, NextResponse } from 'next/server'
import Stage from '@/models/stage.js'
import dbConnect from '@/utils/db'

export async function GET(request: NextRequest) {
  try {
    // 1. Establish Database Connection
    await dbConnect()

    // 2. Extract projectId from URL search parameters
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      // If projectId is missing, return a 400 Bad Request error
      return NextResponse.json(
        { message: 'Missing projectId query parameter' },
        { status: 400 }
      )
    }

    // 3. Query the Database
    // We use .lean() for faster query results when you only need plain JSON objects.
    const stages = await Stage.find({ projectId })

    console.log(stages)

    // 4. Return Success Response
    // The data is automatically serialized to JSON by NextResponse.json
    return NextResponse.json(stages, { status: 200 })

  } catch (error) {
    console.error('API Error fetching stages:', error)

    // 5. Return Internal Server Error on failure
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    )
  }
}
