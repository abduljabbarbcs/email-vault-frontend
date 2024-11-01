<template>
  <div class="lg:w-[80%] xl:w-[60%] flex flex-col justify-center mx-auto xl:ml-[148px] mt-[25%] xl:mt-[247px]">
    <h1 class="text-3xl lg:text-[40px] font-bold mb-10">Add Billing Method</h1>
    <p class="text-sm text-gray-600 mb-5">Please enter your billing details below</p>
    
    <BaseForm class="space-y-4" @submit="handleSubmit">
      <div class="space-y-2">
        <label class="text-[#6C757D]" for="card_holder_name">
          Name on card <span class="text-[#571459]">*</span>
        </label>
        <BaseInput
          v-model="form.card_holder_name"
          type="text"
          name="card_holder_name"
          placeholder="Ex. Adam"
          required
          @input="validateForm"
          @blur="markTouched('card_holder_name')"
        />
        <p v-if="errors.card_holder_name && touched.card_holder_name" class="text-red-600 text-sm">{{ errors.card_holder_name }}</p>
      </div>
      <div class="space-y-2">
        <label class="text-[#6C757D]" for="card_number">
          Card number <span class="text-[#571459]">*</span>
        </label>
        <div class="relative">
          <img v-if="cardType" :src="cardImage" :alt="cardType" class="absolute w-7 top-[14px] left-1" />
          <BaseInput
            v-model="formattedCardNumber"
            type="text"
            id="card_number"
            placeholder="#### #### #### ####"
            :class="cardType ? 'pl-9': ''"
            required
            @input="validateForm"
            @blur="markTouched('card_number')"
          />
        </div>
        <p v-if="errors.card_number && touched.card_number" class="text-red-600 text-sm">{{ errors.card_number }}</p>
      </div>

      <div class="flex space-x-2">
        <div class="w-1/2 space-y-2">
          <label class="text-[#6C757D]" for="expiry_date">
            Expiration date <span class="text-[#571459]">*</span>
          </label>
          <BaseInput
            v-model="expiryDate"
            type="text"
            name="expiry_date"
            placeholder="MM/YY"
            required
            @input="formatExpiryDate"
            @blur="markTouched('expiry_date')"
          />
          <p v-if="errors.expiry_date && touched.expiry_date" class="text-red-600 text-sm">{{ errors.expiry_date }}</p>
        </div>
        <div class="w-1/2 space-y-2">
          <label class="text-[#6C757D]" for="cvv">
            CVV <span class="text-[#571459]">*</span>
          </label>
          <BaseInput
            v-model="form.cvv"
            type="text"
            name="cvv"
            placeholder="CVV"
            required
            @input="validateForm"
            @blur="markTouched('cvv')"
          />
          <p v-if="errors.cvv && touched.cvv" class="text-red-600 text-sm">{{ errors.cvv }}</p>
        </div>
      </div>

      <div class="flex space-x-2">
        <i class="fa-solid fa-circle-exclamation text-[#571459]"></i>
        <p class="text-xs text-[#6C757D] tracking-wide space-x-2">
          Your credit card will not be charged for 30 days. Cancel anytime in the next 30 days free of charge.
        </p>
      </div>
      <p v-if="appStore.error" class="mt-6 text-red-500 text-center">{{ appStore.error }}</p>
      <div class="flex justify-end space-x-2">
        <BaseButton @click="router.push('/sign-up')" class="mt-9 bg-white !text-black border-solid border border-black shadow-none" text="Back" />
        <BaseButton text="Sign Up" class="shadow-none mt-9" :disabled="!isFormFilled" />
      </div>
    </BaseForm>

    <hr class="mt-8 mb-4 xl:mb-[180px] border-1 border-black opacity-30">
  </div>
</template>

<script lang="ts" setup>
import BaseForm from '../components/BaseForm.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { useAppStore } from '../../stores/app.ts';
import { useFetch } from '../composables/useFetch.ts';
import { ref, watch, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const appStore = useAppStore()

// Form data and error states
const form = ref({
  card_holder_name: '',
  card_number: '',
  expiry_date: '',
  cvv: ''
});

const isFormFilled = ref(false);
const errors = ref({});
const touched = ref({});

// Card type detection regex patterns
const cardTypes = {
  visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  mastercard: /^(?:5[1-5][0-9]{14})$/,
  amex: /^(?:3[47][0-9]{13})$/,
};

// Formatted card number handling
const formattedCardNumber = computed({
  get: () => form.value.card_number,
  set: (value) => form.value.card_number = value.replace(/\D/g, '')
});

// Determine card type based on card number
const cardType = computed(() => {
  return Object.entries(cardTypes).find(([_, regex]) => regex.test(form.value.card_number))?.[0] || null;
});

// Card image based on the detected card type
import visaImg from '../assets/visa.jpg';
import mastercardImg from '../assets/mastercard.png';
import amexImg from '../assets/amex.png';

const cardImage = computed(() => {
  switch (cardType.value) {
    case 'visa':
      return visaImg;
    case 'mastercard':
      return mastercardImg;
    case 'amex':
      return amexImg;
    default:
      return null;
  }
});

// Mark field as touched
const markTouched = (field) => {
  touched.value[field] = true;
};
const expiryDate = ref('');
// Format expiry date input
const formatExpiryDate = () => {
  const value = event.target.value; // Remove non-numeric characters
  let formattedValue = '';
  // Add slash after the month
  if (value.length == 2) {
    formattedValue = `${value}/`;
  } else {
    formattedValue = value; // Just return the raw input if less than or equal to 2
  }
  if (value.length > 2 && !value.includes('/')) {
    formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
  }
  // Update both model and expiry_date field in form
  expiryDate.value = formattedValue;
  form.value.expiry_date = formattedValue;
  validateExpiryDate(formattedValue);
};

const validateExpiryDate = (value) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the current year

  if (value.length === 5) {
    const month = parseInt(value.slice(0, 2), 10);
    const year = parseInt(value.slice(3, 5), 10);

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.value.expiry_date = 'Expiration date cannot be in the past';
    } else {
      delete errors.value.expiry_date; // Clear error if valid
    }
  }
};

// Form validation
const validateForm = () => {
  errors.value = {}; // Reset errors
  const { card_holder_name, card_number, expiry_date, cvv } = form.value;
  let isValid = true;

  // Validate Name on Card
  if (!card_holder_name) {
    errors.value.card_holder_name = 'Name on card is required';
    isValid = false;
  }

  // Validate Card Number
  if (!/^\d{16}$/.test(card_number)) {
    errors.value.card_number = 'Card number must be 16 digits';
    isValid = false;
  }

  // Validate Expiration Date
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry_date)) {
    errors.value.expiry_date = 'Expiration date must be in MM/YY format';
    isValid = false;
  }

  // Validate CVV
  if (!/^\d{3,4}$/.test(cvv)) {
    errors.value.cvv = 'CVV must be 3 or 4 digits';
    isValid = false;
  }

  isFormFilled.value = isValid;
};

// Handle form submission
const handleSubmit = async () => {
  if (isFormFilled.value) {
    const payload = {
      ...appStore.profile,
      card_holder_name: form.value.card_holder_name,
      card_number: form.value.card_number,
      expiry_date: form.value.expiry_date,
      cvv: form.value.cvv
    };
    appStore.signUp(payload)    
  }
};

onMounted(() => {
  if (!appStore.profile?.email) {
    router.push('/sign-up')
  }
})
</script>
