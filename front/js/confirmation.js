//Récupérer l'url
function getId() {
    let onUrl= window.location.href;
    let url = new URL(onUrl);
    return url.searchParams.get("id");
}