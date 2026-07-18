export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'

export interface ApiErrorBody {
  detail: string
  code: string
  fields?: Record<string, string[]>
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiErrorBody,
  ) {
    super(body.detail)
  }
}

const isApiErrorBody = (value: unknown): value is ApiErrorBody => (
  typeof value === 'object'
  && value !== null
  && 'detail' in value
  && 'code' in value
  && typeof value.detail === 'string'
  && typeof value.code === 'string'
)

export const postJson = async <TResponse>(path: string, payload: object): Promise<TResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const errorBody = isApiErrorBody(body)
      ? body
      : { detail: 'Unable to complete the request.', code: 'server_error' }
    throw new ApiError(response.status, errorBody)
  }

  return body as TResponse
}
