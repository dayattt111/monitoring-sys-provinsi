// Data untuk 3 kabupaten yang akan bergantian
const kabupatens = [
    {
        name: "BANYUWANGI",
        lat: -8.2193,
        lng: 114.3691,
        spdp: { total: 18170, jombang: 492, ponorogo: 179, gresik: 420 },
        berkas: { total: 12299, jombang: 351, ponorogo: 151, gresik: 307 },
        p33: { total: 8113, jombang: 611, ponorogo: 278, gresik: 606 },
        p48: { total: 4758, jombang: 155, ponorogo: 75, gresik: 139 },
        disparitas: {
            tuntutanTertinggi: "Tuntutan: 3 tahun",
            putusanTertinggi: "Putusan: 3 tahun",
            tuntutanTerendah: "Tuntutan: 6 bulan",
            putusanTerendah: "Putusan: 5 bulan"
        },
        regionStats: {
            name: "KN TRENGGALEK",
            narkotika: 48,
            kesehatan: 33,
            perjudian: 14,
            anak: 14,
            pencurian: 10
        },
        tableStats: {
            name: "KN TULUNGAGUNG",
            row1: [1, 63, 8, 370, 265, 224, 164, 149, 129],
            row2: [1, 7, 2, 164, 149, 129, "-", "-", "-"]
        }
    },
    {
        name: "SURABAYA",
        lat: -7.2575,
        lng: 112.7521,
        spdp: { total: 22450, jombang: 580, ponorogo: 210, gresik: 515 },
        berkas: { total: 15680, jombang: 425, ponorogo: 185, gresik: 390 },
        p33: { total: 9840, jombang: 720, ponorogo: 310, gresik: 685 },
        p48: { total: 5920, jombang: 185, ponorogo: 95, gresik: 165 },
        disparitas: {
            tuntutanTertinggi: "Tuntutan: 5 tahun",
            putusanTertinggi: "Putusan: 4 tahun",
            tuntutanTerendah: "Tuntutan: 8 bulan",
            putusanTerendah: "Putusan: 6 bulan"
        },
        regionStats: {
            name: "KN SURABAYA UTARA",
            narkotika: 62,
            kesehatan: 45,
            perjudian: 28,
            anak: 18,
            pencurian: 15
        },
        tableStats: {
            name: "KN SURABAYA",
            row1: [2, 78, 12, 445, 320, 280, 195, 175, 155],
            row2: [3, 12, 4, 195, 175, 155, "-", "-", "-"]
        }
    },
    {
        name: "MALANG",
        lat: -7.9797,
        lng: 112.6304,
        spdp: { total: 19350, jombang: 510, ponorogo: 195, gresik: 445 },
        berkas: { total: 13580, jombang: 380, ponorogo: 165, gresik: 340 },
        p33: { total: 8650, jombang: 650, ponorogo: 290, gresik: 625 },
        p48: { total: 5120, jombang: 168, ponorogo: 82, gresik: 148 },
        disparitas: {
            tuntutanTertinggi: "Tuntutan: 4 tahun",
            putusanTertinggi: "Putusan: 3.5 tahun",
            tuntutanTerendah: "Tuntutan: 7 bulan",
            putusanTerendah: "Putusan: 5.5 bulan"
        },
        regionStats: {
            name: "KN MALANG KOTA",
            narkotika: 55,
            kesehatan: 38,
            perjudian: 22,
            anak: 16,
            pencurian: 12
        },
        tableStats: {
            name: "KN MALANG",
            row1: [1, 70, 10, 395, 285, 245, 178, 162, 142],
            row2: [2, 9, 3, 178, 162, 142, "-", "-", "-"]
        }
    }
];

let currentIndex = 0;
let map;
let markers = [];

// Initialize Leaflet Map
function initMap() {
    map = L.map('mapLeaflet').setView([-7.5, 112.5], 8);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19
    }).addTo(map);

    // Add markers for each kabupaten
    updateMapMarkers();
}

function updateMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add markers for each kabupaten
    kabupatens.forEach((kab, index) => {
        const isActive = index === currentIndex;
        
        const marker = L.circleMarker([kab.lat, kab.lng], {
            radius: isActive ? 15 : 10,
            fillColor: isActive ? '#ff4858' : '#00d4ff',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: isActive ? 0.9 : 0.6
        }).addTo(map);

        const popupContent = `
            <div style="color: #fff;">
                <h3 style="color: #00d4ff; margin-bottom: 10px;">${kab.name}</h3>
                <p><strong>Total SPDP:</strong> ${kab.spdp.total.toLocaleString()}</p>
                <p><strong>Total Berkas:</strong> ${kab.berkas.total.toLocaleString()}</p>
                <p><strong>Total P33:</strong> ${kab.p33.total.toLocaleString()}</p>
                <p><strong>Total P48:</strong> ${kab.p48.total.toLocaleString()}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
            currentIndex = index;
            updateDashboard();
            updateMapMarkers();
        });

        markers.push(marker);
    });

    // Center on current kabupaten
    if (kabupatens[currentIndex]) {
        map.setView([kabupatens[currentIndex].lat, kabupatens[currentIndex].lng], 9, {
            animate: true,
            duration: 1
        });
    }
}

// Function to draw donut chart
function drawDonutChart(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 120;
    const height = canvas.height = 120;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 45;
    const innerRadius = 32;

    ctx.clearRect(0, 0, width, height);

    let total = data.reduce((a, b) => a + b, 0);
    let currentAngle = -Math.PI / 2;

    data.forEach((value, index) => {
        const sliceAngle = (2 * Math.PI * value) / total;

        // Draw outer arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();

        currentAngle += sliceAngle;
    });
}

// Function to draw bar chart
function drawBarChart() {
    const canvas = document.getElementById('barChart');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 250;

    ctx.clearRect(0, 0, width, height);

    const bars = [
        { label: '3T | 3T', tuntutan: 3.0, putusan: 3.0 },
        { label: '6B | 5B', tuntutan: 0.5, putusan: 0.42 },
        { label: '6B | 5B', tuntutan: 0.5, putusan: 0.42 },
        { label: '6B | 5B', tuntutan: 0.5, putusan: 0.42 },
        { label: '6B | 5B', tuntutan: 0.5, putusan: 0.42 }
    ];

    const barWidth = 60;
    const maxValue = 3.5;
    const startX = 100;
    const startY = height - 40;
    const chartHeight = height - 80;

    // Draw Y-axis labels
    ctx.fillStyle = '#8b98a5';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 3; i++) {
        const y = startY - (chartHeight / 3) * i;
        ctx.fillText(i.toFixed(1), startX - 10, y + 5);
        
        // Draw grid line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
    }

    // Draw axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#8b98a5';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Lama Hukuman (Tahun)', 0, 0);
    ctx.restore();

    // Draw bars
    bars.forEach((bar, index) => {
        const x = startX + index * (barWidth * 2 + 30);
        
        // Tuntutan bar (blue)
        const tuntutanHeight = (bar.tuntutan / maxValue) * chartHeight;
        ctx.fillStyle = '#4a9eff';
        ctx.fillRect(x, startY - tuntutanHeight, barWidth, tuntutanHeight);
        
        // Putusan bar (green/orange)
        const putusanHeight = (bar.putusan / maxValue) * chartHeight;
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(x + barWidth + 5, startY - putusanHeight, barWidth, putusanHeight);
        
        // Draw label
        ctx.fillStyle = '#8b98a5';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(bar.label, x + barWidth, startY + 20);
    });

    // Draw legend at bottom
    ctx.fillStyle = '#4a9eff';
    ctx.fillRect(startX, startY + 35, 15, 15);
    ctx.fillStyle = '#8b98a5';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Tuntutan', startX + 20, startY + 47);

    ctx.fillStyle = '#00ff88';
    ctx.fillRect(startX + 120, startY + 35, 15, 15);
    ctx.fillStyle = '#8b98a5';
    ctx.fillText('Putusan (PN)', startX + 140, startY + 47);
}

// Function to update dashboard
function updateDashboard() {
    const data = kabupatens[currentIndex];

    // Update top cards
    document.getElementById('totalSPDP').textContent = data.spdp.total.toLocaleString();
    document.getElementById('breakdownSPDP').innerHTML = `
        <div>KN JOMBANG: ${data.spdp.jombang}</div>
        <div>KN PONOROGO: ${data.spdp.ponorogo}</div>
        <div>KN GRESIK: ${data.spdp.gresik}</div>
    `;
    drawDonutChart('chartSPDP', [data.spdp.jombang, data.spdp.ponorogo, data.spdp.gresik], ['#4a9eff', '#ff9800', '#00d4ff']);

    document.getElementById('totalBerkas').textContent = data.berkas.total.toLocaleString();
    document.getElementById('breakdownBerkas').innerHTML = `
        <div>KN JOMBANG: ${data.berkas.jombang}</div>
        <div>KN PONOROGO: ${data.berkas.ponorogo}</div>
        <div>KN GRESIK: ${data.berkas.gresik}</div>
    `;
    drawDonutChart('chartBerkas', [data.berkas.jombang, data.berkas.ponorogo, data.berkas.gresik], ['#ff9800', '#4a9eff', '#00d4ff']);

    document.getElementById('totalP33').textContent = data.p33.total.toLocaleString();
    document.getElementById('breakdownP33').innerHTML = `
        <div>KN JOMBANG: ${data.p33.jombang}</div>
        <div>KN PONOROGO: ${data.p33.ponorogo}</div>
        <div>KN GRESIK: ${data.p33.gresik}</div>
    `;
    drawDonutChart('chartP33', [data.p33.jombang, data.p33.ponorogo, data.p33.gresik], ['#ff4858', '#ff9800', '#4a9eff']);

    document.getElementById('totalP48').textContent = data.p48.total.toLocaleString();
    document.getElementById('breakdownP48').innerHTML = `
        <div>KN JOMBANG: ${data.p48.jombang}</div>
        <div>KN PONOROGO: ${data.p48.ponorogo}</div>
        <div>KN GRESIK: ${data.p48.gresik}</div>
    `;
    drawDonutChart('chartP48', [data.p48.jombang, data.p48.ponorogo, data.p48.gresik], ['#ff4858', '#ff9800', '#4a9eff']);

    // Update bar chart section
    document.getElementById('currentKN').textContent = `KN ${data.name}`;
    document.getElementById('tuntutanTertinggi').textContent = data.disparitas.tuntutanTertinggi;
    document.getElementById('putusanTertinggi').textContent = data.disparitas.putusanTertinggi;
    document.getElementById('tuntutanTerendah').textContent = data.disparitas.tuntutanTerendah;
    document.getElementById('putusanTerendah').textContent = data.disparitas.putusanTerendah;
    drawBarChart();

    // Update map section
    document.getElementById('regionName').textContent = data.regionStats.name;
    document.getElementById('statNarkotika').textContent = data.regionStats.narkotika;
    document.getElementById('statKesehatan').textContent = data.regionStats.kesehatan;
    document.getElementById('statPerjudian').textContent = data.regionStats.perjudian;
    document.getElementById('statAnak').textContent = data.regionStats.anak;
    document.getElementById('statPencurian').textContent = data.regionStats.pencurian;

    // Update table
    document.getElementById('tableKN').innerHTML = `KN<br>${data.tableStats.name}`;
    data.tableStats.row1.forEach((val, i) => {
        document.getElementById(`td${i + 1}`).textContent = val;
    });
    data.tableStats.row2.forEach((val, i) => {
        document.getElementById(`td${i + 10}`).textContent = val;
    });

    // Update map markers
    if (map) {
        updateMapMarkers();
    }
}

// Auto rotate data every 5 seconds
function rotateData() {
    currentIndex = (currentIndex + 1) % kabupatens.length;
    updateDashboard();
}

// Initialize
initMap();
updateDashboard();
setInterval(rotateData, 5000);

// ===== IMPORT/EXPORT FUNCTIONS =====

// Function to handle file import (CSV or Excel)
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    if (fileName.endsWith('.csv')) {
        // Handle CSV
        reader.onload = function(e) {
            const text = e.target.result;
            parseCSV(text);
        };
        reader.readAsText(file);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        // Handle Excel
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            parseImportedData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    }

    // Reset file input
    event.target.value = '';
}

// Parse CSV content
function parseCSV(text) {
    const lines = text.split('\n');
    const data = lines.map(line => {
        // Simple CSV parsing (handle quoted fields)
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    });
    
    parseImportedData(data);
}

// Parse imported data and update kabupatens
function parseImportedData(data) {
    try {
        // Expected format:
        // Row 0: Headers
        // Columns: Kabupaten, Lat, Lng, SPDP_Total, SPDP_Jombang, SPDP_Ponorogo, SPDP_Gresik, etc.
        
        if (data.length < 2) {
            alert('File tidak memiliki data yang cukup');
            return;
        }

        const newKabupatens = [];
        
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (!row[0] || row[0] === '') continue; // Skip empty rows
            
            const kabupaten = {
                name: row[0] || '',
                lat: parseFloat(row[1]) || -7.5,
                lng: parseFloat(row[2]) || 112.5,
                spdp: {
                    total: parseInt(row[3]) || 0,
                    jombang: parseInt(row[4]) || 0,
                    ponorogo: parseInt(row[5]) || 0,
                    gresik: parseInt(row[6]) || 0
                },
                berkas: {
                    total: parseInt(row[7]) || 0,
                    jombang: parseInt(row[8]) || 0,
                    ponorogo: parseInt(row[9]) || 0,
                    gresik: parseInt(row[10]) || 0
                },
                p33: {
                    total: parseInt(row[11]) || 0,
                    jombang: parseInt(row[12]) || 0,
                    ponorogo: parseInt(row[13]) || 0,
                    gresik: parseInt(row[14]) || 0
                },
                p48: {
                    total: parseInt(row[15]) || 0,
                    jombang: parseInt(row[16]) || 0,
                    ponorogo: parseInt(row[17]) || 0,
                    gresik: parseInt(row[18]) || 0
                },
                disparitas: {
                    tuntutanTertinggi: row[19] || "Tuntutan: 3 tahun",
                    putusanTertinggi: row[20] || "Putusan: 3 tahun",
                    tuntutanTerendah: row[21] || "Tuntutan: 6 bulan",
                    putusanTerendah: row[22] || "Putusan: 5 bulan"
                },
                regionStats: {
                    name: row[23] || `KN ${row[0]}`,
                    narkotika: parseInt(row[24]) || 0,
                    kesehatan: parseInt(row[25]) || 0,
                    perjudian: parseInt(row[26]) || 0,
                    anak: parseInt(row[27]) || 0,
                    pencurian: parseInt(row[28]) || 0
                },
                tableStats: {
                    name: row[29] || `KN ${row[0]}`,
                    row1: [
                        parseInt(row[30]) || 0,
                        parseInt(row[31]) || 0,
                        parseInt(row[32]) || 0,
                        parseInt(row[33]) || 0,
                        parseInt(row[34]) || 0,
                        parseInt(row[35]) || 0,
                        parseInt(row[36]) || 0,
                        parseInt(row[37]) || 0,
                        parseInt(row[38]) || 0
                    ],
                    row2: [
                        parseInt(row[39]) || 0,
                        parseInt(row[40]) || 0,
                        parseInt(row[41]) || 0,
                        parseInt(row[42]) || 0,
                        parseInt(row[43]) || 0,
                        parseInt(row[44]) || 0,
                        row[45] || "-",
                        row[46] || "-",
                        row[47] || "-"
                    ]
                }
            };
            
            newKabupatens.push(kabupaten);
        }
        
        if (newKabupatens.length > 0) {
            kabupatens.length = 0; // Clear array
            kabupatens.push(...newKabupatens);
            currentIndex = 0;
            updateDashboard();
            alert(`Berhasil mengimport ${newKabupatens.length} data kabupaten`);
        } else {
            alert('Tidak ada data valid yang ditemukan');
        }
        
    } catch (error) {
        console.error('Error parsing data:', error);
        alert('Error saat mengimport data: ' + error.message);
    }
}

// Export data to Excel
function exportToExcel() {
    const exportData = [
        [
            'Kabupaten', 'Lat', 'Lng',
            'SPDP_Total', 'SPDP_Jombang', 'SPDP_Ponorogo', 'SPDP_Gresik',
            'Berkas_Total', 'Berkas_Jombang', 'Berkas_Ponorogo', 'Berkas_Gresik',
            'P33_Total', 'P33_Jombang', 'P33_Ponorogo', 'P33_Gresik',
            'P48_Total', 'P48_Jombang', 'P48_Ponorogo', 'P48_Gresik',
            'Tuntutan_Tertinggi', 'Putusan_Tertinggi', 'Tuntutan_Terendah', 'Putusan_Terendah',
            'Region_Name', 'Narkotika', 'Kesehatan', 'Perjudian', 'Anak', 'Pencurian',
            'Table_KN',
            'Table_R1_C1', 'Table_R1_C2', 'Table_R1_C3', 'Table_R1_C4', 'Table_R1_C5',
            'Table_R1_C6', 'Table_R1_C7', 'Table_R1_C8', 'Table_R1_C9',
            'Table_R2_C1', 'Table_R2_C2', 'Table_R2_C3', 'Table_R2_C4', 'Table_R2_C5',
            'Table_R2_C6', 'Table_R2_C7', 'Table_R2_C8', 'Table_R2_C9'
        ]
    ];

    kabupatens.forEach(kab => {
        exportData.push([
            kab.name, kab.lat, kab.lng,
            kab.spdp.total, kab.spdp.jombang, kab.spdp.ponorogo, kab.spdp.gresik,
            kab.berkas.total, kab.berkas.jombang, kab.berkas.ponorogo, kab.berkas.gresik,
            kab.p33.total, kab.p33.jombang, kab.p33.ponorogo, kab.p33.gresik,
            kab.p48.total, kab.p48.jombang, kab.p48.ponorogo, kab.p48.gresik,
            kab.disparitas.tuntutanTertinggi, kab.disparitas.putusanTertinggi,
            kab.disparitas.tuntutanTerendah, kab.disparitas.putusanTerendah,
            kab.regionStats.name, kab.regionStats.narkotika, kab.regionStats.kesehatan,
            kab.regionStats.perjudian, kab.regionStats.anak, kab.regionStats.pencurian,
            kab.tableStats.name,
            ...kab.tableStats.row1,
            ...kab.tableStats.row2
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Perkara');

    const fileName = `monitoring_perkara_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

// Export to CSV
function exportToCSV() {
    const csvData = [];
    csvData.push([
        'Kabupaten', 'Lat', 'Lng',
        'SPDP_Total', 'SPDP_Jombang', 'SPDP_Ponorogo', 'SPDP_Gresik',
        'Berkas_Total', 'Berkas_Jombang', 'Berkas_Ponorogo', 'Berkas_Gresik',
        'P33_Total', 'P33_Jombang', 'P33_Ponorogo', 'P33_Gresik',
        'P48_Total', 'P48_Jombang', 'P48_Ponorogo', 'P48_Gresik',
        'Tuntutan_Tertinggi', 'Putusan_Tertinggi', 'Tuntutan_Terendah', 'Putusan_Terendah',
        'Region_Name', 'Narkotika', 'Kesehatan', 'Perjudian', 'Anak', 'Pencurian',
        'Table_KN',
        'Table_R1_C1', 'Table_R1_C2', 'Table_R1_C3', 'Table_R1_C4', 'Table_R1_C5',
        'Table_R1_C6', 'Table_R1_C7', 'Table_R1_C8', 'Table_R1_C9',
        'Table_R2_C1', 'Table_R2_C2', 'Table_R2_C3', 'Table_R2_C4', 'Table_R2_C5',
        'Table_R2_C6', 'Table_R2_C7', 'Table_R2_C8', 'Table_R2_C9'
    ]);

    kabupatens.forEach(kab => {
        csvData.push([
            kab.name, kab.lat, kab.lng,
            kab.spdp.total, kab.spdp.jombang, kab.spdp.ponorogo, kab.spdp.gresik,
            kab.berkas.total, kab.berkas.jombang, kab.berkas.ponorogo, kab.berkas.gresik,
            kab.p33.total, kab.p33.jombang, kab.p33.ponorogo, kab.p33.gresik,
            kab.p48.total, kab.p48.jombang, kab.p48.ponorogo, kab.p48.gresik,
            kab.disparitas.tuntutanTertinggi, kab.disparitas.putusanTertinggi,
            kab.disparitas.tuntutanTerendah, kab.disparitas.putusanTerendah,
            kab.regionStats.name, kab.regionStats.narkotika, kab.regionStats.kesehatan,
            kab.regionStats.perjudian, kab.regionStats.anak, kab.regionStats.pencurian,
            kab.tableStats.name,
            ...kab.tableStats.row1,
            ...kab.tableStats.row2
        ]);
    });

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `monitoring_perkara_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add hover effect to regions
document.querySelectorAll('.region').forEach((region, index) => {
    region.addEventListener('click', () => {
        document.querySelectorAll('.region').forEach(r => r.classList.remove('active'));
        region.classList.add('active');
    });
});
