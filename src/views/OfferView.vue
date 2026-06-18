<template>
  <div class="min-h-screen bg-black text-white">
    <h1 class="text-4xl font-bold text-center py-10">
      Special Offers
    </h1>

    <!-- Your offers components here -->
    <MembershipCards />
    <FoodCombos />
    <FlashDeals />
    <VIPExperience />
    <SpecialEvents />
    <CustomerReviews />
    <CTABanner />
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
</script>