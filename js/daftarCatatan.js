// ===== DATA SEMENTARA =====
const studentsData = [
  {
    id: 1,
    nama: "Deswita Syaharani",
    kelas: "A",
    semester: 1,
    tahunAjaran: "2024/2025",
    tanggalPencatatan: "10-06-2025",
    nilai: [
      {
        aspek: "Nilai Agama dan Budi Pekerti",
        nilai: "Baik Sekali",
        deskripsi:
          "Anak sudah mampu berdoa dan berperilaku sopan terhadap guru serta teman di kelas.",
      },
      {
        aspek: "Nilai Jati Diri",
        nilai: "Baik",
        deskripsi:
          "Anak percaya diri dalam kegiatan kelas dan mulai menunjukkan kemandirian.",
      },
      {
        aspek: "Nilai STEM",
        nilai: "Baik",
        deskripsi:
          "Anak aktif bereksperimen dan mampu menceritakan kembali hasil pengamatannya.",
      },
    ],
  },
  {
    id: 2,
    nama: "April Liani",
    kelas: "A",
    semester: 1,
    tahunAjaran: "2024/2025",
    tanggalPencatatan: "11-06-2025",
    nilai: [
      {
        aspek: "Nilai Agama dan Budi Pekerti",
        nilai: "Baik",
        deskripsi: "Anak rajin berdoa dan membantu teman di kelas.",
      },
      {
        aspek: "Nilai Jati Diri",
        nilai: "Cukup",
        deskripsi: "Perlu dibimbing untuk lebih fokus saat kegiatan belajar.",
      },
      {
        aspek: "Nilai STEM",
        nilai: "Baik",
        deskripsi: "Anak menunjukkan rasa ingin tahu tinggi terhadap sains.",
      },
    ],
  },
];

// ===== DOM ELEMENTS =====
const sidebar = document.getElementById("sidebar");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const sidebarTab = document.getElementById("sidebarTab");
const mainContent = document.getElementById("mainContent");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const filterButton = document.getElementById("filterButton");
const clearFilterButton = document.getElementById("clearFilterButton");
const addButton = document.getElementById("addButton");


sidebarCloseBtn.addEventListener("click", function () {
  sidebar.classList.add("closed");
  mainContent.classList.add("expanded");
});


sidebarTab.addEventListener("click", function () {
  sidebar.classList.remove("closed");
  mainContent.classList.remove("expanded");
});


// ===== RENDER TABLE =====
function renderTable(data) {
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="7" style="text-align: center; padding: 30px; color: #999;">Tidak ada data yang ditemukan</td></tr>';
    return;
  }

  data.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.nama}</td>
      <td>${student.kelas}</td>
      <td>${student.semester}</td>
      <td>${student.tahunAjaran}</td>
      <td>${student.tanggalPencatatan}</td>
      <td>
        <div class="action-buttons">
            <button class="btn btn-detail" onclick="showDetail('${student.id}')">
                ⓘ Detail
            </button>
            <button class="btn btn-edit">✏️ Edit</button>
            <button class="btn btn-delete">🗑️ Hapus</button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });
}
// ===== SEARCH FUNCTIONALITY =====
searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();

  const filteredData = studentsData.filter((student) =>
    student.nama.toLowerCase().includes(searchTerm)
  );

  renderTable(filteredData);
});

// ===== DATE FILTER FUNCTIONALITY =====
filterButton.addEventListener("click", function () {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  if (!startDate || !endDate) {
    alert("Mohon isi kedua tanggal untuk filter!");
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const filteredData = studentsData.filter((student) => {
    const [day, month, year] = student.tanggalPencatatan.split("-");
    const studentDate = new Date(year, month - 1, day);

    return studentDate >= start && studentDate <= end;
  });

  renderTable(filteredData);
});

// ===== CLEAR FILTER FUNCTIONALITY =====
clearFilterButton.addEventListener("click", function () {
  startDateInput.value = "";
  endDateInput.value = "";
  searchInput.value = "";

  renderTable(studentsData);
});

// ===== NAVIGATION BUTTONS =====
addButton.addEventListener("click", function () {
  window.location.href = "tambah.html";
});


function showDetail(studentId) {
  window.location.href = "detail.html";
}


// ===== INITIAL RENDER =====
const dataLocal = JSON.parse(localStorage.getItem("daftarCatatan")) || [];
const semuaData = [...studentsData, ...dataLocal];
renderTable(semuaData);

