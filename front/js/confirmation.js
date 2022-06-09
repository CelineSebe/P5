//Recupération de l'OrderId de l'url//
function getOrderId() {
    let str = window.location.href;
    let url = new URL(str);
    return url.searchParams.get("orderId");
}
//Rajout de l'OrderId dans la page Confirmation//
 function confirmation () {
     const numeroCommande = document.getElementById('orderId');
    console.log(numeroCommande);
   numeroCommande.innerText = getOrderId();
     window.localStorage.removeItem("contact");
     window.localStorage.removeItem("products");
}

 confirmation();