import { removeSheetRows } from '@/utils/sheets'
import { NextRequest } from 'next/server'

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
      message:
        'Can not retrieve any data in this sheet name. Make sure to give access to the service account and double check the "spreadsheet_id", "sheet_name" param and body "rows".',
      deleted_rows: 0,
    },
    {
      status: 400,
    }
  )
}
