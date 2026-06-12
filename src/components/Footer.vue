<template>
  <footer 
    class="font-sans border-t pt-12 pb-6 transition-colors duration-300"
    :class="currentTheme === 'dark' ? 'bg-[#0b0707] border-[#1f1a1a] text-[#a3a3a3]' : 'bg-gray-50 border-gray-200 text-gray-600'"
  >
    <div class="max-w-[1250px] mx-auto px-4">
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        
        <div>
          <h5 
            class="font-bold text-sm md:text-[0.95rem] tracking-wider mb-4 transition-colors duration-300"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'"
          >
            {{ t.company }}
          </h5>
          <ul class="space-y-2.5 p-0 m-0 list-none">
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.aboutUs }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.contactUs }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.cinemas }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 
            class="font-bold text-sm md:text-[0.95rem] tracking-wider mb-4 transition-colors duration-300"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'"
          >
            {{ t.more }}
          </h5>
          <ul class="space-y-2.5 p-0 m-0 list-none">
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.promotions }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.newsActivity }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.myTicket }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.termsConditions }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm no-underline transition-all duration-200 hover:pl-1"
                :class="currentTheme === 'dark' ? 'text-[#9ca3af] hover:text-[#e5e7eb]' : 'text-gray-500 hover:text-black'">
                {{ t.privacyPolicy }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <h5 
            class="font-bold text-sm md:text-[0.95rem] tracking-wider mb-4 transition-colors duration-300"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'"
          >
            {{ t.downloadApp }}
          </h5>
          <div class="flex gap-3">
            <a href="#" class="w-10 h-10 md:w-11 md:h-11 border rounded-full flex items-center justify-center text-lg no-underline transition-all duration-200 hover:scale-108" 
              :class="currentTheme === 'dark' ? 'bg-[#141414] border-[#2d2d2d] text-white hover:bg-white hover:text-black' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white'"
              title="Google Play"
            >
              <i class="fab fa-google-play"></i>
            </a>
            <a href="#" class="w-10 h-10 md:w-11 md:h-11 border rounded-full flex items-center justify-center text-lg no-underline transition-all duration-200 hover:scale-108" 
              :class="currentTheme === 'dark' ? 'bg-[#141414] border-[#2d2d2d] text-white hover:bg-white hover:text-black' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white'"
              title="App Store"
            >
              <i class="fab fa-apple"></i>
            </a>
          </div>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <h5 
            class="font-bold text-sm md:text-[0.95rem] tracking-wider mb-4 transition-colors duration-300"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'"
          >
            {{ t.followSocial }}
          </h5>
          <div class="flex flex-wrap gap-2">
            <a href="#" class="w-9 h-9 border rounded-full flex items-center justify-center text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-[#1877f2] hover:border-[#1877f2]" :class="currentTheme === 'dark' ? 'bg-[#141414] border-[#2d2d2d] text-[#e5e7eb]' : 'bg-white border-gray-300 text-gray-600'"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="w-9 h-9 border rounded-full flex items-center justify-center text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-[#c13584] hover:border-[#c13584]" :class="currentTheme === 'dark' ? 'bg-[#141414] border-[#2d2d2d] text-[#e5e7eb]' : 'bg-white border-gray-300 text-gray-600'"><i class="fab fa-instagram"></i></a>
            <a href="#" class="w-9 h-9 border rounded-full flex items-center justify-center text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-[#ff0000] hover:border-[#ff0000]" :class="currentTheme === 'dark' ? 'bg-[#141414] border-[#2d2d2d] text-[#e5e7eb]' : 'bg-white border-gray-300 text-gray-600'"><i class="fab fa-youtube"></i></a>
            <a href="#" class="w-9 h-9 border rounded-full flex items-center justify-center text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-[#010101] hover:border-[#444]" :class="currentTheme === 'dark' ? 'bg-[#141414] border-[#2d2d2d] text-[#e5e7eb]' : 'bg-white border-gray-300 text-gray-600'"><i class="fab fa-tiktok"></i></a>
            <a href="#" class="w-9 h-9 border rounded-full flex items-center justify-center text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-[#0088cc] hover:border-[#0088cc]" :class="currentTheme === 'dark' ? 'bg-[#141414] border-[#2d2d2d] text-[#e5e7eb]' : 'bg-white border-gray-300 text-gray-600'"><i class="fab fa-telegram-plane"></i></a>
          </div>
        </div>

      </div>

      <hr class="my-6 transition-colors duration-300" :class="currentTheme === 'dark' ? 'border-gray-700/30' : 'border-gray-200'">

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        <div>
          <h6 class="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500">{{ t.payment }}</h6>
          <div class="flex items-center justify-center md:justify-start gap-5 select-none">
            <span class="font-sans font-black italic text-[1.2rem] tracking-tighter transition-colors duration-300" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">
              ABA' <span class="bg-[#00b5cc] text-black text-[0.65rem] font-black not-italic px-1.5 py-0.5 rounded vertical-middle tracking-normal">PAYWAY</span>
            </span>
            <i class="fab fa-cc-visa text-[#1434cb] text-[2.2rem] opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-105" title="Visa"></i>
            <i class="fab fa-cc-mastercard text-[#ff5f00] text-[2.2rem] opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-105" title="Mastercard"></i>
          </div>
        </div>

        <div class="text-xs text-gray-500 md:mt-6">
          <p class="m-0">{{ t.rightsReserved }} &copy; 2026</p>
        </div>

      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// កែប្រែ៖ ប្រកាសទទួលយក Prop `currentTheme` ពី App.vue
const props = defineProps({
  currentLang: { type: String, default: 'EN' },
  currentTheme: { type: String, default: 'dark' } // តម្លៃលំនាំដើមគឺ 'dark'
})

// វចនានុក្រមបកប្រែសម្រាប់ Footer
const translations = {
  EN: {
    company: 'Company', aboutUs: 'About Us', contactUs: 'Contact Us', cinemas: 'Cinemas',
    more: 'More', promotions: 'Promotions', newsActivity: 'News & Activity', myTicket: 'My Ticket', termsConditions: 'Terms & Conditions', privacyPolicy: 'Privacy & Policy',
    downloadApp: 'Download Our App', followSocial: 'Follow Our Social Media', payment: 'Payment', rightsReserved: 'All rights reserved'
  },
  KH: {
    company: 'ក្រុមហ៊ុន', aboutUs: 'អំពីយើង', contactUs: 'ទាក់ទងយើង', cinemas: 'រោងភាពយន្ត',
    more: 'បន្ថែមទៀត', promotions: 'ប្រម៉ូសិន', newsActivity: 'ព័ត៌មាន និងសកម្មភាព', myTicket: 'សំបុត្ររបស់ខ្ញុំ', termsConditions: 'លក្ខខណ្ឌផ្សេងៗ', privacyPolicy: 'គោលការណ៍ឯកជនភាព',
    downloadApp: 'ទាញយកកម្មវិធីទូរស័ព្ទ', followSocial: 'តាមដានបណ្តាញសង្គម', payment: 'ការទូទាត់ប្រាក់', rightsReserved: 'រក្សាសិទ្ធិគ្រប់យ៉ាង'
  }
}

const t = computed(() => translations[props.currentLang])
</script>

<style scoped>
.cubic-bezier {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>