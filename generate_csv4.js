const fs = require('fs');

// Helper function untuk random item dari array
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function untuk weighted random - beberapa kabupaten lebih sering muncul
function weightedRandom(weights) {
  const items = Object.keys(weights);
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  
  for (let item of items) {
    rand -= weights[item];
    if (rand <= 0) return item;
  }
  return items[0];
}

const kabupaten = ['Surabaya','Malang','Banyuwangi','Jember','Sidoarjo','Gresik','Mojokerto','Kediri','Blitar','Probolinggo','Pasuruan','Tulungagung','Madiun','Ponorogo','Ngawi','Bojonegoro','Tuban','Lamongan','Pacitan','Trenggalek','Nganjuk','Jombang','Bondowoso','Situbondo','Lumajang','Pamekasan','Sampang','Sumenep','Bangkalan','Batu','Magetan'];
const kecamatan = ['Utara','Selatan','Timur','Barat','Tengah','Kota','Kepanjen','Singosari','Wajak','Pakis','Tumpang','Lawang','Dau'];
const desa = ['Kelurahan Maju','Desa Makmur','Kelurahan Sejahtera','Desa Sentosa','Kelurahan Bahagia','Desa Jaya','Kelurahan Sari','Desa Mulya','Kelurahan Indah','Desa Asri','Kelurahan Permai','Desa Subur','Kelurahan Tenteram','Desa Damai'];

// ===== 1. JAGA BUDAYA =====
// Fokus: Surabaya, Malang, Banyuwangi dominan
const jagaBudayaWeights = {
  'Surabaya': 30, 'Malang': 25, 'Banyuwangi': 20, 'Jember': 10, 'Sidoarjo': 8,
  'Gresik': 5, 'Mojokerto': 5, 'Kediri': 4, 'Blitar': 3, 'Probolinggo': 3,
  'Pasuruan': 2, 'Tulungagung': 2, 'Madiun': 2, 'Ponorogo': 2, 'Ngawi': 1
};

let csv1 = 'No,Provinsi,Kabupaten/Kota,Kecamatan,Desa / Kelurahan\n';
for(let i=1; i<=1250; i++) {
  csv1 += `${i},Jawa Timur,${weightedRandom(jagaBudayaWeights)},${random(kecamatan)},${random(desa)}\n`;
}
fs.writeFileSync('jaga_budaya.csv', csv1);
console.log('jaga_budaya.csv: 1250 rows (Top: Surabaya, Malang, Banyuwangi)');

// ===== 2. PENGAWASAN ORMAS =====
// Fokus: Kediri, Blitar, Tulungagung dominan
const pengawasanOrmasWeights = {
  'Kediri': 28, 'Blitar': 25, 'Tulungagung': 22, 'Madiun': 12, 'Ponorogo': 10,
  'Ngawi': 8, 'Mojokerto': 6, 'Jombang': 5, 'Nganjuk': 4, 'Trenggalek': 4,
  'Pacitan': 3, 'Magetan': 2, 'Bojonegoro': 2, 'Sidoarjo': 1
};

let csv2 = 'No,Provinsi,Kabupaten/Kota,Kecamatan,Desa / Kelurahan\n';
for(let i=1; i<=1180; i++) {
  csv2 += `${i},Jawa Timur,${weightedRandom(pengawasanOrmasWeights)},${random(kecamatan)},${random(desa)}\n`;
}
fs.writeFileSync('pengawasan_ormas.csv', csv2);
console.log('pengawasan_ormas.csv: 1180 rows (Top: Kediri, Blitar, Tulungagung)');

// ===== 3. PEMANTAUAN LINGKUNGAN =====
// Fokus: Probolinggo, Pasuruan, Lumajang dominan
const satkerLingkungan = kabupaten.map(k => `KEJAKSAAN NEGERI ${k.toUpperCase()}`);
const jenisTemuan = ['Penambangan Ilegal','Pembakaran Sampah','Penggundulan Hutan','Pembuangan Limbah','Pencemaran Air','Illegal Logging','Pembukaan Lahan','Penggunaan Pestisida Berlebih'];
const lingkunganWeights = {
  'Probolinggo': 30, 'Pasuruan': 25, 'Lumajang': 20, 'Bondowoso': 12, 'Situbondo': 10,
  'Jember': 8, 'Banyuwangi': 6, 'Malang': 5, 'Blitar': 4, 'Tulungagung': 3
};

let csv3 = 'No,Desa / Kelurahan,Jenis Temuan,Waktu & Tanggal,Deskripsi Hambatan,Nama Satker\n';
for(let i=1; i<=1420; i++) {
  const kab = weightedRandom(lingkunganWeights);
  const year = 2024;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  const hour = String(Math.floor(Math.random() * 14) + 7).padStart(2, '0');
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  csv3 += `${i},${random(desa)},${random(jenisTemuan)},${year}-${month}-${day} ${hour}:${minute},${random(['Aktivitas tanpa izin','Pembakaran di area terbuka','Pembukaan lahan perkebunan','Pembuangan limbah sembarangan','Penebangan liar','Pencemaran sungai'])},KEJAKSAAN NEGERI ${kab.toUpperCase()}\n`;
}
fs.writeFileSync('pemantauan_lingkungan.csv', csv3);
console.log('pemantauan_lingkungan.csv: 1420 rows (Top: Probolinggo, Pasuruan, Lumajang)');

// ===== 4. PEMANTAUAN ORANG ASING =====
// Fokus: Batu, Malang, Surabaya dominan (wisata)
const negara = ['China','Korea Selatan','Jepang','Malaysia','Singapura','Thailand','Australia','Belanda','Jerman','Inggris'];
const tujuan = ['Wisata','Bisnis','Pelajar','Bekerja','Investasi'];
const oaWeights = {
  'Batu': 32, 'Malang': 28, 'Surabaya': 25, 'Sidoarjo': 8, 'Gresik': 5,
  'Mojokerto': 4, 'Pasuruan': 3, 'Probolinggo': 2, 'Jember': 2, 'Banyuwangi': 1
};

let csv4 = 'No,Desa / Kelurahan,Nama,Asal Negara,Tujuan Tinggal,No HP,Paspor,Visa,KITAS,KITAP,Nama Satker\n';
for(let i=1; i<=1350; i++) {
  const kab = weightedRandom(oaWeights);
  const hasKITAS = Math.random() > 0.6 ? 'Ada' : 'Tidak';
  const hasKITAP = hasKITAS === 'Ada' && Math.random() > 0.8 ? 'Ada' : 'Tidak';
  csv4 += `${i},${random(desa)},${['John','Michael','Wang','Lee','Tanaka','Kumar','Smith','Brown'][i%8]} ${['Anderson','Chen','Kim','Yamamoto','Singh','Wilson'][i%6]},${random(negara)},${random(tujuan)},+62${Math.floor(Math.random()*900000000+100000000)},${String.fromCharCode(65+Math.floor(Math.random()*26))}${Math.floor(Math.random()*9000000+1000000)},Ada,${hasKITAS},${hasKITAP},KEJAKSAAN NEGERI ${kab.toUpperCase()}\n`;
}
fs.writeFileSync('pemantauan_orang_asing.csv', csv4);
console.log('pemantauan_orang_asing.csv: 1350 rows (Top: Batu, Malang, Surabaya)');

// ===== 5. ASET DESA =====
// Fokus: Jombang, Nganjuk, Lamongan dominan
const alat = ['Traktor','Mobil Ambulance','Mesin Pompa Air','Generator','Komputer','Sound System','Tenda','Kursi Rapat','Proyektor','Kamera CCTV','Mesin Potong Rumput'];
const statusAlat = ['Baik','Rusak Ringan','Rusak Berat','Hilang'];
const asetWeights = {
  'Jombang': 28, 'Nganjuk': 25, 'Lamongan': 22, 'Bojonegoro': 15, 'Tuban': 12,
  'Gresik': 8, 'Sidoarjo': 6, 'Mojokerto': 5, 'Madiun': 4, 'Ngawi': 3
};

let csv5 = 'No,Desa / Kelurahan,Alat,Status Alat,Nilai Perolehan (Rp),Deskripsi,Nama Satker\n';
for(let i=1; i<=1480; i++) {
  const kab = weightedRandom(asetWeights);
  csv5 += `${i},${random(desa)},${random(alat)},${random(statusAlat)},${Math.floor(Math.random()*50000000+5000000)},${random(['Pembelian tahun 2020','Hibah dari pemerintah','Swadaya masyarakat','Bantuan CSR','Pengadaan rutin'])},KEJAKSAAN NEGERI ${kab.toUpperCase()}\n`;
}
fs.writeFileSync('aset_desa.csv', csv5);
console.log('aset_desa.csv: 1480 rows (Top: Jombang, Nganjuk, Lamongan)');

// ===== 6. KASUS PENYELEWENGAN =====
// Fokus: Sampang, Pamekasan, Sumenep dominan
const jenis = ['Penggelapan Dana BLT','Korupsi Dana Desa','Penyalahgunaan Wewenang','Pungli Pelayanan','Mark Up Proyek','Pengadaan Fiktif','Korupsi ADD','Penyimpangan Anggaran','Gratifikasi','Korupsi Bansos','Penyalahgunaan Aset','Manipulasi Data','Suap Perizinan'];
const sumber = ['Laporan Warga','Audit BPK','Whistleblower','Laporan Masyarakat','Audit Internal','Inspektorat','Media Massa','Pengaduan Online','Laporan LSM'];
const tahap = ['Penyidikan','Penyelidikan','Penuntutan','Inkracht'];
const penyelewenganWeights = {
  'Sampang': 30, 'Pamekasan': 28, 'Sumenep': 25, 'Bangkalan': 15, 'Situbondo': 10,
  'Bondowoso': 8, 'Probolinggo': 5, 'Lumajang': 4, 'Jember': 3, 'Banyuwangi': 2
};

let csv6 = 'No,Desa / Kelurahan,Jenis Penyimpangan,Sumber Informasi,Tahap Penanganan,Nama Satker\n';
for(let i=1; i<=1180; i++) {
  const kab = weightedRandom(penyelewenganWeights);
  csv6 += `${i},${random(desa)},${random(jenis)},${random(sumber)},${random(tahap)},KEJAKSAAN NEGERI ${kab.toUpperCase()}\n`;
}
fs.writeFileSync('kasus_penyelewengan.csv', csv6);
console.log('kasus_penyelewengan.csv: 1180 rows (Top: Sampang, Pamekasan, Sumenep)');

console.log('\n✅ All CSV files generated with DIFFERENT kabupaten distributions!');
