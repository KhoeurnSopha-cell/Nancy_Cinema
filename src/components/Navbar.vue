<template>
  <div>
    <div class="fixed top-0 left-0 w-full z-[1000] backdrop-blur-xl border-b transition-colors duration-300 shadow-lg"
      :class="currentTheme === 'dark' ? 'bg-[#0b0707]/90 border-white/5 text-white' : 'bg-white/90 border-gray-200 text-gray-800'">

      <header
        class="relative flex justify-between items-center px-4 md:px-6 h-[65px] border-b transition-colors duration-300"
        :class="currentTheme === 'dark'
          ? 'bg-[#251c1c] border-white/10 text-white'
          : 'bg-gray-100 border-gray-200 text-gray-800'">

        <div class="absolute left-1/2 -translate-x-1/2 ">
          <img src="/Nencylogo.png" class="h-35 w-auto object-contain" alt="Logo" />
        </div>
        <div
          class="searchBox relative z-[9999] flex items-center md:px-4 md:rounded-full md:border h-9 w-56 bg-gray-100 dark:bg-[#251c1c] transition-all">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/013/083/246/small/search-ui-icon-png.png"
            class="w-4.5 h-4.5 ml-2">

          <input v-model="searchQuery" type="text" :placeholder="t.searchMovies"
            class="w-full bg-transparent pl-2 text-[12px] outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-all text-neutral-800 dark:text-neutral-200" />

          <div v-if="searchQuery"
            class="absolute top-11 left-0 w-64 max-h-60 overflow-y-auto rounded-xl shadow-xl border backdrop-blur-lg z-[99999]"
            :class="currentTheme === 'dark' ? 'bg-[#1a1313]/95 border-white/10' : 'bg-white/95 border-gray-200'">
            <div v-if="filteredMovies.length === 0" class="p-3 text-center text-xs text-gray-400">
              {{ currentLang === 'EN' ? 'No movies found' : 'រកមិនឃើញភាពយន្តទេ' }}
            </div>
            <div v-else>
              <div v-for="movie in filteredMovies" :key="movie.id" @click="selectMovieFromSearch(movie)"
                class="p-2.5 flex items-center gap-3 cursor-pointer transition-colors border-b last:border-0"
                :class="currentTheme === 'dark' ? 'hover:bg-white/5 border-white/5' : 'hover:bg-gray-50 border-gray-100'">
                <img :src="movie.poster || movie.image"
                  class="w-9 h-12 object-cover rounded-md bg-neutral-800 shadow-sm" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-semibold truncate">{{ movie.title?.[currentLang] || movie.title?.EN }}</h4>
                  <p class="text-[10px] text-gray-400 truncate">{{ movie.genre || 'Action' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center md:gap-4 gap-2 z-[9999]">
          <!-- ប៊ូតុង Ticket -->
          <!-- ប៊ូតុង Ticket នៅក្នុង Navbar.vue -->
          <button @click="showTicketsModal = true"
            class="relative p-2 text-gray-400 hover:text-white transition-colors duration-200 group">
            <!-- រូប Icon សំបុត្រ -->
            <Ticket class="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />

            <!-- 💡 លេខពណ៌ក្រហមបង្ហាញចំនួនសំបុត្រ (លោតឡើងអូតូ និងរាងមូលស្អាត) -->
            <span v-if="userTicketCount > 0"
              class="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center animate-pulse shadow-md">
              {{ userTicketCount }}
            </span>
          </button>

          <button @click="openAuthModal('login')"
            class="md:px-5 md:py-1.5 px-3 py-1 bg-[#e50914] text-white text-xs md:text-sm font-semibold rounded-full hover:bg-red-700 transition-all shadow-md shadow-red-600/20 active:scale-95">
            {{ t.joinNow }}
          </button>

          <div class="relative lang-dropdown-container">
            <button @click="toggleDropdown"
              class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all text-xs font-medium"
              :class="currentTheme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'">
              <span>{{ currentLang === 'EN' ? '🇬🇧 EN' : '🇰🇭 KH' }}</span>
              <ChevronDown class="w-3.5 h-3.5 transition-transform duration-300"
                :class="{ 'rotate-180': isDropdownOpen }" />
            </button>

            <div v-if="isDropdownOpen"
              class="absolute right-0 mt-1.5 w-28 rounded-xl shadow-xl border overflow-hidden backdrop-blur-md z-50 animate-[fadeIn_0.2s_ease-out]"
              :class="currentTheme === 'dark' ? 'bg-[#1a1313]/95 border-white/10' : 'bg-white/95 border-gray-200'">
              <button @click="changeLanguage('EN')"
                class="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors"
                :class="[currentLang === 'EN' ? 'bg-[#e50914] text-white' : (currentTheme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50')]">
                <span>🇬🇧</span> English
              </button>
              <button @click="changeLanguage('KH')"
                class="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors"
                :class="[currentLang === 'KH' ? 'bg-[#e50914] text-white' : (currentTheme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50')]">
                <span>🇰🇭</span> ភាសាខ្មែរ
              </button>
            </div>
          </div>

          <button @click="$emit('toggle-theme')" class="p-2 rounded-full border transition-colors duration-300"
            :class="currentTheme === 'dark' ? 'border-white/10 text-yellow-400 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'">
            <Sun v-if="currentTheme === 'dark'" class="w-4 h-4" />
            <Moon v-else class="w-4 h-4" />
          </button>
        </div>
      </header>

      <nav
        class=" m flex items-center justify-start px-4 md:px-6 h-[45px] overflow-x-auto no-scrollbar scroll-smooth gap-6 text-xs md:text-sm font-medium">
        <router-link to="/" class=" hover:text-[#e50914] transition-colors whitespace-nowrap"
          :class="{ 'text-[#e50914]': route.path === '/' }">{{ t.home }}</router-link>
        <router-link to="/cinemas" class="hover:text-[#e50914] transition-colors whitespace-nowrap"
          :class="{ 'text-[#e50914]': route.path === '/cinemas' }">{{ t.cinemas }}</router-link>
        <router-link to="/offers" class="hover:text-[#e50914] transition-colors whitespace-nowrap"
          :class="{ 'text-[#e50914]': route.path === '/offers' }">{{ t.offers }}</router-link>
        <router-link to="/fb" class="hover:text-[#e50914] transition-colors whitespace-nowrap"
          :class="{ 'text-[#e50914]': route.path === '/fb' }">{{ t.fb }}</router-link>
      </nav>
    </div>

    <div v-if="showModal"
      class="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div @click.stop
        class="relative w-full max-w-md p-6 md:p-8 rounded-2xl shadow-2xl transition-all duration-300 border animate-[slideUp_0.3s_ease-out]"
        :class="currentTheme === 'dark' ? 'bg-[#141010] border-white/5 text-white shadow-black/80' : 'bg-white border-gray-100 text-gray-800 shadow-gray-300/50'">

        <button @click="closeModal"
          class="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-500/10 transition-colors">
          <X class="w-5 h-5 text-gray-400" />
        </button>

        <div class="flex gap-4 border-b pb-3 mb-5"
          :class="currentTheme === 'dark' ? 'border-white/5' : 'border-gray-100'">
          <button @click="switchTab('login')" class="text-lg font-bold pb-1 transition-all relative"
            :class="activeAuthTab === 'login' ? (currentTheme === 'dark' ? 'text-white' : 'text-black') : 'text-gray-400'">
            {{ t.loginTitle }}
            <div v-if="activeAuthTab === 'login'"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-[#e50914] rounded-full"></div>
          </button>
          <button @click="switchTab('signup')" class="text-lg font-bold pb-1 transition-all relative"
            :class="activeAuthTab === 'signup' ? (currentTheme === 'dark' ? 'text-white' : 'text-black') : 'text-gray-400'">
            {{ t.signUpTitle }}
            <div v-if="activeAuthTab === 'signup'"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-[#e50914] rounded-full"></div>
          </button>
        </div>

        <p class="text-xs text-gray-400 mb-6">{{ t.authSubtitle }}</p>

        <form @submit.prevent="handleSubmit" class="space-y-4.5">
          <div class="flex p-0.5 rounded-lg bg-neutral-500/5 border"
            :class="currentTheme === 'dark' ? 'border-white/5' : 'border-gray-200'">
            <button type="button" @click="loginMethod = 'username'"
              class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all"
              :class="loginMethod === 'username' ? 'bg-[#e50914] text-white shadow-sm' : 'text-gray-400'">
              {{ t.usernameLabel }}
            </button>
            <button type="button" @click="loginMethod = 'phone'"
              class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all"
              :class="loginMethod === 'phone' ? 'bg-[#e50914] text-white shadow-sm' : 'text-gray-400'">
              {{ t.phoneLabel }}
            </button>
          </div>

          <div v-if="loginMethod === 'username'" class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-400">{{ t.usernameLabel }}</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input v-model="formData.username" type="text" :placeholder="t.usernamePlaceholder"
                class="w-full pl-9 pr-4 py-2.5 bg-neutral-500/5 border rounded-xl text-sm outline-none transition-all"
                :class="currentTheme === 'dark' ? 'border-white/5 focus:border-[#e50914] text-white' : 'border-gray-200 focus:border-[#e50914] text-black'" />
            </div>
          </div>

          <div v-else class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-400">{{ t.phoneLabel }}</label>
            <div class="relative">
              <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input v-model="formData.phone" type="text" :placeholder="t.phonePlaceholder"
                class="w-full pl-9 pr-4 py-2.5 bg-neutral-500/5 border rounded-xl text-sm outline-none transition-all"
                :class="currentTheme === 'dark' ? 'border-white/5 focus:border-[#e50914] text-white' : 'border-gray-200 focus:border-[#e50914] text-black'" />
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label class="text-xs font-semibold text-gray-400">{{ t.passwordLabel }}</label>
              <a v-if="activeAuthTab === 'login'" href="#" class="text-[11px] text-[#e50914] hover:underline">{{
                t.forgotPassword }}</a>
            </div>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input v-model="formData.password" :type="isPasswordVisible ? 'text' : 'password'"
                :placeholder="t.passwordPlaceholder"
                class="w-full pl-9 pr-10 py-2.5 bg-neutral-500/5 border rounded-xl text-sm outline-none transition-all"
                :class="currentTheme === 'dark' ? 'border-white/5 focus:border-[#e50914] text-white' : 'border-gray-200 focus:border-[#e50914] text-black'" />
              <button type="button" @click="isPasswordVisible = !isPasswordVisible"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
                <Eye v-if="isPasswordVisible" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="text-xs text-red-500 bg-red-500/5 border border-red-500/10 p-2.5 rounded-xl">
            {{ errorMessage }}
          </div>

          <button type="submit" :disabled="!isFormValid || isLoading"
            class="w-full py-2.5 bg-[#e50914] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-red-600/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 active:scale-[0.98] flex items-center justify-center gap-2">
            <span v-if="isLoading"
              class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ t.continueBtn }}
          </button>
        </form>
      </div>
    </div>

    <div v-if="showTicketsModal"
      class="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div @click.stop
        class="relative w-full max-w-sm rounded-2xl shadow-2xl transition-all duration-300 border animate-[slideUp_0.3s_ease-out]"
        :class="currentTheme === 'dark' ? 'bg-[#141010] border-white/5 text-white' : 'bg-white border-gray-100 text-gray-800'">

        <div class="p-4 border-b flex justify-between items-center"
          :class="currentTheme === 'dark' ? 'border-white/5' : 'border-gray-100'">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <Ticket class="w-4 h-4 text-[#e50914]" />
            {{ currentLang === 'EN' ? 'My Purchased Tickets' : 'សំបុត្រដែលបានទិញ' }}
          </h3>
          <button @click="showTicketsModal = false" class="p-1 rounded-full hover:bg-neutral-500/10 transition-colors">
            <X class="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div v-if="userTicketCount === 0" class="py-8 text-center text-neutral-500 text-[11px]">
          {{ currentLang === 'EN' ? 'No tickets yet!' : 'មិនទាន់មានសំបុត្រទេ!' }}
        </div>

        <div v-else class="max-h-[320px] overflow-y-auto divide-y"
          :class="currentTheme === 'dark' ? 'divide-white/5' : 'divide-gray-100'">
          <div v-for="(ticket, i) in bookingStore.tickets.filter(t => t.userId === currentUserId)" :key="i"
            class="px-4 py-3 space-y-1.5">
            <div class="flex gap-3">
              <div
                class="flex flex-col gap-2.5 p-3 rounded-xl border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10">

                <div class="flex items-start justify-between gap-2">
                  <h4 class="font-semibold text-rose-500 text-sm md:text-base line-clamp-1 tracking-wide">
                    {{ ticket.movieTitle }}
                  </h4>
                  <span v-if="ticket.invoiceId" class="text-[10px] uppercase font-mono text-gray-500 tracking-wider">
                    #{{ ticket.invoiceId }}
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-2 text-xs border-y border-white/5 py-2 my-0.5">
                  <div class="flex items-center gap-1.5 text-gray-400">
                    <span class="text-rose-400/80">📅</span>
                    <div>
                      <p class="text-[10px] text-gray-500 uppercase font-medium leading-none">Date</p>
                      <p class="font-medium text-gray-300 mt-0.5">{{ ticket.date }}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 text-gray-400 border-l border-white/5 pl-2">
                    <span class="text-rose-400/80">⏰</span>
                    <div>
                      <p class="text-[10px] text-gray-500 uppercase font-medium leading-none">Time</p>
                      <p class="font-medium text-gray-300 mt-0.5">{{ ticket.time }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between text-xs pt-0.5">
                  <div class="flex items-center gap-1.5 text-gray-400">
                    <span>💺</span>
                    <div class="flex flex-wrap gap-1 max-w-[150px] md:max-w-[200px]">
                      <span
                        class="px-1.5 py-0.5 bg-rose-500/10 text-rose-400 font-mono rounded text-[11px] font-medium border border-rose-500/20">
                        {{ Array.isArray(ticket.seats) ? ticket.seats.join(', ') : ticket.seats }}
                      </span>
                    </div>
                  </div>

                  <div class="text-right">
                    <p class="text-[9px] text-gray-500 uppercase font-medium">Total Paid</p>
                    <p class="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                      ${{ ticket.total ? Number(ticket.total).toFixed(2) : '0.00' }}
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div class="flex justify-between items-center pt-1 text-[10px]">
              <div class="flex gap-1">
                <span v-for="seat in ticket.seats" :key="seat"
                  class="px-1.5 py-0.5 rounded bg-neutral-500/10 font-medium text-neutral-400">
                  {{ seat }}
                </span>
              </div>
              <span class="font-bold text-rose-500">${{ ticket.total?.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue' // ឬ 'vue' តាមធម្មតា
import { ref as vueRef, onMounted as vueOnMounted, onUnmounted as vueOnUnmounted, computed as vueComputed } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { useBookingStore } from '@/stores/booking'
import { useRoute } from 'vue-router'
import { Ticket, ChevronDown, Sun, Moon, User, Phone, Lock, Eye, EyeOff, X } from 'lucide-vue-next'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const route = useRoute()
const bookingStore = useBookingStore()
const showTicketsModal = ref(false)
const firebaseAuth = getAuth()
const currentUserId = ref(null)

// 💡 ច្រោះយកតែសំបុត្ររបស់ User ID បច្ចុប្បន្ន
const userTicketCount = computed(() => {
  if (!bookingStore.tickets) return 0
  const myTickets = bookingStore.tickets.filter(ticket => ticket.userId === currentUserId.value)
  return myTickets.length
})

// មុខងារទាញយកទិន្នន័យភាពយន្ត
const movies = ref([])
const fetchMovies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'movies'))
    movies.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}

// 💡 មុខងារទាញយកទិន្នន័យសំបុត្រ (Bookings) ពី Firebase មកបង្ហាញ
const fetchUserTickets = async (uid) => {
  if (!uid) {
    bookingStore.tickets = []
    return
  }
  try {
    // ទាញយកតែសំបុត្រណាជារបស់ User ដែលកំពុង Login ប៉ុណ្ណោះ
    const q = query(collection(db, "bookings"), where("userId", "==", uid))
    const querySnapshot = await getDocs(q)
    bookingStore.tickets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error fetching user tickets:", error)
  }
}

const closeDropdownOutside = (event) => {
  if (!event.target.closest('.lang-dropdown-container')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdownOutside)
  fetchMovies()

  // ស្ទាក់ចាប់ការផ្លាស់ប្តូរ Account
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      currentUserId.value = user.uid
      fetchUserTickets(user.uid) // 💡 ទាញយកសំបុត្ររបស់គាត់មកភ្លាម
    } else {
      currentUserId.value = null
      bookingStore.tickets = []
    }
  })
})

const selectedMovie = computed({
  get: () => bookingStore.selectedMovie,
  set: (val) => { bookingStore.selectedMovie = val }
})

const selectMovieFromSearch = (movie) => {
  bookingStore.selectedMovie = movie
  searchQuery.value = ''
}

const filteredMovies = computed(() => {
  if (!searchQuery.value) return []
  const queryText = searchQuery.value.toLowerCase()
  return movies.value.filter(movie => {
    const titleEN = movie.title?.EN?.toLowerCase() || ''
    const titleKH = movie.title?.KH || ''
    return titleEN.includes(queryText) || titleKH.includes(queryText)
  })
})

const searchQuery = ref('');
const props = defineProps({
  currentLang: { type: String, default: 'EN' },
  currentTheme: { type: String, default: 'dark' }
})

const emit = defineEmits(['change-language', 'auth-success', 'toggle-theme'])

const isDropdownOpen = ref(false)
const showModal = ref(false)
const activeAuthTab = ref('login')
const loginMethod = ref('username')
const isPasswordVisible = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const formData = reactive({
  username: '',
  phone: '',
  password: ''
})

const translations = {
  EN: {
    searchMovies: 'Search Movies...',
    ticket: 'Ticket',
    joinNow: 'Join Now',
    home: 'Home',
    cinemas: 'Cinemas',
    offers: 'Offers',
    fb: 'F&B',
    allCinemas: 'All Cinemas',
    loginTitle: 'Log In',
    signUpTitle: 'Sign Up',
    authSubtitle: 'You can use your phone number or username',
    usernameLabel: 'Username',
    phoneLabel: 'Phone Number',
    passwordLabel: 'Password',
    usernamePlaceholder: 'Enter username',
    phonePlaceholder: 'Enter phone number',
    passwordPlaceholder: 'Enter password',
    forgotPassword: 'Forgot password?',
    continueBtn: 'Continue'
  },
  KH: {
    searchMovies: 'ស្វែងរកភាពយន្ត...',
    ticket: 'សំបុត្រ',
    joinNow: 'ចូលរួមឥឡូវនេះ',
    home: 'ទំព័រដើម',
    cinemas: 'រោងភាពយន្ត',
    offers: 'ការផ្តល់ជូន',
    fb: 'អាហារ និងភេសជ្ជៈ',
    allCinemas: 'គ្រប់រោងភាពយន្ត',
    loginTitle: 'ចូលប្រើប្រាស់',
    signUpTitle: 'ចុះឈ្មោះ',
    authSubtitle: 'អ្នកអាចប្រើប្រាស់លេខទូរស័ព្ទ ឬឈ្មោះអ្នកប្រើប្រាស់បាន',
    usernameLabel: 'ឈ្មោះអ្នកប្រើប្រាស់',
    phoneLabel: 'លេខទូរស័ព្ទ',
    passwordLabel: 'ពាក្យសម្ងាត់',
    usernamePlaceholder: 'បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់',
    phonePlaceholder: 'បញ្ចូលលេខទូរស័ព្ទ',
    passwordPlaceholder: 'បញ្ចូលពាក្យសម្ងាត់',
    forgotPassword: 'ភ្លេចពាក្យសម្ងាត់?',
    continueBtn: 'បន្តទៅមុខទៀត'
  }
}

const t = computed(() => translations[props.currentLang])

const isFormValid = computed(() => {
  const hasPassword = formData.password.length > 0;
  if (loginMethod.value === 'username') {
    return formData.username.trim().length > 0 && hasPassword;
  } else {
    return formData.phone.trim().length > 0 && hasPassword;
  }
})

const openAuthModal = (targetTab) => {
  errorMessage.value = ''
  activeAuthTab.value = targetTab
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  formData.username = ''
  formData.phone = ''
  formData.password = ''
  errorMessage.value = ''
  document.body.style.overflow = ''
}

const switchTab = (tab) => {
  activeAuthTab.value = tab
  errorMessage.value = ''
}

const toggleDropdown = (event) => {
  event.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const changeLanguage = (lang) => {
  emit('change-language', lang)
  isDropdownOpen.value = false
}

const handleSubmit = async () => {
  errorMessage.value = ''
  isLoading.value = true

  const rawInput = loginMethod.value === 'username' ? formData.username : formData.phone
  const cleanInput = rawInput.trim().replace(/\s+/g, '')

  if (!cleanInput || !formData.password) {
    errorMessage.value = props.currentLang === 'KH' ? 'សូមបំពេញព័ត៌មានឲ្យបានគ្រប់គ្រាន់!' : 'Please fill in all details.'
    isLoading.value = false
    return
  }

  const emailIdentifier = cleanInput.includes('@') ? cleanInput : `${cleanInput}@nancycinema.com`

  try {
    if (activeAuthTab.value === 'login') {
      const userCredential = await signInWithEmailAndPassword(auth, emailIdentifier, formData.password)
      emit('auth-success', userCredential.user)
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, emailIdentifier, formData.password)
      emit('auth-success', userCredential.user)
    }
    closeModal()
  } catch (error) {
    console.error("Auth Error:", error.code)
    if (props.currentLang === 'KH') {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់/លេខទូរស័ព្ទ ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវឡើយ។'
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់ ឬ លេខទូរស័ព្ទនេះត្រូវបានគេប្រើប្រាស់រួចហើយ។'
      } else if (error.code === 'auth/weak-password') {
        errorMessage.value = 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៦ ខ្ទង់ឡើងទៅ។'
      } else {
        errorMessage.value = 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់គណនី។'
      }
    } else {
      errorMessage.value = error.message
    }
  } finally {
    isLoading.value = false
  }
}

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOutside)
  document.body.style.overflow = ''
})
</script>
<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(15px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>