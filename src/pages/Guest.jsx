import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Guest() {
  const navigate = useNavigate();
  const [resi, setResi] = useState("");
  const [statusCucian, setStatusCucian] = useState(null);
  const [kontakForm, setKontakForm] = useState({ nama: "", pesan: "" });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Halo! Selamat datang di Berry Laundry. Ada yang bisa kami bantu hari ini? 💙" }
  ]);
  
  // State pengontrol input email berlangganan
  const [subscriberContact, setSubscriberContact] = useState("");

  // Animasi scroll reveal
  const [revealedSections, setRevealedSections] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("beranda");
  const [scrollY, setScrollY] = useState(0);
  
  // Refs untuk setiap section
  const sectionRefs = {
    beranda: useRef(null),
    keunggulan: useRef(null),
    promo: useRef(null),
    layanan: useRef(null),
    artikel: useRef(null),
    testimonial: useRef(null),
    kontak: useRef(null),
    "cek-status": useRef(null)
  };

  const heroSlides = [
    {
      image: "https://www.sakulaundry.com/wp-content/uploads/2021/07/waktu-yang-tepat-menggunakan-laundry.jpg",
      title: "Proteksi Serat Kain Maksimal",
      description: "Perawatan eksklusif menggunakan formula khusus anti-pudar"
    },
    {
      image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=500",
      title: "Teknologi Sterilisasi Ultraviolet",
      description: "Bebas dari bakteri, kuman, dan bau apek seketika"
    },
    {
      image: "https://bisnisukm.com/uploads/2020/08/bisnis-jasa-laundry-pakaian-peluang-untuk-ibu-rumah-tangga.png",
      title: "Investasi Penampilan Terbaik",
      description: "Solusi hemat waktu luang di tengah kesibukan harian Anda"
    },
    {
      image: "https://mesinipso.id/wp-content/uploads/2025/09/laundryHotel.jpeg",
      title: "Keharuman Mewah Berkelas",
      description: "Parfum konsentrat premium yang segar dan tahan berminggu-minggu"
    }
  ];

  useEffect(() => {
    const handleScroll = () => { setScrollY(window.scrollY); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setRevealedSections(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1, rootMargin: "50px" });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getParallaxStyle = (speed, direction = 1) => ({
    transform: `translateY(${scrollY * speed * direction}px)`
  });

  const ParticleBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );

  const handleLacak = (e) => {
    e.preventDefault();
    if (!resi) return alert("Masukkan nomor resi terlebih dahulu!");
    setStatusCucian({
      id: resi.toUpperCase(),
      status: "Sedang Diproses (Cuci-Setrika)",
    });
  };

  const handleKirimKontak = (e) => {
    e.preventDefault();
    alert(`Terima kasih ${kontakForm.nama}, pesan Anda berhasil dikirim ke Berry Laundry!`);
    setKontakForm({ nama: "", pesan: "" });
  };

  // Fungsi submisi pendaftaran email promo
  const handleSubscribePromo = (e) => {
    e.preventDefault();
    alert(`Terima kasih! Email Anda (${subscriberContact}) telah berhasil terdaftar. Silakan cek kotak masuk email Anda untuk mengklaim semua kode voucher promo Berry Laundry! 🎁💙`);
    setSubscriberContact("");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    const updatedHistory = [...chatHistory, { sender: "user", text: userMessage }];
    setChatHistory(updatedHistory);
    setChatInput("");

    setTimeout(() => {
      let botResponse = "Maaf, Berry Bot kurang memahami maksud Anda. Silakan ketik pertanyaan seputar 'harga', 'jam buka', 'luntur', 'ekspres', 'antar jemput', atau 'komplain'.";
      const cleanMsg = userMessage.toLowerCase();

      if (cleanMsg.includes("halo") || cleanMsg.includes("hai") || cleanMsg.includes("p pagi") || cleanMsg.includes("p sore")) {
        botResponse = "Halo! Senang bisa menyapa Anda. Ada yang bisa Berry Bot bantu untuk mempermudah urusan pakaian kotor Anda hari ini? 😊";
      } else if (cleanMsg.includes("harga") || cleanMsg.includes("tarif") || cleanMsg.includes("biaya") || cleanMsg.includes("berapa")) {
        botResponse = "Tarif Berry Laundry sangat bersahabat! 🧺 Cuci Lipat: Rp 6.000/kg, 🔥 Cuci Setrika: Rp 8.000/kg, dan 👔 Dry Cleaning Premium: Mulai dari Rp 15.000 per satuan pakaian.";
      } else if (cleanMsg.includes("jam") || cleanMsg.includes("buka") || cleanMsg.includes("tutup")) {
        botResponse = "Outlet fisik Berry Laundry beroperasi setiap hari (Senin - Minggu) mulai pukul 07:00 pagi hingga pukul 21:00 WIB malam.";
      } else if (cleanMsg.includes("alamat") || cleanMsg.includes("lokasi") || cleanMsg.includes("dimana") || cleanMsg.includes("outlet")) {
        botResponse = "Kami berlokasi di pusat kota Rumbai, Pekanbaru tepatnya di Jl. Umban Sari. Anda juga bisa mencari rute tercepat via Google Maps dengan mengetik 'Berry Laundry'!";
      } else if (cleanMsg.includes("luntur") || cleanMsg.includes("pisah") || cleanMsg.includes("campur")) {
        botResponse = "Tenang! Kebijakan utama di Berry Laundry adalah menerapkan sistem 1 MESIN 1 PELANGGAN. Kami juga memilah baju putih and baju berwarna sensitif secara terpisah sebelum dicuci untuk menghindari risiko kelunturan.";
      } else if (cleanMsg.includes("cepat") || cleanMsg.includes("ekspres") || cleanMsg.includes("express") || cleanMsg.includes("kilat") || cleanMsg.includes("berapa hari")) {
        botResponse = "Untuk layanan reguler memakan waktu 2-3 hari kerja. Namun, jika Anda sedang terburu-buru, kami menyediakan paket kilat Ekspres 24 Jam dan Super Ekspres 6 Jam selesai! 🚀";
      } else if (cleanMsg.includes("antar") || cleanMsg.includes("jemput") || cleanMsg.includes("kurir") || cleanMsg.includes("ambil")) {
        botResponse = "Tentu saja bisa! Kami menyediakan layanan antar-jemput bebas repot. Anda tinggal klik tombol 'Pesan Sekarang' di atas, isi formulir alamat, dan kurir kami akan segera meluncur menjemput cucian Anda.";
      } else if (cleanMsg.includes("parfum") || cleanMsg.includes("wangi") || cleanMsg.includes("sabun") || cleanMsg.includes("detergen")) {
        botResponse = "Kami hanya menggunakan detergen cair anti-bakteri ramah lingkungan untuk membersihkan serat kain terdalam. Kami juga menyediakan berbagai pilihan varian parfum premium tahan lama seperti Lavender, Ocean Fresh, dan Signature Berry.";
      } else if (cleanMsg.includes("jas") || cleanMsg.includes("gaun") || cleanMsg.includes("kebaya") || cleanMsg.includes("satuan") || cleanMsg.includes("bedcover")) {
        botResponse = "Untuk kain berbahan sensitif dan barang besar seperti Jas, Gaun, Kebaya, Tas, Sepatu, dan Bedcover, kami sangat menyarankan menggunakan layanan 'Dry Cleaning Premium' agar dirawat secara khusus tanpa merusak tekstur benang.";
      } else if (cleanMsg.includes("lacak") || cleanMsg.includes("resi") || cleanMsg.includes("nota") || cleanMsg.includes("status")) {
        botResponse = "Untuk melacak cucian Anda, silakan gulir halaman ini ke bagian paling bawah di section 'Sistem Pelacakan Digital', lalu masukkan nomor resi yang tertera di nota fisik atau WhatsApp Anda.";
      } else if (cleanMsg.includes("bayar") || cleanMsg.includes("pembayaran") || cleanMsg.includes("cash") || cleanMsg.includes("qris") || cleanMsg.includes("transfer")) {
        botResponse = "Berry Laundry menerima berbagai metode transaksi demi kemudahan Anda, mulai dari uang tunai (Cash), Transfer Bank, hingga Scan QRIS e-wallet (OVO, Dana, GoPay, LinkAja).";
      } else if (cleanMsg.includes("komplain") || cleanMsg.includes("rusak") || cleanMsg.includes("hilang") || cleanMsg.includes("kecewa")) {
        botResponse = "Mohon maaf atas ketidaknyamanannya. Kepuasan Anda adalah prioritas kami. Hubungi CS kami di +62 812-6571-9003 atau isi form di section 'Saluran Komunikasi' di atas, tim kami akan segera memberikan ganti rugi/garansi cuci ulang gratis.";
      } else if (cleanMsg.includes("terima kasih") || cleanMsg.includes("makasih") || cleanMsg.includes("oke") || cleanMsg.includes("siap")) {
        botResponse = "Sama-sama! Senang bisa membantu Anda. Jika pakaian kotor Anda sudah menumpuk, jangan ragu untuk menyerahkannya kepada kami ya! 🌀💙";
      }

      setChatHistory([...updatedHistory, { sender: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 font-sans relative overflow-x-hidden">
      <ParticleBackground />
      
      {/* Floating background elements with parallax */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none" style={getParallaxStyle(0.03, -1)} />
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30 pointer-events-none" style={getParallaxStyle(0.05, 1)} />
      <div className="fixed top-1/3 right-20 w-24 h-24 bg-pink-200 rounded-full blur-3xl opacity-20 pointer-events-none" style={getParallaxStyle(0.04, -1)} />

      {/* ==================== HERO SECTION ==================== */}
      <section 
        id="beranda" 
        ref={sectionRefs.beranda}
        className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none" style={getParallaxStyle(0.02, -1)} />
        
        <div className="space-y-6 relative z-10">
          <div className="overflow-hidden">
            <h1 className="text-5xl font-black tracking-tight text-gray-900 leading-tight">
              <span className="inline-block hover:scale-105 transition-transform duration-300" style={{animation: 'slideInLeft 0.6s ease-out'}}>
                Manjakan Pakaian, <br /> Bebaskan Waktu 
              </span>
              <br /> 
              <span className="text-[#5da5e8] relative inline-block group hover:scale-105 transition-transform duration-300" style={{animation: 'slideInLeft 0.6s ease-out 0.1s both'}}>
                bersama Berry
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#5da5e8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </span> 
              <br />
              <span className="text-blue-600 inline-block hover:scale-105 transition-transform duration-300" style={{animation: 'slideInLeft 0.6s ease-out 0.2s both'}}>
                Laundry Della🧺
              </span>
            </h1>
          </div>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed hover:translate-x-2 transition-transform duration-300" style={{animation: 'fadeIn 0.8s ease-out 0.3s both'}}>
            Hadirkan rasa percaya diri tinggi setiap hari lewat kebersihan pakaian mutlak, perawatan serat kain mendalam, dan keharuman eksklusif yang bertahan lama.
          </p>
          <div className="flex gap-3" style={{animation: 'slideInRight 0.6s ease-out 0.4s both'}}>
            <button 
              onClick={() => navigate("/pesan")} 
              className="bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] hover:from-[#4a8ecc] hover:to-[#3d7ab3] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-200 transform hover:-translate-y-2 hover:scale-105 active:translate-y-0 transition-all duration-300 group"
            >
              <span className="inline-block group-hover:rotate-12 transition-transform">✨</span> Mulai Sekarang
            </button>
            <button 
              onClick={(e) => handleNavClick(e, "layanan")}
              className="border border-gray-200 bg-white text-gray-600 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transform hover:-translate-y-2 transition-all duration-300 inline-block hover:shadow-md"
            >
              Lihat Layanan →
            </button>
          </div>
        </div>
        
        <div className="flex justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative w-full max-w-sm bg-gradient-to-tr from-blue-100 via-sky-50 to-white rounded-3xl overflow-hidden shadow-xl border border-blue-100 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl transition-all duration-500 ease-out h-[380px] group">
            <img 
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs font-bold">{heroSlides[currentSlide].description}</p>
            </div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATISTIK ==================== */}
      <section 
        id="keunggulan" 
        ref={sectionRefs.keunggulan}
        className={`max-w-7xl mx-auto px-6 py-12 transition-all duration-700 transform ${revealedSections.keunggulan ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "5+ Tahun", label: "Dedikasi & Reputasi Teruji", icon: "🏆", delay: 0 },
            { number: "100%", label: "Formula Ramah Serat & Kulit", icon: "✨", delay: 0.1 },
            { number: "15k+ Box", label: "Pakaian Kembali Sempurna", icon: "👕", delay: 0.2 },
            { number: "On-Time", label: "Garansi Antar Jemput Akurat", icon: "🚀", delay: 0.3 }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-6 rounded-3xl border border-blue-100 shadow-sm text-center transform hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer"
              style={{animation: `zoomIn 0.5s ease-out ${stat.delay}s both`}}
            >
              <div className="text-3xl mb-2 group-hover:scale-12 class transition-transform duration-300">{stat.icon}</div>
              <h3 className="text-2xl font-black text-[#5da5e8] group-hover:animate-pulse">{stat.number}</h3>
              <p className="text-xs text-gray-400 font-medium mt-1 group-hover:text-gray-600 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FIX: SECTION LANGGANAN PROMO NEWSLETTER TERPADU ==================== */}
      <section 
        id="promo" 
        ref={sectionRefs.promo}
        className={`max-w-7xl mx-auto px-6 py-16 transition-all duration-700 transform ${revealedSections.promo ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden grid md:grid-cols-12 gap-8 items-center">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300/20 rounded-full blur-2xl pointer-events-none -translate-x-10 translate-y-10"></div>

          {/* SISI KIRI: Formulir Input Email Langganan */}
          <div className="md:col-span-6 space-y-6 relative z-10">
            <div>
              <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Newsletter Eksklusif
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3">
                Berlangganan Promo <br />&amp; Hemat Hingga 20%
              </h2>
              <p className="text-blue-50 text-xs mt-2 leading-relaxed max-w-md">
                Jangan lewatkan info diskon mingguan! Masukkan email Anda di bawah untuk langsung berlangganan dan dapatkan akses kode voucher otomatis secara instan.
              </p>
            </div>

            <form onSubmit={handleSubscribePromo} className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-md shadow-inner">
              <input 
                type="email"
                required
                value={subscriberContact}
                onChange={(e) => setSubscriberContact(e.target.value)}
                placeholder="Masukkan alamat email aktif Anda..."
                className="flex-1 bg-transparent px-4 py-3 outline-none text-xs font-semibold placeholder-blue-100 text-white"
              />
              <button 
                type="submit" 
                className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl text-xs hover:bg-blue-50 active:scale-95 transition-all shadow-md transform hover:scale-105 whitespace-nowrap"
              >
                Langganan &amp; Ambil Promo
              </button>
            </form>

            <p className="text-[10px] text-blue-100/80">
              *Kami menjamin 100% privasi aman. Anda dapat membatalkan langganan kapan saja.
            </p>
          </div>

          {/* SISI KANAN: Visual Kumpulan Benefit Voucher Eksklusif */}
          <div className="md:col-span-6 grid gap-4 relative z-10">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-2xl transform hover:translate-x-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-inner">🎉</div>
              <div>
                <h4 className="font-bold text-sm">Diskon Member Baru (Voucher 20%)</h4>
                <p className="text-xs text-blue-100 mt-0.5">Potongan langsung kuota kiloan pertama yang otomatis dikirim ke email.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-2xl transform hover:translate-x-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-inner">🛏️</div>
              <div>
                <h4 className="font-bold text-sm">Spesial Cuci Bedcover Terjadwal</h4>
                <p className="text-xs text-blue-100 mt-0.5">Penawaran khusus kupon cuci 2 bedcover besar gratis cuci lipat harian.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-2xl transform hover:translate-x-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-inner">🚀</div>
              <div>
                <h4 className="font-bold text-sm">Akses Priority Weekend Kilat</h4>
                <p className="text-xs text-blue-100 mt-0.5">Notifikasi penjemputan kilat Sabtu-Minggu ekspres tanpa tambahan biaya.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== LAYANAN ==================== */}
      <section 
        id="layanan" 
        ref={sectionRefs.layanan}
        className={`bg-white py-14 px-6 border-y border-gray-100 transition-all duration-700 transform ${revealedSections.layanan ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Pilihan Solusi <span className="text-[#5da5e8] inline-block hover:scale-110 transition-transform">Terbaik Anda</span>
          </h2>
          <p className="text-gray-400 text-xs mb-10">Dirancang khusus untuk merawat setiap jenis kain dengan perlakuan istimewa.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Cuci & Lipat Efisien", desc: "Solusi kilat pakaian harian bersih higienis, rapi terjaga, dan siap pakai tanpa repot.", icon: "👕", delay: 0 },
              { title: "Dry Cleaning Premium", desc: "Metode eksklusif pelindung kain mahal, jas formal, gaun pesta, hingga kebaya kesayangan Anda.", icon: "👔", delay: 0.1 },
              { title: "Setrika Uap Presisi", desc: "Suhu terkontrol rapi maksimal, menghilangkan kerutan membandel tanpa merusak serat rajutan.", icon: "🔥", delay: 0.2 }
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-2xl border border-gray-100 text-left transform hover:-translate-y-3 hover:scale-105 hover:shadow-xl hover:border-blue-200 transition-all duration-300 bg-white cursor-pointer"
                style={{animation: `slideInUp 0.5s ease-out ${service.delay}s both`}}
              >
                <div className="text-4xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 inline-block">{service.icon}</div>
                <h3 className="font-bold text-base text-gray-800 mb-1 group-hover:text-[#5da5e8] transition-colors">{service.title}</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">{service.desc}</p>
                <button 
                  onClick={(e) => handleNavClick(e, "cek-status")}
                  className="text-[#5da5e8] text-xs font-bold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Pantau Cucian Realtime <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ARTIKEL ==================== */}
      <section 
        id="artikel" 
        ref={sectionRefs.artikel}
        className={`py-16 px-6 bg-white border-b border-gray-100 transition-all duration-700 transform ${revealedSections.artikel ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Ruang Edukasi & <span className="text-[#5da5e8] inline-block hover:scale-110 transition-transform">Inspirasi Mode</span></h2>
            <p className="text-gray-400 text-xs mt-2">Kumpulan rahasia dari para ahli laundry profesional untuk menjaga estetika busana Anda.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                image: "https://aquaelektronik.com/upload_files/17/686946360e-inilah-cara-mencuci-baju-agar-wangi-ala-laundry.jpg",
                category: "Rahasia Perawatan",
                title: "Trik Jitu Mengunci Kecerahan Warna Kaos Putih",
                desc: "Ketahui cara memilah pigmen benang dan suhu air optimal agar pakaian putih Anda bebas kusam...",
                delay: 0
              },
              {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9m246aHaqEVRpyvWjDZvT17Ts-ARF11IcBg&s",
                category: "Inovasi Alat",
                title: "Alasan Mengapa Setrika Uap Jauh Lebih Aman",
                desc: "Bongkar teknologi kelembapan uap air yang mampu merenggangkan benang kusut tanpa risiko terbakar...",
                delay: 0.1
              },
              {
                image: "https://info.populix.co/articles/wp-content/uploads/2022/03/usaha-laundry.jpg",
                category: "Kesehatan Kulit",
                title: "Detergen Higienis: Benteng Utama Anti-Alergi",
                desc: "Pentingnya menggunakan sabun antiseptik untuk mencegah jamur...",
                delay: 0.2
              }
            ].map((article, idx) => (
              <div 
                key={idx} 
                className="group bg-blue-50/20 border border-blue-100 rounded-3xl overflow-hidden shadow-sm transform hover:-translate-y-3 hover:shadow-xl transition-all duration-300 flex flex-col bg-white cursor-pointer"
                style={{animation: `fadeIn 0.6s ease-out ${article.delay}s both`}}
              >
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#5da5e8] uppercase tracking-wider group-hover:tracking-widest transition-all">{article.category}</span>
                    <h3 className="font-bold text-base text-gray-800 mt-1 mb-2 group-hover:text-[#5da5e8] transition-colors">{article.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-500 transition-colors">{article.desc}</p>
                  </div>
                  <button className="text-[#5da5e8] text-xs font-bold mt-4 text-left hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Pelajari Selengkapnya <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIAL ==================== */}
      <section 
        id="testimonial" 
        ref={sectionRefs.testimonial}
        className={`bg-gradient-to-r from-[#111827] to-[#1f2937] text-white py-16 px-6 transition-all duration-700 transform ${revealedSections.testimonial ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight">Apa Kata <span className="text-[#5da5e8] inline-block hover:scale-110 transition-transform">Mereka?</span></h2>
            <p className="text-gray-400 text-xs mt-2">Kepuasan murni yang dirasakan langsung oleh ribuan pelanggan setia kami.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Andini Putri", role: "Mahasiswi & Influencer", text: "Sebagai mahasiswi yang super sibuk, Berry Laundry bener-bener jadi penyelamat hidup! Pakaian daily dan gaun-gaun harian saya selalu kembali dalam kondisi wangi buah beri segar, super rapi, dan kainnya kerasa lembut banget. Kurirnya juga ramah dan tanggap!", rating: 5, delay: 0 },
              { name: "Rian Hermawan", role: "Pengusaha", text: "Dulu paling malas kalau urusan cuci jas kantor dan bedcover keluarga karena takut rusak. Tapi semenjak langganan paket premium di sini, hasilnya selalu memuaskan, higienis bersih tanpa noda, dan aman di kulit sensitif anak saya.", rating: 5, delay: 0.1 }
            ].map((testi, idx) => (
              <div 
                key={idx} 
                className="group bg-[#1f2937] p-8 rounded-2xl border border-gray-800 shadow-xl transform hover:scale-105 hover:bg-[#253041] hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{animation: `slideInRight 0.5s ease-out ${testi.delay}s both`}}
              >
                <span className="text-[#5da5e8] text-xs font-bold uppercase tracking-wider block mb-4 group-hover:tracking-widest transition-all">{testi.role}</span>
                <p className="italic text-gray-300 text-sm leading-relaxed mb-6">"{testi.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] rounded-full flex items-center justify-center font-bold text-sm text-white group-hover:scale-110 transition-transform">
                    {testi.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-[#5da5e8] transition-colors">{testi.name}</h4>
                    <p className="text-xs text-orange-400">{'★'.repeat(testi.rating)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== KONTAK ==================== */}
      <section 
        id="kontak" 
        ref={sectionRefs.kontak}
        className={`py-16 px-6 bg-gray-50 border-b border-gray-100 transition-all duration-700 transform ${revealedSections.kontak ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-2 text-gray-900">Saluran <span className="text-[#5da5e8] inline-block hover:scale-110 transition-transform">Komunikasi</span></h2>
          <p className="text-gray-400 text-xs mb-8">Kritik, saran, masukan khusus, atau kemitraan b2b? Kami siap mendengar tanggapan Anda.</p>
          
          <form onSubmit={handleKirimKontak} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-left space-y-4 transform hover:shadow-xl transition-all duration-300">
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 group-focus-within:text-[#5da5e8] group-hover:text-[#5da5e8] transition-colors">Nama Lengkap</label>
              <input 
                type="text" 
                required
                value={kontakForm.nama}
                onChange={(e) => setKontakForm({ ...kontakForm, nama: e.target.value })}
                placeholder="Masukkan nama Anda" 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs focus:border-[#5da5e8] focus:shadow-md focus:scale-105 transition-all duration-300"
              />
            </div>
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 group-focus-within:text-[#5da5e8] group-hover:text-[#5da5e8] transition-colors">Detail Pesan / Masukan</label>
              <textarea 
                rows="3"
                required
                value={kontakForm.pesan}
                onChange={(e) => setKontakForm({ ...kontakForm, pesan: e.target.value })}
                placeholder="Tulis pesan Anda di sini..." 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs focus:border-[#5da5e8] focus:shadow-md focus:scale-105 transition-all duration-300 resize-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] hover:from-[#4a8ecc] hover:to-[#3d7ab3] text-white font-bold py-3 rounded-xl text-xs transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-blue-100">
              Kirim Feedback Responsif →
            </button>
          </form>
        </div>
      </section>

      {/* ==================== CEK STATUS ==================== */}
      <section 
        id="cek-status" 
        ref={sectionRefs["cek-status"]}
        className={`py-16 px-6 bg-white transition-all duration-700 transform ${revealedSections['cek-status'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-3 text-gray-900">Sistem Pelacakan <span className="text-[#5da5e8] inline-block hover:scale-110 transition-transform">Digital</span></h2>
          <form onSubmit={handleLacak} className="flex flex-col sm:flex-row gap-3 p-2.5 bg-gray-50 border border-gray-200 rounded-2xl max-w-lg mx-auto shadow-inner transform hover:shadow-md hover:scale-105 transition-all duration-300">
            <input 
              type="text" 
              placeholder="MASUKKAN NOMOR NOTA / RESI ANDA DI SINI"
              value={resi}
              onChange={(e) => setResi(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2.5 outline-none text-xs font-bold uppercase placeholder-gray-400 hover:placeholder-[#5da5e8] transition-colors"
            />
            <button type="submit" className="bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:from-[#4a8ecc] hover:to-[#3d7ab3] transition-all transform hover:scale-105 active:scale-95">
              Lacak Pesanan →
            </button>
          </form>

          {statusCucian && (
            <div className="mt-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl max-w-lg mx-auto text-left text-xs animate-slideInDown">
              <p className="text-gray-700">Identifikasi Nota: <span className="font-bold">{resi.toUpperCase()}</span></p>
              <p className="text-gray-700 mt-1">Status: <span className="font-bold text-blue-600 animate-pulse">{statusCucian.status}</span></p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-500">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-black text-xl text-[#5da5e8] tracking-tight group cursor-pointer">
              <span className="inline-block group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">🌀</span> 
              <span className="bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] bg-clip-text text-transparent group-hover:tracking-wider transition-all">Berry Laundry</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Solusi laundry profesional untuk membantu Anda merawat pakaian dan memanjakan diri dengan kualitas terbaik dan tepat waktu.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">Perusahaan</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={(e) => handleNavClick(e, "beranda")} className="hover:text-[#5da5e8] transition-all hover:translate-x-2 inline-block">Tentang Kami</button></li>
              <li><button onClick={(e) => handleNavClick(e, "kontak")} className="hover:text-[#5da5e8] transition-all hover:translate-x-2 inline-block">Kontak</button></li>
              <li><button onClick={(e) => handleNavClick(e, "layanan")} className="hover:text-[#5da5e8] transition-all hover:translate-x-2 inline-block">Layanan</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">Bantuan</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-[#5da5e8] cursor-pointer transition-all hover:translate-x-2 inline-block">Syarat &amp; Ketentuan</span></li>
              <li><span className="hover:text-[#5da5e8] cursor-pointer transition-all hover:translate-x-2 inline-block">Kebijakan Privasi</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">Info Kontak</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">📍 <span>Jl. Umban Sari Atas, Rumbai, Pekanbaru</span></li>
              <li className="flex items-center gap-2 hover:translate-x-2 transition-transform">📞 <span>+62 812 6571 9003</span></li>
              <li className="flex items-center gap-2 hover:translate-x-2 transition-transform">✉️ <a href="mailto:hello@berrylaundry.com" className="hover:text-[#5da5e8]">hello@berrylaundry.com</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-50 mt-12 pt-6 text-center text-xs text-gray-400">
          Copyright © 2026 Berry Laundry. All rights reserved.
        </div>
      </footer>

      {/* ==================== CHATBOT ==================== */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300 text-xl focus:outline-none animate-bounce"
        >
          {isChatOpen ? "✕" : "💬"}
        </button>

        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col h-96 animate-slideInUp">
            <div className="bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg animate-spin">🌀</span>
                <div>
                  <h3 className="font-bold text-xs">Berry Bot Blue</h3>
                  <p className="text-[9px] text-blue-100">Asisten Otomatis Aktif</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50 text-[11px]">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                  <div className={`max-w-[80%] p-2.5 rounded-xl transform hover:scale-105 transition-transform ${msg.sender === "user" ? "bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] text-white" : "bg-white text-gray-800 border"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-2 bg-white border-t flex gap-1.5">
              <input
                type="text"
                placeholder="Ketik pertanyaan laundry Anda..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-50 border rounded-xl outline-none text-xs focus:border-[#5da5e8] focus:scale-105 transition-all"
              />
              <button type="submit" className="bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] text-white px-3 rounded-xl text-xs font-bold hover:from-[#4a8ecc] hover:to-[#3d7ab3] transition-all duration-200 hover:scale-105">
                Kirim
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        .animate-slideDown { animation: slideDown 0.5s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.4s ease-out; }
        .animate-slideInDown { animation: slideInDown 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-zoomIn { animation: zoomIn 0.5s ease-out; }
        .animate-bounce { animation: bounce 2s ease-in-out infinite; }
        .animate-spin { animation: spin 3s linear infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1000ms; }
        .hover\\:scale-105:hover { transform: scale(1.05); }
        .hover\\:translate-x-2:hover { transform: translateX(8px); }
        .hover\\:translate-y-2:hover { transform: translateY(8px); }
      `}</style>
    </div>
  );
}