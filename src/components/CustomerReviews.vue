<template>
  <!-- ប្ដូរពណ៌ផ្ទៃខាងក្រោយ និងអក្សរតាម theme -->
  <section :class="[currentTheme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900', 'py-16 transition-colors duration-300']">
    <div class="container mx-auto px-4">
      <!-- Title -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-yellow-400">
          ⭐ {{ currentLang === 'EN' ? 'Customer Reviews' : 'មតិរបស់អតិថិជន' }}
        </h2>
        <p :class="[currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600', 'mt-3']">
          {{ currentLang === 'EN' ? 'See what our customers say about Nancy Cinema.' : 'មើលពីមតិរបស់អតិថិជនយើងអំពី Nancy Cinema។' }}
        </p>
      </div>

      <!-- Reviews -->
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Review 1 -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200', 'p-6 rounded-2xl border hover:border-yellow-500 transition']">
          <div class="text-yellow-400 text-xl mb-3">★★★★★</div>
          <p :class="[currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700', 'mb-4']">
            {{ currentLang === 'EN' ? 'Best cinema experience in Cambodia! The seats are comfortable and the sound quality is amazing.' : 'បទពិសោធន៍រោងភាពយន្តល្អបំផុតក្នុងប្រទេសកម្ពុជា! កៅអីមានផាសុកភាព ហើយគុណភាពសម្លេងពិតជាអស្ចារ្យ។' }}
          </p>
          <h4 class="font-bold">John Doe</h4>
        </div>

        <!-- Review 2 -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200', 'p-6 rounded-2xl border hover:border-yellow-500 transition']">
          <div class="text-yellow-400 text-xl mb-3">★★★★★</div>
          <p :class="[currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700', 'mb-4']">
            {{ currentLang === 'EN' ? 'I love the VIP room. Great service and delicious snacks.' : 'ខ្ញុំចូលចិត្តបន្ទប់ VIP ណាស់។ សេវាកម្មល្អ ហើយអាហារសម្រន់ឆ្ងាញ់ៗ។' }}
          </p>
          <h4 class="font-bold">Sarah Kim</h4>
        </div>

        <!-- Review 3 -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200', 'p-6 rounded-2xl border hover:border-yellow-500 transition']">
          <div class="text-yellow-400 text-xl mb-3">★★★★★</div>
          <p :class="[currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700', 'mb-4']">
            {{ currentLang === 'EN' ? 'Easy online booking and excellent movie selection every week.' : 'ការកក់តាមអនឡាញងាយស្រួល ហើយមានជម្រើសភាពយន្តល្អៗរៀងរាល់សប្តាហ៍។' }}
          </p>
          <h4 class="font-bold">David Chen</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ទទួលយក props ពី App.vue
defineProps(['currentLang', 'currentTheme'])
</script>