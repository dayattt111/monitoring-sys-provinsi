const fs = require('fs');

const desa = ['Kelurahan Maju','Desa Makmur','Kelurahan Sejahtera','Desa Sentosa','Kelurahan Bahagia','Desa Jaya','Kelurahan Sari','Desa Mulya','Kelurahan Indah','Desa Asri'];
const nama = ['John Smith','Marie Chen','Hans Mueller','Kim Min Jun','Sarah Johnson','Ahmed Hassan','Li Wei','Takashi Yamamoto','Isabella Garcia','David Brown','Michael Lee','Anna Schmidt','Carlos Rodriguez','Fatima Ali','Nguyen Van','Sophie Martin','Raj Patel','Emma Wilson'];
const negara = ['Amerika Serikat','Perancis','Jerman','Korea Selatan','Inggris','Mesir','China','Jepang','Spanyol','Australia','Kanada','Belanda','Brazil','Arab Saudi','Vietnam','Belgia','India','Selandia Baru'];
const tujuan = ['Bekerja','Wisata','Penelitian','Pendidikan','Bisnis','Dakwah'];
const satker = ['KEJAKSAAN NEGERI SURABAYA','KEJAKSAAN NEGERI MALANG','KEJAKSAAN NEGERI BANYUWANGI','KEJAKSAAN NEGERI JEMBER','KEJAKSAAN NEGERI SIDOARJO','KEJAKSAAN NEGERI GRESIK'];

let csv = 'No,Desa / Kelurahan,Nama,Asal Negara/Kebangsaan,Tujuan Tinggal,No HP,Paspor,Visa,KITAS,KITAP,Nama Satker\n';
for(let i=1; i<=1350; i++) {
  const hp = `08${String(1000000000 + i).substring(1,11)}`;
  const paspor = String.fromCharCode(65 + (i%26)) + String(1000000 + (i*7)%9000000);
  const kitas = i%3===0 ? String(10000000 + (i*11)%90000000) : 'N/A';
  const kitap = i%10===0 ? String(10000000 + (i*13)%90000000) : 'N/A';
  csv += `${i},${desa[i%desa.length]},${nama[i%nama.length]},${negara[i%negara.length]},${tujuan[i%tujuan.length]},${hp},${paspor},B211,${kitas},${kitap},${satker[i%satker.length]}\n`;
}
fs.writeFileSync('pemantauan_orang_asing.csv', csv);
console.log('pemantauan_orang_asing.csv: 1350 rows');
