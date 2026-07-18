import { postJson } from './client'
import type { WaitlistCreatedResponse, WaitlistPayload } from '../types/waitlist'

export const createWaitlistEntry = (payload: WaitlistPayload) => postJson<WaitlistCreatedResponse>('/waitlist', payload)
