import { defineStore } from "pinia";
import { ref } from "vue";
import { useFetch } from "../src/composables/useFetch"
import { useRouter } from "vue-router";
import type { Profile, SignIn, SignUp, VerifyEmail, ResendEmail } from "../src/types/auth"

export const useAppStore = defineStore("AppStore", () =>{
  const router = useRouter()
  const profile = ref<Profile>()
  const isLoggedIn = ref(false)
  const isSignedUp = ref(false)
  const resetEmailSent = ref(false)
  const error = ref('')
  const loading = ref(false)
  const isPasswordTokenVerified = ref(false)
  const message = ref('')

  const signIn = async (payload: SignIn) => {
    error.value = ''
    try {
      loading.value = true
      const response = await useFetch('/api/signin', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response.message) {
        isLoggedIn.value = true
        error.value = ''
      }
    } catch (e: any) {
      error.value = e.message
      isLoggedIn.value = false
    } finally {
      loading.value = false
    }
  }

  const signUp = async (payload: SignUp) => {
    error.value = ''
    try {
      loading.value = true
      const response = await useFetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response.message) {
        isSignedUp.value = true
        router.push('/email-verification')
      }
    } catch (e: any) {
      console.log({e})
      isSignedUp.value = false
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const verifyEmail = async (token: string) => {
    error.value = ''
    try {
      loading.value = true
      const response = await useFetch(`/api/signup/verify-email/${token}`, {
        method: 'GET'
      })
      if (response) {
        router.push('/')
      }
    } finally {
      loading.value = false
    }
  }
  
  const requestResetPasswordEmail = async (payload: VerifyEmail) => {
    error.value = ''
    try {
      loading.value = true
      const response = await useFetch('/api/reset/check-email', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response) {
        resetEmailSent.value = true
      }
    } catch(e: any) {
      console.log({e})
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const verifyResetPasswordToken = async (token: string) => {
    error.value = ''
    try {
      const response = await useFetch(`/api/reset/verify-password-email/${token}`, {
        method: 'GET'
      })
      if (response.message) {
        isPasswordTokenVerified.value = true
      }
    } catch (e: any) {
      console.log({e})
      error.value = e.message
    }
  }

  const resetPassword = async (payload: SignIn) => {
    error.value = ''
    try {
      const response = await useFetch('/api/reset/change-password', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response) {
        router.push('/')
      }
    } catch(e: any) {
      error.value = e.message
    }
  }

  const resendEmail = async (payload: ResendEmail) => {
    error.value = ''
    try {
      const response = await useFetch('/api/resend-email', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response) {
        message.value = 'Email has been Sent successfully'
      }
    }
    catch (e: any) {
      console.log({e})
      error.value = e.message
    }
  }
  
  return {
      profile,
      isLoggedIn,
      isSignedUp,
      error,
      loading,
      resetEmailSent,
      isPasswordTokenVerified,
      message,
      resendEmail,
      resetPassword,
      verifyResetPasswordToken,
      signIn,
      signUp,
      verifyEmail,
      requestResetPasswordEmail
  }
});