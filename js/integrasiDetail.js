// =============================================================
// File: integrasiDetail.js
// Deskripsi: ini fungsinya buat integrasi dialog detail + cetak PDF dinamis
// =============================================================

// Fungsi utama untuk menampilkan dialog
async function muatDialogDetail(dataSiswa) {
  // Muat file HTML detail
  const response = await fetch("detail.html");
  const html = await response.text();

  const container = document.getElementById("container-dialog");
  container.innerHTML = html;

  // ini buat mastiin CSS detail hanya dimuat sekali
  if (!document.querySelector('link[href="css/detail.css"]')) {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "css/detail.css";
    document.head.appendChild(cssLink);
  }

  // === Fungsi bantu buat load pustaka JS eksternal secara berurutan ===
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = url;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  // Muat jsPDF hanya sekali
  if (!window.jspdfLoaded) {
    await loadScript("lib/jspdf.umd.min.js");
    await loadScript("lib/jspdf.plugin.autotable.min.js");
    window.jspdfLoaded = true;
  }

  // --- Setelah semua siap ---
  aktifkanDialog(dataSiswa, container);
}

// =============================================================
// nampilin dialog dan hubungin semua event
// =============================================================
function aktifkanDialog(dataSiswa, container) {
  const latarDialog = container.querySelector("#latarDialog");
  const dialogDetail = container.querySelector("#dialogDetail");
  const tombolTutup = container.querySelector("#tutupDialog");
  const tombolCetak = container.querySelector("#tombolCetakPDF");

  // Isi data utama siswa
  container.querySelector("#dataNama").innerText = dataSiswa.nama;
  container.querySelector("#dataKelas").innerText = dataSiswa.kelas;
  container.querySelector("#dataSemester").innerText = dataSiswa.semester;
  container.querySelector("#dataTahun").innerText = dataSiswa.tahunAjaran;

  // === Isi bagian nilai secara dinamis ===
  const daftarNilai = container.querySelector("#daftarNilai");

  if (dataSiswa.nilai && dataSiswa.nilai.length > 0) {
    daftarNilai.innerHTML = dataSiswa.nilai
      .map(
        (item) => `
        <div class="baris-data">
          <p><strong>${item.aspek}:</strong> <span>${item.nilai}</span></p>
          <p><strong>Deskripsi:</strong></p>
          <p>${item.deskripsi}</p>
        </div>
        <hr>
      `
      )
      .join("");
  } else {
    daftarNilai.innerHTML = `<p style="text-align:center; color:#777;">Tidak ada data nilai yang tersimpan.</p>`;
  }

  // === Tampilkan dialog ===
  latarDialog.classList.remove("disembunyikan");
  dialogDetail.classList.remove("disembunyikan");

  // Tombol tutup
  const tutupDialog = () => {
    latarDialog.classList.add("disembunyikan");
    dialogDetail.classList.add("disembunyikan");
  };
  tombolTutup.addEventListener("click", tutupDialog);
  latarDialog.addEventListener("click", tutupDialog);

  // Tombol cetak PDF
  tombolCetak.addEventListener("click", () => {
    if (!window.jspdf) {
      alert("Pustaka jsPDF belum siap, mohon tunggu sebentar.");
      return;
    }
    cetakPDF(dataSiswa);
  });
}

// =============================================================
// Fungsi Cetak PDF Formal (Dinamis)
// =============================================================
function cetakPDF(dataSiswa) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("LAPORAN PERKEMBANGAN SISWA", 105, 20, { align: "center" });

  // Data siswa
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Nama: ${dataSiswa.nama}`, 20, 40);
  doc.text(`Kelas: ${dataSiswa.kelas}`, 20, 48);
  doc.text(`Semester: ${dataSiswa.semester}`, 20, 56);
  doc.text(`Tahun Ajaran: ${dataSiswa.tahunAjaran}`, 20, 64);

  // Tabel nilai dinamis
  const bodyData =
    dataSiswa.nilai && dataSiswa.nilai.length > 0
      ? dataSiswa.nilai.map((item) => [
          item.aspek,
          item.nilai,
          item.deskripsi,
        ])
      : [["-", "-", "Belum ada data nilai."]];

  doc.autoTable({
    startY: 75,
    head: [["Aspek Penilaian", "Nilai", "Deskripsi"]],
    body: bodyData,
    styles: { fontSize: 10, valign: "middle" },
    headStyles: { fillColor: [57, 161, 216], textColor: 255 },
  });

  const tgl = new Date().toLocaleDateString("id-ID");
  doc.text(`Dicetak pada: ${tgl}`, 20, doc.lastAutoTable.finalY + 15);
  doc.save(`Laporan_${dataSiswa.nama.replace(/\s+/g, "_")}.pdf`);
}
