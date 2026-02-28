// Nếu đã login thì đá thẳng vào main
if (sessionStorage.getItem("currentUser")) {
  location.href = "./main.html";
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // ===== VALIDATE RỖNG =====
  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ email và mật khẩu");
    return;
  }

  // ===== VALIDATE EMAIL =====
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ");
    emailInput.focus();
    return;
  }

  // ===== VALIDATE PASSWORD =====
  if (password.length < 6) {
    alert("Mật khẩu phải ít nhất 6 ký tự");
    passwordInput.focus();
    return;
  }

  // ===== LẤY USERS =====
  const users = JSON.parse(localStorage.getItem("users"));

  if (!users || users.length === 0) {
    alert("Chưa có tài khoản nào được đăng ký");
    return;
  }

  // ===== CHECK LOGIN =====
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Email hoặc mật khẩu không đúng");
    return;
  }

  // ===== LOGIN OK =====
  sessionStorage.setItem("currentUser", JSON.stringify(user));
  location.href = "./main.html";
});
