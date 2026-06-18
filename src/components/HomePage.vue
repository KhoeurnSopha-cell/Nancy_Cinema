<template>
  <div 
    class="w-full min-h-screen font-sans selection:bg-rose-600 selection:text-white antialiased transition-colors duration-300"
    :class="currentTheme === 'dark' ? 'bg-[#0b0b0b] text-gray-200' : 'bg-gray-50 text-gray-800'"
  >
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
            <div 
              class="absolute inset-0 transition-colors duration-300"
              :class="currentTheme === 'dark' 
                ? 'bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent' 
                : 'bg-gradient-to-t from-gray-50 via-gray-50/20 to-transparent'"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
      
      <div 
        class="flex items-center justify-center md:justify-start gap-8 mb-8 border-b pb-px transition-colors duration-300"
        :class="currentTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'"
      >
        <h2 
          class="font-black text-xl md:text-2xl cursor-pointer select-none pb-4 border-b-4 tracking-wider uppercase transition-all duration-300"
          :class="activeTab === 'now-showing' 
            ? 'text-rose-600 border-rose-600' 
            : 'text-neutral-500 border-transparent hover:text-neutral-400'"
          @click="changeTab('now-showing')"
        >
          {{ t.nowShowing }}
        </h2>
        <h2 
          class="font-black text-xl md:text-2xl cursor-pointer select-none pb-4 border-b-4 tracking-wider uppercase transition-all duration-300"
          :class="activeTab === 'coming-soon' 
            ? 'text-rose-600 border-rose-600' 
            : 'text-neutral-500 border-transparent hover:text-neutral-400'"
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
          :class="[
            activeDateIndex === index 
              ? 'border-rose-600 bg-rose-600 text-white shadow-lg shadow-rose-600/20' 
              : (currentTheme === 'dark' 
                  ? 'bg-[#141414] border-neutral-800/60 text-neutral-400 hover:border-neutral-700 hover:bg-[#1a1a1a]' 
                  : 'bg-white border-neutral-200 text-gray-500 hover:border-neutral-400 hover:bg-gray-100')
          ]" 
          @click="selectDate(index)"
        >
          <span class="text-[11px] font-bold tracking-wider uppercase opacity-80" :class="activeDateIndex === index ? 'text-white' : 'text-neutral-400'">{{ date.dayName }}</span>
          <span class="text-2xl font-black my-1 tracking-tight" :class="activeDateIndex === index ? 'text-white' : (currentTheme === 'dark' ? 'text-neutral-100' : 'text-gray-800')">{{ date.dayNumber }}</span>
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
            <div 
              class="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-xl border transition-colors duration-300"
              :class="currentTheme === 'dark' ? 'border-neutral-800/50 bg-[#141414]' : 'border-neutral-200 bg-gray-200'"
            >
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
              <h5 
                class="text-sm md:text-base font-bold tracking-wide line-clamp-1 group-hover/card:text-rose-500 transition-colors duration-200"
                :class="currentTheme === 'dark' ? 'text-neutral-100' : 'text-gray-900'"
              >
                {{ movie.title[currentLang] }}
              </h5>
              <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span 
                  class="text-[9px] font-extrabold px-1.5 py-0.5 border rounded transition-colors duration-300"
                  :class="currentTheme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-gray-100 border-gray-300 text-gray-600'"
                >
                  {{ movie.formats ? movie.formats[0] : '2D' }}
                </span>
                <span class="text-xs text-neutral-500 font-medium ml-1">{{ movie.type }}</span>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="col-span-full py-12 text-center text-sm text-neutral-500">
          {{ t.noMovies }}
        </div>
      </div>
    </div>

    <div v-if="selectedMovie" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto transition-opacity duration-300 animate-fadeIn">
      <div 
        class="relative w-full max-w-[950px] border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-8 transition-colors duration-300"
        :class="currentTheme === 'dark' ? 'bg-[#0f0a0a] border-neutral-800' : 'bg-white border-neutral-300 text-gray-800'"
      >
        
        <button @click="closeMovieDetail" class="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/80 hover:text-white hover:bg-rose-600 transition-colors mt-5">
          <span class="text-xl font-bold">&times;</span>
        </button>

        <div v-if="bookingStep !== 'success-receipt'" class="relative w-full md:w-2/5 aspect-[2/3] md:aspect-auto md:h-[550px]">
          <img :src="selectedMovie.poster" class="w-full h-full object-cover" :alt="selectedMovie.title[currentLang]">
          <div 
            class="absolute inset-0 transition-all duration-300 "
            :class="currentTheme === 'dark' 
              ? 'bg-gradient-to-t md:bg-gradient-to-r from-[#0f0a0a] via-transparent to-transparent' 
              : 'bg-gradient-to-t md:bg-gradient-to-r from-white via-transparent to-transparent'"
          ></div>
        </div>

        <div 
          class="w-full p-6 md:p-8 flex flex-col justify-between " 
          :class="[
            bookingStep !== 'success-receipt' ? 'md:w-3/5' : 'w-full',
            currentTheme === 'dark' ? 'bg-gradient-to-b from-transparent to-[#0a0505]' : 'bg-gradient-to-b from-transparent to-gray-50'
          ]"
        >
          
          <div v-if="bookingStep === 'info'">
            <h3 class="text-2xl md:text-3xl font-black tracking-wide mb-6" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">
              {{ selectedMovie.title[currentLang] }}
            </h3>

            <div class="space-y-4 text-sm" :class="currentTheme === 'dark' ? 'text-neutral-300' : 'text-gray-600'">
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Genre:' : 'ប្រភេទ៖' }}</span>
                <span class="font-semibold" :class="currentTheme === 'dark' ? 'text-neutral-200' : 'text-gray-800'">{{ selectedMovie.type }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Duration:' : 'រយៈពេល៖' }}</span>
                <span class="font-semibold" :class="currentTheme === 'dark' ? 'text-neutral-200' : 'text-gray-800'">{{ selectedMovie.duration || '1h 36min' }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Release:' : 'ថ្ងៃបញ្ចាំង៖' }}</span>
                <span class="font-semibold" :class="currentTheme === 'dark' ? 'text-neutral-200' : 'text-gray-800'">{{ selectedMovie.releaseDate }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-neutral-400 font-medium min-w-[100px]">{{ currentLang === 'EN' ? 'Rating:' : 'កម្រិតអាយុ៖' }}</span>
                <span class="px-2 py-0.5 rounded text-xs font-black bg-neutral-900 border border-neutral-700 text-rose-500">{{ selectedMovie.rating }}</span>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t" :class="currentTheme === 'dark' ? 'border-neutral-800/80' : 'border-neutral-200'">
              <div class="flex gap-6 border-b pb-2" :class="currentTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'">
                <button @click="modalSubTab = 'showtime'" class="text-base font-black uppercase tracking-wider pb-2 transition-colors relative" :class="modalSubTab === 'showtime' ? 'text-rose-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-rose-600' : 'text-neutral-500 hover:text-neutral-400'">
                  {{ currentLang === 'EN' ? 'Showtime' : 'ម៉ោងបញ្ចាំង' }}
                </button>
                <button @click="modalSubTab = 'detail'" class="text-base font-black uppercase tracking-wider pb-2 transition-colors relative" :class="modalSubTab === 'detail' ? 'text-rose-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-rose-600' : 'text-neutral-500 hover:text-neutral-400'">
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
                      class="px-4 py-2.5 border rounded-lg text-xs font-bold transition-colors"
                      :class="currentTheme === 'dark' ? 'bg-[#1a1313] border-neutral-800 text-neutral-300 hover:border-rose-600 hover:text-white' : 'bg-gray-100 border-gray-300 text-gray-700 hover:border-rose-600 hover:bg-white'"
                    >
                      {{ time }}
                    </button>
                  </div>
                </div>
                <div v-else class="text-xs leading-relaxed animate-fadeIn" :class="currentTheme === 'dark' ? 'text-neutral-400' : 'text-gray-600'">
                  {{ selectedMovie.title[currentLang] }} {{ currentLang === 'EN' ? 'is an incredible cinematic experience.' : 'គឺជាភាពយន្តដ៏អស្ចារ្យដែលអ្នកមិនគួររំលង។' }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="bookingStep === 'seats'" class="w-full animate-fadeIn">
            <div class="flex flex-col mb-6 border-b pb-4" :class="currentTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'">
              <h4 class="text-2xl font-black tracking-wide" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">{{ selectedMovie.title[currentLang] }}</h4>
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
                <span class="text-xs font-bold text-neutral-500 w-4">{{ row.rowName }}</span>
                <div class="flex gap-1.5">
                  <button 
                    v-for="seat in row.seats" 
                    :key="seat.id"
                    :disabled="seat.isTaken"
                    @click="toggleSeat(seat)"
                    class="w-7 h-7 rounded-md text-[9px] font-bold transition-all flex items-center justify-center"
                    :class="[
                      seat.isTaken ? (currentTheme === 'dark' ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed line-through' : 'bg-gray-300 text-gray-400 cursor-not-allowed line-through') :
                      selectedSeats.some(s => s.id === seat.id) ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-400' :
                      seat.type === 'VIP' ? (currentTheme === 'dark' ? 'bg-amber-600/20 border border-amber-500/40 text-amber-400 hover:bg-amber-600 hover:text-white' : 'bg-amber-100 border border-amber-400 text-amber-700 hover:bg-amber-600 hover:text-white') :
                      (currentTheme === 'dark' ? 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-rose-500 hover:text-white' : 'bg-white border border-gray-300 text-gray-700 hover:border-rose-500 hover:bg-gray-50')
                    ]"
                  >
                    {{ seat.num }}
                  </button>
                </div>
              </div>
            </div>

            <div class="flex justify-center gap-6 mt-6 text-[11px] font-medium text-neutral-400">
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded border" :class="currentTheme === 'dark' ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-gray-300'"></span>{{ currentLang === 'EN' ? 'Available' : 'ទំនេរ' }}</div>
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded border" :class="currentTheme === 'dark' ? 'bg-amber-600/40 border-amber-500' : 'bg-amber-100 border-amber-400'"></span>VIP ($6.00)</div>
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-rose-600"></span>{{ currentLang === 'EN' ? 'Selected' : 'បានរើស' }}</div>
              <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded line-through" :class="currentTheme === 'dark' ? 'bg-neutral-800' : 'bg-gray-300'"></span>{{ currentLang === 'EN' ? 'Sold' : 'លក់រួច' }}</div>
            </div>

            <div class="mt-8 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4" :class="currentTheme === 'dark' ? 'border-neutral-800/80' : 'border-neutral-200'">
              <div>
                <p class="text-xs text-neutral-400">{{ currentLang === 'EN' ? 'Selected Seats:' : 'កៅអីដែលបានជ្រើសរើស៖' }} 
                  <span class="font-bold ml-1" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'" v-if="selectedSeats.length">{{ selectedSeats.map(s => s.id).join(', ') }}</span>
                  <span class="text-neutral-500 italic ml-1" v-else>None</span>
                </p>
                <p class="text-sm font-black mt-1" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">{{ currentLang === 'EN' ? 'Total Price:' : 'តម្លៃសរុប៖' }} <span class="text-rose-500">${{ totalPrice.toFixed(2) }}</span></p>
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
            <h4 class="text-lg font-black mb-4 border-b pb-2" :class="currentTheme === 'dark' ? 'text-white border-neutral-800' : 'text-gray-900 border-gray-200'">
              {{ currentLang === 'EN' ? 'Payment Checkout' : 'ការទូទាត់ប្រាក់' }}
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border rounded-xl p-4 space-y-3" :class="currentTheme === 'dark' ? 'bg-neutral-900/40 border-neutral-800/60' : 'bg-gray-50 border-gray-200'">
                <p class="text-xs font-bold uppercase text-neutral-500 tracking-wider">{{ currentLang === 'EN' ? 'Order Summary' : 'សេចក្តីសង្ខេបការបញ្ជាទិញ' }}</p>
                <div class="flex justify-between text-sm"><span class="text-neutral-400">Movie:</span><span class="font-bold" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">{{ selectedMovie.title[currentLang] }}</span></div>
                <div class="flex justify-between text-sm"><span class="text-neutral-400">Schedule:</span><span :class="currentTheme === 'dark' ? 'text-neutral-200' : 'text-gray-700'">{{ selectedTime }} | Day {{ currentDates[activeDateIndex].dayNumber }}</span></div>
                <div class="flex justify-between text-sm"><span class="text-neutral-400">Seats:</span><span class="font-black text-rose-500">{{ selectedSeats.map(s => s.id).join(', ') }}</span></div>
                <hr :class="currentTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'" class="my-2">
                <div class="flex justify-between text-base font-black"><span :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">Amount Due:</span><span class="text-emerald-500">${{ totalPrice.toFixed(2) }}</span></div>
              </div>

              <div class="flex flex-col items-center justify-center border rounded-xl p-4 transition-all" :class="currentTheme === 'dark' ? 'bg-[#120d0d] border-neutral-800' : 'bg-white border-gray-200'">
                <p class="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-3">Scan to Pay via {{ selectedPayment }}</p>
                
                <div class="p-3 bg-white rounded-lg shadow-inner relative group">
                  <img 
                    :src="selectedPayment === 'ABA Pay' ? 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ABAPAY_DEMO_TOTAL_' + totalPrice : 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=WING_DEMO_TOTAL_' + totalPrice" 
                    class="w-[160px] h-[160px] object-contain" 
                    alt="Payment QR Code"
                  >
                </div>
                
                <div class="flex gap-2 mt-4 w-full">
                  <button 
                    v-for="method in ['ABA Pay', 'Wing']" 
                    :key="method"
                    @click="selectedPayment = method"
                    class="flex-1 py-1.5 text-[11px] font-bold border rounded-lg transition-all"
                    :class="selectedPayment === method ? 'bg-rose-600 text-white border-rose-600 shadow-md' : (currentTheme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-gray-100 border-gray-300 text-gray-600')"
                  >
                    {{ method }}
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-4 border-t flex gap-3 justify-end" :class="currentTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'">
              <button @click="bookingStep = 'seats'" class="px-5 py-2.5 rounded-xl border text-xs font-bold transition-all" :class="currentTheme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white' : 'bg-white border-gray-300 text-gray-500 hover:text-gray-900'">
                {{ currentLang === 'EN' ? 'Back' : 'ថយក្រោយ' }}
              </button>
              <button @click="goToUploadStep" class="px-8 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/10">
                {{ currentLang === 'EN' ? 'Pay Finish' : 'បង់ប្រាក់រួចរាល់' }}
              </button>
            </div>
          </div>

          <div v-if="bookingStep === 'success'" class="w-full animate-fadeIn flex flex-col items-center py-4">
            <div class="text-center mb-6">
              <div class="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl mb-3 border border-emerald-500/30">✓</div>
              <h4 class="text-xl font-extrabold tracking-wide" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">
                {{ currentLang === 'EN' ? 'Upload Payment Receipt' : 'ផ្ញើភស្តុតាងការបង់ប្រាក់' }}
              </h4>
              <p class="text-xs text-neutral-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
                {{ currentLang === 'EN' ? 'Please provide the transaction receipt to verify your seats.' : 'សូមផ្តល់វិក្កយបត្រប្រតិបត្តិការដើម្បីផ្ទៀងផ្ទាត់កៅអីរបស់អ្នក។' }}
              </p>
            </div>

            <div class="w-full max-w-[420px] space-y-5">
              
              <input 
                type="file" 
                ref="galleryInputRef" 
                accept="image/*" 
                class="hidden" 
                @change="handleAlbumFilePick"
              />

              <div 
                class="w-full h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-3 relative overflow-hidden transition-all duration-300"
                :class="[
                  previewReceiptUrl 
                    ? 'border-emerald-500/50 bg-black/40' 
                    : (currentTheme === 'dark' ? 'border-neutral-800 bg-[#141010]' : 'border-gray-300 bg-gray-50')
                ]"
              >
                <img 
                  v-if="previewReceiptUrl" 
                  :src="previewReceiptUrl" 
                  class="w-full h-full object-contain z-10 rounded-xl" 
                  alt="Receipt Preview" 
                />
                
                <div v-else class="text-center space-y-3 pointer-events-none flex flex-col items-center">
                  <span class="text-3xl text-neutral-600 opacity-80"></span>
                  <p class="text-xs font-bold text-neutral-500 tracking-wide">
                    {{ currentLang === 'EN' ? 'No image selected yet' : 'មិនទាន់មានរូបភាពជ្រើសរើសឡើយ' }}
                  </p>
                </div>

                <button 
                  v-if="previewReceiptUrl" 
                  @click="resetCaptureState" 
                  class="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-md bg-neutral-900/90 hover:bg-red-600 text-white border border-neutral-700/60 text-[10px] font-black uppercase tracking-wider transition-colors backdrop-blur-sm"
                >
                  {{ currentLang === 'EN' ? 'Remove' : 'លុបចេញ' }}
                </button>
              </div>

              <div class="grid grid-cols-2 gap-3.5">
                <button 
                  @click="handleTakePhotoAction" 
                  class="py-3 px-4 rounded-xl bg-[#e50914] text-white text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all active:scale-[0.98] shadow-lg shadow-red-600/10 flex items-center justify-center gap-2 border border-red-500/20"
                >
                   {{ currentLang === 'EN' ? 'Take Photo' : 'ថតវិក្កយបត្រ' }}
                </button>
                
                <button 
                  @click="triggerGalleryPicker" 
                  class="py-3 px-4 rounded-xl border font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  :class="currentTheme === 'dark' ? 'bg-[#1a1515] border-neutral-800 text-neutral-200 hover:bg-neutral-800 hover:text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'"
                >
                   {{ currentLang === 'EN' ? 'Open Album' : 'ជ្រើសពី Album' }}
                </button>
              </div>

              <button 
                :disabled="!uploadedFileRaw || isSubmitting"
                @click="submitBookingWithProof" 
                class="w-full mt-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                :class="[
                  uploadedFileRaw && !isSubmitting
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20 cursor-pointer' 
                    : 'bg-[#162721] text-neutral-500 cursor-not-allowed border border-emerald-950/40'
                ]"
              >
                <span v-if="isSubmitting" class="w-4 h-4 border-2 border-neutral-500 border-t-white rounded-full animate-spin"></span>
                <span>
                  {{ isSubmitting ? 'Processing...' : (currentLang === 'EN' ? 'Submit Verification' : 'បញ្ជូនភស្តុតាងទៅកាន់ហាង') }}
                </span>
              </button>
            </div>
          </div>

          <div v-if="bookingStep === 'success-receipt'" class="w-full animate-fadeIn flex flex-col items-center mt-40">
            <div class="w-full max-w-sm bg-[#120d0d] border border-neutral-800/80 rounded-2xl p-6 shadow-2xl relative text-center">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-[9px] text-white px-3 py-0.5 rounded-full uppercase tracking-widest font-black">
                Success
              </div>
              
              <h4 class="text-rose-500 text-xl font-black uppercase tracking-widest mt-2">NANCY CINEMA</h4>
              <p class="text-[10px] uppercase text-neutral-500 tracking-wider font-bold mt-0.5">Electronic Booking Receipt</p>
              
              <div class="mt-6 space-y-3.5 text-left text-xs border-t border-dashed border-neutral-800 pt-5">
                <div class="flex justify-between"><span class="text-neutral-400">Movie:</span><span class="font-bold text-white">{{ selectedMovie?.title[currentLang] }}</span></div>
                <div class="flex justify-between"><span class="text-neutral-400">Date/Time:</span><span class="text-neutral-200">{{ selectedTime }} | Day {{ currentDates[activeDateIndex].dayNumber }} {{ currentDates[activeDateIndex].month }}</span></div>
                <div class="flex justify-between"><span class="text-neutral-400">Seats:</span><span class="font-black text-rose-500">{{ selectedSeats.map(s => s.id).join(', ') }}</span></div>
                <div class="flex justify-between"><span class="text-neutral-400">Payment:</span><span class="text-emerald-400 font-bold">{{ selectedPayment }} (Paid)</span></div>
                <div class="flex justify-between"><span class="text-neutral-400">Invoice ID:</span><span class="text-neutral-400 font-mono">#NC-{{ generatedInvoiceId }}</span></div>
              </div>

              <div class="mt-6 border-t border-dashed border-neutral-800 pt-4 flex justify-between items-center">
                <span class="text-sm font-black text-white">Total Paid:</span>
                <span class="text-xl font-black text-emerald-400">${{ totalPrice.toFixed(2) }}</span>
              </div>
              
              <p class="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mt-6">Thank you & Enjoy your movie</p>
            </div>

            <div class="w-full max-w-sm flex flex-col gap-3 mt-6">
              <button @click="closeMovieDetail" class="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20">
                 Save Receipt (Download)
              </button>
              <button @click="closeMovieDetail" class="w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-black uppercase tracking-widest transition-all">
                 Back to Home
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="isWebcamActive" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div class="w-full max-w-md bg-[#121212] border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col items-center">
        <h5 class="text-sm font-black text-neutral-200 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Laptop Webcam Stream
        </h5>
        
        <div class="w-full aspect-video bg-black border border-neutral-800 rounded-xl overflow-hidden relative shadow-inner">
          <video ref="videoStreamRef" autoplay playsinline class="w-full h-full object-cover"></video>
        </div>
        
        <div class="flex gap-3 mt-5 w-full">
          <button @click="stopWebcamStream" class="flex-1 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
            {{ currentLang === 'EN' ? 'Cancel' : 'បោះបង់' }}
          </button>
          <button @click="captureWebcamSnapshot" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-emerald-600/10">
             Capture Photo
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue' 
import { db } from '@/firebase/config' 
import { doc, updateDoc, onSnapshot, setDoc, collection, getDocs, addDoc } from 'firebase/firestore' 
import { useBookingStore } from '@/stores/booking'
import { getAuth } from 'firebase/auth' 

const bookingStore = useBookingStore()
const auth = getAuth() 

const props = defineProps({
  currentLang: { type: String, default: 'EN' },
  currentTheme: { type: String, default: 'dark' } 
})

const TELEGRAM_BOT_TOKEN = '8982300148:AAHgxkCZaJye9ZL1HgQOsMYMxUUXormKzyQ'
const TELEGRAM_CHAT_ID = '5881662338' 

const activeTab = ref('now-showing')
const activeDateIndex = ref(0)
const currentSlide = ref(0)

// ភ្ជាប់ selectedMovie ទៅកាន់ Pinia Store ផ្ទាល់
const selectedMovie = computed({
  get: () => bookingStore.selectedMovie,
  set: (val) => { bookingStore.selectedMovie = val }
})

// មុខងារ Watch សម្រាប់ចាប់សញ្ញាស្ដាប់ការចុចភាពយន្តចេញពី Search Navbar ដើម្បីបើកផ្ទាំង Detail ភ្លាមៗ
watch(() => bookingStore.selectedMovie, (newMovie) => {
  if (newMovie) {
    modalSubTab.value = 'showtime'  
    bookingStep.value = 'info'      
    selectedSeats.value = []        
  }
})

const modalSubTab = ref('showtime')
const bookingStep = ref('info')
const selectedTime = ref('')
const selectedSeats = ref([])
const selectedPayment = ref('ABA Pay')
const generatedInvoiceId = ref('')
const isSubmitting = ref(false)

const galleryInputRef = ref(null)
const videoStreamRef = ref(null)
const isWebcamActive = ref(false)
const previewReceiptUrl = ref(null)
const uploadedFileRaw = ref(null)
let localMediaStreamInstance = null

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
    { dayName: 'Today', dayNumber: '13', month: 'Jun' },
    { dayName: 'Sun', dayNumber: '14', month: 'Jun' },
    { dayName: 'Mon', dayNumber: '15', month: 'Jun' },
    { dayName: 'Tue', dayNumber: '16', month: 'Jun' },
    { dayName: 'Wed', dayNumber: '17', month: 'Jun' },
    { dayName: 'Thu', dayNumber: '18', month: 'Jun' }
  ],
  KH: [
    { dayName: 'ថ្ងៃនេះ', dayNumber: '13', month: 'មិថុនា' },
    { dayName: 'អាទិត្យ', dayNumber: '14', month: 'មិថុនា' },
    { dayName: 'ចន្ទ', dayNumber: '15', month: 'មិថុនា' },
    { dayName: 'អង្គារ', dayNumber: '16', month: 'មិថុនា' },
    { dayName: 'ពុធ', dayNumber: '17', month: 'មិថុនា' },
    { dayName: 'ព្រហ', dayNumber: '18', month: 'មិថុនា' }
  ]
}

const currentDates = computed(() => datesData[props.currentLang])
const seatPlan = ref([])
const movies = ref([]) 

// 🔥 បានកែសម្រួលត្រង់នេះ ដើម្បីឱ្យសុវត្ថិភាពខ្ពស់ និងមិនមានបញ្ហា No Movies
// សូមកែសម្រួលផ្នែកនេះនៅក្នុង HomePage.vue
const filteredMovies = computed(() => {
  if (activeTab.value === 'coming-soon') {
    return movies.value.filter(movie => movie.status === 'soon')
  } else {
    const currentSelectedDay = currentDates.value[activeDateIndex.value].dayNumber
    return movies.value.filter(movie => movie.status === 'now' && movie.showDates.includes(currentSelectedDay))
  }
})


const fetchMovies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'movies'))
    movies.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("មានបញ្ហាក្នុងការទាញយក:", error)
  }
}

const totalPrice = computed(() => {
  return selectedSeats.value.reduce((sum, seat) => sum + (seat.type === 'VIP' ? 6.00 : 4.00), 0)
})

const documentId = computed(() => {
  if (!selectedMovie.value || !selectedTime.value) return ''
  const movieSlug = selectedMovie.value.title.EN.toLowerCase().replace(/[^a-z0-9]/g, '-')
  const day = currentDates.value[activeDateIndex.value].dayNumber
  const timeSlug = selectedTime.value.toLowerCase().replace(/[^a-z0-9]/g, '-')
  return `${movieSlug}-day-${day}-${timeSlug}`
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
  resetCaptureState()
  if (unsubscribeFirestore) unsubscribeFirestore()
}

const generateDefaultSeats = () => {
  return [
    { rowName: 'A', seats: [{ id: 'A1', num: 1, type: 'Regular', isTaken: false }, { id: 'A2', num: 2, type: 'Regular', isTaken: false }, { id: 'A3', num: 3, type: 'Regular', isTaken: false }, { id: 'A4', num: 4, type: 'Regular', isTaken: false }, { id: 'A5', num: 5, type: 'Regular', isTaken: false }, { id: 'A6', num: 6, type: 'Regular', isTaken: false }] },
    { rowName: 'B', seats: [{ id: 'B1', num: 1, type: 'Regular', isTaken: false }, { id: 'B2', num: 2, type: 'Regular', isTaken: false }, { id: 'B3', num: 3, type: 'Regular', isTaken: false }, { id: 'B4', num: 4, type: 'Regular', isTaken: false }, { id: 'B5', num: 5, type: 'Regular', isTaken: false }, { id: 'B6', num: 6, type: 'Regular', isTaken: false }] },
    { rowName: 'C', seats: [{ id: 'C1', num: 1, type: 'Regular', isTaken: false }, { id: 'C2', num: 2, type: 'Regular', isTaken: false }, { id: 'C3', num: 3, type: 'Regular', isTaken: false }, { id: 'C4', num: 4, type: 'Regular', isTaken: false }, { id: 'C5', num: 5, type: 'Regular', isTaken: false }, { id: 'C6', num: 6, type: 'Regular', isTaken: false }] },
    { rowName: 'D', seats: [{ id: 'D1', num: 1, type: 'VIP', isTaken: false }, { id: 'D2', num: 2, type: 'VIP', isTaken: false }, { id: 'D3', num: 3, type: 'VIP', isTaken: false }, { id: 'D4', num: 4, type: 'VIP', isTaken: false }, { id: 'D5', num: 5, type: 'VIP', isTaken: false }, { id: 'D6', num: 6, type: 'VIP', isTaken: false }] },
    { rowName: 'E', seats: [{ id: 'E1', num: 1, type: 'VIP', isTaken: false }, { id: 'E2', num: 2, type: 'VIP', isTaken: false }, { id: 'E3', num: 3, type: 'VIP', isTaken: false }, { id: 'E4', num: 4, type: 'VIP', isTaken: false }, { id: 'E5', num: 5, type: 'VIP', isTaken: false }, { id: 'E6', num: 6, type: 'VIP', isTaken: false }] }
  ]
}

let unsubscribeFirestore = null

const selectShowtime = (time) => {
  selectedTime.value = time
  bookingStep.value = 'seats'
}

watch(documentId, (newDocId) => {
  if (!newDocId) return
  if (unsubscribeFirestore) unsubscribeFirestore()

  const docRef = doc(db, 'showtimes_seats', newDocId)
  
  unsubscribeFirestore = onSnapshot(docRef, async (docSnap) => {
    if (docSnap.exists()) {
      seatPlan.value = docSnap.data().seats
    } else {
      const initialSeats = generateDefaultSeats()
      await setDoc(docRef, { seats: initialSeats })
      seatPlan.value = initialSeats
    }
  })
})

const toggleSeat = (seat) => {
  const seatIdx = selectedSeats.value.findIndex(s => s.id === seat.id)
  if (seatIdx > -1) {
    selectedSeats.value.splice(seatIdx, 1)
  } else {
    selectedSeats.value.push(seat)
  }
}

const goToUploadStep = () => { bookingStep.value = 'success' }

const handleTakePhotoAction = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile) {
    if (galleryInputRef.value) {
      galleryInputRef.value.setAttribute('capture', 'environment')
      galleryInputRef.value.click()
    }
  } else {
    startDeviceCamera()
  }
}

const triggerGalleryPicker = () => {
  if (galleryInputRef.value) {
    galleryInputRef.value.removeAttribute('capture')
    galleryInputRef.value.click()
  }
}

const startDeviceCamera = async () => {
  resetCaptureState()
  isWebcamActive.value = true
  try {
    const constraints = { video: { facingMode: { ideal: "environment" } }, audio: false }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    localMediaStreamInstance = stream
    if (videoStreamRef.value) videoStreamRef.value.srcObject = stream
  } catch (error) {
    console.error("Error accessing camera API:", error)
    isWebcamActive.value = false
  }
}

const captureWebcamSnapshot = () => {
  if (!videoStreamRef.value || !localMediaStreamInstance) return
  const video = videoStreamRef.value
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  const dataUrl = canvas.toDataURL('image/png')
  previewReceiptUrl.value = dataUrl
  canvas.toBlob((blob) => { uploadedFileRaw.value = blob }, 'image/png')
  stopWebcamStream()
}

const handleAlbumFilePick = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFileRaw.value = file
    previewReceiptUrl.value = URL.createObjectURL(file)
  }
}

const stopWebcamStream = () => {
  if (localMediaStreamInstance) {
    localMediaStreamInstance.getTracks().forEach(track => track.stop())
    localMediaStreamInstance = null
  }
  isWebcamActive.value = false
}

const resetCaptureState = () => {
  stopWebcamStream()
  if (previewReceiptUrl.value && !previewReceiptUrl.value.startsWith('data:')) {
    URL.revokeObjectURL(previewReceiptUrl.value)
  }
  previewReceiptUrl.value = null
  uploadedFileRaw.value = null
  if (galleryInputRef.value) galleryInputRef.value.value = ''
}

const submitBookingWithProof = async () => {
  if (!uploadedFileRaw.value || isSubmitting.value) return
  
  isSubmitting.value = true
  generatedInvoiceId.value = Math.floor(10000 + Math.random() * 90000).toString()

  try {
    const dateObj = currentDates.value[activeDateIndex.value]
    const seatListStr = selectedSeats.value.map(s => s.id).join(', ')
    
    let telegramMarkdownMessage = `🔔 *NEW BOOKING VERIFICATION PENDING* \n\n` +
      `🆔 *Invoice ID:* #NC-${generatedInvoiceId.value}\n` +
      `🎬 *Movie Name:* ${selectedMovie.value.title.EN}\n` +
      `📅 *Schedule:* ${selectedTime.value} | Day ${dateObj.dayNumber} ${dateObj.month}\n` +
      `💺 *Selected Seats:* ${seatListStr}\n` +
      `💵 *Total Amount:* $${totalPrice.value.toFixed(2)}\n` +
      `💳 *Payment Method:* ${selectedPayment.value}\n\n` +
      `⚠️ _Please look at the attached transaction screenshot below to manually confirm or decline tickets._`

    const formDataPayload = new FormData()
    formDataPayload.append('chat_id', TELEGRAM_CHAT_ID)
    formDataPayload.append('caption', telegramMarkdownMessage)
    formDataPayload.append('parse_mode', 'Markdown')
    formDataPayload.append('photo', uploadedFileRaw.value, `receipt_${generatedInvoiceId.value}.png`)

    const telegramEndpointUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`
    const apiResponse = await fetch(telegramEndpointUrl, {
      method: 'POST',
      body: formDataPayload
    })

    if (!apiResponse.ok) {
      throw new Error(`Telegram API Error status returned: ${apiResponse.status}`)
    }

    const docRef = doc(db, 'showtimes_seats', documentId.value)
    const updatedSeatPlan = seatPlan.value.map(row => {
      return {
        ...row,
        seats: row.seats.map(seat => {
          const isChosen = selectedSeats.value.some(s => s.id === seat.id)
          if (isChosen) return { ...seat, isTaken: true }
          return seat
        })
      }
    })

    await updateDoc(docRef, { seats: updatedSeatPlan })
    
    bookingStep.value = 'success-receipt'
    
    const detectedSeatType = selectedSeats.value[0]?.type || 'Standard'
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null

    const ticketPayload = {
      userId: currentUserId,
      movieTitle: props.currentLang === 'EN' 
        ? (selectedMovie.value?.title?.EN || 'Unknown Movie') 
        : (selectedMovie.value?.title?.KH || 'ភាពយន្តមិនស្គាល់'),
      movieTitleEN: selectedMovie.value?.title?.EN || 'Unknown Movie',
      movieTitleKH: selectedMovie.value?.title?.KH || 'ភាពយន្តមិនស្គាល់',
      movieImage: selectedMovie.value?.poster || selectedMovie.value?.image || 'https://via.placeholder.com/150',
      seatType: detectedSeatType,
      seats: selectedSeats.value.map(s => s.id),
      time: selectedTime.value,
      date: currentDates.value[activeDateIndex.value].dayNumber + ' ' + currentDates.value[activeDateIndex.value].month,
      total: totalPrice.value,
      payment: selectedPayment.value,
      invoiceId: generatedInvoiceId.value,
      createdAt: new Date()
    }

    if (currentUserId) {
      const docRefNewTicket = await addDoc(collection(db, "bookings"), ticketPayload)
      console.log("រក្សាទុកសំបុត្រទៅកាន់ Firestore ជោគជ័យ!")

      if (!bookingStore.tickets) bookingStore.tickets = []
      bookingStore.tickets.push({
        id: docRefNewTicket.id,
        ...ticketPayload
      })
    }

    bookingStore.addTickets(selectedSeats.value.length, ticketPayload)

  } catch (error) {
    console.error("Critical submission payload error caught:", error)
    alert("ការផ្ញើភស្តុតាងមានបញ្ហា! Please verify your network connection or try again.")
  } finally {
    isSubmitting.value = false
  }
}

let autoSlideInterval = null

onMounted(() => {
  fetchMovies()
  autoSlideInterval = setInterval(() => { 
    currentSlide.value = (currentSlide.value + 1) % topSlides.length 
  }, 6000)
})

onUnmounted(() => {
  if (autoSlideInterval) clearInterval(autoSlideInterval) 
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