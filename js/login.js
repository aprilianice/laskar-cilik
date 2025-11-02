// Data akun guru
const akunGuru = [
  { username: "guru01", password: "gurupass" },
  { username: "guru02", password: "gurupass2" }
];

function handleLogin(e) {
  e.preventDefault(); // Mencegah reload halaman

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const userValid = akunGuru.find(
    (akun) => akun.username === username && akun.password === password
  );

  if (userValid) {
    alert("Login berhasil! Selamat datang, Guru!");
    window.location.href = "daftarCatatan.html";
  } else {
    alert("Username atau password salah!");
  }
}
document.getElementById("loginForm").addEventListener("submit", handleLogin);