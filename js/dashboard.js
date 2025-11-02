// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const sidebarTab = document.getElementById("sidebarTab");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");

sidebarTab.onclick = () => {
  sidebar.classList.remove("closed");
  mainContent.classList.remove("expanded");
};

sidebarCloseBtn.onclick = () => {
  sidebar.classList.add("closed");
  mainContent.classList.add("expanded");
};


// catatan siswa
const pencatatanCtx = document.getElementById("pencatatanChart").getContext("2d");
new Chart(pencatatanCtx, {
  type: "bar",
  data: {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum"],
    datasets: [{
      label: "Catatan",
      data: [3, 6, 2, 4, 5],
      backgroundColor: "#4FC3F7"
    }]
  }
});

// perkembangan jumlah siswa
const growthCtx = document.getElementById("growthChart").getContext("2d");
new Chart(growthCtx, {
  type: "line",
  data: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [{
      label: "Pertumbuhan Siswa",
      data: [10, 15, 18, 25, 31],
      borderColor: "#2196F3",
      borderWidth: 2,
      tension: 0.3
    }]
  }
});
// gender chart boy
new Chart(document.getElementById("boysChart"), {
  type: "doughnut",
  data: {
    labels: ["Laki-laki", ""],
    datasets: [{
      data: [53, 47],
      backgroundColor: ["#2196F3", "#E8F4FF"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "70%",
    plugins: { legend: { display: false }}
  }
});

// gender chart girl
new Chart(document.getElementById("girlsChart"), {
  type: "doughnut",
  data: {
    labels: ["Perempuan", ""],
    datasets: [{
      data: [47, 53],
      backgroundColor: ["#E91E63", "#FDE8F4"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "70%",
    plugins: { legend: { display: false }}
  }
});
