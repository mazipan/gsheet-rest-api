import { getAllFileList } from "@/utils/sheets"

export async function GET() {
  const res = await getAllFileList()

  if (res && res.length > 0) {
    return Response.json({
      data: res,
    });
  } else {
    return Response.json({
      message: 'Can not retrieve any files. Make sure to give access to the service account.',
      data: [],
    }, {
      status: 400
    })
  }
}