let button = document.querySelector(".button");

button.addEventListener("click", () => {
  let width = window.screen.width;
  let height = window.screen.height;
window.alert(`Screen size is ${width} x ${height}`);
})