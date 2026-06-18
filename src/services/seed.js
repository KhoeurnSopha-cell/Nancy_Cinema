import { db } from '../firebase/config'; 
import { collection, doc, setDoc } from 'firebase/firestore';

export const movies = [
  // ─── NOW SHOWING (10) ──────────────────────────────────────────
  { title: { EN: "Salmokji: Whispering Water", KH: "បឹងដង្ហោយព្រលឹង" }, poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500&auto=format&fit=crop", releaseDate: "10 Jun 2026", duration: "1h 36min", rating: "R18", type: "Horror / Thriller", formats: ["2D", "VIP"], status: "now", showDates: ["13", "14", "15"] },
  { title: { EN: "Don't Bully Me", KH: "បង្កាធ្មប់" }, poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", releaseDate: "11 Jun 2026", duration: "1h 52min", rating: "R18", type: "Thriller", formats: ["2D"], status: "now", showDates: ["13", "15", "16"] },
  { title: { EN: "Your Final Homework", KH: "បេះដូងត្រូវជ្រើស" }, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop", releaseDate: "12 Jun 2026", duration: "2h 05min", rating: "G", type: "Drama", formats: ["2D"], status: "now", showDates: ["13", "14", "16", "17"] },
  { title: { EN: "Neon Requiem", KH: "ចម្រៀងរំលឹកពណ៌អំពើ" }, poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500&auto=format&fit=crop", releaseDate: "05 Jun 2026", duration: "2h 18min", rating: "R18", type: "Crime / Drama", formats: ["2D", "VIP"], status: "now", showDates: ["13", "14", "15", "16"] },
  { title: { EN: "The Last Monsoon", KH: "មជ្ឈដើមមរណ" }, poster: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=500&auto=format&fit=crop", releaseDate: "01 Jun 2026", duration: "1h 48min", rating: "G", type: "Romance / Drama", formats: ["2D"], status: "now", showDates: ["13", "15", "17"] },
  { title: { EN: "Iron Mandate", KH: "បញ្ជាដែក" }, poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=500&auto=format&fit=crop", releaseDate: "08 Jun 2026", duration: "2h 32min", rating: "NC15", type: "Action / Sci-Fi", formats: ["2D", "VIP"], status: "now", showDates: ["14", "15", "16", "17"] },
  { title: { EN: "Lotus & Ash", KH: "ផ្កាឈូកនិងផេះ" }, poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop", releaseDate: "03 Jun 2026", duration: "1h 55min", rating: "G", type: "Animation / Family", formats: ["2D"], status: "now", showDates: ["13", "14", "15", "16", "17", "18"] },
  { title: { EN: "Phantom Protocol", KH: "ពិធីការបិសាច" }, poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=500&auto=format&fit=crop", releaseDate: "07 Jun 2026", duration: "2h 10min", rating: "NC15", type: "Spy / Action", formats: ["2D", "VIP"], status: "now", showDates: ["14", "16", "17", "18"] },
  { title: { EN: "Borrowed Sky", KH: "មេឃជ្រុលខ្ចី" }, poster: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?q=80&w=500&auto=format&fit=crop", releaseDate: "09 Jun 2026", duration: "1h 42min", rating: "G", type: "Drama / Romance", formats: ["2D"], status: "now", showDates: ["13", "14", "15", "18"] },
  { title: { EN: "Shattered Echo", KH: "មុទ្ទដ្ឋានរបក់" }, poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop", releaseDate: "06 Jun 2026", duration: "1h 59min", rating: "R18", type: "Mystery / Thriller", formats: ["2D"], status: "now", showDates: ["15", "16", "17"] },

  // ─── COMING SOON (10) ─────────────────────────────────────────
  { title: { EN: "Celestial Drift", KH: "អណ្ដែតតារា" }, poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=500&auto=format&fit=crop", releaseDate: "25 Jun 2026", duration: "2h 20min", rating: "G", type: "Sci-Fi / Adventure", formats: ["2D", "VIP"], status: "soon", showDates: [] },
  { title: { EN: "Blood Meridian 2049", KH: "ឈាមមេរីឌៀន ២០៤៩" }, poster: "https://images.unsplash.com/photo-1560109947-543149eceb16?q=80&w=500&auto=format&fit=crop", releaseDate: "27 Jun 2026", duration: "2h 44min", rating: "R18", type: "Action / Western", formats: ["2D", "VIP"], status: "soon", showDates: [] },
  { title: { EN: "Echo of Silence", KH: "ប្រតិធ្វនិអស្ចារ" }, poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=500&auto=format&fit=crop", releaseDate: "28 Jun 2026", duration: "1h 50min", rating: "NC15", type: "Psychological Thriller", formats: ["2D"], status: "soon", showDates: [] },
  { title: { EN: "The Golden Serpent", KH: "ពស់មាស" }, poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500&auto=format&fit=crop", releaseDate: "02 Jul 2026", duration: "2h 08min", rating: "NC15", type: "Fantasy / Action", formats: ["2D", "VIP"], status: "soon", showDates: [] },
  { title: { EN: "Midnight Cartographer", KH: "គូផែនទីពាក់កណ្ដាលយប់" }, poster: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=500&auto=format&fit=crop", releaseDate: "04 Jul 2026", duration: "1h 57min", rating: "G", type: "Mystery / Adventure", formats: ["2D"], status: "soon", showDates: [] },
  { title: { EN: "Dust & Dynasties", KH: "ធូលីនិងរាជបន្ត" }, poster: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=500&auto=format&fit=crop", releaseDate: "05 Jul 2026", duration: "2h 35min", rating: "NC15", type: "Historical / Epic", formats: ["2D", "VIP"], status: "soon", showDates: [] },
  { title: { EN: "Synthetic Hearts", KH: "បេះដូងសិប្បនិម្មិត" }, poster: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=500&auto=format&fit=crop", releaseDate: "10 Jul 2026", duration: "2h 02min", rating: "G", type: "Sci-Fi / Romance", formats: ["2D"], status: "soon", showDates: [] },
  { title: { EN: "Wolves of Tonle Sap", KH: "ចចកបឹងទន្លេ" }, poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop", releaseDate: "12 Jul 2026", duration: "1h 44min", rating: "R18", type: "Crime / Drama", formats: ["2D", "VIP"], status: "soon", showDates: [] },
  { title: { EN: "Gravity's Child", KH: "កូនទំនាញផែនដី" }, poster: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=500&auto=format&fit=crop", releaseDate: "18 Jul 2026", duration: "2h 15min", rating: "G", type: "Sci-Fi / Drama", formats: ["2D", "VIP"], status: "soon", showDates: [] },
  { title: { EN: "Scarlet Oath", KH: "សច្ចាក្រហម" }, poster: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=500&auto=format&fit=crop", releaseDate: "20 Jul 2026", duration: "2h 28min", rating: "NC15", type: "Action / Drama", formats: ["2D", "VIP"], status: "soon", showDates: [] }
];

export const seedMovies = async () => {
  const moviesCol = collection(db, 'movies');
  let count = 0;
  for (const movie of movies) {
    const docId = movie.title.EN.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    await setDoc(doc(moviesCol, docId), movie);
    console.log(`✅ [${++count}/20] Seeded: ${movie.title.EN}`);
  }
  console.log('🎉 Firestore seeded!');
};