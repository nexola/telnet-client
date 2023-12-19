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

btnForm.addEventListener("click", function (e) {
  e.preventDefault();

  const credenciais = {
    hostname: inputHostname.value,
    vlan: inputVlan.value,
    interface: inputInterface.value,
    switchport: inputSwitchport.value,
    access: inputAccess.value,
    ipGateway: inputIpgateway.value,
  };

  console.log(credenciais);

  inputs.forEach((input) => {
    input.value = null;
  });
});
