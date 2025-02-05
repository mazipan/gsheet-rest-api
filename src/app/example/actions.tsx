'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

const SPREADSHEET_ID = '1OPctiEOSqDXEW040kGEVzDc8crA6Da7Gb36ukAdNjkE'
const SHEET_NAME = 'Sheet1'

export async function markAsDone(
  _previousState: boolean,
  formData: FormData
): Promise<boolean> {
  const apiUrl = `${process.env.BASE_URL}/api/v1/sheets/${SPREADSHEET_ID}/${SHEET_NAME}`

  const row = formData.get('row')

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY || '',
    },
    body: JSON.stringify({
      [row as string]: {
        STATUS: 'TRUE',
      },
    }),
  })

  await res.json()

  revalidatePath('/example')
  revalidateTag('todos')
  return true
}

export async function addNewTodo(
  _previousState: boolean,
  formData: FormData
): Promise<boolean> {
  const apiUrl = `${process.env.BASE_URL}/api/v1/sheets/${SPREADSHEET_ID}/${SHEET_NAME}`

  const activity = formData.get('activity')

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY || '',
    },
    body: JSON.stringify({
      data: [
        {
          ACTIVITY: activity,
          STATUS: 'FALSE',
        },
      ],
    }),
  })

  await res.json()

  revalidatePath('/example')
  revalidateTag('todos')
  redirect('/example')
}

export async function removeTodo(
  _previousState: boolean,
  formData: FormData
): Promise<boolean> {
  const row = formData.get('row')

  const apiUrl = `${process.env.BASE_URL}/api/v1/sheets/${SPREADSHEET_ID}/${SHEET_NAME}/${row}`

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY || '',
    },
  })

  await res.json()

  revalidatePath('/example')
  revalidateTag('todos')

  return true
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function refreshCache(__previousState: boolean): Promise<boolean> {
  await delay(500)
  revalidatePath('/example')
  revalidateTag('todos')

  return true
}
