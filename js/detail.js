// =========================================================
// File: detail.js
// Deskripsi: fungsinya buat ngatur dialog detail pencatatan sama fungsi cetak PDF formal
// =========================================================

// Ambil dulu elemen-elemen penting dari HTML
const tombolDetail = document.getElementById("tombolDetail");
const latarDialog = document.getElementById("latarDialog");
const dialogDetail = document.getElementById("dialogDetail");
const tombolTutup = document.getElementById("tutupDialog");
const tombolCetakPDF = document.getElementById("tombolCetakPDF");

// ---------------------------------------------------------
// FUNGSI: nampilin dialog detail (pas tombol detail diklik)
// ---------------------------------------------------------
tombolDetail.addEventListener("click", () => {
    latarDialog.classList.remove("disembunyikan");
    dialogDetail.classList.remove("disembunyikan");
});

// ---------------------------------------------------------
// FUNGSI: Menutup dialog (pas tombol X diklik atau area luar diklik)
// ---------------------------------------------------------
tombolTutup.addEventListener("click", () => {
    latarDialog.classList.add("disembunyikan");
    dialogDetail.classList.add("disembunyikan");
});
latarDialog.addEventListener("click", () => {
    latarDialog.classList.add("disembunyikan");
    dialogDetail.classList.add("disembunyikan");
});

// ---------------------------------------------------------
// FUNGSI: Cetak laporan PDF dengan format formal
// ---------------------------------------------------------
tombolCetakPDF.addEventListener("click", async () => {
    // Import library jsPDF dari window (karena menggunakan UMD)
    const { jsPDF } = window.jspdf;

    // Ambil data dari dialog
    const nama = document.getElementById("dataNama").innerText;
    const kelas = document.getElementById("dataKelas").innerText;
    const semester = document.getElementById("dataSemester").innerText;
    const tahun = document.getElementById("dataTahun").innerText;
    const nilaiAgama = document.getElementById("dataAgama").innerText;
    const deskAgama = document.getElementById("deskAgama").innerText;
    const nilaiJatiDiri = document.getElementById("dataJatidiri").innerText;
    const deskJatiDiri = document.getElementById("deskJatidiri").innerText;
    const nilaiSTEM = document.getElementById("dataSTEM").innerText;

    // Buat objek PDF baru
    const pdf = new jsPDF();

    // Judul laporan
    pdf.setFontSize(16);
    pdf.text("Laporan Perkembangan Siswa", 105, 20, { align: "center" });
    pdf.setFontSize(12);
    pdf.text("TKIT Khaleefa El Rahman", 105, 28, { align: "center" });

    // ini buat garis pemisah
    pdf.line(15, 32, 195, 32);

    // ini buat data umum siswa
    pdf.setFontSize(11);
    pdf.text(`Nama Siswa : ${nama}`, 15, 42);
    pdf.text(`Kelas      : ${kelas}`, 15, 50);
    pdf.text(`Semester   : ${semester}`, 15, 58);
    pdf.text(`Tahun Ajaran: ${tahun}`, 15, 66);

    // Tabel nilai dan deskripsi
    const tabelData = [
        ["Aspek", "Nilai", "Deskripsi"],
        ["Nilai Agama", nilaiAgama, deskAgama],
        ["Nilai Jati Diri", nilaiJatiDiri, deskJatiDiri],
        ["Nilai STEM", nilaiSTEM, "-"],
    ];

    pdf.autoTable({
        startY: 75,
        head: [tabelData[0]],
        body: tabelData.slice(1),
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [57, 161, 216], textColor: 255, halign: "center" },
    });

    // Catatan footer
    pdf.setFontSize(10);
    pdf.text("Laporan ini dihasilkan secara otomatis oleh sistem Laskar Cilik.", 105, pdf.lastAutoTable.finalY + 15, { align: "center" });

    // Unduh PDF
    pdf.save(`Laporan_${nama.replace(/\s+/g, "_")}.pdf`);
});
