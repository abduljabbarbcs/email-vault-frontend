<template>
    <div class="max-w-[413px] flex flex-col justify-center mx-auto xl:ml-[148px] mt-[25%] xl:mt-[198px]">
        <template v-if="appStore.isLoggedIn">
            <h1 class="text-4xl font-bold mb-10">Welcome To Email Vault</h1>
            <h1>You have Successfully logged in to your account with "{{ form.email }}" email.</h1>
            <div class="text-right">
                <BaseButton class="mt-10" text="Log out" @click="appStore.isLoggedIn = false" />
            </div>
        </template>
        <template v-else>
            <h1 class="text-[40px] font-bold mb-5">Sign In</h1>
            <p class="text-sm text-gray-600 mb-7">
                Welcome to Email Vault, please enter your login credentials <br> below to start using the application.
            </p>
            <BaseForm @submit="handleSubmit">
                <div class="mb-8">
                    <label for="email" class="block text-[#6C757D] mb-2">Email</label>
                    <BaseInput
                        v-model="form.email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-[#6C757D] mb-2">Password</label>
                    <div class="relative">
                        <BaseInput
                            v-model="form.password"
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <span @click="showPassword = !showPassword" class="absolute inset-y-0 right-3 flex text-[#571459] items-center cursor-pointer">
                            <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                        </span>
                    </div>
                    <p v-if="appStore.error" class="mt-6 text-red-500 text-center">{{ appStore.error }}</p>
                </div>
                <div class="text-right">
                    <p class="text-[#571459] text-xs"> <a href="/reset-password">Forgot password ?</a></p>
                    <BaseButton text="Sign In" class="mt-4" />
                </div>
                <hr class="mt-11 mb-4 border-1 border-black opacity-30">
                <p class="text-center xl:mb-[259px] text-sm">Dont have an account? <a href="/sign-up" class="text-[#571459]">Create Account</a></p>
            </BaseForm>
        </template>
    </div>
  </template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseForm from './BaseForm.vue'
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()
const { signIn } = appStore

const showPassword = ref(false)
const form = ref({
    email: '',
    password: ''
})

const handleSubmit = () => {
    signIn(form.value)
}
</script>
  
  