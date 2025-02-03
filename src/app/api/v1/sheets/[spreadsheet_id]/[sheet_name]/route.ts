import { getDataBySheetName } from '@/utils/sheets';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { spreadsheet_id: string; sheet_name: string } }
) {
  const searchParams = request.nextUrl.searchParams
  const offset = searchParams.get('offset')
  const perPage = searchParams.get('per_page')
  const columnCount = searchParams.get('column_count')

  const { spreadsheet_id, sheet_name } = await params;

  if (!spreadsheet_id || !sheet_name) {
    return Response.json({
      message: 'Parameter "spreadsheet_id" and "sheet_name" are required!',
      columns: null,
      pagination: null,
      data: [],
    }, {
      status: 400
    })
  }

  const res = await getDataBySheetName(spreadsheet_id, sheet_name, {
    offset: offset ? parseInt(offset, 10) : 2,
    perPage: perPage ? parseInt(perPage, 10) : 100,
    columnCount: columnCount ? parseInt(columnCount, 10) : 10,
  });

  if (res) {
    return Response.json(res);
  }

  return Response.json({
    message: 'Can not retrieve any data in this sheet name. Make sure to give access to the service account and double check the "spreadsheet_id" and "sheet_name" param.',
    columns: null,
    pagination: null,
    data: [],
  }, {
    status: 400
  });
}
