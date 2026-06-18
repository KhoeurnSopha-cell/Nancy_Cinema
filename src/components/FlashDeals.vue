<template>
  <!-- ប្ដូរពណ៌ផ្ទៃខាងក្រោយ និងអក្សរតាម theme -->
  <section :class="[currentTheme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900', 'py-16 transition-colors duration-300']">
    <div class="container mx-auto px-4">
      <div
        class="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-yellow-500 rounded-3xl p-10 text-center shadow-2xl text-white"
      >
        <h2 class="text-4xl font-bold mb-4">
          🔥 {{ currentLang === 'EN' ? 'Flash Deals' : 'ប្រូម៉ូសិនពិសេស' }}
        </h2>

        <p class="text-lg mb-8">
          {{ currentLang === 'EN' ? 'Limited-Time Cinema Offers' : 'ការផ្តល់ជូនពិសេសសម្រាប់រយៈពេលកំណត់' }}
        </p>

        <!-- Countdown -->
        <div class="flex justify-center gap-4 mb-8">
          <div class="bg-black/30 px-6 py-4 rounded-xl">
            <h3 class="text-4xl font-bold">{{ hours }}</h3>
            <p>{{ currentLang === 'EN' ? 'Hours' : 'ម៉ោង' }}</p>
          </div>

          <div class="bg-black/30 px-6 py-4 rounded-xl">
            <h3 class="text-4xl font-bold">{{ minutes }}</h3>
            <p>{{ currentLang === 'EN' ? 'Minutes' : 'នាទី' }}</p>
          </div>

          <div class="bg-black/30 px-6 py-4 rounded-xl">
            <h3 class="text-4xl font-bold">{{ seconds }}</h3>
            <p>{{ currentLang === 'EN' ? 'Seconds' : 'វិនាទី' }}</p>
          </div>
        </div>

        <!-- Deals -->
        <div class="grid md:grid-cols-2 gap-4 text-left">
          <div class="bg-black/20 p-4 rounded-xl">
            🎟 {{ currentLang === 'EN' ? '50% OFF Tuesday Tickets' : 'បញ្ចុះតម្លៃ 50% សម្រាប់សំបុត្រថ្ងៃអង្គារ' }}
          </div>

          <div class="bg-black/20 p-4 rounded-xl">
            🍿 {{ currentLang === 'EN' ? 'Buy 1 Get 1 Free Popcorn' : 'ទិញ ១ ថែម ១ សម្រាប់ពោតលីង' }}
          </div>

          <div class="bg-black/20 p-4 rounded-xl">
            🥤 {{ currentLang === 'EN' ? 'Free Drink with VIP Ticket' : 'ភេសជ្ជៈឥតគិតថ្លៃជាមួយសំបុត្រ VIP' }}
          </div>

          <div class="bg-black/20 p-4 rounded-xl">
            🎬 {{ currentLang === 'EN' ? 'Watch 3 Movies, Pay for 2' : 'ទស្សនាភាពយន្ត ៣ រឿង បង់ថ្លៃតែ ២ រឿង' }}
          </div>
        </div>

        <button
          class="mt-8 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900 transition"
        >
          {{ currentLang === 'EN' ? 'Claim Deal Now' : 'យកប្រូម៉ូសិនឥឡូវនេះ' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ទទួលយក props ពី App.vue
defineProps(['currentLang', 'currentTheme'])

const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

const targetDate = new Date().getTime() + 24 * 60 * 60 * 1000
let timer

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance <= 0) {
    clearInterval(timer)
    hours.value = '00'
    minutes.value = '00'
    seconds.value = '00'
    return
  }

  hours.value = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0')
  minutes.value = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0')
  seconds.value = String(Math.floor((distance / 1000) % 60)).padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>