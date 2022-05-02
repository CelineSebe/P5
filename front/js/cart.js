// Récupérer le formulaire

document.querySelector('.form input["submit"]').addEventListener("click",function(){
    //champs à compléter
    var valid = true;
    for(let input of document.querySelectorAll(".form input")){
        valid = valid && input.reportValidity();
        if(!valid){
            break
        }
    }
    if(valid) { 
        alert("Votre commande a bien été prise en compte")    
    }
});