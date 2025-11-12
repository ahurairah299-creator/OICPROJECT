const url = "https://dummyjson.com/products?limit=20";
const fetchData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
let users = [];
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
            <img src="${value.images}" alt="">
            <p>${value.title}</p>
            <p>$${value.price}</p>
            <p>${value.returnPolicy}</p>
            <p>${value.warrantyInformation}</p>
            <button onclick="followUser(${value.id})"><a href="#">Add to Cart</a></button>
        </div>
        `;
    })
    .join("");
}

getPosts();
