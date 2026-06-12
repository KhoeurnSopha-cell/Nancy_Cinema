<template>
  <div>
    <div class="fixed top-0 left-0 w-full z-[1000] bg-[rgba(17,10,10,0.85)] backdrop-blur-xl border-b border-white/5">
      <header class="relative flex justify-between items-center px-4 md:px-6 h-[65px] border-b border-white/[0.05]">
        <div class="searchBox flex items-center md:bg-[#251c1c] md:px-3 md:rounded-full md:border md:border-white/10 h-9 w-10 md:w-56 md:focus-within:w-60 md:focus-within:border-[#e50914] justify-center md:justify-start transition-all duration-300">
          <i class="fa-solid fa-magnifying-glass text-[#a0a0a0] text-xs"></i>
          <input 
            class="hidden md:block w-full bg-transparent border-none outline-none text-white text-xs pl-1.5 placeholder-[#666]" 
            type="text" 
            :placeholder="t.searchMovies"
          >
        </div>
        
        <img 
          class="static md:absolute md:left-1/2 md:-translate-x-1/2 h-9 md:h-[200px] md:max-w-[200px] object-contain transition-all duration-300" 
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
          alt="Netflex Cam"
        >

        <div class="flex items-center gap-2.5">
          <button class="hidden sm:flex bg-white/5 text-white border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer items-center gap-1.5 hover:bg-white/15 hover:border-white/30 transition-all duration-200">
            <i class="fa-solid fa-ticket"></i> {{ t.ticket }}
          </button>
          
          <button 
            @click="openAuthModal('login')"
            class="bg-white/5 text-white border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer flex items-center gap-1.5 hover:bg-white/15 hover:border-white/30 transition-all duration-200"
          >
            <i class="fa-solid fa-user"></i> {{ t.joinNow }}
          </button>
          
          <button class="hidden sm:flex bg-transparent border-none text-white text-base cursor-pointer p-1.5 items-center rounded-full hover:bg-white/5 transition-colors duration-200">
            <i class="fa-regular fa-bell"></i>
          </button>

          <div class="relative">
            <div class="flex items-center gap-1 cursor-pointer text-white text-xs px-2.5 py-1.5 rounded-full bg-white/5 select-none" @click="toggleDropdown">
              <span>{{ currentLang }}</span>
              <i class="fa-solid fa-chevron-down text-[9px] text-[#a0a0a0] transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }"></i>
            </div>

            <ul class="absolute top-[120%] right-0 bg-[#161616] border border-white/10 rounded-lg list-none py-1 m-0 w-[130px] shadow-[0_4px_15px_rgba(0,0,0,0.6)] z-[1010]" v-if="isDropdownOpen">
              <li 
                class="px-3.5 py-2 text-xs cursor-pointer transition-colors duration-200"
                :class="currentLang === 'EN' ? 'text-[#e50914] font-bold' : 'text-[#bbb] hover:bg-[#252525] hover:text-white'" 
                @click="changeLanguage('EN')"
              >
                English (EN)
              </li>
              <li 
                class="px-3.5 py-2 text-xs cursor-pointer transition-colors duration-200"
                :class="currentLang === 'KH' ? 'text-[#e50914] font-bold' : 'text-[#bbb] hover:bg-[#252525] hover:text-white'" 
                @click="changeLanguage('KH')"
              >
                ភាសាខ្មែរ (KH)
              </li>
            </ul>
          </div>
        </div>
      </header>

      <nav class="flex justify-between items-center px-4 md:px-6 h-[45px] w-full">
        <div class="flex gap-4 md:gap-5">
          <a href="#" class="text-white text-xs flex items-center gap-1.5 transition-colors duration-200">
            <i class="fa-solid fa-house text-[#e50914]"></i> <span class="hidden md:inline">{{ t.home }}</span>
          </a>
          <a href="#" class="text-[#b0b0b0] hover:text-white text-xs flex items-center gap-1.5 transition-colors duration-200">
            <i class="fa-solid fa-location-dot"></i> <span class="hidden md:inline">{{ t.cinemas }}</span>
          </a>
          <a href="#" class="text-[#b0b0b0] hover:text-white text-xs flex items-center gap-1.5 transition-colors duration-200">
            <i class="fa-solid fa-tags"></i> <span class="hidden md:inline">{{ t.offers }}</span>
          </a>
          <a href="#" class="text-[#b0b0b0] hover:text-white text-xs flex items-center gap-1.5 transition-colors duration-200">
            <i class="fa-solid fa-bowl-food"></i> <span class="hidden md:inline">{{ t.fb }}</span>
          </a>
        </div>

        <div class="flex items-center gap-1.25 text-white text-xs md:text-xs cursor-pointer bg-white/5 px-2.5 py-1 rounded-full">
          <i class="fa-solid fa-location-pin text-[#e50914]"></i>
          <span class="text-xs sm:text-xs">{{ t.allCinemas }}</span>
          <i class="fa-solid fa-chevron-down text-[9px] text-[#a0a0a0]"></i>
        </div>
      </nav>
    </div>

    <div 
      v-if="showModal" 
      class="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-opacity duration-300 animate-fadeIn"
      @click.self="closeModal"
    >
      <div class="w-full max-w-4xl bg-[#141414] border border-white/[0.08] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px] shadow-2xl relative animate-slideUp">
        
        <button 
          @click="closeModal" 
          class="absolute top-4 right-4 text-white/40 hover:text-white z-50 text-lg transition-colors cursor-pointer p-1.5 bg-black/20 rounded-full"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="relative hidden md:block bg-gradient-to-br from-red-950/20 via-black to-black border-r border-white/[0.03]">
          <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#e50914]/40 to-transparent"></div>
          <div class="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
            <p class="text-xs text-white/20 tracking-widest uppercase">Legend Experience</p>
          </div>
        </div>

        <div class="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          
          <div class="flex items-baseline gap-6 mb-2">
            <button 
              @click="switchTab('login')" 
              class="text-2xl font-bold transition-all relative pb-2 cursor-pointer"
              :class="activeAuthTab === 'login' ? 'text-white' : 'text-white/30 hover:text-white/50'"
            >
              {{ t.loginTitle }}
              <span v-if="activeAuthTab === 'login'" class="absolute bottom-0 left-0 w-8 h-[3px] bg-[#e50914] rounded-full"></span>
            </button>
            
            <span class="text-xl text-white/20 font-light">|</span>
            
            <button 
              @click="switchTab('signup')" 
              class="text-2xl font-bold transition-all relative pb-2 cursor-pointer"
              :class="activeAuthTab === 'signup' ? 'text-white' : 'text-white/30 hover:text-white/50'"
            >
              {{ t.signUpTitle }}
              <span v-if="activeAuthTab === 'signup'" class="absolute bottom-0 left-0 w-8 h-[3px] bg-[#e50914] rounded-full"></span>
            </button>
          </div>

          <p class="text-xs text-[#a0a0a0] mb-6 font-medium">
            {{ t.authSubtitle }}
          </p>

          <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            
            <div class="bg-[#1c1c1e] p-1 rounded-full flex w-full max-w-xs mb-5 border border-white/[0.03]">
              <button 
                type="button"
                @click="loginMethod = 'username'"
                class="flex-1 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer text-center"
                :class="loginMethod === 'username' ? 'bg-[#e50914] text-white shadow-md' : 'text-[#a0a0a0] hover:text-white'"
              >
                {{ t.usernameLabel }}
              </button>
              <button 
                type="button"
                @click="loginMethod = 'phone'"
                class="flex-1 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer text-center"
                :class="loginMethod === 'phone' ? 'bg-[#e50914] text-white shadow-md' : 'text-[#a0a0a0] hover:text-white'"
              >
                {{ t.phoneLabel }}
              </button>
            </div>

            <div v-if="loginMethod === 'username'" class="space-y-1.5">
              <label class="text-xs text-[#b3b3b3] font-medium pl-0.5">{{ t.usernameLabel }}</label>
              <div class="relative flex items-center">
                <span class="absolute left-4 text-[#a0a0a0] text-xs"><i class="fa-regular fa-user"></i></span>
                <input 
                  v-model="formData.username"
                  type="text" 
                  :placeholder="t.usernamePlaceholder" 
                  class="w-full bg-black border border-white/10 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-white/30 transition-all"
                  :required="loginMethod === 'username'"
                />
              </div>
            </div>

            <div v-else class="space-y-1.5">
              <label class="text-xs text-[#b3b3b3] font-medium pl-0.5">{{ t.phoneLabel }}</label>
              <div class="relative flex items-center">
                <span class="absolute left-4 text-[#a0a0a0] text-xs"><i class="fa-solid fa-phone"></i></span>
                <input 
                  v-model="formData.phone"
                  type="text" 
                  :placeholder="t.phonePlaceholder" 
                  class="w-full bg-black border border-white/10 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-white/30 transition-all"
                  :required="loginMethod === 'phone'"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs text-[#b3b3b3] font-medium pl-0.5">{{ t.passwordLabel }}</label>
              <div class="relative flex items-center">
                <span class="absolute left-4 text-[#a0a0a0] text-xs"><i class="fa-solid fa-lock"></i></span>
                <input 
                  v-model="formData.password"
                  :type="isPasswordVisible ? 'text' : 'password'" 
                  :placeholder="t.passwordPlaceholder" 
                  class="w-full bg-black border border-white/10 rounded-lg py-3 pl-11 pr-12 text-xs text-white placeholder-white/20 outline-none focus:border-white/30 transition-all"
                  required
                />
                <button 
                  type="button"
                  @click="isPasswordVisible = !isPasswordVisible" 
                  class="absolute right-4 text-[#a0a0a0] hover:text-white transition-colors cursor-pointer text-xs"
                >
                  <i class="fa-regular fa-eye" v-if="isPasswordVisible"></i>
                  <i class="fa-regular fa-eye-slash" v-else></i>
                </button>
              </div>
            </div>

            <div class="text-right pt-0.5" v-if="activeAuthTab === 'login'">
              <a href="#" class="text-xs text-white font-semibold hover:underline transition-all">
                {{ t.forgotPassword }}
              </a>
            </div>

            <div class="pt-3">
              <button 
                type="submit" 
                :disabled="isLoading"
                class="w-full text-white py-3 rounded-full text-xs font-semibold cursor-pointer transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-center"
                :class="isFormValid ? 'bg-[#e50914] hover:bg-[#b80710]' : 'bg-[#5a5a5a] cursor-not-allowed'"
              >
                {{ isLoading ? 'Processing...' : t.continueBtn }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from '../firebase/config.js'

const props = defineProps({
  currentLang: { type: String, default: 'EN' }
})
const emit = defineEmits(['change-language', 'auth-success'])

// Local Layout Display Flags
const isDropdownOpen = ref(false)
const showModal = ref(false)
const activeAuthTab = ref('login') 
const loginMethod = ref('username') 
const isPasswordVisible = ref(false)

// Request Feedback States
const isLoading = ref(false)
const errorMessage = ref('')

// Payload State Models
const formData = reactive({
  username: '',
  phone: '',
  password: ''
})

// UI Copy Localization Asset Engine Matrix 
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

// ឡូហ្សិកពិនិត្យមើលថាតើ Input ត្រូវបានបំពេញរួចរាល់ឬនៅ ដើម្បីប្តូរពណ៌ប៊ូតុង Continue
const isFormValid = computed(() => {
  const hasPassword = formData.password.length > 0;
  if (loginMethod.value === 'username') {
    return formData.username.trim().length > 0 && hasPassword;
  } else {
    return formData.phone.trim().length > 0 && hasPassword;
  }
})

// Event Actions
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

const closeDropdownOutside = () => {
  isDropdownOpen.value = false
}

// មុខងារដោះស្រាយការតភ្ជាប់ប្រព័ន្ធជាមួយ Firebase Auth ផ្ទាល់
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

  // បំប្លែង Username ឬ លេខទូរសព្ទ ទៅជាទម្រង់ Email ក្លែងក្លាយសម្រាប់ Firebase Auth
  const emailIdentifier = cleanInput.includes('@') ? cleanInput : `${cleanInput}@nancycinema.com`

  try {
    if (activeAuthTab.value === 'login') {
      // ដំណើរការ Login គណនី
      const userCredential = await signInWithEmailAndPassword(auth, emailIdentifier, formData.password)
      emit('auth-success', userCredential.user)
    } else {
      // ដំណើរការចុះឈ្មោះគណនីថ្មី
      const userCredential = await createUserWithEmailAndPassword(auth, emailIdentifier, formData.password)
      emit('auth-success', userCredential.user)
    }
    closeModal()
  } catch (error) {
    console.error("Auth Exception code:", error.code)
    
    // បង្ហាញសារជូនដំណឹងជាភាសាជាតិទៅតាមភាសាដែល App កំពុងប្រើប្រាស់
    if (props.currentLang === 'KH') {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់/លេខទូរស័ព្ទ ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវឡើយ។'
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់ ឬ លេខទូរស័ព្ទនេះត្រូវបានគេប្រើប្រាស់រួចហើយ។'
      } else if (error.code === 'auth/weak-password') {
        errorMessage.value = 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៦ ខ្ទង់ឡើងទៅ។'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage.value = 'ឈ្មោះអ្នកប្រើប្រាស់ខ្លីពេក ឬមិនទាន់ត្រូវតាមទម្រង់។ សូមប្រើឈ្មោះឱ្យវែងជាងនេះបន្តិច!'
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
        errorMessage.value = 'The username is too short or invalid. Please use a longer username.'
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
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(15px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
.animate-slideUp {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>