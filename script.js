// Seletores
const btnForm = document.querySelectorAll(".btn__form");
const sections = document.querySelectorAll("section");
const menuSection = document.querySelector("#menu--section");
const allInputs = document.querySelectorAll(".valor__input");
const btnVlan = document.querySelector("#add__vlan");
const inputVlan = document.querySelector("#vlan");
const itemVlan = document.querySelector(".item__vlan");
const itemForm = document.querySelector(".item__form--vlan");
const btnMenu = document.querySelectorAll("#menu--section button");

let itensVlan = {};
let entries = {};

const init = function () {
  coletarValores(btnForm);
  mudarAba(sections, menuSection);
  addVlan(itemVlan, inputVlan);
};

// Funções auxiliares
const zerarInputs = function () {
  allInputs.forEach((i) => (i.value = null));
};

// Coletando valores dos inputs
const coletarValores = function (listaBtn) {
  listaBtn.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      console.log(entries);
      console.log(itensVlan);
      e.preventDefault();

      if (entries) {
        for (const key in entries) {
          delete entries[key];
        }
      }

      const clicked = e.target;

      const inputs = document.querySelectorAll(
        `.section__${clicked.dataset.form} .valor__input`
      );

      inputs.forEach((i) => {
        entries[`${i.id}`] = i.value;
      });

      switch (clicked.getAttribute("id")) {
        case "btn__seg":
          const radioSSH = document.querySelector(
            "input[name='aut_ssh']:checked"
          );
          const radioTelnet = document.querySelector(
            'input[name="aut_tnt"]:checked'
          );

          if (radioSSH && radioTelnet) {
            entries[`${radioSSH.getAttribute("name")}`] = radioSSH.value;
            entries[`${radioTelnet.getAttribute("name")}`] = radioTelnet.value;
          }
          break;

        case "btn--2":
          addVlan(itemVlan, inputVlan);
          entries["vlan"] = itensVlan;

        default:
          break;
      }

      zerarInputs();
    })
  );
};

// Mudando aba
const mudarAba = function (secoes, menu) {
  const alternarAba = function (slide) {
    secoes.forEach((s) => s.classList.remove("section__ativo"));
    btnMenu.forEach((b) => b.classList.remove("btn__ativo"));
    const btnAtivo = document.querySelector(
      `#menu--section button[data-slide="${slide.dataset.slide}"]`
    );
    btnAtivo.classList.add("btn__ativo");
    slide.classList.add("section__ativo");
    zerarInputs();
  };

  menu.addEventListener("click", function (e) {
    e.preventDefault();

    const clicked = e.target;
    const abaAtiva = document.querySelector(
      `.section__${clicked.dataset.slide}`
    );
    const abas = menu.querySelectorAll("button");

    abas.forEach((a) => {
      if (clicked !== a) {
        return;
      }
      alternarAba(abaAtiva);
    });
  });
};

// Adicionando múltiplos vlan
const addVlan = function (divInput, input) {
  let itens = new Set();

  const addHTMLVlan = function (valor) {
    const txt = `<div class="item__vlan" data-valor="${valor}">
  <h3>${valor}</h3>
  <a href="" class="remove__vlan">x</a>
  </div>`;
    divInput.insertAdjacentHTML("beforebegin", txt);
  };

  btnVlan.addEventListener("click", function (e) {
    e.preventDefault();

    if (input.value && !itens.has(input.value)) {
      itens.add(input.value);
      console.log(itens);
      addHTMLVlan(input.value);
      input.value = null;
      itensVlan = itens;
    }
  });

  itemForm.addEventListener("click", function (e) {
    e.preventDefault();

    let clicked = e.target;

    if (!clicked.classList.contains("remove__vlan")) {
      return;
    }

    let divClicked = clicked.closest("div");

    itens.delete(divClicked.dataset.valor);

    itensVlan = itens;

    divClicked.parentNode.removeChild(divClicked);
  });

  if (itens.size === 0) {
    itensVlan = document.getElementById("vlan").value;
  }
};

init();
