export const currencyFormatter = new Intl.NumberFormat('en-us', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
})

/// format currency using the formatter
export const formatCurrencyHelper = (amount: any) => {
  if (typeof amount === 'number') {
    return currencyFormatter.format(amount)
  } else if (typeof amount === 'string') {
    return currencyFormatter.format(Number(amount))
  } else {
    return 'NaN'
  }
}
