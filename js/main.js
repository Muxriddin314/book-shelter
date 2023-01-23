var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
//----------------------------

let darkTheme = document.querySelector("#site-moon");
let lightTheme = document.querySelector("#siteSun")
let elUl= document.querySelector("#book-list")
let postForm = document.querySelector("#postForm")
  let addPostBtn = document.querySelector("#add-post-btn")
  let postSection = document.querySelector("#post-section")

//dak theme and light theme
darkTheme.addEventListener("click", ()=>{
    document.body.classList.toggle("bg-gray-500")
})

//render posts

let url = 'https://63cac7b5d0ab64be2b5a6490.mockapi.io/books'
function renderPost(url){
fetch(url)
.then((response) => response.json())
.then((book) => book.forEach(element => {
    let elLi = document.createElement("li")
    elLi.innerHTML = `
    <img src = "${element.image}" alt = "Kitob Rasmi">
    <div>
    <p>${element.name}</p>
    <button data-id = ${element.id} class = " py-3 px-6 my-2 rounded bg-blue-500 text-white hover:bg-blue-400">Read more<button>
    </div>
    <a class="text-blue-500 underline" href = "${element.read}" target = "_blank">Sahifaga o'tish</a>
    `
    elUl.append(elLi)
    let bookListResult = document.querySelector("#result")
    bookListResult.textContent = book.length
  }));
}

renderPost(url)

//create new post

postForm.addEventListener("submit", (e)=>{
  e.preventDefault()

  let name = e.target.name.value
  let author = e.target.author.value
  let img = e.target.image.value
  let date = e.target.date.value
  let read = e.target.read.value

  const book = {
    name: name,
    author: author,
    image: img,
    date:date,
    read: read
  }

  console.log(book)

  fetch('https://63cac7b5d0ab64be2b5a6490.mockapi.io/books', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(book),
})
  .then((response) => response.json())
  .then((book) => {
 
    let success = document.querySelector("#post-success")
    success.classList.remove("hidden")
    postForm.reset()

    setTimeout(() => {
      window.location.reload()
      success.classList.add("hidden");
    }, "5000")
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})

//top book swiper
let topBook = document.querySelector("#best-seller-book")
  fetch('https://63cac7b5d0ab64be2b5a6490.mockapi.io/bestseller')
  .then((response) => response.json())
  .then((topBooks) => topBooks.forEach(element => {
    let elDiv = document.createElement("div")
    elDiv.className = "swiper-slide"
    elDiv.innerHTML = `
    <img src = "${element.image}">
    `
    topBook.append(elDiv)
  }))

//post form close and open
  addPostBtn.addEventListener("click", ()=>{
    postSection.classList.remove("hidden")
  })

  let closeForm = document.querySelector("#post-form-close")
  closeForm.addEventListener("click", ()=>{
    postSection.classList.add("hidden")
  })

  //single page
  elUl.addEventListener("click", (e)=>{
    if(e.target.classList.contains("bg-blue-500")){
      const id = e.target.dataset.id;
      console.log(id);
      localStorage.setItem("id", id);
      window.location.href = "single-page.html"
    }
  })
