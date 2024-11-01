<template>
    <div class="max-w-[413px] flex flex-col justify-center mx-auto xl:ml-[148px] mt-14 md:mt-20 xl:mt-[108px]">
        <h1 v-if="appStore.message" class="text-green-600">{{ appStore.message }}</h1>
        <h1 class="text-[40px] leading-10 mb-10 mt-24 font-bold">Email Verification</h1>
        <p class="text-sm mb-6 tracking-wider opacity-80">We’re almost set! A confirmation email was sent to<br>{{ profile?.email }}</p>
        <p class="text-sm mb-6 tracking-wider opacity-80">To activate your account, just click on the link in the<br>email. If you can’t locate it, please have a look in<br>your spam folder.</p>
        <hr class="mt-[18px] mb-6 border-1 border-black opacity-30">
        <div class="text-center space-y-24 md:mb-14">
            <p class="text-[#6C757D]">Haven’t received any email? <span @click="requestEmail" class="text-[#571459] hover:cursor-pointer">Resend Email</span></p>
            <p class="text-[#6C757D] text-xs">Did you enter the wrong email address? Please reach out to us for assistance at <a href="" class="text-[#571459]">support@emailvault.app</a></p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useAppStore } from '../../stores/app.ts'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter()
const appStore = useAppStore()
const { resendEmail } = appStore
const { profile } = storeToRefs(appStore)

const requestEmail = () => {
    resendEmail({email: profile.value?.email, event: 'signup'})
}
onMounted(() => {
    if(!profile.value?.email) {
        router.push('/')
    }
})
onUnmounted(() => {
    profile.value = {}
    appStore.message = ''
})
</script>
