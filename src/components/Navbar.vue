<template>
  <div>
    <div class="fixed top-0 left-0 w-full z-[1000] backdrop-blur-xl border-b transition-colors duration-300 shadow-lg"
      :class="currentTheme === 'dark' ? 'bg-[#0b0707]/90 border-white/5 text-white' : 'bg-white/90 border-gray-200 text-gray-800'">

      <header
        class="relative flex justify-between items-center px-4 md:px-6 h-[65px] border-b transition-colors duration-300"
        :class="currentTheme === 'dark' ? 'border-white/[0.05]' : 'border-gray-100'">

        <div
          class="searchBox flex items-center md:px-4 md:rounded-full md:border h-9 w-10 md:w-56 md:focus-within:w-64 justify-center md:justify-start transition-all duration-300 z-10"
          :class="currentTheme === 'dark' ? 'md:bg-[#251c1c] md:border-white/10 md:focus-within:border-[#e50914]' : 'md:bg-gray-100 md:border-gray-200 md:focus-within:border-[#e50914]'">
          <img class="w-4.5 h-4.5 object-contain" src="https://static.vecteezy.com/system/resources/thumbnails/013/083/258/small/search-ui-icon-png.png"
            alt="Search Icon">
          <input class="hidden md:block w-full bg-transparent border-none outline-none text-xs pl-2 placeholder-[#666]"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-800'" type="text" :placeholder="t.searchMovies">
        </div>

        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none z-0">
          <img src="/Nencylogo.png" alt="Nency Cinema Logo"
            class="h-12 md:h-14 w-auto object-contain scale-[2.2] md:scale-[2.8] transform origin-center" />
        </div>

        <div class="flex items-center gap-2.5 z-10">
          <button
            class="hidden sm:flex border px-3 py-1 rounded-full text-xs font-medium cursor-pointer items-center gap-2 transition-all duration-200"
            :class="currentTheme === 'dark' ? 'bg-white/5 text-white border-white/15 hover:bg-white/15 hover:border-white/30' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'">
            <img class="w-5 h-5 object-contain"
              src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png"
              alt="Golden Ticket">
            {{ t.ticket }}
          </button>

          <button @click="openAuthModal('login')"
            class="border px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer flex items-center gap-2 transition-all duration-200"
            :class="currentTheme === 'dark' ? 'bg-white/5 text-white border-white/15 hover:bg-white/15 hover:border-white/30' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'">
            <img class="w-5 h-5 object-contain"
              src="https://static.vecteezy.com/system/resources/thumbnails/050/609/573/small/a-white-person-icon-in-a-hexagon-png.png"
              alt="User Profile">
            {{ t.joinNow }}
          </button>

          <button
            class="hidden sm:flex bg-transparent border-none text-base cursor-pointer p-1.5 items-center rounded-full transition-colors duration-200"
            :class="currentTheme === 'dark' ? 'text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'">
            <i class="fa-regular fa-bell"></i>
          </button>

          <button @click="emit('toggle-theme')" type="button"
            class="flex border rounded-full text-xs font-medium cursor-pointer items-center justify-center transition-all duration-200 w-8 h-8 shrink-0 overflow-hidden"
            :class="currentTheme === 'dark' ? 'bg-white/5 text-white border-white/15 hover:bg-white/15' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'"
            :title="currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <img
              src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/images-photography/light-dark-mode-ae6jbxi556ff8wp09wmuy.png/light-dark-mode-h2j0y2h01wij8ftzyu21i.png?_a=DATAiZAAZAA0"
              alt="Theme Icon" class="w-4 h-4 object-contain transition-transform duration-300"
              :class="currentTheme === 'dark' ? 'invert opacity-90' : 'opacity-80'" />
          </button>

          <div class="relative lang-dropdown-container">
            <div
              class="flex items-center gap-1 cursor-pointer text-xs px-2.5 py-1.5 rounded-full select-none transition-colors"
              :class="currentTheme === 'dark' ? 'text-white bg-white/5 hover:bg-white/10' : 'text-gray-800 bg-gray-100 hover:bg-gray-200'"
              @click="toggleDropdown">
              <span>{{ currentLang }}</span>
              <i class="fa-solid fa-chevron-down text-[9px] text-[#a0a0a0] transition-transform duration-200"
                :class="{ 'rotate-180': isDropdownOpen }"></i>
            </div>

            <ul
              class="absolute top-[120%] right-0 border rounded-lg list-none py-1 m-0 w-[140px] shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-[1010]"
              :class="currentTheme === 'dark' ? 'bg-[#161616] border-white/10' : 'bg-white border-gray-200'"
              v-if="isDropdownOpen">
              <li class="px-3.5 py-2 text-xs cursor-pointer transition-colors duration-200"
                :class="currentLang === 'EN' ? 'text-[#e50914] font-bold bg-white/[0.02]' : (currentTheme === 'dark' ? 'text-[#bbb] hover:bg-[#252525] hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black')"
                @click="changeLanguage('EN')">
                English (EN)
              </li>
              <li class="px-3.5 py-2 text-xs cursor-pointer transition-colors duration-200"
                :class="currentLang === 'KH' ? 'text-[#e50914] font-bold bg-white/[0.02]' : (currentTheme === 'dark' ? 'text-[#bbb] hover:bg-[#252525] hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black')"
                @click="changeLanguage('KH')">
                ភាសាខ្មែរ (KH)
              </li>
            </ul>
          </div>

        </div>
      </header>

      <nav class="flex justify-between items-center px-4 md:px-6 h-[45px] w-full transition-colors duration-300"
        :class="currentTheme === 'dark' ? 'bg-black/20' : 'bg-gray-50'">
        <div class="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar">
          <a href="#" class="text-xs flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900 font-medium'">
            <i class="fa-solid fa-house text-[#e50914]"></i> <span>{{ t.home }}</span>
          </a>
          <a href="#" class="text-xs flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap"
            :class="currentTheme === 'dark' ? 'text-[#b0b0b0] hover:text-white' : 'text-gray-500 hover:text-gray-900'">
            <i class="fa-solid fa-location-dot"></i> <span>{{ t.cinemas }}</span>
          </a>
          <a href="#" class="text-xs flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap"
            :class="currentTheme === 'dark' ? 'text-[#b0b0b0] hover:text-white' : 'text-gray-500 hover:text-gray-900'">
            <i class="fa-solid fa-tags"></i> <span>{{ t.offers }}</span>
          </a>
          <a href="#" class="text-xs flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap"
            :class="currentTheme === 'dark' ? 'text-[#b0b0b0] hover:text-white' : 'text-gray-500 hover:text-gray-900'">
            <i class="fa-solid fa-bowl-food"></i> <span>{{ t.fb }}</span>
          </a>
        </div>

        <div
          class="flex items-center gap-1.5 text-xs cursor-pointer px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
          :class="currentTheme === 'dark' ? 'text-white bg-white/5 hover:bg-white/10' : 'text-gray-700 bg-gray-200/60 hover:bg-gray-200'">
          <i class="fa-solid fa-location-pin text-[#e50914]"></i>
          <span>{{ t.allCinemas }}</span>
          <i class="fa-solid fa-chevron-down text-[9px] text-[#a0a0a0]"></i>
        </div>
      </nav>
    </div>

    <div class="h-[110px]"></div>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '../firebase/config.js'

// កែប្រែ៖ ប្រកាសទទួលយក Prop `currentTheme` ពី App.vue
const props = defineProps({
  currentLang: { type: String, default: 'EN' },
  currentTheme: { type: String, default: 'dark' }
})

// កែប្រែ៖ បន្ថែម Event 'toggle-theme' ដើម្បីបាញ់ទិន្នន័យត្រឡប់ទៅ App.vue ពេលចុចប៊ូតុងដូរពណ៌
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

const closeDropdownOutside = (event) => {
  if (!event.target.closest('.lang-dropdown-container')) {
    isDropdownOpen.value = false
  }
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
    console.error("Auth Exception code:", error.code)

    if (props.currentLang === 'KH') {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់/លេខទូរស័ព្ទ ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវឡើយ។'
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់ ឬ លេខទូរស័ព្ទនេះត្រូវបានគេប្រើប្រាស់រួចហើយ។'
      } else if (error.code === 'auth/weak-password') {
        errorMessage.value = 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៦ ខ្ទង់ឡើងទៅ។'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់ខ្លីពេក ឬមិនទាន់ត្រូវតាមទម្រង់។'
      } else {
        errorMessage.value = 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់គណនី។ សូមព្យាយាមម្តងទៀត។'
      }
    } else {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage.value = 'Invalid username/phone or password combination.'
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage.value = 'This identifier is already taken.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage.value = 'Password must be at least 6 characters long.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage.value = 'The username is too short or invalid.'
      } else {
        errorMessage.value = 'Authentication failure. Please try again.'
      }
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdownOutside)
})

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

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>