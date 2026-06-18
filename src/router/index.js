import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import Location_Cinema from '@/components/Location_Cinema.vue'
// 💡 ប្រសិនបើបងប្អូនមាន Component សម្រាប់ Offers និង Food សូម import ចូលមកត្រង់នេះ៖
// import OffersPage from '@/views/OffersView.vue' 
// import FoodDrinkPage from '@/views/FoodDrinkView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    { 
      path: '/cinemas', 
      component: Location_Cinema 
    },
    
    // 🔥 បន្ថែម ២ ជួរនេះចូល ដើម្បីឱ្យស្គាល់ Route ពេលចុចពី Navbar
    { 
      path: '/offers', 
      component: HomePage // 👈 បណ្ដោះអាសន្នអាចដាក់ HomePage សិន ឬដូរទៅទំព័រ Offers របស់អ្នក
    },
    { 
      path: '/food-drink', 
      component: HomePage // 👈 បណ្ដោះអាសន្នអាចដាក់ HomePage សិន ឬដូរទៅទំព័រ Food របស់អ្នក
    }
  ],
})

export default router