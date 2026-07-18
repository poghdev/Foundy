export type AgeGroup = 'under_16' | '16_17' | '18_24' | '25_plus' | 'prefer_not_to_say'

export type WaitlistRole = 'young_specialist' | 'founder' | 'mentor' | 'company_partner' | 'parent_educator' | 'other'

export interface WaitlistFormData {
  fullName: string
  email: string
  ageGroup: AgeGroup | ''
  role: WaitlistRole | ''
  message: string
  consent: boolean
  website: string
}

export interface WaitlistPayload {
  full_name: string
  email: string
  age_group: AgeGroup
  role: WaitlistRole
  message?: string
  consent: boolean
  website?: string
}

export interface WaitlistCreatedResponse {
  success: true
  message: string
  data: { id: string; email: string; created_at: string }
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'validation_error' | 'duplicate_email' | 'server_error' | 'rate_limited'
