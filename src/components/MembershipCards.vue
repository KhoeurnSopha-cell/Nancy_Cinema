<template>
  <!-- ប្ដូរពណ៌ផ្ទៃខាងក្រោយ និងអក្សរតាម theme -->
  <section :class="[currentTheme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900', 'py-16 transition-colors duration-300']">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-yellow-400">
          {{ currentLang === 'EN' ? 'Membership Plans' : 'ផែនការសមាជិកភាព' }}
        </h2>
        <p :class="[currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600', 'mt-2']">
          {{ currentLang === 'EN' ? 'Enjoy exclusive rewards and premium cinema experiences' : 'រីករាយជាមួយរង្វាន់ផ្តាច់មុខ និងបទពិសោធន៍រោងភាពយន្តលំដាប់ខ្ពស់' }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- Silver -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200', 'border rounded-3k p-8 hover:scale-105 transition duration-300']">
          <h3 class="text-2xl font-bold mb-2">{{ currentLang === 'EN' ? 'Silver' : 'ប្រាក់' }}</h3>
          <p :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ currentLang === 'EN' ? 'Perfect for casual movie lovers' : 'សាកសមសម្រាប់អ្នកចូលចិត្តមើលកុន' }}</p>

          <div class="text-4xl font-bold text-yellow-400 mb-6">$29</div>
          <ul :class="[currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700', 'space-y-3']">
            <li>✓ {{ currentLang === 'EN' ? '5% Ticket Discount' : 'បញ្ចុះតម្លៃសំបុត្រ 5%' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Birthday Reward' : 'រង្វាន់ថ្ងៃកំណើត' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Earn Loyalty Points' : 'ទទួលបានពិន្ទុ' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Online Booking' : 'ការកក់តាមអនឡាញ' }}</li>
          </ul>
          <button class="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl">
            {{ currentLang === 'EN' ? 'Join Now' : 'ចូលរួមឥឡូវនេះ' }}
          </button>
        </div>

        <!-- Gold -->
        <div :class="[currentTheme === 'dark' ? 'from-yellow-500/20 to-black' : 'from-yellow-500/20 to-white', 'bg-gradient-to-b border-2 border-yellow-500 rounded-3xl p-8 hover:scale-105 transition duration-300 relative']">
          <span class="absolute top-4 right-4 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
            {{ currentLang === 'EN' ? 'MOST POPULAR' : 'ពេញនិយមបំផុត' }}
          </span>
          <h3 class="text-2xl font-bold mb-2 text-yellow-400">{{ currentLang === 'EN' ? 'Gold' : 'មាស' }}</h3>
          <p :class="currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'">{{ currentLang === 'EN' ? 'Best value for regular visitors' : 'តម្លៃល្អបំផុតសម្រាប់អ្នកមកញឹកញាប់' }}</p>
          <div class="text-4xl font-bold text-yellow-400 mb-6">$59</div>
          <ul :class="[currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-800', 'space-y-3']">
            <li>✓ {{ currentLang === 'EN' ? '15% Ticket Discount' : 'បញ្ចុះតម្លៃសំបុត្រ 15%' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Free Popcorn Monthly' : 'ពោតលីងឥតគិតថ្លៃប្រចាំខែ' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Birthday Ticket' : 'សំបុត្រថ្ងៃកំណើត' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Priority Booking' : 'ការកក់អាទិភាព' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Double Reward Points' : 'ពិន្ទុទ្វេដង' }}</li>
          </ul>
          <button class="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl">
            {{ currentLang === 'EN' ? 'Join Now' : 'ចូលរួមឥឡូវនេះ' }}
          </button>
        </div>

        <!-- Diamond -->
        <div :class="[currentTheme === 'dark' ? 'bg-zinc-900 border-cyan-400' : 'bg-gray-100 border-cyan-500', 'border rounded-3xl p-8 hover:scale-105 transition duration-300']">
          <h3 class="text-2xl font-bold text-cyan-400 mb-2">{{ currentLang === 'EN' ? 'Diamond' : 'ពេជ្រ' }}</h3>
          <p :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ currentLang === 'EN' ? 'Ultimate luxury experience' : 'បទពិសោធន៍ដ៏ប្រណីតបំផុត' }}</p>
          <div class="text-4xl font-bold text-cyan-400 mb-6">$99</div>
          <ul :class="[currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700', 'space-y-3']">
            <li>✓ {{ currentLang === 'EN' ? '25% Ticket Discount' : 'បញ្ចុះតម្លៃសំបុត្រ 25%' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Free VIP Upgrade' : 'តំឡើង VIP ឥតគិតថ្លៃ' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Free Monthly Combo' : 'Combo ប្រចាំខែឥតគិតថ្លៃ' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Priority Booking' : 'ការកក់អាទិភាព' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Triple Reward Points' : 'ពិន្ទុបីដង' }}</li>
            <li>✓ {{ currentLang === 'EN' ? 'Exclusive Events' : 'ព្រឹត្តិការណ៍ផ្តាច់មុខ' }}</li>
          </ul>
          <button class="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-xl">
            {{ currentLang === 'EN' ? 'Join Now' : 'ចូលរួមឥឡូវនេះ' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ទទួលយក props ពី App.vue
defineProps(['currentLang', 'currentTheme'])
</script>