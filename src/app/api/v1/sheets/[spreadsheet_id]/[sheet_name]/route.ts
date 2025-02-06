import {
  appendSheetRow,
  getDataBySheetName,
  updateSheetRow,
} from '@/utils/sheets'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ spreadsheet_id: string; sheet_name: string }> }
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

  const searchParams = request.nextUrl.searchParams
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const columnCount = searchParams.get('column_count')

  const { spreadsheet_id, sheet_name } = await params

  if (!spreadsheet_id || !sheet_name) {
    return Response.json(
      {
        message: 'Parameter "spreadsheet_id" and "sheet_name" are required!',
        columns: null,
        pagination: null,
        data: [],
      },
      {
        status: 400,
      }
    )
  }

  const res = await getDataBySheetName(spreadsheet_id, sheet_name, {
    offset: offset ? parseInt(offset, 10) : 2,
    limit: limit ? parseInt(limit, 10) : 100,
    columnCount: columnCount ? parseInt(columnCount, 10) : 10,
  })

  if (res) {
    return Response.json(res)
  }

  return Response.json(
    {
      message:
        'Can not retrieve any data in this sheet name. Make sure to give access to the service account and double check the "spreadsheet_id" and "sheet_name" param.',
      columns: null,
      pagination: null,
      data: [],
    },
    {
      status: 400,
    }
  )
}

// --- Update rows
export async function PUT(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ spreadsheet_id: string; sheet_name: string }> }
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

  const searchParams = request.nextUrl.searchParams

  const inputOptions = searchParams.get('input_options') || 'USER_ENTERED'
  const columnCount = searchParams.get('column_count')

  const { spreadsheet_id, sheet_name } = await params

  if (!spreadsheet_id || !sheet_name) {
    return Response.json(
      {
        message: 'Parameter "spreadsheet_id" and "sheet_name" are required!',
        data: [],
      },
      {
        status: 400,
      }
    )
  }

  const body = await request.json()

  if (!body) {
    return Response.json(
      {
        message: 'Body is required to invoke update row function!',
        data: [],
      },
      {
        status: 400,
      }
    )
  }

  const res = await updateSheetRow(spreadsheet_id, sheet_name, body, {
    columnCount: columnCount ? parseInt(columnCount, 10) : 10,
    valueInputOption: inputOptions as 'USER_ENTERED' | 'RAW',
  })

  if (res) {
    return Response.json({
      data: res,
    })
  }

  return Response.json(
    {
      message: 'Failed when update the data',
      data: [],
    },
    {
      status: 400,
    }
  )
}

// --- Append rows
export async function POST(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ spreadsheet_id: string; sheet_name: string }> }
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

  const searchParams = request.nextUrl.searchParams

  const inputOptions = searchParams.get('input_options') || 'USER_ENTERED'
  const columnCount = searchParams.get('column_count')

  const { spreadsheet_id, sheet_name } = await params

  if (!spreadsheet_id || !sheet_name) {
    return Response.json(
      {
        message: 'Parameter "spreadsheet_id" and "sheet_name" are required!',
        data: [],
      },
      {
        status: 400,
      }
    )
  }

  const body = await request.json()

  if (!body || !body.data || body.data.length === 0) {
    return Response.json(
      {
        message: 'Body "data" is required to invoke append row function!',
        data: [],
      },
      {
        status: 400,
      }
    )
  }

  const res = await appendSheetRow(spreadsheet_id, sheet_name, body.data, {
    columnCount: columnCount ? parseInt(columnCount, 10) : 10,
    valueInputOption: inputOptions as 'USER_ENTERED' | 'RAW',
  })

  if (res) {
    return Response.json({
      data: res,
    })
  }

  return Response.json(
    {
      message: 'Failed when update the data',
      data: [],
    },
    {
      status: 400,
    }
  )
}
