const id = localStorage.getItem("id")
console.log(id);

const fetchData = async ()=>{
    const res = await fetch(`https://63cac7b5d0ab64be2b5a6490.mockapi.io/books/${id}`);
    const data = await res.json();
    console.log(data);
    let element = data
    let elDiv = document.createElement("div")
  
    elDiv.innerHTML = `
    <img class = "mx-auto w-80" src = "${element.image}" alt = "Kitob Rasmi">
    <div>
    <p class = "text-xl">${element.name}</p>
    <p>Muallif: ${element.author}</p>
    <p>Chop etilgan yil:${element.date}</p>  
    </div>
    <a class="text-blue-500 underline" href = "${element.read}" target = "_blank">Sahifaga o'tish</a>
    `
    let page = document.querySelector("#single-page")
    page.append(elDiv)
          
 }
fetchData()
