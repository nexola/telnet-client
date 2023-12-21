// Seletores
const btnForm = document.querySelectorAll(".btn__form");
const sections = document.querySelectorAll("section");
const menuSection = document.querySelector("#menu--section");
const allInputs = document.querySelectorAll(".valor__input");
const btnVlan = document.querySelector("#add__vlan");
const inputVlan = document.querySelector("#vlan");
const itemVlan = document.querySelector(".item__vlan");
const itemForm = document.querySelector(".item__form--vlan");

// Funções auxiliares
const zerarInputs = function () {
  allInputs.forEach((i) => (i.value = null));
};

// Coletando valores dos inputs
// Seção 1 / 2 / 3
let entries = {};
btnForm.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (entries.length > 0) {
      entries = {};
    }

    const clicked = e.target;
    const inputs = document.querySelectorAll(
      `.section__${clicked.dataset.form} .valor__input`
    );

    inputs.forEach((i) => {
      entries[`${i.id}`] = i.value;
    });
    zerarInputs();
  })
);

console.log(entries);

// Mudando aba
const mudarAba = function (slide) {
  sections.forEach((s) => s.classList.remove("section__ativo"));
  slide.classList.add("section__ativo");
  zerarInputs();
};

menuSection.addEventListener("click", function (e) {
  e.preventDefault();

  const clicked = e.target;
  const abaAtiva = document.querySelector(`.section__${clicked.dataset.slide}`);
  const abas = menuSection.querySelectorAll("button");

  abas.forEach((a) => {
    if (clicked !== a) {
      return;
    }
    mudarAba(abaAtiva);
  });
});

// Adicionando múltiplos vlan
let itensVlan = new Set();

const addItemVlan = function (valor) {
  const txt = `<div class="item__vlan" data-valor="${valor}">
  <h3>${valor}</h3>
  <a href="" class="remove__vlan">x</a>
  </div>`;
  itemVlan.insertAdjacentHTML("beforebegin", txt);
};

btnVlan.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputVlan.value && !itensVlan.has(inputVlan.value)) {
    itensVlan.add(inputVlan.value);
    console.log(itensVlan);
    addItemVlan(inputVlan.value);
    inputVlan.value = null;
  }
});

itemForm.addEventListener("click", function (e) {
  e.preventDefault();

  let clicked = e.target;

  if (!clicked.classList.contains("remove__vlan")) {
    return;
  }

  let divClicked = clicked.closest("div");

  itensVlan.delete(divClicked.dataset.valor);

  divClicked.parentNode.removeChild(divClicked);
});
