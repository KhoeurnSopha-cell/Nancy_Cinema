<template>
  <footer class="font-sans border-t pt-12 pb-6 transition-colors duration-300"
    :class="currentTheme === 'dark' ? 'bg-[#0b0707] border-[#1f1a1a] text-[#a3a3a3]' : 'bg-gray-50 border-gray-200 text-gray-600'">
    
    <div class="max-w-[1250px] mx-auto px-4">

      <!-- For input Data for code to firebase -->
       
      <!-- <div class="mb-6 p-4 bg-gray-800/10 rounded-lg border border-dashed border-gray-500">
        <button 
          @click="runSeeding" 
          class="text-xs text-red-500 hover:underline font-bold uppercase"
        >
          [Admin] Seed Movies to Firestore
        </button>
      </div> -->

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h5 class="font-bold text-sm mb-4" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">{{ t.company }}</h5>
          <ul class="space-y-2.5 list-none">
            <li><a href="#" class="text-sm hover:text-[#e50914] transition-colors">{{ t.aboutUs }}</a></li>
            <li><a href="#" class="text-sm hover:text-[#e50914] transition-colors">{{ t.contactUs }}</a></li>
          </ul>
        </div>

        <div>
          <h5 class="font-bold text-sm mb-4" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">{{ t.more }}</h5>
          <ul class="space-y-2.5 list-none">
            <li><a href="#" class="text-sm hover:text-[#e50914] transition-colors">{{ t.promotions }}</a></li>
            <li><a href="#" class="text-sm hover:text-[#e50914] transition-colors">{{ t.myTicket }}</a></li>
          </ul>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <h5 class="font-bold text-sm mb-4" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">{{ t.downloadApp }}</h5>
          <div class="flex gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" class="h-10 cursor-pointer hover:opacity-80">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" class="h-10 cursor-pointer hover:opacity-80">
          </div>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <h5 class="font-bold text-sm mb-4" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">{{ t.followSocial }}</h5>
          <div class="flex gap-3">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" class="w-8 h-8 cursor-pointer hover:-translate-y-1 transition-transform" title="Facebook">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" class="w-8 h-8 cursor-pointer hover:-translate-y-1 transition-transform" title="Instagram">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" class="w-8 h-8 cursor-pointer hover:-translate-y-1 transition-transform" title="Youtube">
          </div>
        </div>
      </div>

      <hr class="my-6" :class="currentTheme === 'dark' ? 'border-gray-700/30' : 'border-gray-200'">

      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h6 class="text-xs font-bold uppercase mb-3 text-gray-500">{{ t.payment }}</h6>
          <div class="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/KHQR_Logo.png" class="h-4 object-contain">
            <img src="https://informal.digitaleconomy.gov.kh/images/ministry-icon/aba_round.png" class="h-7">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" class="h-6">
          </div>
        </div>
        <p class="text-xs text-gray-500">{{ t.rightsReserved }} &copy; 2026</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { seedMovies } from '@/services/seed';

const props = defineProps({
  currentLang: { type: String, default: 'EN' },
  currentTheme: { type: String, default: 'dark' }
})

// មុខងារនេះនឹងដំណើរការនៅពេលអ្នកចុចប៊ូតុង [Admin] នៅលើ Footer
const runSeeding = async () => {
  const confirmSeed = confirm("តើអ្នកចង់ចាប់ផ្ដើម Seed ទិន្នន័យភាពយន្តទៅ Firebase មែនទេ?")
  if (!confirmSeed) return

  try {
    console.log("កំពុងចាប់ផ្ដើមផ្ញើទិន្នន័យ...")
    await seedMovies()
    alert('✅ ជោគជ័យ! ទិន្នន័យទាំងអស់ត្រូវបានផ្ញើទៅ Firestore រួចរាល់')
  } catch (error) {
    console.error('❌ មានកំហុស៖', error)
    alert('មានកំហុស៖ ' + error.message)
  }
}

const translations = {
  EN: {
    company: 'Company', aboutUs: 'About Us', contactUs: 'Contact Us',
    more: 'More', promotions: 'Promotions', myTicket: 'My Ticket',
    downloadApp: 'Download Our App', followSocial: 'Follow Social Media',
    payment: 'Payment', rightsReserved: 'All rights reserved'
  },
  KH: {
    company: 'ក្រុមហ៊ុន', aboutUs: 'អំពីយើង', contactUs: 'ទាក់ទងយើង',
    more: 'បន្ថែមទៀត', promotions: 'ប្រម៉ូសិន', myTicket: 'សំបុត្ររបស់ខ្ញុំ',
    downloadApp: 'ទាញយកកម្មវិធី', followSocial: 'តាមដានបណ្តាញសង្គម',
    payment: 'ការទូទាត់ប្រាក់', rightsReserved: 'រក្សាសិទ្ធិគ្រប់យ៉ាង'
  }
}

const t = computed(() => translations[props.currentLang] || translations.EN)
</script>