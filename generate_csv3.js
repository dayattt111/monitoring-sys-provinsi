const fs = require('fs');

const desa = ['Kelurahan Maju','Desa Makmur','Kelurahan Sejahtera','Desa Sentosa','Kelurahan Bahagia','Desa Jaya','Kelurahan Sari','Desa Mulya','Kelurahan Indah','Desa Asri'];
const alat = ['Ambulance Desa','Traktor','Komputer','Generator','Sound System','Mesin Pompa Air','Motor Sampah','Proyektor','Kursi Rapat','Kamera CCTV','Mesin Potong Rumput','Laptop','Printer','AC','Kulkas','Meja Kantor','Lemari Arsip','Kipas Angin'];
const status = ['Baik','Rusak Ringan','Rusak Berat'];
const deskripsi = ['Kendaraan operasional','Untuk pengolahan tanah','Peralatan kantor','Cadangan listrik','Untuk acara desa','Irigasi sawah','Angkutan sampah','Pelatihan warga','Fasilitas balai desa','Keamanan desa','Pemeliharaan taman','Administrasi desa','Dokumentasi kegiatan','Pendingin ruangan','Penyimpanan kebutuhan','Perlengkapan kantor','Penyimpanan dokumen','Sirkulasi udara'];
const satker = ['KEJAKSAAN NEGERI SURABAYA','KEJAKSAAN NEGERI MALANG','KEJAKSAAN NEGERI BANYUWANGI','KEJAKSAAN NEGERI JEMBER','KEJAKSAAN NEGERI SIDOARJO','KEJAKSAAN NEGERI GRESIK'];

let csv = 'No,Desa / Kelurahan,Alat,Status Alat,Nilai Perolehan (Rp),Deskripsi,Nama Satker\n';
for(let i=1; i<=2100; i++) {
  const nilai = (10000000 + (i*123456)%500000000);
  csv += `${i},${desa[i%desa.length]},${alat[i%alat.length]},${status[i%status.length]},${nilai},${deskripsi[i%deskripsi.length]},${satker[i%satker.length]}\n`;
}
fs.writeFileSync('aset_desa.csv', csv);
console.log('aset_desa.csv: 2100 rows');
