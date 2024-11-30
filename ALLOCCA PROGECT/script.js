
document.addEventListener("DOMContentLoaded", function () {
    let cart = []; // Array per memorizzare i prodotti nel carrello
  
    // Funzione per aggiungere un prodotto al carrello
    window.addToCart = function (name, price, quantity) {
      quantity = parseInt(quantity);
  
      if (isNaN(quantity) || quantity < 1) {
        alert("Inserisci una quantità valida.");
        return;
      }
  
      // Controlla se il prodotto esiste già nel carrello
      const existingItem = cart.find((item) => item.name === name);
  
      if (existingItem) {
        // Se esiste, aggiorna la quantità
        existingItem.quantity += quantity;
      } else {
        // Altrimenti, aggiungi un nuovo prodotto al carrello
        cart.push({ name, price, quantity });
      }
  
      updateCartUI();
    };
  
    // Funzione per aggiornare l'interfaccia del carrello
    function updateCartUI() {
      const cartList = document.getElementById("cart-list");
      const totalPriceElement = document.getElementById("total-price");
  
      // Svuota il contenuto attuale del carrello
      cartList.innerHTML = "";
  
      let totalPrice = 0;
  
      cart.forEach((item, index) => {
        // Calcola il totale parziale per ogni prodotto
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
  
        // Crea un elemento della lista per ogni prodotto
        const listItem = document.createElement("li");
  
        // Descrizione dell'elemento
        listItem.textContent = `${item.name} - €${item.price} x ${item.quantity} = €${itemTotal} `;
  
        // Crea il pulsante "Rimuovi"
        const removeButton = document.createElement("button");
        removeButton.textContent = "Rimuovi";
        removeButton.style.marginLeft = "10px";
        removeButton.onclick = function () {
          removeFromCart(index); // Passa l'indice dell'elemento da rimuovere
        };
  
        // Aggiungi il pulsante all'elemento della lista
        listItem.appendChild(removeButton);
  
        // Aggiungi l'elemento della lista al carrello
        cartList.appendChild(listItem);
      });
  
      // Aggiorna il prezzo totale
      totalPriceElement.textContent = `Totale: €${totalPrice}`;
    }
  
    // Funzione per rimuovere un prodotto dal carrello
    function removeFromCart(index) {
      cart.splice(index, 1); // Rimuove l'elemento dal carrello
      updateCartUI(); // Aggiorna l'interfaccia
    }
  
    // Funzione per il checkout
    window.checkout = function () {
      if (cart.length === 0) {
        alert("Il carrello è vuoto!");
      } else {
        alert("Grazie per il tuo ordine!");
        cart = []; // Svuota il carrello
        updateCartUI();
      }
    };
  });
  