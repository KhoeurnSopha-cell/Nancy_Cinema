<template>
  <section :class="[currentTheme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-100 text-gray-900', 'py-16 transition-colors duration-300']">
    <div class="container mx-auto text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-6">
        👑 {{ currentLang === 'EN' ? 'VIP Experience' : 'បទពិសោធន៍ VIP' }}
      </h2>

      <p :class="[currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600', 'max-w-3xl mx-auto']">
        {{ currentLang === 'EN' ? 'Enjoy luxury reclining seats, priority booking, complimentary snacks, and premium service.' : 'រីករាយជាមួយកៅអីសម្រាកដ៏ប្រណីត ការកក់អាទិភាព អាហារសម្រន់ឥតគិតថ្លៃ និងសេវាកម្មលំដាប់ខ្ពស់។' }}
      </p>

      <button
        class="mt-8 px-8 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-600 transition"
      >
        {{ currentLang === 'EN' ? 'Upgrade Now' : 'តម្លើងកម្រិតឥឡូវនេះ' }}
      </button>
    </div>
  </section>
</template>

<script setup>
// ទទួលយក props ពី App.vue
defineProps(['currentLang', 'currentTheme'])
</script>