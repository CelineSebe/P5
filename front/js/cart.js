// Récupérer le formulaire
const _id = window.location.search; 
console.log(_id);

document.querySelector(`.form input["submit"]`).addEventListener("click",function(){
    //champs à compléter
    var valid = true;
    for(let input of document.querySelectorAll(".form")){
        valid = valid && input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        alert ("Votre commande a bien été prise en compte");
    }
}
);