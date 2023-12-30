// Seletores
const listaBtn = document.querySelectorAll(".btn__form");
const sections = document.querySelectorAll("section");
const menuSection = document.querySelector("#menu--section");
const allInputs = document.querySelectorAll(".valor__input");
const btnVlan = document.querySelector("#add__vlan");
const inputVlan = document.querySelector("#vlan");
const itemVlan = document.querySelector(".item__vlan");
const itemForm = document.querySelector(".item__form--vlan");
const btnMenu = document.querySelectorAll("#menu--section button");
const abas = menuSection.querySelectorAll("button");
const inputIp = document.getElementById("ip");

class App {
  itensVlan = new Set();
  entries = {};

  constructor() {
    menuSection.addEventListener("click", this.clickMudarAba.bind(this));
    listaBtn.forEach((btn) =>
      btn.addEventListener("click", this.coletarValores.bind(this))
    );
    btnVlan.addEventListener("click", this.addVlan.bind(this));
    itemForm.addEventListener("click", this.removeVlan.bind(this));

    inputIp.focus();
  }

  zerarInputs() {
    allInputs.forEach((i) => (i.value = null));
  }

  coletarValores(e) {
    const validInputs = (...inputs) => inputs.every((inp) => inp.value);

    const allPositive = (...inputs) =>
      inputs
        .filter((inp) => Number.isFinite(+inp.value))
        .every((inp) => +inp.value > 0);

    e.preventDefault();

    const clickedEl = e.target.closest(".btn__form");

    if (!clickedEl) {
      return;
    }

    console.log(this.entries);
    console.log(this.itensVlan);

    if (this.entries) {
      for (const key in this.entries) {
        delete this.entries[key];
      }
    }

    const inputs = document.querySelectorAll(
      `.section__${clickedEl.dataset.form} .valor__input`
    );

    if (!validInputs(...inputs) || !allPositive(...inputs)) {
      return alert("Os valores precisam ser positivos e/ou não nulos");
    }

    inputs.forEach((i) => {
      this.entries[`${i.id}`] = i.value;
    });

    if (clickedEl.getAttribute("id") === "btn--2") {
      if (this.itensVlan.size === 0) {
        this.itensVlan = document.getElementById("vlan").value;
      }
      this.entries["vlan"] = this.itensVlan;
    }

    if (clickedEl.getAttribute("id") === "btn--4") {
      const radioSSH = document.querySelector("input[name='aut_ssh']:checked");
      const radioTelnet = document.querySelector(
        'input[name="aut_tnt"]:checked'
      );

      if (radioSSH && radioTelnet) {
        this.entries[`${radioSSH.getAttribute("name")}`] = radioSSH.value;
        this.entries[`${radioTelnet.getAttribute("name")}`] = radioTelnet.value;
      }
    }

    this.zerarInputs();
  }

  mudarAba(abaAtiva) {
    sections.forEach((s) => s.classList.remove("section__ativo"));
    btnMenu.forEach((b) => b.classList.remove("btn__ativo"));
    const btnAtivo = document.querySelector(
      `#menu--section button[data-slide="${abaAtiva.dataset.slide}"]`
    );
    console.log(abaAtiva);
    btnAtivo.classList.add("btn__ativo");
    abaAtiva.classList.add("section__ativo");
    this.zerarInputs();
  }

  clickMudarAba(e) {
    e.preventDefault();

    const clicked = e.target;
    const abaAtiva = document.querySelector(
      `.section__${clicked.dataset.slide}`
    );

    abas.forEach((a) => {
      if (clicked !== a) {
        return;
      }
      this.mudarAba(abaAtiva);
    });
  }

  addHTMLVlan(valor) {
    const txt = `
    <div class="item__vlan" data-valor="${valor}">
      <h3>${valor}</h3>
      <a href="" class="remove__vlan">x</a>
    </div>`;
    itemVlan.insertAdjacentHTML("beforebegin", txt);
  }

  addVlan(e) {
    e.preventDefault();

    if (inputVlan.value && !this.itensVlan.has(inputVlan.value)) {
      this.itensVlan.add(inputVlan.value);
      console.log(itemVlan);
      this.addHTMLVlan(inputVlan.value);
      inputVlan.value = null;
    }
  }

  removeVlan(e) {
    e.preventDefault();

    let clicked = e.target;

    if (!clicked.classList.contains("remove__vlan")) {
      return;
    }

    let divClicked = clicked.closest("div");

    this.itensVlan.delete(divClicked.dataset.valor);

    divClicked.parentNode.removeChild(divClicked);
  }
}

const app = new App();

console.log(app.entries);
