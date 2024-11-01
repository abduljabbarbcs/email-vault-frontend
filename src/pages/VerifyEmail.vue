<template>
    <div v-if="appStore.loading">
        <BaseLoader />
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useAppStore } from '../../stores/app.ts'
import { onMounted } from 'vue';
import BaseLoader from '../components/BaseLoader.vue'
import { useRouter } from 'vue-router';

const appStore = useAppStore()
const router = useRouter()
const { verifyEmail } = appStore
const { token } = useRoute().query

onMounted(() => {
    if (token) {
        verifyEmail(token)
    } else {
        router.push('/')
    }
})
</script>
