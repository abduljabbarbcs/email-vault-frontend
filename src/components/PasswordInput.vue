<template>
    <div class="relative">
      <!-- Password Input -->
       <div class="flex items-center justify-between max-w-29 pr-1">
          <label for="password" class="block mb-2 text-gray-700"><slot /></label>
          <div v-if="password" class="flex space-x-1" @mouseover="showValidationBox = true" @mouseleave="showValidationBox = false">
            <div :class="getStripClass(1)" class="w-9 h-1 rounded-sm"></div>
            <div :class="getStripClass(3)" class="w-9 h-1 rounded-sm"></div>
            <div :class="getStripClass(5)" class="w-9 h-1 rounded-sm"></div>
          </div>
       </div>
      <div class="relative mb-4">
        <input
          :type="showPassword ? 'text' : 'password'"
          :value="password"
          @input="updatePassword($event.target.value)"
          id="password"
          class="w-full pl-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#571459]"
          :class="password && error ? 'border-red-600': 'border-[#6C757D]'"
          placeholder="Enter your password"
        />
        <span @click="togglePasswordVisibility" class="absolute inset-y-0 right-3 flex text-[#571459] items-center cursor-pointer">
          <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
        </span>
      </div>
  
      <!-- Validation Box -->
      <div v-if="showValidationBox && password" class="absolute top-8 md:top-6 text-xs right-0 md:-right-[266px] w-64 p-4 bg-white shadow-lg border rounded-lg">
        <h3 class="font-bold mb-2">Please fulfill the below requirements:</h3>
        <ul class="font-semibold">
          <li class="flex items-center mb-2 justify-between" :class="validation.length ? 'text-[#42A496]' : 'text-[#FC5A5A]'">
              <span class="mr-2">At least 8 characters in length</span>
              <span>
                <i :class="validation.length ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              </span>
          </li>
          <li class="flex items-center mb-2 justify-between" :class="validation.uppercase ? 'text-[#42A496]' : 'text-[#FC5A5A]'">
              <span class="mr-2">At least 1 uppercase character</span>
              <span>
                <i :class="validation.uppercase ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              </span>
          </li>
          <li class="flex items-center mb-2 justify-between" :class="validation.lowercase ? 'text-[#42A496]' : 'text-[#FC5A5A]'">
              <span class="mr-2">At least 1 lowercase character</span>
              <span>
                <i :class="validation.lowercase ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              </span>
          </li>
          <li class="flex items-center mb-2 justify-between" :class="validation.number ? 'text-[#42A496]' : 'text-[#FC5A5A]'">
              <span class="mr-2">At least 1 number</span>
              <span>
                <i :class="validation.number ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              </span>
          </li>
          <li class="flex items-center mb-2 justify-between" :class="validation.special ? 'text-[#42A496]' : 'text-[#FC5A5A]'">
              <span class="mr-2">At least 1 special character</span>
              <span>
                <i :class="validation.special ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              </span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue'
  const props = defineProps<{
    modelValue: string | number
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue'): void
  }>()

  const password = ref(props.modelValue || '')
  const showPassword = ref(false)
  const isValidPassword = ref(false)
  const showValidationBox = ref(false)
  const validation = ref({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })
  const error = ref(false)

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }
  
  // Validate password
  const validatePassword = (value) => {
    validation.value.length = value.length >= 8
    validation.value.uppercase = /[A-Z]/.test(value)
    validation.value.lowercase = /[a-z]/.test(value)
    validation.value.number = /[0-9]/.test(value)
    validation.value.special = /[!@#$%^&*(),.?":{}|<>]/.test(value)
  }

  const getStripClass = (index) => {
    const criteriaMet = [
        validation.value.length,
        validation.value.uppercase,
        validation.value.lowercase,
        validation.value.number,
        validation.value.special
    ]
    
    const activeClass = 'bg-yellow-400'
    const inactiveClass = 'bg-gray-300'

    // Control how many strips to show depending on the number of criteria met
    const countValid = criteriaMet.filter(Boolean).length
    if (countValid === criteriaMet.length) {
      return 'bg-green-600'
    }
    return index <= countValid ? activeClass : inactiveClass
  }
  
  // Update password value and emit to parent component
  const updatePassword = (value) => {
    emit('update:modelValue', value)
    validatePassword(value)
    isValidPassword.value = (validation.value.length && validation.value.uppercase && validation.value.lowercase && validation.value.number && validation.value.special)
    error.value = isValidPassword.value ? false : error.value
  }

  // Watch for changes in modelValue prop and update internal value
  watch(() => props.modelValue, (newValue) => {
    password.value = newValue;
  });

  const validate = () => {
    error.value = !isValidPassword.value
    updatePassword(password.value)
    return isValidPassword.value
  }
  defineExpose({
    validate
  })
</script>
  