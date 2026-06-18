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
    
    <!-- លុប <HomePage /> ចេញ ហើយជំនួសដោយ <router-view /> -->
    <main class="pt-[150px]">
      <router-view 
        :current-lang="currentLang"
        :current-theme="currentTheme"
      />
    </main>
    
    <Footer :currentLang="currentLang" :currentTheme="currentTheme" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
// លុប import HomePage ចេញពីទីនេះ ព្រោះយើងនឹងហៅវាតាមរយៈ router
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'

const currentLang = ref('EN')
const currentTheme = ref('dark')

const updateLanguage = (lang) => {
  currentLang.value = lang
}

const updateTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
}
</script>