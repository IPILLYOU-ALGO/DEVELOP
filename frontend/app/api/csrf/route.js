import { generateCSRFToken } from '@/utils/csrf'

export async function GET(request) {
  const csrfToken = generateCSRFToken()
  return new Response(JSON.stringify({ csrfToken }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}