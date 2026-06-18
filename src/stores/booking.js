import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookingStore = defineStore('booking', () => {
  const selectedMovie = ref(null);
  const isModalOpen = ref(false);
  const myTickets = ref([]);     // សម្រាប់រក្សាទុកព័ត៌មានលម្អិតនៃសំបុត្រ
  const ticketCount = ref(0);    // 🔥 ថែមជួរនេះ៖ សម្រាប់ចាំរាប់ចំនួនសំបុត្រសរុប (លោតលើ Badge ក្រហម)

  const openModal = (movie) => {
    selectedMovie.value = movie;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedMovie.value = null;
  };

  // ✅ កែសម្រួលមុខងារបន្ថែមសំបុត្រ ឱ្យបូកចំនួនចូល ticketCount ផ្ទាល់
  const addTickets = (count, ticketInfo) => {
    ticketCount.value += count; // 👈 🔥 បូកបន្ថែមចំនួនសំបុត្រដែលទើបទិញ (ឧទាហរណ៍៖ +1 ឬ +2)
    myTickets.value.push({ ...ticketInfo, count });
  };

  // កុំភ្លេច return ticketCount ទៅឱ្យ Component ផ្សេងៗប្រើប្រាស់ផង
  return { 
    selectedMovie, 
    isModalOpen, 
    openModal, 
    closeModal, 
    myTickets, 
    ticketCount, // 👈 ថែមត្រង់នេះ
    addTickets 
  };
});