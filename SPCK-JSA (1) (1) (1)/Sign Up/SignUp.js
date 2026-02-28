// Đã đăng nhập thì không cho vào signup
if (sessionStorage.getItem("currentUser")) {
  location.href = "./main.html";
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // ===== VALIDATE RỖNG =====
  if (!username || !email || !password) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  // ===== VALIDATE USERNAME =====
  if (username.length < 3) {
    alert("Username phải ít nhất 3 ký tự");
    usernameInput.focus();
    return;
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    alert("Username không được chứa ký tự đặc biệt");
    usernameInput.focus();
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
  let users;
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    alert("Dữ liệu bị lỗi, vui lòng thử lại");
    return;
  }

  // ===== CHECK TRÙNG =====
  const isExist = users.some(
    u => u.email === email || u.username === username
  );

  if (isExist) {
    alert("Username hoặc email đã tồn tại");
    return;
  }

  // ===== LƯU USER =====
  users.push({
    username,
    email,
    password
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công, đăng nhập thôi 😎");
  location.href = "./signIn.html";
});
