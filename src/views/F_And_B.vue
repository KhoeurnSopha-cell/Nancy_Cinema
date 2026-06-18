<template>
    <section class="py-20 transition-colors duration-300"
        :class="currentTheme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'">

        <div class="container mx-auto px-6">
            <div class="flex justify-center gap-4 mb-12">
                <button v-for="tab in ['All', 'Combos', 'Drinks', 'Snacks']" :key="tab" @click="activeTab = tab" :class="[
                    activeTab === tab ? 'bg-yellow-500 text-black' : (currentTheme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-gray-200 text-gray-800'),
                    'px-6 py-2 rounded-full font-bold transition-all'
                ]">
                    {{ tab }}
                </button>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="item in filteredItems" :key="item.id"
                    class="group rounded-2xl overflow-hidden border transition-all duration-300"
                    :class="currentTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-yellow-500' : 'bg-gray-100 border-gray-200 hover:border-yellow-500'">

                    <div class="h-48 overflow-hidden">
                        <img :src="item.img" :alt="item.title"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>

                    <div class="p-5">
                        <h3 class="font-bold text-lg mb-1">{{ currentLang === 'EN' ? item.title : item.title_kh }}</h3>
                        <p class="text-sm mb-4 h-10 line-clamp-2"
                            :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">
                            {{ currentLang === 'EN' ? item.desc : item.desc_kh }}
                        </p>

                        <div class="flex justify-between items-center">
                            <span class="text-yellow-500 font-black text-xl">{{ item.price }}</span>
                            <button
                                class="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition">
                                {{ currentLang === 'EN' ? 'Add' : 'បន្ថែម' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// ទទួលយក props ពី parent component
defineProps(['currentLang', 'currentTheme'])

const activeTab = ref('All')

const items = ref([

    // Combos

    { id: 1, title: 'Mega Combo', desc: 'Large Popcorn + 2 Coke', price: '$8.50', type: 'Combos', img: 'https://i.pinimg.com/736x/c2/ae/1c/c2ae1c52067830eead5ecfcad57f4759.jpg' },

    { id: 2, title: 'Cinema Classic', desc: 'Medium Popcorn + 1 Coke', price: '$5.99', type: 'Combos', img: 'https://i.pinimg.com/1200x/8f/1d/f6/8f1df6baa083dba25706d30d61f50f02.jpg' },

    { id: 3, title: 'Family Set', desc: '2 Large Popcorn + 3 Coke', price: '$15.00', type: 'Combos', img: 'https://i.pinimg.com/1200x/9b/c5/df/9bc5df7de967226d468f01de5891cb0b.jpg' },

    { id: 4, title: 'VIP Snack Box', desc: 'Gourmet Popcorn + Nachos', price: '$12.00', type: 'Combos', img: 'https://i.pinimg.com/1200x/ed/a9/b1/eda9b144b329f7c92b2a14b2bc194cc3.jpg' },

    { id: 5, title: 'Couple Combo', desc: '1 Large Popcorn + 2 Coke', price: '$7.50', type: 'Combos', img: 'https://i.pinimg.com/736x/24/89/52/248952f9621bb30f448b678b9d1ed356.jpg' },

    { id: 6, title: 'Burger Combo', desc: 'Angus Beef Burger + Coke', price: '$9.50', type: 'Combos', img: 'https://i.pinimg.com/736x/47/de/c6/47dec63a720995ef19ed694330c96993.jpg' },
    // Drinks
    { id: 7, title: 'Iced Americano', desc: 'Strong Black Coffee', price: '$3.00', type: 'Drinks', img: 'https://i.pinimg.com/736x/3e/c9/fe/3ec9fe32c6217014789b5f42e2343f47.jpg' },

    { id: 8, title: 'Caramel Latte', desc: 'Sweet Creamy Coffee', price: '$4.20', type: 'Drinks', img: 'https://i.pinimg.com/736x/c9/c5/01/c9c5013a47c78dde12d22a8659cdb945.jpg' },

    { id: 9, title: 'Coca-Cola', desc: 'Ice Cold Original', price: '$2.00', type: 'Drinks', img: 'https://i.pinimg.com/1200x/9b/eb/fd/9bebfdf8e3c0e0133e0613c3df423345.jpg' },

]);

const filteredItems = computed(() => {
    return activeTab.value === 'All' ? items.value : items.value.filter(i => i.type === activeTab.value)
})
</script>