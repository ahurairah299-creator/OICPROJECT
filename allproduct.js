const url = "https://dummyjson.com/products?limit=20";
const fetchData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
let users = [];
let selected_items = JSON.parse(localStorage.getItem("carts")) || [];

async function getPosts() {
  let response = await fetch(url, fetchData);
  let data = await response.json();
  console.log(data);
  users = data.products;

  let myUsers = document.querySelector("#allUsers");
  myUsers.innerHTML = users
    .map(function (value, index, array) {
      return `
        <div class="eachPerson">
            <img src="${value.images[0]}" alt="${value.title}">
            <p><strong>${value.title}</strong></p>
            <p style="color: #33c160; font-weight: bold;">$${value.price}</p>
            <p style="font-size: 12px; color: #666;">${value.returnPolicy}</p>
            <p style="font-size: 12px; color: #666;">${value.warrantyInformation}</p>
            <button onclick="followUser(${value.id})">Add to Cart</button>
        </div>
        `;
    })
    .join("");
}

getPosts();

function followUser(id){
    let item = users.find(t => t.id === id);
    let existingItems = selected_items.findIndex(t => t.id === id);
    
    if(existingItems !== -1){
        selected_items[existingItems].quantity += 1;
    } else {
        selected_items.push({
            id: item.id,
            title: item.title,
            image: item.images[0],
            price: item.price,
            quantity: 1
        });
    }
    
   
    localStorage.setItem("carts", JSON.stringify(selected_items));
    console.log(selected_items);
    
    
    alert(`${item.title} added to cart!`);
}