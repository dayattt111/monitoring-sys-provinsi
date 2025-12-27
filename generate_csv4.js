const fs = require('fs');

const desa = ['Kelurahan Maju','Desa Makmur','Kelurahan Sejahtera','Desa Sentosa','Kelurahan Bahagia','Desa Jaya','Kelurahan Sari','Desa Mulya','Kelurahan Indah','Desa Asri','Kelurahan Permai','Desa Subur','Kelurahan Tenteram','Desa Damai'];
const jenis = ['Penggelapan Dana BLT','Korupsi Dana Desa','Penyalahgunaan Wewenang','Pungli Pelayanan','Mark Up Proyek','Pengadaan Fiktif','Korupsi ADD','Penyimpangan Anggaran','Gratifikasi','Korupsi Bansos','Penyalahgunaan Aset','Manipulasi Data','Suap Perizinan'];
const sumber = ['Laporan Warga','Audit BPK','Whistleblower','Laporan Masyarakat','Audit Internal','Inspektorat','Media Massa','Pengaduan Online','Laporan LSM'];
const tahap = ['Penyidikan','Penyelidikan','Penuntutan','Inkracht'];
const satker = ['KEJAKSAAN NEGERI SURABAYA','KEJAKSAAN NEGERI MALANG','KEJAKSAAN NEGERI BANYUWANGI','KEJAKSAAN NEGERI JEMBER','KEJAKSAAN NEGERI SIDOARJO','KEJAKSAAN NEGERI GRESIK','KEJAKSAAN NEGERI MOJOKERTO'];

let csv = 'No,Desa / Kelurahan,Jenis Penyimpangan,Sumber Informasi,Tahap Penanganan,Nama Satker\n';
for(let i=1; i<=1180; i++) {
  csv += `${i},${desa[i%desa.length]},${jenis[i%jenis.length]},${sumber[i%sumber.length]},${tahap[i%tahap.length]},${satker[i%satker.length]}\n`;
}
fs.writeFileSync('kasus_penyelewengan.csv', csv);
console.log('kasus_penyelewengan.csv: 1180 rows');
