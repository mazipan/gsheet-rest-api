/**
 * Credits to:
 * - https://github.com/melalj
 *
 * Most of the code in this file are coming from
 * https://github.com/melalj/gsheet-api/blob/master/src/utils.js
 *
 * Adding small typings and ignore the rest
 */

const START_ASCII_A = 65 // A -> Z is 65 to 90. Read: https://www.ibm.com/docs/en/sdse/6.4.0?topic=configuration-ascii-characters-from-33-126

const MAX_LETTER = 26

export function numberToLetter(num: number) {
  let result = ''
  let x = 1
  let y = MAX_LETTER
  let left = num - x

  while (left >= 0) {
    const curr = (left % y) / x
    result = String.fromCharCode(curr + START_ASCII_A) + result

    x = y
    y *= MAX_LETTER
    left -= y
  }

  return result
}

export function detectValues(val: string) {
  if (val === '') return null
  if (val.toUpperCase() === 'TRUE') return true
  if (val.toUpperCase() === 'FALSE') return false
  if (/^\d+\.\d+$/.test(val)) return parseFloat(val)
  if (/^\d+$/.test(val)) return parseInt(val, 10)

  return val
}
