var images = [
    { chemin: "Images/carte1.png", alt: "", valeur: 0, numéro: 0 },
    { chemin: "Images/carte2.png", alt: "", valeur: 0, numéro: 1 },
    { chemin: "Images/carte3.png", alt: "", valeur: 0, numéro: 2 },
    { chemin: "Images/carte4.png", alt: "", valeur: 0, numéro: 3 }
];

const cartesDisponibles = images.filter(carte => carte.valeur < 2);
console.log(cartesDisponibles);

const cartesSelectionnees = {};

for (let i = 0; i < 8; i++) {
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
        console.log(randomCard);

        if (cartesSelectionnees[randomCard.chemin]) {
            cartesSelectionnees[randomCard.chemin] += 1;
        } else {
            cartesSelectionnees[randomCard.chemin] = 1;
        }

        if (cartesSelectionnees[randomCard.chemin] === 2) {
            cartesDisponibles.splice(indexAleatoire, 1);
        }
    } else {
        console.log("Toutes les cartes ont été sélectionnées deux fois.");
        break; 
    }
}

let valeur = 0;
let cartesCliques = [];

var cartesClass = document.getElementsByClassName('invisible');

for (var i = 0; i < cartesClass.length; i++) {
    cartesClass[i].addEventListener('click', function() {
    
        if (valeur < 2){
            console.log('CLIQUE');
            this.classList.remove('invisible');
            this.classList.add('firstclick')
            valeur = valeur + 1;
            cartesCliques.push(this);
            console.log(valeur);              
        }         

        if (cartesCliques.length === 2){
            var carteclicked1 = cartesCliques[0];
            var carteclicked2 = cartesCliques[1];
        
            var idCarteClicked1 = carteclicked1.id
            var idCarteClicked2 = carteclicked2.id

            if (idCarteClicked1 === idCarteClicked2){
                console.log('Correspondance')
                carteclicked1.classList.remove('firstclick')
                carteclicked1.classList.add('found')
                carteclicked2.classList.remove('firstclick')
                carteclicked2.classList.add('found')
            } else {
                console.log('Cartes ne correspondent pas !')
                setTimeout(function() { // delai d'une seconde pour que la deuxieme carte se revele, meme si elle ne correspond pas a la premiere.
                    carteclicked1.classList.remove('firstclick')
                    carteclicked1.classList.add('invisible')
                    carteclicked2.classList.remove('firstclick')
                    carteclicked2.classList.add('invisible')
                }, 1000);
            }

            // Réinitialisez des valeurs et du tabl
            valeur = 0;
            cartesCliques = [];
        }
    });
}

// A corriger
// encore pas mal de bugg. notamment le fait qu'on puisse spam la revelation de carte et donc reveler tout le jeu...
// des fois correspondance bug et 2 cartes differentes peuvent rester affichés.

// A ajouter
// Ajouter le systeme de win
// Systeme de score
// possibilité de choisir la taille du terrain de jeu 4x4, 8x8...
// Design: faire des cartes stylisées et une interface plus interessante.