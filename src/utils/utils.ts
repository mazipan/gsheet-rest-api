export function numberToLetter(num: number) {
  let ret = ''
  for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ret = String.fromCharCode(parseInt((num % b) / a, 10) + 65) + ret
  }
  return ret
}

export function detectValues(val: string) {
  if (val === '') return null

  if (val === 'TRUE') return true

  if (val === 'FALSE') return false

  if (/^\d+\.\d+$/.test(val)) return parseFloat(val)

  if (/^\d+$/.test(val)) return parseInt(val, 10)

  return val
}
