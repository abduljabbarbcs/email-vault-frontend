<template>
  <div class="max-w-[413px] flex flex-col justify-center mx-auto xl:ml-[148px] mt-14 md:mt-20 xl:mt-[108px]">
    <h1 class="text-[40px] leading-10 mb-10 font-bold">Create Account</h1>
    <p class="text-sm mb-6 tracking-wider opacity-80">Welcome to Email Vault, please enter your details below to <br>create an account.</p>
    <BaseForm class="space-y-[10px]" @submit="handleSubmit">
      <div class="space-y-2">
        <label class="text-[#6C757D] mb-2" for="first_name">First Name <span class="text-[#571459]">*</span></label>
        <BaseInput
          v-model="form.first_name"
          type="text"
          name="first_name"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div class="space-y-2">
        <label class="text-[#6C757D]" for="last_name">Last Name <span class="text-[#571459]">*</span></label>
        <BaseInput
          v-model="form.last_name"
          type="text"
          name="last_name"
          placeholder="Enter your last name"
          required
        />
      </div>
      <div class="space-y-2">
        <label class="text-[#6C757D]" for="company_name">Company Name <span class="text-[#571459]">*</span></label>
        <BaseInput
          v-model="form.company_name"
          type="text"
          name="company_name"
          placeholder="Enter your company name"
          required
        />
      </div>
      <div class="space-y-2">
        <label class="text-[#6C757D]" for="email">Email <span class="text-[#571459]">*</span></label>
        <BaseInput
          v-model="form.email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="space-y-2">
        <PasswordInput v-model="form.password" ref="passwordRef">Password <span class="text-[#571459] border-red-600">*</span></PasswordInput>
      </div>
      <div class="space-y-2">
        <label class="text-[#6C757D]" for="referral_code">Referral Code</label>
        <BaseInput
          v-model="form.referral_code"
          type="text"
          name="referral_code"
          placeholder="Enter referral code"
        />
      </div>
      <div class="space-x-2 flex items-center pt-1">
        <input
          type="checkbox"
          name="terms_and_conditions"
          required
        >
        <span class="text-xs">I agree to the <span @click="handleShowModal" id="termsAndConditions" class="underline text-[#571459] hover:cursor-pointer">Terms and Conditions</span> and <span @click="handleShowModal" id="privacyPolicy" class="underline text-[#571459] hover:cursor-pointer">Privacy Policy</span></span>
      </div>
      <div class="text-right">
        <BaseButton text="Continue" class="mt-4" :disabled="!isFormFilled" />
      </div>
    </BaseForm>
    <hr class="mt-[18px] mb-6 border-1 border-black opacity-30">
    <div class="text-center space-y-6 md:mb-14">
      <p class="text-[#6C757D]">Ready to Partner with us as an MSP? <a href="" class="text-[#571459]">Sign Up here</a></p>
      <p>Already have an account? <a href="/" class="text-[#571459]">Sign In</a></p>
    </div>
    <BaseModel v-if="showModal" :modelType="modelType" @close="showModal = false" />
  </div>
</template>
<script lang="ts" setup>
import BaseForm from '../components/BaseForm.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import PasswordInput from '../components/PasswordInput.vue';
import BaseModel from '../components/BaseModel.vue';
import { useFetch } from '../composables/useFetch'
import { useAppStore } from '../../stores/app'
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import type { SignUp } from '../types/auth'

const { profile } = storeToRefs(useAppStore())
const passwordRef = ref(null)
const showModal = ref(false)
const router = useRouter()
const route = useRoute()

const form = ref<SignUp>({
  first_name: '',
  last_name: '',
  company_name: '',
  email: '',
  password: '',
  referral_code: ''
})
const modelType = ref('')
const isFormFilled = ref(true)

const handleSubmit = () => {
  const { first_name, last_name, company_name, email, password, referral_code } = form.value
  if (first_name && last_name && company_name && email) {
    if(!passwordRef.value.validate()) {
      return
    }
    profile.value = {
      first_name,
      last_name,
      company_name,
      email,
      password,
      referral_code
    };
    router.push('/add-billing-method')
  }
};

const handleShowModal = (e) => {
  modelType.value = e.target.id
  showModal.value = true
}
onMounted(() => {
  if (profile.value?.email) {
    form.value = { ...profile.value, password: '' }
    passwordRef.value.validate()
  }
})
</script>