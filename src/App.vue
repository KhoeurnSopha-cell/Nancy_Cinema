<template>
  <div 
    :class="[
      currentTheme === 'dark' ? 'bg-[#0b0707] text-white' : 'bg-gray-50 text-gray-900',
      'min-h-screen select-none transition-colors duration-300'
    ]"
  >
    <Navbar 
      :current-lang="currentLang" 
      :current-theme="currentTheme"
      @change-language="updateLanguage"
      @toggle-theme="updateTheme"
    />
    
    <HomePage 
      :current-lang="currentLang"
      :current-theme="currentTheme"
    />
    
    <Footer :currentLang="currentLang" :currentTheme="currentTheme" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import HomePage from './components/HomePage.vue'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'

const currentLang = ref('EN')
// បន្ថែម State សម្រាប់គ្រប់គ្រង Theme (Default គឺ 'dark')
const currentTheme = ref('dark')

const updateLanguage = (lang) => {
  currentLang.value = lang
}

// អនុគមន៍សម្រាប់ប្តូរ Mode ពី dark ទៅ light ឬ light ទៅ dark
const updateTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
}
</script>