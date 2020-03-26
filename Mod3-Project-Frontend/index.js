const itemList = document.querySelector("#item-list")
const itemCard = document.querySelector("#item-card")


document.querySelector("#create-item").addEventListener("submit", e => {
    e.preventDefault()
  
    const newItem = {
      image: e.target.image.value,
      name: e.target.name.value
    }
  
  
  
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then(r => r.json())
      .then(item => {
        const newDonation = {
          organization: e.target.organization.value,
          quantity: e.target.quantity.value,
          item_id: item.id
        }
  
        fetch("http://localhost:3000/donations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newDonation)
        })
          .then(r => r.json())
          .then(renderOneItem)
  
      
      })
      
  
      })


  
  
  
  function renderOneItem(item) {
    const itemList = document.querySelector("#item-list")
  console.log(item)
    const itemCard = document.createElement("div")
    itemCard.className = "item-card"
    itemCard.dataset.id = item.id
    itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width:80px;height:80px;" >  
        <h2>${item.name}</h2>
        <p>State - ${item.donations[0].organization}</p>
        <p>Quantity - ${item.donations[0].quantity}</p>
        <button data-action="delete" class="delete button">X</button>
  `
  
  itemList.append(itemCard)
  }

  itemList.addEventListener("click", e => {
    if (e.target.dataset.action === "delete") {
      const itemCard = e.target.closest("item-card")
      const itemId = itemCard.dataset.id
      console.log(itemId)
        fetch(`http://localhost:3000/items/${itemId}`, {
      method: "DELETE"
    })
      .then(r => {
        console.log(r)
        return r.json()
      })
        .then(() => {
          itemCard.remove()
        })
    }
  })
  
  
  
  //<p>State - ${item.donations[0].organization}</p>
  //<p>Quantity - ${item.donations[0].quantity}</p>
  
  function renderAllItems(items) {
    items.forEach(renderOneItem)
  }
  
  fetch("http://localhost:3000/items")
    .then(r => r.json())
    .then(renderAllItems)
  
    // function renderAllDonations(donations) {
    //   donations.forEach(renderOneDonation)
    // }
    
    // fetch("http://localhost:3000/donations")
    // .then(r => r.json())
    // .then(renderAllDonations)
  
  
  
  
  
    // fetch(`http://localhost:3000/items/${itemId}`, {
    //   method: "DELETE"
    // })
    //   .then(r => {
    //     console.log(r)
    //     return r.json()
    //     .then(() => {
    //       itemCard.remove()
    //     })
    // })




