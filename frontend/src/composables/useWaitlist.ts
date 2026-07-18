import { reactive, ref } from 'vue'
import { ApiError } from '../api/client'
import { createWaitlistEntry } from '../api/waitlist'
import type { SubmitStatus, WaitlistFormData, WaitlistPayload } from '../types/waitlist'

const initialForm = (): WaitlistFormData => ({
  fullName: '',
  email: '',
  ageGroup: '',
  role: '',
  message: '',
  consent: false,
  website: '',
})

const GMAIL_ERROR = 'Այս պահին ընդունվում են միայն վավեր Gmail հասցեներ։'

export const useWaitlist = () => {
  const form = reactive<WaitlistFormData>(initialForm())
  const status = ref<SubmitStatus>('idle')
  const emailError = ref('')

  const reset = () => Object.assign(form, initialForm())

  const submit = async () => {
    if (status.value === 'submitting') return
    const normalizedEmail = form.email.trim().toLowerCase()
    emailError.value = ''

    if (!/^[^\s@]+@gmail\.com$/i.test(normalizedEmail)) {
      emailError.value = GMAIL_ERROR
      status.value = 'validation_error'
      return
    }

    if (!form.ageGroup || !form.role) return
    const payload: WaitlistPayload = {
      full_name: form.fullName.trim(),
      email: normalizedEmail,
      age_group: form.ageGroup,
      role: form.role,
      consent: form.consent,
      website: form.website,
    }
    if (form.message.trim()) payload.message = form.message.trim()

    status.value = 'submitting'
    try {
      await createWaitlistEntry(payload)
      status.value = 'success'
      reset()
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        emailError.value = error.body.fields?.email?.[0] ?? ''
        status.value = error.body.code === 'email_already_exists'
          ? 'duplicate_email'
          : error.body.code === 'rate_limit_exceeded'
            ? 'rate_limited'
            : error.body.code === 'validation_error'
              ? 'validation_error'
              : 'server_error'
        return
      }
      status.value = 'server_error'
    }
  }

  return { form, status, emailError, submit }
}
