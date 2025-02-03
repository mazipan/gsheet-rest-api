import { getSheetsBySpreadsheetId } from '@/utils/sheets';

export async function GET(
  _request: Request,
  { params }: { params: { spreadsheet_id: string } }
) {
  const { spreadsheet_id } = await params;

  if (!spreadsheet_id) {
    return Response.json({
      message: 'Parameter "spreadsheet_id" is required!',
      data: [],
    }, {
      status: 400
    })
  }

  const res = await getSheetsBySpreadsheetId(spreadsheet_id);

  if (res) {
    return Response.json({
      data: res,
    });
  } else {
    return Response.json({
      message: 'Can not retrieve any sheets. Make sure to give access to the service account and double check the "spreadsheet_id" param.',
      data: [],
    }, {
      status: 400
    })
  }
}
