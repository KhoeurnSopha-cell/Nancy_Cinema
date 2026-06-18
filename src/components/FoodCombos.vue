<template>
  <!-- ប្ដូរពណ៌ផ្ទៃខាងក្រោយ និងអក្សរតាម theme -->
  <section :class="[currentTheme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900', 'py-16 transition-colors duration-300']">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center text-yellow-400 mb-10">
        🍿 {{ currentLang === 'EN' ? 'Food & Beverage Offers' : 'ការផ្តល់ជូនអាហារ និងភេសជ្ជៈ' }}
      </h2>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Combo 1 -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100', 'p-6 rounded-2xl transition-colors']">
          <h3 class="text-xl font-bold">{{ currentLang === 'EN' ? 'Combo 1' : 'កញ្ចប់ ១' }}</h3>
          <p>{{ currentLang === 'EN' ? 'Popcorn + Coke' : 'ពោតលីង + កូកាកូឡា' }}</p>
          <p class="text-yellow-400 text-2xl mt-3">$5.99</p>
        </div>

        <!-- Combo 2 -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100', 'p-6 rounded-2xl transition-colors']">
          <h3 class="text-xl font-bold">{{ currentLang === 'EN' ? 'Combo 2' : 'កញ្ចប់ ២' }}</h3>
          <p>{{ currentLang === 'EN' ? 'Popcorn + Hotdog + Coke' : 'ពោតលីង + ហតដុក + កូកាកូឡា' }}</p>
          <p class="text-yellow-400 text-2xl mt-3">$9.99</p>
        </div>

        <!-- Combo 3 -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100', 'p-6 rounded-2xl transition-colors']">
          <h3 class="text-xl font-bold">{{ currentLang === 'EN' ? 'Combo 3' : 'កញ្ចប់ ៣' }}</h3>
          <p>{{ currentLang === 'EN' ? 'Family Combo' : 'កញ្ចប់គ្រួសារ' }}</p>
          <p class="text-yellow-400 text-2xl mt-3">$14.99</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ទទួលយក props ពី App.vue
defineProps(['currentLang', 'currentTheme'])
</script>