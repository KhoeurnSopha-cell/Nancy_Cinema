<template>
  <div class="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
    
    <section class="relative w-full h-[400px] rounded-3xl overflow-hidden mb-12 shadow-2xl group">
      <img 
        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        alt="Cinema Banner"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0b0707] via-transparent to-transparent flex flex-col justify-end p-10">
        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">{{ t.title }}</h1>
        <p class="text-gray-200 mt-2 text-lg">{{ t.subtitle }}</p>
      </div>
    </section>

    <section>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="cinema in cinemas" 
          :key="cinema.id" 
          class="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group bg-white dark:bg-[#161616] border-gray-200 dark:border-white/10 hover:border-[#e50914]/50"
        >
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ cinema.name }}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">{{ cinema.address }}</p>
          
          <button 
            @click="openBooking(cinema)"
            class="w-full py-3.5 border rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 border-red-300 dark:border-red-900/50 hover:bg-[#e50914] hover:text-white text-gray-900 dark:text-gray-200"
          >
            {{ t.bookBtn }}
          </button>
        </div>
      </div>
    </section>

    <div v-if="selectedCinema" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="selectedCinema = null"></div>
      
      <div class="relative p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in duration-300 bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10">
        <h2 class="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{{ selectedCinema.name }}</h2>
        <p class="text-gray-500 dark:text-gray-200 mb-6">{{ t.selectTime }}</p>
        
        <div class="grid grid-cols-2 gap-3">
          <button 
            v-for="time in ['10:00 AM', '01:30 PM', '04:45 PM', '08:00 PM']" 
            :key="time"
            @click="handleBooking(time)"
            class="py-3 border rounded-xl transition-all active:scale-95 hover:bg-[#e50914] hover:text-white hover:border-transparent border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-200"
          >
            {{ time }}
          </button>
        </div>
        
        <button @click="selectedCinema = null" class="mt-6 w-full py-3 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors">
          {{ t.cancel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  currentLang: { type: String, default: 'EN' },
  currentTheme: { type: String, default: 'dark' }
})

const translations = {
  EN: {
    title: 'Nency Cinema',
    subtitle: 'Premium Movie Experience',
    bookBtn: 'Book Showtimes',
    selectTime: 'Select your preferred showtime:',
    cancel: 'Cancel'
  },
  KH: {
    title: 'រោងភាពយន្ត នេន់ស៊ី',
    subtitle: 'បទពិសោធន៍ភាពយន្តពិសេស',
    bookBtn: 'កក់ម៉ោងបញ្ចាំង',
    selectTime: 'ជ្រើសរើសម៉ោងបញ្ចាំង៖',
    cancel: 'បោះបង់'
  }
}

const t = computed(() => translations[props.currentLang])

const cinemas = computed(() => [
  { 
    id: 1, 
    name: 'Nency City Mall', 
    address: props.currentLang === 'EN' ? '2nd Floor, City Mall, Phnom Penh.' : 'ជាន់ទី២, ស៊ីធី មល, ភ្នំពេញ។'
  },
  { 
    id: 2, 
    name: 'Nency Exchange', 
    address: props.currentLang === 'EN' ? 'Exchange Square, Phnom Penh.' : 'អ៊ិចហ្ចិន ស្ក្វែរ, ភ្នំពេញ។'
  },
  { 
    id: 3, 
    name: 'Nency Eden', 
    address: props.currentLang === 'EN' ? 'Eden Garden, Phnom Penh.' : 'អ៊ែតឹន ហ្គាដិន, ភ្នំពេញ។'
  }
])

const selectedCinema = ref(null)

const openBooking = (cinema) => {
  selectedCinema.value = cinema
}

const handleBooking = (time) => {
  alert(`You booked ${selectedCinema.value.name} at ${time}`)
  selectedCinema.value = null
}
</script>

<style scoped>
.animate-in { animation: fadeIn 0.8s ease-out; }
.zoom-in { animation: zoomIn 0.3s ease-out; }

@keyframes fadeIn { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}
@keyframes zoomIn { 
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
}
</style>