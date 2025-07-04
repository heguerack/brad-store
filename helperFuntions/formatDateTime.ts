// export const formatDateTime = (dateString: Date) => {
export const formatDateTime = (dateString: Date | null) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }
  // const formattedDateTime: string = new Date(dateString).toLocaleString(
  //   'en-US',
  //   dateTimeOptions
  // )
  // const formattedDate: string = new Date(dateString).toLocaleString(
  //   'en-US',
  //   dateOptions
  // )
  // const formattedTime: string = new Date(dateString).toLocaleString(
  //   'en-US',
  //   timeOptions
  // )
  // return {
  //   dateTime: formattedDateTime,
  //   dateOnly: formattedDate,
  //   timeOnly: formattedTime,
  // }
  const formattedDateTime: string = dateString
    ? new Date(dateString).toLocaleString('en-US', dateTimeOptions)
    : 'N/A'

  const formattedDate: string = dateString
    ? new Date(dateString).toLocaleString('en-US', dateOptions)
    : 'N/A'

  const formattedTime: string = dateString
    ? new Date(dateString).toLocaleString('en-US', timeOptions)
    : 'N/A'

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}
