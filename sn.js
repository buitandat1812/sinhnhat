let code = "";
const correctCode = "160907";
const dots = document.querySelectorAll("#dots span");
const errorMessage = document.getElementById("error-message");

function press(num) {
  if (code.length < 6) {
    code += num;
    dots[code.length - 1].classList.add("active"); // Hiện dấu chấm trắng
  }

  if (code.length === 6) {
    checkCode(); // Tự kiểm tra sau khi nhập đủ 6 số
  }
}

function clearCode() {
  code = "";
  dots.forEach(dot => dot.classList.remove("active"));
}

function checkCode() {
  const errorMessage = document.getElementById("error-message");
  if (code === correctCode) {
    window.location.href = "trang1.html";
  } else {
    errorMessage.textContent = "Em quên ngày sinh mình rồi kìa :))";
    errorMessage.classList.add("shake");
    setTimeout(() => {
      errorMessage.classList.remove("shake");
      errorMessage.textContent = ""; // Xoá thông báo sau 2 giây nếu muốn
    }, 2000);
    clearCode();
  }
}
