type TimeResponse = {
  date: string
  hour: number
  minute: number
  seconds: number
  dayOfWeek: string
}

const TIMEAPI_URL = 'https://timeapi.io/api'

async function fetchTime(
  host: string,
  timeZone: string = 'Europe/Berlin',
): Promise<TimeResponse> {
  const response = await fetch(`${TIMEAPI_URL}/Time/current/zone?timeZone=${timeZone}`, {
    headers: {
      'X-Tenant-Host': host,
    },
    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch time')
  }
  
  return response.json()
}

export default async function Home({
  params: {
    host,
  },
}: {
  params: {
    host: string
  }
}) {
  const now = await fetchTime(host)

  return (
    <div className="container mx-auto mt-10">
      <h1>Hello World!</h1>
      <h2>{`${now.dayOfWeek}, ${now.date} at ${now.hour}:${now.minute}:${now.seconds}`}</h2>
    </div>
  )
}