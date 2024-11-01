<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col md:flex-row justify-center min-h-screen bg-gray-100">
    <div class="flex flex-col justify-between md:w-1/2 p-4 bg-white items-center">
        <router-view class="w-full" />
        <p class="hidden md:block text-center text-xs text-[#777777] mt-4">© 2023 Email Vault, Inc. All rights reserved | <a href="" class="text-[#571459]">support@emailvault.app</a></p>
    </div>
    <div class="md:w-1/2 flex pt-36 justify-center bg-gradient-to-bl from-[#8D348E] to-[#571459]">
      <div class="text-white text-center p-4">
        <img class="mx-auto lg:max-w-[473px] mb-12" src="/src/assets/email-vault.png" alt="">
        <h2 class="text-4xl font-bold mb-4">Email Vault</h2>
        <p class="text-lg font-medium">
          Our email journaling solution grants you <br />security, compliance, and peace of mind.
        </p>
      </div>
    </div>
    <p class="md:hidden text-center text-xs my-4 text-[#777777]">© 2023 Email Vault, Inc. All rights reserved | <a href="" class="text-[#571459]">support@emailvault.app</a></p>
  </div>
</template>


