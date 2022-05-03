// Récupérer le formulaire
const queryString_url__id = window.location.search; 
console.log(queryString_url__id);

document.querySelector("cart__order__form__submit").addEventListener("click",function(){
    //champs à compléter
    var valid = true;
    for(let input of document.querySelectorAll(".form input['submit']"){
        valid = valid && input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        alert ("Votre commande a bien été prise en compte");
    }
});