type FetchArgs = Parameters<typeof fetch>

export async function fetcher<T>(url: FetchArgs[0], args: FetchArgs[1]) {
  const response = await fetch(url, args)
  const data = await response.json() as Promise<T>

  return data
}
