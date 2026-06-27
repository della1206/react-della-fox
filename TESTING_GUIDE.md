# 🧪 PANDUAN TESTING & DEMO FITUR LANDING PAGE BERRY LAUNDRY

## 🎯 QUICK START TESTING

### Akses Landing Page
1. Jalankan project: `npm run dev`
2. Buka: `http://localhost:5173/`
3. Navbar sudah auto-load dengan menu navigasi

---

## 📦 TEST CASE: SYSTEM TRACKING CUCIAN

### Test Scenario 1: Valid Resi (Selesai)
**Input:** `RESI001`

**Expected Output:**
```
📦 Nomor Resi: RESI001
Status: Selesai ✅ (warna green)
Detail: "Cucian Anda sudah siap diambil di outlet atau menunggu pengiriman antar jemput."
💡 Perlu bantuan? Hubungi CS kami di WhatsApp atau chat dengan Berry Bot 🤖
```

### Test Scenario 2: Valid Resi (Sedang Diantar)
**Input:** `RESI002`

**Expected Output:**
```
📦 Nomor Resi: RESI002
Status: Sedang Diantar 🚗 (warna blue)
Detail: "Kurir kami sedang dalam perjalanan untuk mengantar cucian ke rumah Anda."
```

### Test Scenario 3: Valid Resi (Sedang Dicuci)
**Input:** `RESI004`

**Expected Output:**
```
📦 Nomor Resi: RESI004
Status: Sedang Dicuci 🌊 (warna indigo)
Detail: "Pakaian Anda sedang dalam mesin cuci dengan formula khusus ramah serat."
```

### Test Scenario 4: Invalid Resi (Tidak Ditemukan)
**Input:** `RESI999` atau `INVALID123`

**Expected Output:**
```
📦 Nomor Resi: RESI999
Status: Resi tidak ditemukan ❌ (warna red)
Detail: "Silakan cek kembali nomor resi Anda atau hubungi CS kami di WhatsApp."
[Tidak ada section bantuan tambahan]
```

### Test Scenario 5: Empty Input
**Input:** (kosong) → Click "Lacak Pesanan"

**Expected Output:**
```
Alert: "Masukkan nomor resi terlebih dahulu!"
```

### Test Scenario 6: Case Insensitive
**Input:** `resi001` atau `Resi001` atau `reSi001`

**Expected Output:**
```
Semua input di-convert ke uppercase → RESI001
Menampilkan hasil yang sama
```

---

## 📰 TEST CASE: MODAL ARTIKEL

### Test Scenario 1: Buka Modal (Artikel 1)
**Action:** 
1. Scroll ke section Artikel
2. Click "Pelajari Selengkapnya" di card pertama

**Expected Output:**
- Modal overlay (semi-transparent black) muncul
- Modal card dengan:
  - Header: kategori "Rahasia Perawatan" + judul
  - Featured image
  - Konten markdown artikel 1
  - Footer dengan tombol "Tutup" dan "Chat dengan CS"

### Test Scenario 2: Navigasi Antar Artikel
**Action:**
1. Buka Modal Artikel 1 (click close/tutup)
2. Click "Pelajari Selengkapnya" di Artikel 2

**Expected Output:**
- Modal menutup dengan smooth
- Modal baru terbuka dengan konten Artikel 2

### Test Scenario 3: Close Modal (Button Tutup)
**Action:** 
1. Buka Modal
2. Click tombol "Tutup" (biru muda di footer)

**Expected Output:**
- Modal tertutup dengan smooth animation
- Konten di belakang modal kembali interaktif

### Test Scenario 4: Close Modal (Button X)
**Action:** 
1. Buka Modal
2. Click tombol ✕ (top-right)

**Expected Output:**
- Modal tertutup
- Same behavior seperti tombol "Tutup"

### Test Scenario 5: Close Modal (Click Outside)
**Action:** 
1. Buka Modal
2. Click area gelap (semi-transparent overlay)

**Expected Output:**
- Modal tertutup (jika handler onclick ditambahkan)
- Atau Modal tetap terbuka (current behavior)

### Test Scenario 6: WhatsApp Integration
**Action:** 
1. Buka Modal
2. Click tombol "💬 Chat dengan CS"

**Expected Output:**
- Redirect ke WhatsApp chat dengan pre-filled message
- Format: `https://wa.me/6281265719003?text=...`
- Message: "Halo Berry Laundry, saya tertarik dengan artikel ini."

### Test Scenario 7: Scroll Konten Modal
**Action:** 
1. Buka Modal
2. Scroll konten artikel (panjang)

**Expected Output:**
- Modal body scrollable (max-h-[90vh] overflow-y-auto)
- Header tetap di atas saat scroll
- Footer tetap di bawah saat scroll

### Test Scenario 8: Modal Responsive
**Action:** 
1. Buka Modal di Mobile (375px width)
2. Check layout dan readability

**Expected Output:**
- Modal responsive dengan max-w-2xl
- Padding dan text size adjustable
- Image scaling properly

---

## 🎨 TEST CASE: VISUAL & ANIMASI

### Animation Test 1: Modal Open
**Expected:**
- Modal-bg (overlay) fade in dengan `animate-fadeIn`
- Modal-card slide up dengan `animate-slideInUp`
- Duration: 0.5s smooth

### Animation Test 2: Modal Close
**Expected:**
- Modal fade out (reverse animation)
- Smooth transition

### Animation Test 3: Color Transitions
**Expected:**
- Tracking status display berubah warna sesuai status
- No jarring transition (smooth gradient)

### Animation Test 4: Hover Effects
**Expected:**
- Button hover: scale up + color change
- Card hover: lift up with shadow

---

## 📱 TEST CASE: RESPONSIVENESS

### Mobile Test (375px)
- [ ] Navbar responsive
- [ ] Tracking input form responsive
- [ ] Modal fits screen with padding
- [ ] Article cards stack vertically
- [ ] Touch-friendly button size

### Tablet Test (768px)
- [ ] 2-column layout untuk artikel
- [ ] Modal centered properly
- [ ] Input form side-by-side

### Desktop Test (1024px+)
- [ ] 3-column layout untuk artikel
- [ ] Modal with max-w-2xl centered
- [ ] Full horizontal layout

---

## 🐛 BUG TESTING CHECKLIST

### Known Issues
- [ ] Modal click outside tidak auto-close (by design)
- [ ] Tracking case sensitivity (FIXED - now uppercase)
- [ ] Article content markdown parsing (working)

### Performance
- [ ] Page load time < 3s
- [ ] Modal open animation smooth (60fps)
- [ ] No layout shift when modal opens

### Browser Compatibility
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Mobile browsers

---

## 📊 DATA VALIDATION

### Tracking Database Validation
```javascript
// Semua resi yang valid
const validResi = ["RESI001", "RESI002", "RESI003", "RESI004", "RESI005", "RESI006"];

// Setiap resi punya field lengkap
validResi.forEach(resi => {
  const data = resiDatabase[resi];
  assert(data.status !== undefined, `${resi}: missing status`);
  assert(data.color !== undefined, `${resi}: missing color`);
  assert(data.bgColor !== undefined, `${resi}: missing bgColor`);
  assert(data.detail !== undefined, `${resi}: missing detail`);
});
```

### Artikel Database Validation
```javascript
// Setiap artikel punya field lengkap
artikelDatabase.forEach(article => {
  assert(article.id !== undefined, "missing id");
  assert(article.image !== undefined, "missing image");
  assert(article.category !== undefined, "missing category");
  assert(article.title !== undefined, "missing title");
  assert(article.desc !== undefined, "missing desc");
  assert(article.content !== undefined, "missing content");
});
```

---

## 🚀 PRODUCTION CHECKLIST

### Pre-Deployment
- [ ] Semua test scenario berhasil
- [ ] No console errors
- [ ] Performance optimized
- [ ] Images lazy-loaded
- [ ] WhatsApp link tested
- [ ] Mobile responsive verified

### Documentation
- [ ] PRD v1, v2, v3 lengkap
- [ ] Feature documentation lengkap
- [ ] Code commented properly
- [ ] README updated

### Security
- [ ] No sensitive data exposed
- [ ] WhatsApp link valid
- [ ] Email validation working
- [ ] CSRF protection ready

---

## 📈 METRICS TO TRACK

### Engagement
- Click rate on "Pelajari Selengkapnya"
- Modal open/close frequency
- Tracking query volume
- WhatsApp redirect clicks

### Performance
- Page load time
- Modal render time
- Tracking lookup time (should be instant)
- Image load time

### User Experience
- Modal scroll smoothness
- Button response time
- Form validation UX
- Error message clarity

---

## 💡 DEMO SCRIPT

### Demo Flow (3 menit)
1. **Landing Page Overview** (30 sec)
   - Scroll through sections
   - Show Navbar active state

2. **Tracking Feature Demo** (1 min)
   - Input RESI001 → Show selesai status
   - Input RESI002 → Show diantar status
   - Input RESI999 → Show error state

3. **Artikel Modal Demo** (1 min)
   - Click "Pelajari Selengkapnya" di artikel 1
   - Show modal dengan konten
   - Scroll konten
   - Click "Chat dengan CS" (WhatsApp)

4. **Mobile Responsiveness** (30 sec)
   - Resize ke mobile (DevTools)
   - Show responsive layout

---

## 🎓 PEMBELAJARAN

### Untuk Dosen:
1. **PRD Evolution** - Menunjukkan perkembangan dari v1 → v3
2. **CRM Features** - Tracking + Contact Management
3. **React Hooks** - useState, useEffect, useRef implementation
4. **Modal Pattern** - Controlled component with close handler
5. **Database Pattern** - Ready for backend integration

### Untuk Developer:
1. Bagaimana structure data untuk scalability
2. Conditional rendering untuk modal
3. Dynamic content dari database
4. Error handling patterns
5. Responsive design with Tailwind

---

**Last Updated:** 2026-06-28  
**Status:** ✅ READY FOR TESTING & DEMO
