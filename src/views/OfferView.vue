<template>
  <div :class="[currentTheme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900', 'min-h-screen transition-colors duration-300']">
    <h1 class="text-4xl font-bold text-center py-10">
      {{ currentLang === 'EN' ? 'Special Offers' : 'ការផ្តល់ជូនពិសេស' }}
    </h1>

    <MembershipCards :current-lang="currentLang" :current-theme="currentTheme" />
    <FoodCombos :current-lang="currentLang" :current-theme="currentTheme" />
    <FlashDeals :current-lang="currentLang" :current-theme="currentTheme" />
    <VIPExperience :current-lang="currentLang" :current-theme="currentTheme" />
    <SpecialEvents :current-lang="currentLang" :current-theme="currentTheme" />
    <CustomerReviews :current-lang="currentLang" :current-theme="currentTheme" />
    <CTABanner :current-lang="currentLang" :current-theme="currentTheme" />
  </div>
</template>

<script setup>
import CTABanner from '@/components/CTABanner.vue';
import CustomerReviews from '@/components/CustomerReviews.vue';
import FlashDeals from '@/components/FlashDeals.vue';
import FoodCombos from '@/components/FoodCombos.vue';
import MembershipCards from '@/components/MembershipCards.vue';
import SpecialEvents from '@/components/SpecialEvents.vue';
import VIPExperience from '@/components/VIPExperience.vue';

// ទទួលយក props ដែលផ្ញើមកពី App.vue តាមរយៈ router-view
defineProps(['currentLang', 'currentTheme'])
</script>