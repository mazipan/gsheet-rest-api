import { getSheetsBySpreadsheetId } from '@/utils/sheets'
import { headers } from 'next/headers'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ spreadsheet_id: string }> }
) {
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

  const { spreadsheet_id } = await params

  if (!spreadsheet_id) {
    return Response.json(
      {
        message: 'Parameter "spreadsheet_id" is required!',
        data: [],
      },
      {
        status: 400,
      }
    )
  }

  const res = await getSheetsBySpreadsheetId(spreadsheet_id)

  if (res) {
    return Response.json({
      data: res,
    })
  } else {
    return Response.json(
      {
        message:
          'Can not retrieve any sheets. Make sure to give access to the service account and double check the "spreadsheet_id" param.',
        data: [],
      },
      {
        status: 400,
      }
    )
  }
}
