'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export interface RegistrationData26 {
  name: string
  registrationNumber: string
  phoneNumber: string
  srmistEmail: string
  githubProfile?: string
  linkedinProfile?: string
  firstDomain: string
  secondDomain: string
}

export async function registerRecruitment26(data: RegistrationData26) {
  try {
    if (!data.name?.trim()) {
      return { success: false, error: 'Name is required.' }
    }

    if (!data.registrationNumber?.trim()) {
      return { success: false, error: 'Registration number is required.' }
    }

    if (!/^RA\d{13}$/.test(data.registrationNumber.trim())) {
      return {
        success: false,
        error: 'Registration number must start with RA followed by 13 digits.',
      }
    }

    if (!data.phoneNumber?.trim()) {
      return { success: false, error: 'Phone number is required.' }
    }

    if (!/^\d{10}$/.test(data.phoneNumber.trim())) {
      return { success: false, error: 'Phone number must be exactly 10 digits.' }
    }

    if (!data.srmistEmail?.trim()) {
      return { success: false, error: 'SRMIST email is required.' }
    }

    if (!/^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/.test(data.srmistEmail.trim())) {
      return {
        success: false,
        error: 'Please enter a valid SRMIST email address (e.g. ab1234@srmist.edu.in).',
      }
    }

    if (!data.firstDomain?.trim()) {
      return { success: false, error: 'First domain selection is required.' }
    }

    if (!data.secondDomain?.trim()) {
      return { success: false, error: 'Second domain selection is required.' }
    }

    if (data.firstDomain.trim() === data.secondDomain.trim()) {
      return { success: false, error: 'First and second domain must be different.' }
    }

    if (data.githubProfile?.trim()) {
      const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/
      if (!githubRegex.test(data.githubProfile.trim())) {
        return {
          success: false,
          error: 'Enter a valid GitHub profile link (e.g. github.com/username).',
        }
      }
    }

    if (data.linkedinProfile?.trim()) {
      const linkedinRegex =
        /^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/)?[A-Za-z0-9-]+\/?$/
      if (!linkedinRegex.test(data.linkedinProfile.trim())) {
        return {
          success: false,
          error: 'Enter a valid LinkedIn profile link (e.g. linkedin.com/in/username).',
        }
      }
    }

    // Check for existing duplicates explicitly
    const { data: existingData, error: checkError } = await supabase
      .from('recruitment_entries')
      .select('register_number, srmist_email, phone_number')
      .or(`register_number.eq.${data.registrationNumber.trim()},srmist_email.eq.${data.srmistEmail.trim()},phone_number.eq.${data.phoneNumber.trim()}`)
      
    if (checkError) {
      console.error('[registerRecruitment26] Error checking for duplicates:', checkError)
      return {
        success: false,
        error: 'Error validating registration. Please try again.',
      }
    }

    if (existingData && existingData.length > 0) {
      const existing = existingData[0];
      if (existing.register_number === data.registrationNumber.trim()) {
         return { success: false, duplicate: true, error: 'This registration number is already registered.' }
      }
      if (existing.srmist_email === data.srmistEmail.trim()) {
         return { success: false, duplicate: true, error: 'This SRMIST email is already registered.' }
      }
      if (existing.phone_number === data.phoneNumber.trim()) {
         return { success: false, duplicate: true, error: 'This phone number is already registered.' }
      }
      return { success: false, duplicate: true, error: 'You are already registered.' }
    }

    const { data: result, error } = await supabase
      .from('recruitment_entries')
      .insert([
        {
          name: data.name.trim(),
          register_number: data.registrationNumber.trim(),
          phone_number: data.phoneNumber.trim(),
          srmist_email: data.srmistEmail.trim(),
          github_link: data.githubProfile?.trim() || null,
          linkedin_link: data.linkedinProfile?.trim() || null,
          first_domain: data.firstDomain.trim(),
          second_domain: data.secondDomain.trim(),
        },
      ])
      .select()

    if (error) {
      switch (error.code) {
        case '23505': {
          const msg = error.message.toLowerCase()
          if (msg.includes('register_number')) {
            return {
              success: false,
              duplicate: true,
              error: 'This registration number is already registered.',
            }
          }
          if (msg.includes('srmist_email')) {
            return {
              success: false,
              duplicate: true,
              error: 'This SRMIST email is already registered.',
            }
          }
          if (msg.includes('phone_number')) {
            return {
              success: false,
              duplicate: true,
              error: 'This phone number is already registered.',
            }
          }
          return {
            success: false,
            duplicate: true,
            error: 'You are already registered. Please contact support if you believe this is an error.',
          }
        }

        case '42P01':
          return {
            success: false,
            error: 'Registration system is temporarily unavailable. Please try again later.',
          }

        default:
          console.error('[registerRecruitment26] Database error:', error)
          return {
            success: false,
            error: 'Registration failed due to a system error. Please try again in a few minutes.',
          }
      }
    }

    return {
      success: true,
      message: 'Registration successful!',
      data: result?.[0] ?? null,
    }
  } catch (err) {
    if (err instanceof Error) {
      if (
        err.message.includes('fetch') ||
        err.message.includes('network') ||
        err.message.includes('timeout')
      ) {
        return {
          success: false,
          error: 'Network connection failed. Please check your internet connection and try again.',
        }
      }
    }

    console.error('[registerRecruitment26] Unexpected error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again or contact support.',
    }
  }
}
