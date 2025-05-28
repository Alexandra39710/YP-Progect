document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("userModal");
  const userIcon = document.getElementById("userIcon");
  const closeBtn = document.querySelector(".close");

  userIcon.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
