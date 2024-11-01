<template>
  <div class="max-w-[413px] flex flex-col justify-center mx-auto xl:ml-[148px] mt-[25%] xl:mt-[198px]">
    <template v-if="appStore.resetEmailSent">
      <h1 class="text-[40px] font-bold mb-6">Email Sent</h1>
      <p class="mb-4 text-lg tracking-wide opacity-80">A password reset link has been sent to <span class="font-semibold">{{ email }}</span></p>
      <p class="text-sm tracking-wide opacity-80">Just click on the link in that email to complete password reset process.</p>
      <hr class="mt-10 mb-6 border-1 border-black opacity-30">
      <div class="text-center">
        <p>Haven’t received any email? <span @click="requestEmail" class="text-[#571459] tracking-wide hover:cursor-pointer">Resend Email</span></p>
      </div>
    </template>
    <template v-else>
      <h1 class="text-[40px] font-bold mb-6">Reset Password</h1>
      <p v-if="token" class="mb-8 text-sm tracking-wide opacity-80">Please enter your new password</p>
      <p v-else class="mb-8 text-sm tracking-wide opacity-80">Having trouble logging in to your account? Please enter your email below to reset your password.</p>
      <BaseForm @submit="handleSubmit">
        <template v-if="token">
          <template v-if="appStore.isPasswordTokenVerified">
            <PasswordInput v-model="newPassword" ref="passwordRef">Password</PasswordInput>
            <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
          </template>
          <h1 v-else class="text-red-600 text-lg text-center">{{ appStore.error }}</h1>
        </template>
        <template v-else>
          <BaseInput
            v-model="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </template>
        <div class="text-right mt-6">
          <BaseButton class="px-6" text="Reset Password" :disabled="token && !appStore.isPasswordTokenVerified" />
        </div>
      </BaseForm>
      <hr class="mt-8 mb-6 border-1 border-black opacity-30">
      <div class="text-center">
        <p>Already have an account? <a href="/" class="text-[#571459] tracking-wide">Sign In</a></p>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import BaseForm from '../components/BaseForm.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { useAppStore } from '../../stores/app.ts'
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import PasswordInput from '../components/PasswordInput.vue';

const appStore = useAppStore()
const { requestResetPasswordEmail, verifyToken, verifyResetPasswordToken, resetPassword, resendEmail } = appStore
const passwordRef = ref(null)
const newPassword = ref()
const { token } = useRoute().query
const email = ref('')
const error = ref('')


const sendResetEmail = () => {
  requestResetPasswordEmail({email: email.value})
}

const changePassword = () => {
  const mail = token.split(':')?.[0]
  if (passwordRef.value.validate()) {
    resetPassword({email: mail, password: newPassword.value})
  } else {
    error.value = 'Password not Valid'
  }
}

const requestEmail = () => {
    resendEmail({email: email.value, event: 'password'})
}
const handleSubmit = () => {
  if (token) {
    changePassword()
  } else {
    sendResetEmail()
  }
}
onMounted(() => {
  if (token) {
    verifyResetPasswordToken(token)
  }
})

</script>