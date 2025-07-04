export function formattUUID(id: string) {
  const sortentedString = `..${id.substring(id.length - 6)}` // so what substring does, it take one argument, and shorten the struing from that moment to the end. like here we minus 6 to the length, so it goe s from total -6 to final, which ius 6 digits really
  console.log('sortentedString :', sortentedString)

  return sortentedString
}
