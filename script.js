// const Telnet = require("telnet-client");
// const connection = new Telnet();

const btnForm = document.querySelector("#btn__form");
const inputHostname = document.querySelector("#hostname");
const inputVlan = document.querySelector("#vlan");
const inputInterface = document.querySelector("#interface");
const inputSwitchport = document.querySelector("#switchport");
const inputAccess = document.querySelector("#access");
const inputIpgateway = document.querySelector("#ip-gateway");

const inputs = [
  inputHostname,
  inputVlan,
  inputInterface,
  inputSwitchport,
  inputAccess,
  inputIpgateway,
];

const credenciais = {};

btnForm.addEventListener("click", function (e) {
  e.preventDefault();

  credenciais.hostname = inputHostname.value;
  credenciais.vlan = inputVlan.value;
  credenciais.interface = inputInterface.value;
  credenciais.switchport = inputSwitchport.value;
  credenciais.access = inputAccess.value;
  credenciais.ipGateway = inputIpgateway.value;

  inputs.forEach((input) => {
    input.value = null;
  });
});
