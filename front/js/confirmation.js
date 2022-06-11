//Recupération de l'OrderId de l'url//

    let params = new URL(location.href).searchParams;
    let id = params.get("orderId");