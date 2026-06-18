<template>
  <section class="py-16 bg-black text-white">
    <div class="container mx-auto px-4">
      
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-yellow-400">
          Membership Plans
        </h2>
        <p class="text-gray-400 mt-2">
          Enjoy exclusive rewards and premium cinema experiences
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        
        <!-- Silver -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:scale-105 transition duration-300">
          <h3 class="text-2xl font-bold mb-2">Silver</h3>
          <p class="text-gray-400 mb-6">Perfect for casual movie lovers</p>

          <div class="text-4xl font-bold text-yellow-400 mb-6">
            $29
          </div>

          <ul class="space-y-3 text-gray-300">
            <li>✓ 5% Ticket Discount</li>
            <li>✓ Birthday Reward</li>
            <li>✓ Earn Loyalty Points</li>
            <li>✓ Online Booking</li>
          </ul>

          <button class="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl">
            Join Now
          </button>
        </div>

        <!-- Gold -->
        <div class="bg-gradient-to-b from-yellow-500/20 to-black border-2 border-yellow-500 rounded-3xl p-8 hover:scale-105 transition duration-300 relative">
          <span class="absolute top-4 right-4 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
            MOST POPULAR
          </span>

          <h3 class="text-2xl font-bold mb-2 text-yellow-400">
            Gold
          </h3>

          <p class="text-gray-300 mb-6">
            Best value for regular visitors
          </p>

          <div class="text-4xl font-bold text-yellow-400 mb-6">
            $59
          </div>

          <ul class="space-y-3 text-gray-200">
            <li>✓ 15% Ticket Discount</li>
            <li>✓ Free Popcorn Monthly</li>
            <li>✓ Birthday Ticket</li>
            <li>✓ Priority Booking</li>
            <li>✓ Double Reward Points</li>
          </ul>

          <button class="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl">
            Join Now
          </button>
        </div>

        <!-- Diamond -->
        <div class="bg-zinc-900 border border-cyan-400 rounded-3xl p-8 hover:scale-105 transition duration-300">
          <h3 class="text-2xl font-bold text-cyan-400 mb-2">
            Diamond
          </h3>

          <p class="text-gray-400 mb-6">
            Ultimate luxury experience
          </p>

          <div class="text-4xl font-bold text-cyan-400 mb-6">
            $99
          </div>

          <ul class="space-y-3 text-gray-300">
            <li>✓ 25% Ticket Discount</li>
            <li>✓ Free VIP Upgrade</li>
            <li>✓ Free Monthly Combo</li>
            <li>✓ Priority Booking</li>
            <li>✓ Triple Reward Points</li>
            <li>✓ Exclusive Events</li>
          </ul>

          <button class="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-xl">
            Join Now
          </button>
        </div>

      </div>
    </div>
  </section>
</template>