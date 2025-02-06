import { getAllFileList } from '@/utils/sheets'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const headersList = await headers()
  const apiKey = headersList.get('x-api-key')

  if (!apiKey || apiKey !== process.env.API_KEY) {
    console.warn(`'Header x-api-key: "${apiKey}" is not valid!'`)
    return Response.json(
      {
        message: `'Header x-api-key: "${apiKey}" is not valid!'`,
        data: [],
        next_token: '',
      },
      {
        status: 401,
      }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const limit = searchParams.get('limit') || '10'
  const nextToken = searchParams.get('next_token') || ''

  const res = await getAllFileList({
    limit: limit ? parseInt(limit, 10) : 10,
    nextToken,
  })

  if (res) {
    return Response.json(res)
  } else {
    return Response.json(
      {
        message:
          'Can not retrieve any files. Make sure to give access to the service account.',
        data: [],
        next_token: '',
      },
      {
        status: 400,
      }
    )
  }
}
