# Dokumentasi Penggunaan & Parameter Data

Panduan lengkap untuk menggunakan dan menyesuaikan data pada aplikasi Monitoring Perkara Pidum Jawa Timur.

## 📋 Daftar Isi

- [Struktur Data](#struktur-data)
- [Parameter Data](#parameter-data)
- [Format Import/Export](#format-importexport)
- [Customisasi Data](#customisasi-data)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Tips & Best Practices](#tips--best-practices)

---

## 🗂️ Struktur Data

### Data Kabupaten (kabupatens Array)

Aplikasi menggunakan array `kabupatens` yang berisi objek data untuk setiap kabupaten. Berikut struktur lengkapnya:

```javascript
{
    name: "BANYUWANGI",           // Nama kabupaten
    lat: -8.2193,                 // Latitude (untuk Leaflet map)
    lng: 114.3691,                // Longitude (untuk Leaflet map)
    x: 420,                       // Posisi X (untuk Canvas map)
    y: 280,                       // Posisi Y (untuk Canvas map)
    
    // Data SPDP
    spdp: {
        total: 18170,
        jombang: 492,
        ponorogo: 179,
        gresik: 420
    },
    
    // Data Berkas
    berkas: {
        total: 12299,
        jombang: 351,
        ponorogo: 151,
        gresik: 307
    },
    
    // Data P33
    p33: {
        total: 8113,
        jombang: 611,
        ponorogo: 278,
        gresik: 606
    },
    
    // Data P48
    p48: {
        total: 4758,
        jombang: 155,
        ponorogo: 75,
        gresik: 139
    },
    
    // Data Disparitas
    disparitas: {
        tuntutanTertinggi: "Tuntutan: 3 tahun",
        putusanTertinggi: "Putusan: 3 tahun",
        tuntutanTerendah: "Tuntutan: 6 bulan",
        putusanTerendah: "Putusan: 5 bulan"
    },
    
    // Data Region Stats
    regionStats: {
        name: "KN TRENGGALEK",
        narkotika: 48,
        kesehatan: 33,
        perjudian: 14,
        anak: 14,
        pencurian: 10
    },
    
    // Data Table Stats
    tableStats: {
        name: "KN TULUNGAGUNG",
        row1: [1, 63, 8, 370, 265, 224, 164, 149, 129],
        row2: [1, 7, 2, 164, 149, 129, "-", "-", "-"]
    }
}
```

---

## 📊 Parameter Data

### 1. Identitas Kabupaten

| Parameter | Tipe | Deskripsi | Contoh |
|-----------|------|-----------|--------|
| `name` | String | Nama kabupaten (UPPERCASE) | `"BANYUWANGI"` |
| `lat` | Float | Koordinat latitude | `-8.2193` |
| `lng` | Float | Koordinat longitude | `114.3691` |
| `x` | Integer | Posisi X di canvas (0-500) | `420` |
| `y` | Integer | Posisi Y di canvas (0-450) | `280` |

### 2. Data Statistik SPDP

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `spdp.total` | Integer | Total SPDP kabupaten |
| `spdp.jombang` | Integer | SPDP dari KN Jombang |
| `spdp.ponorogo` | Integer | SPDP dari KN Ponorogo |
| `spdp.gresik` | Integer | SPDP dari KN Gresik |

> **💡 Note:** Pola yang sama berlaku untuk `berkas`, `p33`, dan `p48`

### 3. Data Disparitas

| Parameter | Tipe | Format | Contoh |
|-----------|------|--------|--------|
| `tuntutanTertinggi` | String | "Tuntutan: X tahun/bulan" | `"Tuntutan: 3 tahun"` |
| `putusanTertinggi` | String | "Putusan: X tahun/bulan" | `"Putusan: 3 tahun"` |
| `tuntutanTerendah` | String | "Tuntutan: X tahun/bulan" | `"Tuntutan: 6 bulan"` |
| `putusanTerendah` | String | "Putusan: X tahun/bulan" | `"Putusan: 5 bulan"` |

### 4. Region Stats (Detail Per Jenis Kasus)

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `regionStats.name` | String | Nama region detail |
| `regionStats.narkotika` | Integer | Jumlah kasus narkotika |
| `regionStats.kesehatan` | Integer | Jumlah kasus kesehatan |
| `regionStats.perjudian` | Integer | Jumlah kasus perjudian ITE |
| `regionStats.anak` | Integer | Jumlah kasus perlindungan anak |
| `regionStats.pencurian` | Integer | Jumlah kasus pencurian biasa |

### 5. Table Stats

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `tableStats.name` | String | Nama KN untuk tabel |
| `tableStats.row1` | Array[9] | Data baris 1 (9 kolom) |
| `tableStats.row2` | Array[9] | Data baris 2 (9 kolom) |

**Urutan kolom row1 & row2:**
1. SPDP Perlu P17
2. SPDP Perlu Form2
3. SPDP Perlu Form3
4. SPDP
5. Berkas Tahap I
6. Tahap II
7. Tuntutan
8. Putusan
9. Eksekusi

---

## 📥📤 Format Import/Export

### Format CSV

File CSV harus memiliki 48 kolom dengan header sebagai berikut:

```csv
Kabupaten,Lat,Lng,SPDP_Total,SPDP_Jombang,SPDP_Ponorogo,SPDP_Gresik,Berkas_Total,Berkas_Jombang,Berkas_Ponorogo,Berkas_Gresik,P33_Total,P33_Jombang,P33_Ponorogo,P33_Gresik,P48_Total,P48_Jombang,P48_Ponorogo,P48_Gresik,Tuntutan_Tertinggi,Putusan_Tertinggi,Tuntutan_Terendah,Putusan_Terendah,Region_Name,Narkotika,Kesehatan,Perjudian,Anak,Pencurian,Table_KN,Table_R1_C1,Table_R1_C2,Table_R1_C3,Table_R1_C4,Table_R1_C5,Table_R1_C6,Table_R1_C7,Table_R1_C8,Table_R1_C9,Table_R2_C1,Table_R2_C2,Table_R2_C3,Table_R2_C4,Table_R2_C5,Table_R2_C6,Table_R2_C7,Table_R2_C8,Table_R2_C9
```

### Contoh Data Row:

```csv
BANYUWANGI,-8.2193,114.3691,18170,492,179,420,12299,351,151,307,8113,611,278,606,4758,155,75,139,Tuntutan: 3 tahun,Putusan: 3 tahun,Tuntutan: 6 bulan,Putusan: 5 bulan,KN TRENGGALEK,48,33,14,14,10,KN TULUNGAGUNG,1,63,8,370,265,224,164,149,129,1,7,2,164,149,129,-,-,-
```

### Format Excel

Excel export akan menghasilkan file dengan sheet bernama "Data Perkara" yang berisi:
- Header row (row 1)
- Data rows (mulai row 2)
- Format: .xlsx (Excel 2007+)

---

## 🛠️ Customisasi Data

### A. Menambah Kabupaten Baru

**1. Edit Langsung di JavaScript (script.js atau script-simple.js):**

```javascript
// Tambahkan objek baru ke array kabupatens
{
    name: "SIDOARJO",
    lat: -7.4479,
    lng: 112.7186,
    x: 250,  // Sesuaikan posisi di canvas
    y: 200,
    spdp: { total: 15000, jombang: 400, ponorogo: 150, gresik: 380 },
    berkas: { total: 11000, jombang: 320, ponorogo: 140, gresik: 290 },
    p33: { total: 7500, jombang: 580, ponorogo: 250, gresik: 570 },
    p48: { total: 4200, jombang: 140, ponorogo: 70, gresik: 130 },
    disparitas: {
        tuntutanTertinggi: "Tuntutan: 4 tahun",
        putusanTertinggi: "Putusan: 3 tahun",
        tuntutanTerendah: "Tuntutan: 7 bulan",
        putusanTerendah: "Putusan: 6 bulan"
    },
    regionStats: {
        name: "KN SIDOARJO",
        narkotika: 52,
        kesehatan: 36,
        perjudian: 20,
        anak: 15,
        pencurian: 11
    },
    tableStats: {
        name: "KN SIDOARJO",
        row1: [2, 68, 9, 380, 270, 230, 170, 155, 135],
        row2: [1, 8, 3, 170, 155, 135, "-", "-", "-"]
    }
}
```

**2. Via Import CSV/Excel:**
- Buka `template_import.csv`
- Tambahkan row baru dengan data kabupaten
- Save file
- Import via aplikasi

### B. Mengubah Interval Auto-Rotate

Edit di file JavaScript:

```javascript
// Default: 5 detik (5000 ms)
setInterval(rotateData, 5000);

// Ubah jadi 10 detik
setInterval(rotateData, 10000);

// Atau 3 detik
setInterval(rotateData, 3000);
```

### C. Mengubah Posisi Marker di Canvas Map

Untuk `index-simple.html`, edit koordinat X dan Y:

```javascript
// Koordinat canvas: X (0-500), Y (0-450)
// X: kiri ke kanan
// Y: atas ke bawah

// Contoh posisi:
// Utara: y = 100-150
// Tengah: y = 200-250
// Selatan: y = 300-350

// Barat: x = 100-200
// Tengah: x = 250-350
// Timur: x = 400-450
```

### D. Customisasi Warna

Edit di `style.css`:

```css
/* Warna marker aktif */
.region.active {
    fill: #ff4858;  /* Merah - ubah sesuai keinginan */
}

/* Warna marker tidak aktif */
.region {
    fill: #3a4a5a;  /* Abu-abu */
}

/* Warna text highlight */
.current-kn {
    color: #00d4ff;  /* Cyan */
}
```

---

## 💡 Contoh Penggunaan

### Skenario 1: Update Data Bulanan

```javascript
// 1. Export data saat ini
Klik tombol Export → Simpan file

// 2. Edit di Excel
- Buka file Excel
- Update angka-angka sesuai data bulan ini
- Save file

// 3. Import kembali
Klik tombol Import → Pilih file yang sudah diedit
```

### Skenario 2: Menambah 5 Kabupaten Baru

```javascript
// Option A: Via CSV
1. Buka template_import.csv
2. Tambah 5 rows baru dengan data lengkap
3. Save sebagai "data_update.csv"
4. Import via aplikasi

// Option B: Edit JavaScript
1. Buka script.js atau script-simple.js
2. Copy struktur objek kabupaten
3. Paste dan edit 5x untuk kabupaten baru
4. Save dan refresh browser
```

### Skenario 3: Mengubah Jenis Kasus di Region Stats

Edit di regionStats:

```javascript
regionStats: {
    name: "KN CUSTOM",
    // Bisa ubah nama field sesuai kebutuhan
    tipikor: 25,      // Ganti dari narkotika
    korupsi: 18,      // Ganti dari kesehatan
    penggelapan: 12,  // Ganti dari perjudian
    penipuan: 10,     // Ganti dari anak
    asusila: 8        // Ganti dari pencurian
}

// Jangan lupa update di HTML juga:
<div class="stat-row">
    <span>Tipikor</span>
    <span id="statNarkotika">25</span>
</div>
```

---

## 🎯 Tips & Best Practices

### 1. Validasi Data

✅ **DO:**
- Pastikan semua field angka berisi number, bukan string
- Gunakan format string untuk disparitas: "Tuntutan: X tahun"
- Total = jumlah dari breakdown (jombang + ponorogo + gresik)
- Koordinat lat/lng akurat untuk peta Leaflet

❌ **DON'T:**
- Jangan kosongkan field yang required
- Jangan gunakan karakter spesial di nama kabupaten
- Jangan duplikat nama kabupaten

### 2. Performance

- **Optimal:** 3-10 kabupaten untuk smooth animation
- **Maximum tested:** 50 kabupaten
- Jika > 50 kabupaten, pertimbangkan pagination

### 3. Koordinat Canvas Map

Untuk posisi marker yang bagus:

```javascript
// Formula estimasi:
// X = (longitude + 180) * (500/360)
// Y = (90 - latitude) * (450/180)

// Atau gunakan tool online:
// https://www.latlong.net/
```

### 4. Backup Data

```bash
# Selalu backup sebelum update besar
git add .
git commit -m "backup: before data update"
git push

# Atau export ke Excel dan simpan
```

### 5. Testing

Setelah update data:
1. Refresh browser (Ctrl + F5)
2. Cek console untuk error (F12)
3. Verifikasi semua chart muncul
4. Test import/export
5. Verifikasi auto-rotate berfungsi

---

## 🐛 Troubleshooting

### Data tidak muncul setelah import

**Cek:**
1. Format CSV sesuai template?
2. Semua 48 kolom terisi?
3. Angka tidak mengandung karakter?
4. File encoding UTF-8?

### Chart tidak ter-render

**Solusi:**
```javascript
// Tambahkan console.log untuk debug
function updateDashboard() {
    console.log('Current data:', kabupatens[currentIndex]);
    // ... rest of code
}
```

### Posisi marker tidak akurat (Canvas)

**Perbaiki:**
```javascript
// Adjust koordinat X, Y manual
// Cek dengan console:
canvas.onclick = function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Clicked at: X=${x}, Y=${y}`);
}
```

---

## 📞 Support

Jika mengalami kesulitan:
1. Cek browser console (F12) untuk error
2. Lihat `README.md` untuk setup dasar
3. Validasi data dengan template CSV
4. Hubungi tim development

---

**Last Updated:** December 20, 2025

Happy Coding! 🚀
