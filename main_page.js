// Référence aux éléments de la page
const inputItem = document.getElementById("input-item");
const addItemBtn = document.getElementById("add-item-btn");
const itemList = document.getElementById("item-list");
const drawBtn = document.getElementById("draw-btn");
const inputWinners = document.getElementById("input-winners");
const winnerContainer = document.getElementById("winner-container");
const resetBtn = document.getElementById("reset-btn");

// Tableau pour stocker les éléments ajoutés
let items = [];

// Ajouter un élément à la liste
addItemBtn.addEventListener("click", () => {
  const item = inputItem.value;
  if (item) {
    items.push(item);
    const itemElem = document.createElement("li");
    itemElem.innerHTML = item;
    itemList.appendChild(itemElem);
    inputItem.value = "";
    inputItem.focus();

    // Ajouter un bouton de suppression
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "";
    removeBtn.classList.add("remove-btn");
    itemElem.appendChild(removeBtn);

    // Supprimer l'élément de la liste
    removeBtn.addEventListener("click", () => {
      items.splice(items.indexOf(item), 1);
      itemList.removeChild(itemElem);
    });
  }
});

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

// Lancer le tirage au sort
drawBtn.addEventListener("click", () => {
  if (items.length > 0) {
    const numberOfWinners = inputWinners.value;
    if(numberOfWinners > items.length) {
      winnerContainer.innerHTML = "Le nombre de gagnant doit être inférieur ou égal au nombre d'inscrits";
      return;
    }
    const winners = [];
    for (let i = 0; i < numberOfWinners; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      winners.push(items[randomIndex]);
      }
      // Stocker les gagnants dans une session web
      sessionStorage.setItem("winners", JSON.stringify(winners));
      // Rediriger l'utilisateur vers une nouvelle page pour afficher les gagnants
      window.location.assign("winners.html")
      window.location.href = "winners.html";
      sessionStorage.setItem("winners", JSON.stringify(winners));
;
    } else {
      winnerContainer.innerHTML = "Aucun élément à tirer au sort";
    }
  });

// Ajouter un élément à la liste en appuyant sur entrée
inputItem.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        addItemBtn.click();
    }
});