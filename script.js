// const Telnet = require("telnet-client");
// const connection = new Telnet();

const btnForm = document.querySelector(".btn__form");
const inputs = document.querySelectorAll(".valor__input");

const credenciais = {};

btnForm.addEventListener("click", function (e) {
  e.preventDefault();

  inputs.forEach((i) => {
    credenciais[`${i.id}`] = i.value;
    i.value = null;
  });
});

console.log(credenciais);
