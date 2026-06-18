<template>
  <section class="py-16 bg-black text-white">
    <div class="container mx-auto px-4">
      <div
        class="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-yellow-500 rounded-3xl p-10 text-center shadow-2xl"
      >
        <h2 class="text-4xl font-bold mb-4">
          🔥 Flash Deals
        </h2>

        <p class="text-lg mb-8">
          Limited-Time Cinema Offers
        </p>

        <!-- Countdown -->
        <div class="flex justify-center gap-4 mb-8">
          <div class="bg-black/30 px-6 py-4 rounded-xl">
            <h3 class="text-4xl font-bold">{{ hours }}</h3>
            <p>Hours</p>
          </div>

          <div class="bg-black/30 px-6 py-4 rounded-xl">
            <h3 class="text-4xl font-bold">{{ minutes }}</h3>
            <p>Minutes</p>
          </div>

          <div class="bg-black/30 px-6 py-4 rounded-xl">
            <h3 class="text-4xl font-bold">{{ seconds }}</h3>
            <p>Seconds</p>
          </div>
        </div>

        <!-- Deals -->
        <div class="grid md:grid-cols-2 gap-4 text-left">
          <div class="bg-black/20 p-4 rounded-xl">
            🎟 50% OFF Tuesday Tickets
          </div>

          <div class="bg-black/20 p-4 rounded-xl">
            🍿 Buy 1 Get 1 Free Popcorn
          </div>

          <div class="bg-black/20 p-4 rounded-xl">
            🥤 Free Drink with VIP Ticket
          </div>

          <div class="bg-black/20 p-4 rounded-xl">
            🎬 Watch 3 Movies, Pay for 2
          </div>
        </div>

        <button
          class="mt-8 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900 transition"
        >
          Claim Deal Now
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

// 24-hour countdown
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

  hours.value = String(
    Math.floor((distance / (1000 * 60 * 60)) % 24)
  ).padStart(2, '0')

  minutes.value = String(
    Math.floor((distance / (1000 * 60)) % 60)
  ).padStart(2, '0')

  seconds.value = String(
    Math.floor((distance / 1000) % 60)
  ).padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>