import { getAllFileList } from '@/utils/sheets'
import { headers } from 'next/headers'

export async function GET() {
  const headersList = await headers()
  const apiKey = headersList.get('x-api-key')

  if (!apiKey || apiKey !== process.env.API_KEY) {
    console.warn(`'Header x-api-key: "${apiKey}" is not valid!'`)
    return Response.json(
      {
        message: `'Header x-api-key: "${apiKey}" is not valid!'`,
        data: [],
      },
      {
        status: 401,
      }
    )
  }

  const res = await getAllFileList()

  if (res && res.length > 0) {
    return Response.json({
      data: res,
    })
  } else {
    return Response.json(
      {
        message:
          'Can not retrieve any files. Make sure to give access to the service account.',
        data: [],
      },
      {
        status: 400,
      }
    )
  }
}
