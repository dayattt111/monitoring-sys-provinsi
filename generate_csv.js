const fs = require('fs');

const desa = ['Kelurahan Maju','Desa Makmur','Kelurahan Sejahtera','Desa Sentosa','Kelurahan Bahagia','Desa Jaya','Kelurahan Sari','Desa Mulya','Kelurahan Indah','Desa Asri','Kelurahan Permai','Desa Subur','Kelurahan Tenteram','Desa Damai','Kelurahan Raya','Desa Agung','Kelurahan Bersih','Desa Harmoni','Kelurahan Mawar','Desa Melati'];
const jenisTemuan = ['Pencemaran Air','Penambangan Ilegal','Pembakaran Sampah','Penggundulan Hutan','Pembuangan Limbah','Pencemaran Udara','Kerusakan Terumbu Karang','Penebangan Liar','Pencemaran Tanah','Perburuan Liar'];
const satker = ['KEJAKSAAN NEGERI SURABAYA','KEJAKSAAN NEGERI MALANG','KEJAKSAAN NEGERI BANYUWANGI','KEJAKSAAN NEGERI JEMBER','KEJAKSAAN NEGERI SIDOARJO','KEJAKSAAN NEGERI GRESIK'];
const deskripsi = ['Limbah pabrik masuk ke sungai','Aktivitas tanpa izin','Pembakaran di area terbuka','Pembukaan lahan perkebunan','Pembuangan limbah sembarangan','Asap pabrik melebihi batas'];

let csv = 'No,Desa / Kelurahan,Jenis Temuan,Waktu & Tanggal,Deskripsi Hambatan,Nama Satker\n';
for(let i=1; i<=1420; i++) {
  const bulan = String(1 + (i % 12)).padStart(2, '0');
  const hari = String(1 + (i % 28)).padStart(2, '0');
  const jam = String(8 + (i % 10)).padStart(2, '0');
  const menit = String((i * 7) % 60).padStart(2, '0');
  csv += `${i},${desa[i%desa.length]},${jenisTemuan[i%jenisTemuan.length]},2024-${bulan}-${hari} ${jam}:${menit},${deskripsi[i%deskripsi.length]},${satker[i%satker.length]}\n`;
}
fs.writeFileSync('pemantauan_lingkungan.csv', csv);
console.log('pemantauan_lingkungan.csv: 1420 rows');
