import { getSheetDataByRows, removeSheetRows } from '@/utils/sheets'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      spreadsheet_id: string
      sheet_name: string
      rows: string
    }>
  }
) {
  const headersList = await headers()
  const apiKey = headersList.get('X-Api-Key')

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return Response.json(
      {
        message: 'Header X-Api-Key is not valid!',
        data: null,
      },
      {
        status: 401,
      }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const columnCount = searchParams.get('column_count')

  const { spreadsheet_id, sheet_name, rows } = await params

  if (!spreadsheet_id || !sheet_name || !rows) {
    return Response.json(
      {
        message:
          'Parameter "spreadsheet_id", "sheet_name" and "row" are required!',
        data: null,
      },
      {
        status: 400,
      }
    )
  }

  const res = await getSheetDataByRows(spreadsheet_id, sheet_name, rows, {
    columnCount: columnCount ? parseInt(columnCount, 10) : 10,
  })

  if (res) {
    return Response.json(res)
  }

  return Response.json(
    {
      message:
        'Can not retrieve any data in this sheet name. Make sure to give access to the service account and double check the "spreadsheet_id", "sheet_name" and "row" param.',
      data: null,
    },
    {
      status: 400,
    }
  )
}

export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      spreadsheet_id: string
      sheet_name: string
      rows: string
    }>
  }
) {
  const headersList = await headers()
  const apiKey = headersList.get('X-Api-Key')

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return Response.json(
      {
        message: 'Header X-Api-Key is not valid!',
        data: [],
      },
      {
        status: 401,
      }
    )
  }

  const { spreadsheet_id, sheet_name, rows } = await params
  const deletedRows = (rows || '').split(',')

  if (!spreadsheet_id || !sheet_name) {
    return Response.json(
      {
        message: 'Parameter "spreadsheet_id" and "sheet_name" are required!',
        deleted_rows: 0,
      },
      {
        status: 400,
      }
    )
  }

  if (deletedRows.length === 0) {
    return Response.json(
      {
        message: 'Require body parameter "rows"!',
        deleted_rows: 0,
      },
      {
        status: 400,
      }
    )
  }

  const res = await removeSheetRows(spreadsheet_id, sheet_name, deletedRows)

  if (res) {
    return Response.json(res)
  }

  return Response.json(
    {
      message: 'Failed delete rows.',
      deleted_rows: 0,
    },
    {
      status: 400,
    }
  )
}
