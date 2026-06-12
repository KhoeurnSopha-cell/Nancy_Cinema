<template>
  <footer class="bg-[#0b0707] text-[#a3a3a3] font-sans border-t border-[#1f1a1a] pt-12 pb-6">
    <div class="max-w-[1250px] mx-auto px-4">
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        
        <div>
          <h5 class="text-white font-bold text-sm md:text-[0.95rem] tracking-wider mb-4">{{ t.company }}</h5>
          <ul class="space-y-2.5 p-0 m-0 list-none">
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.aboutUs }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.contactUs }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.cinemas }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 class="text-white font-bold text-sm md:text-[0.95rem] tracking-wider mb-4">{{ t.more }}</h5>
          <ul class="space-y-2.5 p-0 m-0 list-none">
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.promotions }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.newsActivity }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.myTicket }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.termsConditions }}
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-[#9ca3af] no-underline transition-all duration-200 hover:text-[#e5e7eb] hover:pl-1">
                {{ t.privacyPolicy }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <h5 class="text-white font-bold text-sm md:text-[0.95rem] tracking-wider mb-4">{{ t.downloadApp }}</h5>
          <div class="flex gap-3">
            <a href="#" class="w-10 h-10 md:w-11 md:h-11 bg-[#141414] border border-[#2d2d2d] rounded-full flex items-center justify-center text-white text-lg no-underline transition-all duration-200 hover:bg-white hover:text-black hover:scale-108" title="Google Play">
              <i class="fab fa-google-play"></i>
            </a>
            <a href="#" class="w-10 h-10 md:w-11 md:h-11 bg-[#141414] border border-[#2d2d2d] rounded-full flex items-center justify-center text-white text-lg no-underline transition-all duration-200 hover:bg-white hover:text-black hover:scale-108" title="App Store">
              <i class="fab fa-apple"></i>
            </a>
          </div>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <h5 class="text-white font-bold text-sm md:text-[0.95rem] tracking-wider mb-4">{{ t.followSocial }}</h5>
          <div class="flex flex-wrap gap-2">
            <a href="#" class="w-9 h-9 bg-[#141414] border border-[#2d2d2d] rounded-full flex items-center justify-center text-[#e5e7eb] text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#1877f2] hover:border-[#1877f2]"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="w-9 h-9 bg-[#141414] border border-[#2d2d2d] rounded-full flex items-center justify-center text-[#e5e7eb] text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#c13584] hover:border-[#c13584]"><i class="fab fa-instagram"></i></a>
            <a href="#" class="w-9 h-9 bg-[#141414] border border-[#2d2d2d] rounded-full flex items-center justify-center text-[#e5e7eb] text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#ff0000] hover:border-[#ff0000]"><i class="fab fa-youtube"></i></a>
            <a href="#" class="w-9 h-9 bg-[#141414] border border-[#2d2d2d] rounded-full flex items-center justify-center text-[#e5e7eb] text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#010101] hover:border-[#444]"><i class="fab fa-tiktok"></i></a>
            <a href="#" class="w-9 h-9 bg-[#141414] border border-[#2d2d2d] rounded-full flex items-center justify-center text-[#e5e7eb] text-[0.95rem] no-underline transition-all duration-250 cubic-bezier hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#0088cc] hover:border-[#0088cc]"><i class="fab fa-telegram-plane"></i></a>
          </div>
        </div>

      </div>

      <hr class="border-gray-700/30 my-6">

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        <div>
          <h6 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{{ t.payment }}</h6>
          <div class="flex items-center justify-center md:justify-start gap-5 select-none">
            <span class="font-sans font-black italic text-white text-[1.2rem] tracking-tighter">
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

const props = defineProps({
  currentLang: { type: String, default: 'EN' }
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
/* សម្រាប់ជំនួយការបង្វិល Smooth ដូចការប្រើ Cubic-bezier ក្នុង CSS ចាស់ */
.cubic-bezier {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>