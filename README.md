# Monitoring Perkara Pidum Jawa Timur

Dashboard monitoring real-time untuk perkara pidana umum di Jawa Timur dengan visualisasi interaktif dan fitur import/export data.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Setup & Instalasi](#setup--instalasi)
- [Struktur Aplikasi](#struktur-aplikasi)
- [Cara Penggunaan](#cara-penggunaan)
- [Dokumentasi Lengkap](#dokumentasi-lengkap)

## ✨ Fitur Utama

### 📊 Visualisasi Data
- **4 Kartu Statistik** dengan donut chart (SPDP, Berkas, P33, P48)
- **Chart Disparitas** tuntutan dan putusan
- **Peta Interaktif** dengan marker kabupaten
- **Tabel Statistik** perkara lengkap

### 📥📤 Import/Export
- Import data dari **CSV** atau **Excel** (.xlsx, .xls)
- Export data ke **Excel** format lengkap
- Template CSV tersedia untuk memudahkan format data

### 🔄 Auto-Update
- Data berganti otomatis setiap 5 detik
- Animasi smooth transition antar kabupaten
- Peta auto-center pada kabupaten aktif

### 🗺️ Dua Versi Peta
1. **index.html** - Menggunakan Leaflet (library peta interaktif)
2. **index-simple.html** - Menggunakan Canvas native (tanpa dependency)

## 🛠️ Teknologi

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dengan dark theme
- **JavaScript (Vanilla)** - Logic aplikasi, tanpa framework
- **Canvas API** - Rendering chart dan peta (versi simple)
- **Leaflet.js** - Peta interaktif (versi dengan library)
- **SheetJS (xlsx)** - Import/Export Excel

## 🚀 Setup & Instalasi

### Prasyarat
- Web browser modern (Chrome, Firefox, Edge, Safari)
- **Tidak memerlukan** instalasi Node.js, Python, atau server
- **Tidak memerlukan** internet (kecuali untuk library CDN)

### Langkah Instalasi

1. **Clone atau Download Repository**
   ```bash
   git clone <repository-url>
   cd Thabrani_00
   ```

2. **Buka File di Browser**
   
   **Opsi 1: Versi dengan Leaflet (Peta Real)**
   ```bash
   # Windows
   start index.html
   
   # Mac/Linux
   open index.html
   ```
   
   **Opsi 2: Versi Native Canvas (Recommended)**
   ```bash
   # Windows
   start index-simple.html
   
   # Mac/Linux
   open index-simple.html
   ```

3. **Selesai! Aplikasi Siap Digunakan**

> **💡 Rekomendasi:** Gunakan `index-simple.html` untuk performa terbaik dan tidak ada dependency eksternal.

## 📁 Struktur Aplikasi

```
Thabrani_00/
│
├── index.html              # Main file dengan Leaflet map
├── index-simple.html       # Main file dengan Canvas map (recommended)
├── style.css               # Styling aplikasi
├── script.js               # Logic untuk versi Leaflet
├── script-simple.js        # Logic untuk versi Canvas
├── template_import.csv     # Template untuk import data
├── test_map.html          # File testing peta Leaflet
│
├── README.md              # Dokumentasi setup & alur (file ini)
└── DOCUMENTATION.md       # Dokumentasi penggunaan & parameter data
```

## 🎯 Alur Aplikasi

### 1. Inisialisasi
```
Browser Load HTML
    ↓
Load CSS Styles
    ↓
Load JavaScript
    ↓
DOM Ready Event
    ↓
Initialize Map (Leaflet atau Canvas)
    ↓
Load Initial Data (3 Kabupaten)
    ↓
Render Dashboard
```

### 2. Flow Data
```
Data Array (kabupatens)
    ↓
Update Dashboard Function
    ↓
├─→ Update Top Cards (4 kartu)
├─→ Draw Donut Charts
├─→ Update Bar Chart (Disparitas)
├─→ Update Map & Markers
└─→ Update Statistics Table
```

### 3. Auto-Rotation
```
setInterval (5 detik)
    ↓
currentIndex++
    ↓
Update Dashboard dengan data baru
    ↓
Animasi transition
    ↓
Repeat
```

### 4. Import Data Flow
```
User Click Import Button
    ↓
File Selection (CSV/Excel)
    ↓
Read File Content
    ↓
Parse Data (CSV atau XLSX)
    ↓
Validate Data Structure
    ↓
Update kabupatens Array
    ↓
Refresh Dashboard
```

### 5. Export Data Flow
```
User Click Export Button
    ↓
Collect Data from kabupatens Array
    ↓
Convert to Excel Format (SheetJS)
    ↓
Download File
```

## 📖 Cara Penggunaan

### Navigasi Basic

1. **Lihat Data Kabupaten**
   - Data akan berganti otomatis setiap 5 detik
   - Atau klik marker di peta untuk pindah kabupaten

2. **Import Data Baru**
   - Klik tombol **📥 Import**
   - Pilih file CSV atau Excel
   - Data akan langsung terupdate

3. **Export Data**
   - Klik tombol **📤 Export**
   - File Excel akan terdownload otomatis

### Interaksi Peta

**Versi Leaflet (index.html):**
- Zoom in/out dengan scroll mouse
- Drag untuk pan
- Klik marker untuk info popup

**Versi Canvas (index-simple.html):**
- Klik marker untuk switch kabupaten
- Marker aktif akan berwarna merah dan pulsing

## 📚 Dokumentasi Lengkap

Untuk informasi detail tentang:
- Format data dan parameter
- Struktur JSON data
- Customisasi tampilan
- Troubleshooting

Silakan baca **[DOCUMENTATION.md](DOCUMENTATION.md)**

## 🔧 Troubleshooting Quick

| Masalah | Solusi |
|---------|--------|
| Peta tidak muncul (Leaflet) | Gunakan `index-simple.html` |
| Import error | Cek format CSV sesuai template |
| Chart tidak muncul | Refresh browser (Ctrl + F5) |
| Data tidak berganti | Cek console browser (F12) |

## 📝 Catatan Penting

- **Browser Compatibility:** Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **File Size:** Aplikasi < 100KB (tanpa library)
- **Performance:** Smooth di 60 FPS untuk animasi
- **Data Limit:** Tested hingga 50 kabupaten

## 📄 Lisensi

Project ini dibuat untuk monitoring internal Kejaksaan Jawa Timur.

## 👥 Kontributor

Developed by: Thabrani_00 Team

---

**Last Updated:** December 20, 2025

Untuk pertanyaan atau issue, silakan hubungi tim development.
