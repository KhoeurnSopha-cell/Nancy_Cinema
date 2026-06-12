<template>
  <div class="bg-[#0b0707] min-h-screen text-white select-none">
   
    <Navbar :current-lang="currentLang" @change-language="updateLanguage"/>
    <HomePage :current-lang="currentLang"/>
    <Footer :current-lang="currentLang"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ប្រើប្រាស់សញ្ញា @ ដើម្បីរត់ចូលទៅរក src/components/ ដោយផ្ទាល់
import HomePage from './components/HomePage.vue'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'

const currentLang = ref('EN')

const updateLanguage = (lang) => {
  currentLang.value = lang
}
</script>