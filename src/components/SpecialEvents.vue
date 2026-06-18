<template>
  <section :class="[currentTheme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900', 'py-16 transition-colors duration-300']">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-yellow-400">
          🎉 {{ currentLang === 'EN' ? 'Special Events' : 'ព្រឹត្តិការណ៍ពិសេស' }}
        </h2>
        <p :class="[currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600', 'mt-3']">
          {{ currentLang === 'EN' ? 'Enjoy exclusive cinema events and seasonal promotions.' : 'រីករាយជាមួយព្រឹត្តិការណ៍រោងភាពយន្តផ្តាច់មុខ និងការបញ្ចុះតម្លៃតាមរដូវកាល។' }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900' : 'bg-white', 'rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition']">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba" alt="Movie Night" class="w-full h-52 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">🎬 {{ currentLang === 'EN' ? 'Movie Marathon Night' : 'រាត្រីមារ៉ាតុងភាពយន្ត' }}</h3>
            <p :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ currentLang === 'EN' ? 'Watch 3 blockbuster movies in one night and get free popcorn.' : 'ទស្សនាភាពយន្តល្បីៗ ៣ រឿងក្នុងមួយយប់ និងទទួលបានពោតលីងឥតគិតថ្លៃ។' }}</p>
            <button class="mt-4 bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold">
              {{ currentLang === 'EN' ? 'Learn More' : 'ស្វែងយល់បន្ថែម' }}
            </button>
          </div>
        </div>

        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900' : 'bg-white', 'rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition']">
          <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c" alt="Family Weekend" class="w-full h-52 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">👨‍👩‍👧‍👦 {{ currentLang === 'EN' ? 'Family Weekend' : 'ចុងសប្តាហ៍សម្រាប់គ្រួសារ' }}</h3>
            <p :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ currentLang === 'EN' ? 'Special discounts for families every Saturday and Sunday.' : 'បញ្ចុះតម្លៃពិសេសសម្រាប់គ្រួសាររៀងរាល់ថ្ងៃសៅរ៍ និងថ្ងៃអាទិត្យ។' }}</p>
            <button class="mt-4 bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold">
              {{ currentLang === 'EN' ? 'Learn More' : 'ស្វែងយល់បន្ថែម' }}
            </button>
          </div>
        </div>

        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900' : 'bg-white', 'rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition']">
          <img src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4" alt="VIP Event" class="w-full h-52 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">👑 {{ currentLang === 'EN' ? 'VIP Premiere Night' : 'រាត្រីចាក់បញ្ចាំង VIP' }}</h3>
            <p :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ currentLang === 'EN' ? 'Be the first to watch upcoming movies with VIP benefits.' : 'ក្លាយជាអ្នកដំបូងដែលបានទស្សនាភាពយន្តថ្មីៗជាមួយនឹងអត្ថប្រយោជន៍ VIP។' }}</p>
            <button class="mt-4 bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold">
              {{ currentLang === 'EN' ? 'Learn More' : 'ស្វែងយល់បន្ថែម' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ទទួលយក props ពី App.vue
defineProps(['currentLang', 'currentTheme'])
</script>