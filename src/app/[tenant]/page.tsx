type TimeResponse = {
  date: string
  hour: number
  minute: number
  seconds: number
  dayOfWeek: string
}

const TIMEAPI_URL = 'https://timeapi.io/api'

async function fetchTime(
  tenant: string,
  timeZone: string = 'Europe/Berlin',
): Promise<TimeResponse> {
  const response = await fetch(`${TIMEAPI_URL}/Time/current/zone?timeZone=${timeZone}`, {
    headers: {
      'X-Tenant': tenant,
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

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

function formatTime(time: TimeResponse): string {
  const { dayOfWeek, date, hour, minute, seconds } = time

  return `${dayOfWeek}, ${date} at ${pad(hour)}:${pad(minute)}:${pad(seconds)}`
}

export default async function Home({
  params: {
    tenant,
  },
}: {
  params: {
    tenant: string
  }
}) {
  const time = await fetchTime(tenant)

  return (
    <div className="container mx-auto mt-10">
      <h1>Hello World! ({tenant})</h1>
      <h2>This page was generated on {`${formatTime(time)}`}</h2>
    </div>
  )
}