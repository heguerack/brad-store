export const formatNumberWithDecimal = (value: string): string => {
  //string becasue prisma return a string really
  const [int, decimal] = value.split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}
