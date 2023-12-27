var images = [
    { chemin: "Images/carte1.png", alt: "", valeur: 0, numéro: 0 },
    { chemin: "Images/carte2.png", alt: "", valeur: 0, numéro: 1 },
    { chemin: "Images/carte3.png", alt: "", valeur: 0, numéro: 2 },
    { chemin: "Images/carte4.png", alt: "", valeur: 0, numéro: 3 },
    { chemin: "Images/carte5.png", alt: "", valeur: 0, numéro: 4 },
    { chemin: "Images/carte6.png", alt: "", valeur: 0, numéro: 5 },
    // { chemin: "Images/carte7.png", alt: "", valeur: 0, numéro: 6 },
    // { chemin: "Images/carte8.png", alt: "", valeur: 0, numéro: 7 }
];

function winGame (){
    setTimeout(function() { 
        if (coup <= 6){
            alert('TRICHEUR !')
            // + message perso pour afficher le nombre de coups
        }
        else if (coup > 6 || coup < 10){
            alert("Vous etes de ceux qui ont l'esprit vif !")
        }
        else if (coup > 11 || coup < 15){
            alert('Pas trop mal...')
        }
        else{
            alert('0/20')
        }
        valeur = 0;
        cartesCliques = [];
        window.location.href = 'index.html';
    }, 1000);

}

function reload (){
    window.location.href= 'index.html';
}

const cartesDisponibles = images.filter(carte => carte.valeur < 2);
const cartesSelectionnees = {};

for (let i = 0; i < images.length * 2; i++) {
    let liste = document.getElementById('cartes');
    if (cartesDisponibles.length > 0) {
        const indexAleatoire = Math.floor(Math.random() * cartesDisponibles.length);
        const randomCard = cartesDisponibles[indexAleatoire];

        randomCard.valeur += 1;
        let imageCarte = document.createElement('li');
        imageCarte.innerHTML = `<img src="${randomCard.chemin}" alt="${randomCard.alt}">`;
        imageCarte.id = randomCard.numéro;
        imageCarte.className = 'invisible';
        liste.appendChild(imageCarte);

        if (cartesSelectionnees[randomCard.chemin]) {
            cartesSelectionnees[randomCard.chemin] += 1;
        } else {
            cartesSelectionnees[randomCard.chemin] = 1;
        }

        if (cartesSelectionnees[randomCard.chemin] === 2) {
            cartesDisponibles.splice(indexAleatoire, 1);
        }
    } else {
        break; 
    }
}

let valeur = 0;
let cartesCliques = [];
let coup = 0; 
let bonnePioche = 0; 

var cartesClass = document.getElementsByClassName('invisible');

// Boucle for peut etre pas la plus adaptée. pour le addeventlistener oui, mais pour le reste...
for (var i = 0; i < cartesClass.length; i++) {
    cartesClass[i].addEventListener('click', function() {

        if (valeur < 2){ // modifier val
            //clear les firstclicks.
            this.classList.remove('invisible');
            this.classList.add('firstclick')
            // Peut etre plus besoin du passage en 'firstclick' avec le tableau cartesCliques.
            valeur = valeur + 1;
            cartesCliques.push(this);
            carteVerificator();
        }    

    });
        
}

function carteVerificator() {
    if (cartesCliques.length === 2){
        var carteclicked1 = cartesCliques[0];
        var carteclicked2 = cartesCliques[1];
    
        var idCarteClicked1 = carteclicked1.id
        var idCarteClicked2 = carteclicked2.id

        if (idCarteClicked1 === idCarteClicked2){
            
            bonnePioche = bonnePioche + 1;
            carteclicked1.classList.remove('firstclick')
            carteclicked1.classList.add('found')
            carteclicked2.classList.remove('firstclick')
            carteclicked2.classList.add('found')
            carteclicked1.removeEventListener('click', arguments.callee);
            carteclicked2.removeEventListener('click', arguments.callee);
            
            console.log(bonnePioche + 'bonnepioche')
        } else {
            console.log('Cartes ne correspondent pas !')
            setTimeout(function() { // delai d'une seconde pour que la deuxieme carte se revele, meme si elle ne correspond pas a la premiere.
                carteclicked1.classList.remove('firstclick')
                carteclicked1.classList.add('invisible')
                carteclicked2.classList.remove('firstclick')
                carteclicked2.classList.add('invisible')
            }, 1000);
        }
        if (bonnePioche >= images.length){
            coup = coup + 1;
            winGame ();
            console.log('roadtoWin')
        }else{
            setTimeout(function() {
                // Réinitialisez des valeurs et du tabl
                valeur = 0;
                cartesCliques = [];
                coup = coup + 1;
                console.log(coup + 'nombre de coups')
                console.log(images.length + 'images.lenght')
            }, 1000);
        }
    }
}

// A ajouter
// Ajouter le systeme de win
// Systeme de score
// possibilité de choisir la taille du terrain de jeu 4x4, 8x8...
// Design: faire des cartes stylisées et une interface plus interessante.

// ///
// 4x3 / 6X6 (18 cartes.)

//mode de choix de taille 4X4 3X3... / soit variables/functions differentes. Soit pages differentes accessibles au boutton. dispo qui differe.
// ajouter differents modes de jeu + score + win. 
//+ design.
// Donner un rang en fonction du nombre de coups.

// Choix du theme de mots pour le pendu. (plusieurs pages ou var) + revelation du mot avec definition + design.

// eviter d'utiliser 'var' pour definir une variable.

//!! Bug du double click carte. SI tu double click sur une carte elle est forcement validée, mais validée seule, donc ca casse le jeu.
// Bizarrement elements trouvés cliquables tout de meme et donc depopables.