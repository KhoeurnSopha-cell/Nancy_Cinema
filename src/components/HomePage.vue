<template>
  <div class="w-full mt-[90px] bg-[#0b0b0b] min-h-screen text-gray-200 font-sans selection:bg-rose-600 selection:text-white antialiased">

    <div class="w-full mx-auto relative group">
      <div class="relative shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] w-full max-h-[550px] bg-black">
        
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          <button 
            v-for="(_, index) in topSlides" 
            :key="index"
            type="button" 
            class="h-1.5 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'w-8 bg-rose-600' : 'w-2 bg-white/40 hover:bg-white/70'"
            @click="currentSlide = index"
          ></button>
        </div>

        <div class="relative w-full h-full">
          <div 
            v-for="(slide, index) in topSlides" 
            :key="index"
            class="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
            :class="currentSlide === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'"
          >
            <img :src="slide.img" class="w-full h-full object-cover object-center" :alt="slide.alt">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#0b0b0b]/50 via-transparent to-[#0b0b0b]/50"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
      
      <div class="flex items-center justify-center md:justify-start gap-8 mb-8 border-b border-neutral-800 pb-px">
        <h2 
          class="font-black text-xl md:text-2xl cursor-pointer select-none pb-4 border-b-4 tracking-wider uppercase transition-all duration-300"
          :class="activeTab === 'now-showing' ? 'text-white border-rose-600' : 'text-neutral-500 border-transparent hover:text-neutral-300'"
          @click="changeTab('now-showing')"
        >
          {{ t.nowShowing }}
        </h2>
        <h2 
          class="font-black text-xl md:text-2xl cursor-pointer select-none pb-4 border-b-4 tracking-wider uppercase transition-all duration-300"
          :class="activeTab === 'coming-soon' ? 'text-white border-rose-600' : 'text-neutral-500 border-transparent hover:text-neutral-300'"
          @click="changeTab('coming-soon')"
        >
          {{ t.comingSoon }}
        </h2>
      </div>

      <div v-if="activeTab === 'now-showing'" class="flex gap-3 mb-10 overflow-x-auto pb-3 no-scrollbar snap-x scroll-smooth">
        <div 
          v-for="(date, index) in currentDates" 
          :key="index"
          class="flex flex-col justify-center text-center px-5 py-3 min-w-[105px] rounded-xl cursor-pointer select-none border snap-start transition-all duration-300 group"
          :class="activeDateIndex === index ? 'border-rose-600 bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-[#141414] border-neutral-800/60 text-neutral-400 hover:border-neutral-700 hover:bg-[#1a1a1a]'" 
          @click="selectDate(index)"
        >
          <span class="text-[11px] font-bold tracking-wider uppercase opacity-80 group-hover:opacity-100" :class="activeDateIndex === index ? 'text-white' : 'text-neutral-400'">{{ date.dayName }}</span>
          <span class="text-2xl font-black my-1 tracking-tight" :class="activeDateIndex === index ? 'text-white' : 'text-neutral-100'">{{ date.dayNumber }}</span>
          <span class="text-[11px] font-bold uppercase tracking-widest opacity-70" :class="activeDateIndex === index ? 'text-white/90' : 'text-neutral-500'">{{ date.month }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
        <template v-if="filteredMovies.length > 0">
          <div 
            v-for="(movie, index) in filteredMovies" 
            :key="index" 
            @click="openMovieDetail(movie)"
            class="flex flex-col group/card cursor-pointer relative"
          >
            
            <div class="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-xl border border-neutral-800/50 bg-[#141414]">
              <img :src="movie.poster" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105" :alt="movie.title[currentLang]">
              
              <div class="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                <span 
                  class="text-[10px] font-black px-2 py-0.5 rounded shadow border"
                  :class="{
                    'text-red-500 border-red-600/40 bg-black/80': movie.rating === 'R18',
                    'text-amber-500 border-amber-600/40 bg-black/80': movie.rating === 'NC15',
                    'text-emerald-500 border-emerald-600/40 bg-black/80': movie.rating === 'G'
                  }"
                >
                  {{ movie.rating }}
                </span>
                <span class="text-[9px] font-bold bg-black/70 border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-300 uppercase tracking-wider backdrop-blur-sm">
                  {{ movie.formats ? movie.formats[0] : '2D' }}
                </span>
              </div>

              <div class="absolute inset-0 bg-black/75 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4 z-30">
                <button @click.stop="openMovieDetail(movie, 'showtime')" class="w-full py-2.5 text-xs font-bold uppercase tracking-widest bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-md shadow-rose-600/20 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                  {{ currentLang === 'EN' ? 'Buy Ticket' : 'ទិញសំបុត្រ' }}
                </button>
                <button @click.stop="openMovieDetail(movie, 'detail')" class="w-full py-2.5 text-xs font-bold uppercase tracking-widest bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg hover:bg-neutral-700 hover:text-white transition-all transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                  {{ currentLang === 'EN' ? 'Watch Trailer' : 'ទស្សនា Trailer' }}
                </button>
              </div>
            </div>
            
            <div class="mt-4 px-1 flex flex-col flex-grow">
              <h5 class="text-sm md:text-base font-bold text-neutral-100 tracking-wide line-clamp-1 group-hover/card:text-rose-500 transition-colors duration-200">
                {{ movie.title[currentLang] }}
              </h5>
              <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span v-for="fmt in movie.formats || ['2D']" :key="fmt" class="text-[9px] font-extrabold px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
                  {{ fmt }}
                </span>
                <span class="text-xs text-neutral-500 font-medium ml-1">{{ movie.type }}</span>
              </div>
            </div>

          </div>
        </template>
      </div>
    </div>

    <div v-if="selectedMovie" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto transition-opacity duration-300 animate-fadeIn">
      <div class="relative w-full max-w-[950px] bg-[#0f0a0a] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-8">
        
        <button @click="closeMovieDetail" class="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/80 hover:text-white hover:bg-rose-600 transition-colors">
          <span class="text-xl font-bold">&times;</span>
        </button>

        <div v-if="bookingStep === 'info'" class="relative w-full md:w-2/5 aspect-[2/3] md:aspect-auto md:h-[550px]">
          <img :src="selectedMovie.poster" class="w-full h-full object-cover" :alt="selectedMovie.title[currentLang]">
          <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0f0a0a] via-transparent to-transparent"></div>
        </div>

        <div class="w-full p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-transparent to-[#0a0505]" :class="bookingStep === 'info' ? 'md:w-3/5' : 'w-full'">
          
          <div v-if="bookingStep === 'info'">
            <h3 class="text-2xl md:text-3xl font-black tracking-wide text-white mb-6">
              {{ selectedMovie.title[currentLang] }}
            </h3>

            <div class="space-y-4 text-sm text-neutral-300">
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Genre:' : 'ប្រភេទ៖' }}</span>
                <span class="font-semibold text-neutral-200">{{ selectedMovie.type }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Duration:' : 'រយៈពេល៖' }}</span>
                <span class="font-semibold text-neutral-200">{{ selectedMovie.duration || '1h 36min' }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Release:' : 'ថ្ងៃបញ្ចាំង៖' }}</span>
                <span class="font-semibold text-neutral-200">{{ selectedMovie.releaseDate }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Rating:' : 'កម្រិតអាយុ៖' }}</span>
                <span class="px-2 py-0.5 rounded text-xs font-black bg-neutral-900 border border-neutral-700 text-rose-500">{{ selectedMovie.rating }}</span>
              </div>
            </div>

            <div class="mt-8 border-t border-neutral-800/80 pt-6">
              <div class="flex gap-6 border-b border-neutral-800 pb-2">
                <button @click="modalSubTab = 'showtime'" class="text-base font-black uppercase tracking-wider pb-2 transition-colors relative" :class="modalSubTab === 'showtime' ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-rose-600' : 'text-neutral-500 hover:text-neutral-300'">
                  {{ currentLang === 'EN' ? 'Showtime' : 'ម៉ោងបញ្ចាំង' }}
                </button>
                <button @click="modalSubTab = 'detail'" class="text-base font-black uppercase tracking-wider pb-2 transition-colors relative" :class="modalSubTab === 'detail' ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-rose-600' : 'text-neutral-500 hover:text-neutral-300'">
                  {{ currentLang === 'EN' ? 'Detail' : 'ព័ត៌មានលម្អិត' }}
                </button>
              </div>

              <div class="mt-4 min-h-[100px]">
                <div v-if="modalSubTab === 'showtime'" class="animate-fadeIn">
                  <p class="text-xs text-neutral-500 mb-3">{{ currentLang === 'EN' ? 'Select a session for Day' : 'ជ្រើសរើសម៉ោងសម្រាប់ថ្ងៃទី' }} {{ currentDates[activeDateIndex].dayNumber }}:</p>
                  <div class="flex flex-wrap gap-2.5">
                    <button 
                      v-for="time in ['11:30 AM', '02:45 PM', '06:15 PM', '09:30 PM']" 
                      :key="time"
                      @click="selectShowtime(time)"
                      class="px-4 py-2.5 bg-[#1a1313] border border-neutral-800 rounded-lg text-xs font-bold text-neutral-300 hover:border-rose-600 hover:text-white transition-colors"
                    >
                      {{ time }}
                    </button>
                  </div>
                </div>
                <div v-else class="text-xs text-neutral-400 leading-relaxed animate-fadeIn">
                  {{ selectedMovie.title[currentLang] }} {{ currentLang === 'EN' ? 'is an incredible cinematic experience. Watch the exclusive visual screening at Legend Cinema with standard configurations.' : 'គឺជាភាពយន្តដ៏អស្ចារ្យដែលអ្នកមិនគួររំលង។ រីករាយទស្សនាជាមួយគុណភាពរូបភាពច្បាស់ត្រជាក់ភ្នែកនៅ Legend Cinema។' }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="bookingStep === 'seats'" class="w-full animate-fadeIn">
            
            <div class="flex flex-col mb-6 border-b border-neutral-800 pb-4">
              <h4 class="text-2xl font-black text-white tracking-wide">{{ selectedMovie.title[currentLang] }}</h4>
              <p class="text-xs text-rose-500 font-bold mt-1">
                {{ currentLang === 'EN' ? 'Time:' : 'ម៉ោង៖' }} {{ selectedTime }} | 
                {{ currentLang === 'EN' ? 'Date:' : 'ថ្ងៃទី៖' }} {{ currentDates[activeDateIndex].dayNumber }} {{ currentDates[activeDateIndex].month }}
              </p>
            </div>

            <div class="w-full flex flex-col items-center mb-8">
              <div class="w-3/4 h-1.5 bg-gradient-to-b from-rose-500 to-transparent rounded-full shadow-[0_-4px_12px_rgba(244,63,94,0.4)]"></div>
              <span class="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">{{ currentLang === 'EN' ? 'Cinema Screen' : 'អេក្រង់កុន' }}</span>
            </div>

            <div class="space-y-2 max-w-md mx-auto overflow-x-auto pb-2">
              <div v-for="row in seatPlan" :key="row.rowName" class="flex items-center justify-center gap-2 min-w-[340px]">
                <span class="text-xs font-bold text-neutral-600 w-4">{{ row.rowName }}</span>
                <div class="flex gap-1.5">
                  <button 
                    v-for="seat in row.seats" 
                    :key="seat.id"
                    :disabled="seat.isTaken"
                    @click="toggleSeat(seat)"
                    class="w-7 h-7 rounded-md text-[9px] font-bold transition-all flex items-center justify-center"
                    :class="[
                      seat.isTaken ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed line-through' :
                      selectedSeats.some(s => s.id === seat.id) ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-400' :
                      seat.type === 'VIP' ? 'bg-amber-600/20 border border-amber-500/40 text-amber-400 hover:bg-amber-600 hover:text-white' :
                      'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-rose-500 hover:text-white'
                    ]"
                  >
                    {{ seat.num }}
                  </button>
                </div>
              </div>
            </div>

            <div class="flex justify-center gap-6 mt-6 text-[11px] font-medium text-neutral-400">
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-neutral-900 border border-neutral-700"></span>{{ currentLang === 'EN' ? 'Available' : 'ទំនេរ' }}</div>
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-600/40 border border-amber-500"></span>VIP ($6.00)</div>
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-rose-600"></span>{{ currentLang === 'EN' ? 'Selected' : 'បានរើស' }}</div>
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-neutral-800 line-through"></span>{{ currentLang === 'EN' ? 'Sold' : 'លក់រួច' }}</div>
            </div>

            <div class="mt-8 pt-5 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p class="text-xs text-neutral-400">{{ currentLang === 'EN' ? 'Selected Seats:' : 'កៅអីដែលបានជ្រើសរើស៖' }} 
                  <span class="text-white font-bold ml-1" v-if="selectedSeats.length">{{ selectedSeats.map(s => s.id).join(', ') }}</span>
                  <span class="text-neutral-600 italic ml-1" v-else>None</span>
                </p>
                <p class="text-sm font-black text-white mt-1">{{ currentLang === 'EN' ? 'Total Price:' : 'តម្លៃសរុប៖' }} <span class="text-rose-500">${{ totalPrice.toFixed(2) }}</span></p>
              </div>
              <button 
                :disabled="!selectedSeats.length" 
                @click="bookingStep = 'checkout'"
                class="w-full sm:w-auto px-10 py-3 text-xs font-black uppercase tracking-wider bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-rose-600/10"
              >
                {{ currentLang === 'EN' ? 'Proceed to Checkout' : 'បន្តទៅការបង់ប្រាក់' }}
              </button>
            </div>
          </div>

          <div v-if="bookingStep === 'checkout'" class="w-full animate-fadeIn">
            <h4 class="text-lg font-black text-white mb-4 border-b border-neutral-800 pb-2">
              {{ currentLang === 'EN' ? 'Payment Checkout' : 'ការទូទាត់ប្រាក់' }}
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-4 space-y-3">
                <p class="text-xs font-bold uppercase text-neutral-500 tracking-wider">{{ currentLang === 'EN' ? 'Order Summary' : 'សេចក្តីសង្ខេបការបញ្ជាទិញ' }}</p>
                <div class="flex justify-between text-sm"><span class="text-neutral-400">Movie:</span><span class="font-bold text-white">{{ selectedMovie.title[currentLang] }}</span></div>
                <div class="flex justify-between text-sm"><span class="text-neutral-400">Schedule:</span><span class="text-neutral-200">{{ selectedTime }} | Day {{ currentDates[activeDateIndex].dayNumber }}</span></div>
                <div class="flex justify-between text-sm"><span class="text-neutral-400">Seats:</span><span class="font-black text-rose-500">{{ selectedSeats.map(s => s.id).join(', ') }}</span></div>
                <hr class="border-neutral-800 my-2">
                <div class="flex justify-between text-base font-black"><span class="text-white">Amount Due:</span><span class="text-emerald-500">${{ totalPrice.toFixed(2) }}</span></div>
              </div>

              <div class="space-y-3">
                <p class="text-xs font-bold uppercase text-neutral-500 tracking-wider">{{ currentLang === 'EN' ? 'Select Payment Method' : 'ជ្រើសរើសវិធីសាស្ត្របង់ប្រាក់' }}</p>
                <label v-for="method in ['ABA Pay', 'Wing', 'Visa / Mastercard']" :key="method" class="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-[#120d0d] cursor-pointer hover:border-neutral-700 transition-all group">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="payment" :value="method" v-model="selectedPayment" class="accent-rose-600 h-4 w-4">
                    <span class="text-sm font-bold text-neutral-200 group-hover:text-white">{{ method }}</span>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Instant</span>
                </label>
              </div>
            </div>

            <div class="mt-8 pt-4 border-t border-neutral-800 flex gap-3 justify-end">
              <button @click="bookingStep = 'seats'" class="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-400 hover:text-white transition-all">
                {{ currentLang === 'EN' ? 'Back to Seats' : 'ត្រឡប់ទៅរើសកៅអី' }}
              </button>
              <button @click="confirmPayment" class="px-8 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/10">
                {{ currentLang === 'EN' ? 'Pay Now' : 'បង់ប្រាក់ឥឡូវនេះ' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  currentLang: { type: String, default: 'EN' }
})

const activeTab = ref('now-showing')
const activeDateIndex = ref(0)
const currentSlide = ref(0)

// Workflow booking state
const selectedMovie = ref(null)
const modalSubTab = ref('showtime')
const bookingStep = ref('info') // steps: info -> seats -> checkout
const selectedTime = ref('')
const selectedSeats = ref([])
const selectedPayment = ref('ABA Pay')

const topSlides = [
  { img: 'https://media-legend.sgp1.digitaloceanspaces.com/legend-prod/8d27a816-0082-4580-810a-a148a26950d0.jpeg', alt: 'Promo 1' },
  { img: 'https://media-legend.sgp1.digitaloceanspaces.com/legend-prod/74ae3062-93f6-4acb-863b-82d4a49f076e.jpeg', alt: 'Promo 2' }
]

const translations = {
  EN: { nowShowing: 'Now Showing', comingSoon: 'Coming Soon', noMovies: 'No movies available on this schedule' },
  KH: { nowShowing: 'កំពុងបញ្ចាំង', comingSoon: 'ឆាប់ៗនេះ', noMovies: 'មិនមានភាពយន្តសម្រាប់កាលវិភាគនេះទេ' }
}

const t = computed(() => translations[props.currentLang])

const datesData = {
  EN: [
    { dayName: 'Today', dayNumber: '3', month: 'Jun' },
    { dayName: 'Thu', dayNumber: '4', month: 'Jun' },
    { dayName: 'Fri', dayNumber: '5', month: 'Jun' },
    { dayName: 'Sat', dayNumber: '6', month: 'Jun' },
    { dayName: 'Sun', dayNumber: '7', month: 'Jun' },
    { dayName: 'Mon', dayNumber: '8', month: 'Jun' }
  ],
  KH: [
    { dayName: 'ថ្ងៃនេះ', dayNumber: '3', month: 'មិថុនា' },
    { dayName: 'ព្រហ', dayNumber: '4', month: 'មិថុនា' },
    { dayName: 'សុក្រ', dayNumber: '5', month: 'មិថុនា' },
    { dayName: 'សៅរ៍', dayNumber: '6', month: 'មិថុនា' },
    { dayName: 'អាទិត្យ', dayNumber: '7', month: 'មិថុនា' },
    { dayName: 'ចន្ទ', dayNumber: '8', month: 'មិថុនា' }
  ]
}

const currentDates = computed(() => datesData[props.currentLang])

const seatPlan = ref([
  { rowName: 'A', seats: [{ id: 'A1', num: 1, type: 'Regular', isTaken: false }, { id: 'A2', num: 2, type: 'Regular', isTaken: true }, { id: 'A3', num: 3, type: 'Regular', isTaken: false }, { id: 'A4', num: 4, type: 'Regular', isTaken: false }, { id: 'A5', num: 5, type: 'Regular', isTaken: false }, { id: 'A6', num: 6, type: 'Regular', isTaken: true }] },
  { rowName: 'B', seats: [{ id: 'B1', num: 1, type: 'Regular', isTaken: false }, { id: 'B2', num: 2, type: 'Regular', isTaken: false }, { id: 'B3', num: 3, type: 'Regular', isTaken: false }, { id: 'B4', num: 4, type: 'Regular', isTaken: true }, { id: 'B5', num: 5, type: 'Regular', isTaken: false }, { id: 'B6', num: 6, type: 'Regular', isTaken: false }] },
  { rowName: 'C', seats: [{ id: 'C1', num: 1, type: 'Regular', isTaken: false }, { id: 'C2', num: 2, type: 'Regular', isTaken: false }, { id: 'C3', num: 3, type: 'Regular', isTaken: false }, { id: 'C4', num: 4, type: 'Regular', isTaken: false }, { id: 'C5', num: 5, type: 'Regular', isTaken: false }, { id: 'C6', num: 6, type: 'Regular', isTaken: false }] },
  { rowName: 'D', seats: [{ id: 'D1', num: 1, type: 'VIP', isTaken: false }, { id: 'D2', num: 2, type: 'VIP', isTaken: false }, { id: 'D3', num: 3, type: 'VIP', isTaken: true }, { id: 'D4', num: 4, type: 'VIP', isTaken: false }, { id: 'D5', num: 5, type: 'VIP', isTaken: false }, { id: 'D6', num: 6, type: 'VIP', isTaken: false }] },
  { rowName: 'E', seats: [{ id: 'E1', num: 1, type: 'VIP', isTaken: false }, { id: 'E2', num: 2, type: 'VIP', isTaken: false }, { id: 'E3', num: 3, type: 'VIP', isTaken: false }, { id: 'E4', num: 4, type: 'VIP', isTaken: false }, { id: 'E5', num: 5, type: 'VIP', isTaken: false }, { id: 'E6', num: 6, type: 'VIP', isTaken: false }] }
])

const movies = ref([
  { title: { EN: "Salmokji: Whispering Water", KH: "បឹងដង្ហោយព្រលឹង" }, poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500&auto=format&fit=crop", releaseDate: "28 May 2026", duration: "1h 36min", rating: "R18", type: "Horror / Thriller", formats: ["2D", "VIP"], status: "now", showDates: ["3", "4", "5"] },
  { title: { EN: "Don't Bully Me", KH: "បង្កាធ្មប់" }, poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", releaseDate: "28 May 2026", duration: "1h 52min", rating: "R18", type: "Thriller", formats: ["2D"], status: "now", showDates: ["3", "5", "6"] },
  { title: { EN: "Your Final Homework", KH: "បេះដូងត្រូវជ្រើស" }, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop", releaseDate: "27 May 2026", duration: "2h 05min", rating: "G", type: "Drama", formats: ["2D"], status: "now", showDates: ["3", "4", "6", "7"] },
  { title: { EN: "Samakdo", KH: "កោរសក់កងដឹក" }, poster: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=500&auto=format&fit=crop", releaseDate: "22 May 2026", duration: "1h 48min", rating: "R18", type: "Horror / Mystery", formats: ["2D", "ATMOS"], status: "now", showDates: ["3", "4", "5", "8"] },
  { title: { EN: "The Mandalorian and Grogu", KH: "ដឹ ម៉ានដាឡូរៀន និង ហ្គ្រូហ្គូ" }, poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop", releaseDate: "21 May 2026", duration: "2h 12min", rating: "G", type: "Action / Sci-Fi", formats: ["ScreenX", "3D"], status: "now", showDates: ["4", "5", "6"] },
  { title: { EN: "Headless Gangster", KH: "ក្បាលដាច់ក្បាលងាប់" }, poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=500&auto=format&fit=crop", releaseDate: "21 May 2026", duration: "1h 40min", rating: "NC15", type: "Action / Comedy", formats: ["2D"], status: "now", showDates: ["5", "6", "7"] }
])

const filteredMovies = computed(() => {
  if (activeTab.value === 'coming-soon') {
    return movies.value.filter(movie => movie.status === 'soon')
  } else {
    const currentSelectedDay = currentDates.value[activeDateIndex.value].dayNumber
    return movies.value.filter(movie => movie.status === 'now' && movie.showDates.includes(currentSelectedDay))
  }
})

const totalPrice = computed(() => {
  return selectedSeats.value.reduce((sum, seat) => sum + (seat.type === 'VIP' ? 6.00 : 4.00), 0)
})

const selectDate = (index) => { activeDateIndex.value = index }
const changeTab = (tab) => { activeTab.value = tab; activeDateIndex.value = 0 }

const openMovieDetail = (movie, initialTab = 'showtime') => {
  selectedMovie.value = movie
  modalSubTab.value = initialTab
  bookingStep.value = 'info'
  selectedSeats.value = []
}

const closeMovieDetail = () => {
  selectedMovie.value = null
  selectedTime.value = ''
  selectedSeats.value = []
}

const selectShowtime = (time) => {
  selectedTime.value = time
  bookingStep.value = 'seats'
}

const toggleSeat = (seat) => {
  const seatIdx = selectedSeats.value.findIndex(s => s.id === seat.id)
  if (seatIdx > -1) {
    selectedSeats.value.splice(seatIdx, 1)
  } else {
    selectedSeats.value.push(seat)
  }
}

const confirmPayment = () => {
  alert(props.currentLang === 'EN' 
    ? `Booking Successfully via ${selectedPayment.value}! Amount Paid: $${totalPrice.value.toFixed(2)}` 
    : `ការទូទាត់ប្រាក់បានជោគជ័យតាមរយៈ ${selectedPayment.value}! ចំនួនទឹកប្រាក់៖ $${totalPrice.value.toFixed(2)}`
  )
  closeMovieDetail()
}

onMounted(() => {
  setInterval(() => { currentSlide.value = (currentSlide.value + 1) % topSlides.length }, 6000)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>