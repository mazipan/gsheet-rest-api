/**
 * Credits to:
 * - https://github.com/melalj
 *
 * Most of the code in this file are coming from
 * https://github.com/melalj/gsheet-api/blob/master/src/api/gsheet.js
 *
 * Refine the typing to have better intellisense
 * Fix some deprecated parameter when passing to newer "sheets_v4" api
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { google, type sheets_v4 } from 'googleapis'
import { detectValues, numberToLetter } from './utils'

// :oad the environment variable with our keys
const keysEnvVar = process.env.GOOGLE_CREDENTIALS as string
if (!keysEnvVar) {
  throw new Error('The $GOOGLE_CREDENTIALS environment variable was not found!')
}

const env = JSON.parse(keysEnvVar)

const auth = new google.auth.JWT({
  email: env.client_email,
  key: env.private_key,
  scopes: ['https://www.googleapis.com/auth/drive'],
})

const drive = google.drive({ version: 'v3', auth })
const sheets = google.sheets({ version: 'v4', auth })

export type FileData = {
  id: string
  name: string
  /**
   * @sample: In format "2025-02-03T08:58:19.749Z"
   */
  modifiedTime: string
}

export type GetSpreadsheetOptions = {
  limit?: number
  nextToken?: string
}

export async function getAllFileList(
  options: GetSpreadsheetOptions = { limit: 10, nextToken: '' }
): Promise<{
  next_token: string
  data: FileData[] | null
}> {
  try {
    const driveRes = await drive.files.list({
      q: "trashed = false and mimeType = 'application/vnd.google-apps.spreadsheet'",
      fields: 'files(id, name, modifiedTime)',
      spaces: 'drive',
      pageSize: options.limit,
      pageToken: options.nextToken ? undefined : options.nextToken,
    })

    return {
      next_token: driveRes.data.nextPageToken || '',
      data: (driveRes.data.files || []) as FileData[],
    }
  } catch (e) {
    console.error('Got error when invoke getAllFileList', e)
    return {
      next_token: '',
      data: null,
    }
  }
}

export type GetSheetsBySpreadsheetIdResponse = {
  title: string
  index: number
  sheetId: number
  rowCount: number
  columnCount: number
}

export async function getSheetsBySpreadsheetId(
  spreadsheetId: string
): Promise<GetSheetsBySpreadsheetIdResponse[] | null> {
  try {
    const sheetRes = await sheets.spreadsheets.get({
      spreadsheetId,
    })

    if (sheetRes && sheetRes.data && sheetRes.data.sheets) {
      const output = sheetRes.data.sheets.map(
        (d) =>
          ({
            title: d?.properties?.title,
            index: d?.properties?.index,
            sheetId: d?.properties?.sheetId,
            rowCount: d?.properties?.gridProperties?.rowCount,
            columnCount: d?.properties?.gridProperties?.columnCount,
          }) as GetSheetsBySpreadsheetIdResponse
      )

      return output
    } else {
      console.warn('Got empty result when invoke getSheetsBySpreadsheetId')
      return null
    }
  } catch (e) {
    console.error('Got error when invoke getSheetsBySpreadsheetId', e)
    return null
  }
}

export type DataBySheetIdOptions = {
  offset?: number
  limit?: number
  columnCount?: number
}

export type SheetColumn = {
  title: string
  cell: string
}

export type SheetPagination = {
  limit: number
  cell_range: string
  offset: number
  next_offset: number
  total: number
  hasNext: boolean
}

export type GetDataBySheetNameResponse = {
  columns: SheetColumn[]
  pagination: SheetPagination
  data: Record<string, string | boolean | number>[]
}

export async function getDataBySheetName(
  spreadsheetId: string,
  sheetName: string,
  options: DataBySheetIdOptions = { offset: 2, limit: 100, columnCount: 10 }
): Promise<GetDataBySheetNameResponse | null> {
  try {
    const offset = options?.offset || 2
    const limit = options?.limit || 100
    const columnCount = options?.columnCount || 10

    const firstRow = offset
    const lastRow = offset + limit - 1

    const maxColumn = columnCount ? numberToLetter(Number(columnCount)) : 'EE'

    const headerRange = `${sheetName}!A1:${maxColumn}1`
    const countRange = `${sheetName}!A2:A`
    const paginatedRange = `${sheetName}!A${firstRow}:${maxColumn}${lastRow}`

    const sheetRes = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: [headerRange, countRange, paginatedRange],
    })

    if (sheetRes && sheetRes.data && sheetRes.data.valueRanges) {
      const headerRow = sheetRes.data.valueRanges?.[0]?.values?.[0] || []
      const total = (sheetRes.data.valueRanges[1].values || []).length
      const rows = sheetRes.data.valueRanges[2].values || []

      const columns: SheetColumn[] = []

      headerRow.forEach((columnName, columnIndex) => {
        columns.push({
          title: columnName,
          cell: `${sheetName}!${numberToLetter(columnIndex + 1)}`,
        })
      })

      const data = []
      for (let i = 0; i < rows.length; i += 1) {
        const row = {}
        let validValuesCount = 0
        // @ts-ignore
        row._row = firstRow + i
        headerRow.forEach((columnName, columnIndex) => {
          // @ts-ignore
          row[columnName] = detectValues(rows[i][columnIndex])

          // @ts-ignore
          if (row[columnName]) validValuesCount += 1
        })

        if (validValuesCount) data.push(row)
      }

      const pagination: SheetPagination = {
        limit,
        cell_range: paginatedRange,
        offset,
        next_offset: offset + limit,
        total,
        hasNext: total > offset + limit,
      }

      return { columns, pagination, data } as GetDataBySheetNameResponse
    } else {
      console.warn('Got empty result when invoke getDataBySheetId')
      return null
    }
  } catch (e) {
    console.error('Got error when invoke getDataBySheetName', e)
    return null
  }
}

export async function removeSheetRows(
  spreadsheetId: string,
  sheetName: string,
  rows: string[]
) {
  try {
    // Get sheetId
    const sheetRes = await sheets.spreadsheets.get({
      spreadsheetId,
    })

    if (!sheetRes || !sheetRes.data || !sheetRes.data.sheets) return null

    const sheetInfo = sheetRes.data.sheets.find(
      (d) => d?.properties?.title === sheetName
    )

    if (!sheetInfo) return null

    const sheetId = sheetInfo.properties?.sheetId

    // Build requests (we should delete from the bottom to top)
    const rowNumbers = rows.map((d) => Number(d))
    rowNumbers.sort((a, b) => b - a)

    const requests: sheets_v4.Schema$Request[] = []
    rowNumbers.forEach((endIndex: number) => {
      const deleteDimension = {
        range: {
          sheetId,
          dimension: 'ROWS',
          startIndex: endIndex - 1,
          endIndex,
        },
      } as sheets_v4.Schema$DeleteDimensionRequest

      requests.push({
        deleteDimension,
      } as sheets_v4.Schema$Request)
    })

    // Batch Delete
    const updatedSheet = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests,
      },
    })

    return { deleted_rows: updatedSheet?.data?.replies?.length || 0 }
  } catch (e) {
    console.error('Got error when invoke removeSheetRows', e)
    return { deleted_rows: 0 }
  }
}

export type UpdateSheetOptions = {
  columnCount?: number
  valueInputOption?: 'USER_ENTERED' | 'RAW'
}

// Sample Body: { "4" : { "email": "john@appleseed.com" }, "1": { "phone": "415-500-7000" } }
export async function updateSheetRow(
  spreadsheetId: string,
  sheetName: string,
  bodyData: Record<string, Record<string, unknown>>,
  options: UpdateSheetOptions = {
    valueInputOption: 'USER_ENTERED',
    columnCount: 10,
  }
): Promise<sheets_v4.Schema$UpdateValuesResponse | null> {
  try {
    const columnCount = options?.columnCount || 10
    const maxColumn = columnCount ? numberToLetter(Number(columnCount)) : 'EE'

    const headerRange = `${sheetName}!A1:${maxColumn}1`
    const sheetRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: headerRange,
    })

    if (
      sheetRes &&
      sheetRes.data &&
      sheetRes.data.values &&
      sheetRes.data.values.length > 0
    ) {
      const headerRow = sheetRes.data.values[0]
      const data: sheets_v4.Schema$ValueRange[] = []

      // Existing columns
      const columns: Record<string, unknown> = {}
      headerRow.forEach((columnName, columnIndex) => {
        columns[columnName] = `${sheetName}!${numberToLetter(columnIndex + 1)}`
      })

      // Build data to update
      Object.keys(bodyData).forEach((rowNumber) => {
        const body = bodyData[rowNumber]

        // New columns
        let newColCount = 0
        Object.keys(body).forEach((k) => {
          if (!columns[k]) {
            newColCount += 1
            columns[k] = `${sheetName}!${numberToLetter(
              headerRow.length + newColCount
            )}`
            data.push({
              range: `${columns[k]}1`,
              values: [[k]],
            })
          }
        })

        // ValueRange
        Object.keys(body).forEach((columnName) => {
          data.push({
            range: `${columns[columnName]}${rowNumber}`,
            values: [[body[columnName]]],
          })
        })
      })

      // Batch Update
      const updatedSheet = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: options.valueInputOption || 'USER_ENTERED',
          data,
        },
      })

      return updatedSheet.data
        .responses as sheets_v4.Schema$UpdateValuesResponse
    }

    return null
  } catch (e) {
    console.error('Got error when invoke updateSheetRow', e)
    return null
  }
}

// Sample Body: [{ "name": "Jean", "email": "jean@appleseed.com" }, { "name": "Bunny", "email": "bunny@appleseed.com" }]
export async function appendSheetRow(
  spreadsheetId: string,
  sheetName: string,
  bodyData: Record<string, unknown>[],
  options: UpdateSheetOptions = {
    valueInputOption: 'USER_ENTERED',
    columnCount: 10,
  }
): Promise<sheets_v4.Schema$UpdateValuesResponse | null> {
  try {
    const columnCount = options?.columnCount || 10
    const maxColumn = columnCount ? numberToLetter(Number(columnCount)) : 'EE'

    const defaultRange = `${sheetName}!A:${maxColumn}`
    const sheetRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: defaultRange,
    })

    if (
      sheetRes &&
      sheetRes.data &&
      sheetRes.data.values &&
      sheetRes.data.values.length > 0
    ) {
      const rows = sheetRes.data.values

      // Existing columns
      const columns: Record<string, unknown> = {}
      const columnList = (rows ? rows[0] : []).slice()
      columnList.forEach((columnName, columnIndex) => {
        columns[columnName] = `${sheetName}!${numberToLetter(columnIndex + 1)}`
      })

      // Check if there's new columns
      let newColCount = 0

      const data: sheets_v4.Schema$ValueRange[] = []
      bodyData.forEach((body) => {
        Object.keys(body).forEach((k) => {
          if (!columns[k]) {
            newColCount += 1
            columns[k] = `${sheetName}!${numberToLetter(columnList.length + 1)}`
            columnList.push(k)
            data.push({
              range: `${columns[k]}1`,
              values: [[k]],
            })
          }
        })
      })

      if (newColCount) {
        await sheets.spreadsheets.values.batchUpdate({
          spreadsheetId,
          requestBody: {
            valueInputOption: options.valueInputOption || 'USER_ENTERED',
            data,
          },
        })
      }

      const values = bodyData.map((r) => columnList.map((c) => r[c] || ''))

      // Append
      const appendedSheet = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: defaultRange,
        valueInputOption: options.valueInputOption || 'USER_ENTERED',
        includeValuesInResponse: true,
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values,
        },
      })

      return appendedSheet?.data?.updates || null
    }

    return null
  } catch (e) {
    console.error('Got error when invoke appendSheetRow', e)
    return null
  }
}

export async function getSheetDataByRows(
  spreadsheetId: string,
  sheetName: string,
  rowNumber: string,
  options = { columnCount: 10 }
) {
  try {
    const columnCount = options?.columnCount || 10
    const maxColumn = columnCount ? numberToLetter(Number(columnCount)) : 'EE'

    const headerRange = `${sheetName}!A1:${maxColumn}1`
    const dataRange = `${sheetName}!A${rowNumber}:${maxColumn}${rowNumber}`

    const sheetRes = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: [headerRange, dataRange],
    })

    if (sheetRes && sheetRes.data && sheetRes.data.valueRanges) {
      const headerRow = sheetRes.data.valueRanges?.[0]?.values?.[0] || []

      const rows = sheetRes.data.valueRanges[1].values

      const row: Record<string, unknown> = {
        _row: Number(rowNumber),
      }

      headerRow.forEach((columnName: string, columnIndex) => {
        const val = detectValues(rows?.[0]?.[columnIndex])
        if (val) {
          row[columnName] = val
        }
      })

      return { data: row }
    }

    return null
  } catch (e) {
    console.error('Got error when invoke getSheetDataByRows', e)
    return null
  }
}
