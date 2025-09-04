if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('SW registered'));
}

const writeBtn = document.getElementById('writeBtn');
const readBtn = document.getElementById('readBtn');

readBtn.addEventListener('click', async () => {
  if ('NDEFReader' in window) {
    if (!confirm("Mulai membaca NFC?")) return;
    try {
      const reader = new NDEFReader();
      await reader.scan();
      reader.onreading = event => {
        for (const record of event.message.records) {
          const textDecoder = new TextDecoder();
          const txt = textDecoder.decode(record.data);
          alert('Data terbaca: ' + txt);

          const parts = txt.split('|');
          parts.forEach(part => {
            const [key, value] = part.split(':');
            if (key && value) {
              switch (key.trim().toLowerCase()) {
                case 'nama': document.getElementById('nama').value = value.trim(); break;
                case 'tanggal': document.getElementById('tanggal').value = value.trim(); break;
                case 'blok': document.getElementById('blok').value = value.trim(); break;
                case 'nomor': document.getElementById('nomor').value = value.trim(); break;
                case 'kondisi': document.getElementById('kondisi').value = value.trim(); break;
                case 'tangkapan': document.getElementById('tangkapan').value = value.trim(); break;
              }
            }
          });
        }
      };
    } catch (err) {
      alert('Gagal membaca NFC: ' + err);
    }
  } else {
    alert('Web NFC tidak didukung di browser ini.');
  }
});

writeBtn.addEventListener('click', async () => {
  if ('NDEFReader' in window) {
    if (!confirm("Yakin menulis data ke NFC?")) return;
    try {
      const writer = new NDEFReader();
      const nama = document.getElementById('nama').value;
      const tanggal = document.getElementById('tanggal').value;
      const blok = document.getElementById('blok').value;
      const nomor = document.getElementById('nomor').value;
      const kondisi = document.getElementById('kondisi').value;
      const tangkapan = document.getElementById('tangkapan').value;

      const data = `Nama:${nama}|Tanggal:${tanggal}|Blok:${blok}|Nomor:${nomor}|Kondisi:${kondisi}|Tangkapan:${tangkapan}`;

      await writer.write({records: [{recordType: "text", data: data}]});
      alert("Data berhasil ditulis ke NFC!");
    } catch (err) {
      alert("Gagal menulis NFC: " + err);
    }
  } else {
    alert("Web NFC tidak didukung di browser ini.");
  }
});