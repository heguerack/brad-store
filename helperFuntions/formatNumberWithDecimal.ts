export const formatNumberWithDecimal = (number: string): string => {
  //string becasue prisma return a string really
  const [int, decimal] = number.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}
