import qs from 'query-string'

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string
  key: string
  value: string | null
}) {
  const query = qs.parse(params)
  query[key] = value // not 100% sure how this works, but it owrks, defuinetely have to dig deeper

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    {
      skipNull: true,
    }
  )
}
