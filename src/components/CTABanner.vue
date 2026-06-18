<template>
  <div 
    :class="[
      currentTheme === 'dark' ? 'from-red-600 to-purple-600' : 'from-yellow-400 to-orange-500',
      'relative bg-gradient-to-r text-white py-16 px-6 rounded-2xl overflow-hidden shadow-xl transition-colors duration-300'
    ]"
  >
    <div class="absolute inset-0 opacity-20 bg-black"></div>

    <div class="relative max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-5xl font-bold mb-4">
        {{ currentLang === 'EN' ? 'Unlimited Movies, TV Shows & More' : 'ភាពយន្ត កម្មវិធីទូរទស្សន៍ និងច្រើនទៀត' }}
      </h2>

      <p class="text-sm md:text-lg text-white/90 mb-8">
        {{ currentLang === 'EN' ? 'Watch anywhere. Cancel anytime. Start your journey today.' : 'ទស្សនាគ្រប់ទីកន្លែង។ បោះបង់ពេលណាក៏បាន។ ចាប់ផ្ដើមថ្ងៃនេះ។' }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button class="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
          {{ currentLang === 'EN' ? '🚀 Get Started' : '🚀 ចាប់ផ្ដើម' }}
        </button>
        <button class="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
          {{ currentLang === 'EN' ? '🎬 Browse Movies' : '🎬 រុករកភាពយន្ត' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// ទទួលយក props ពី App.vue
defineProps(['currentLang', 'currentTheme'])
</script>