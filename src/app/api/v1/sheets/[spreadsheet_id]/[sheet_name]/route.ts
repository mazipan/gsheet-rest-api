import { getDataBySheetName } from '@/utils/sheets';

export async function GET(
  _request: Request,
  { params }: { params: { spreadsheet_id: string; sheet_name: string } }
) {
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

  const res = await getDataBySheetName(spreadsheet_id, sheet_name);

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
