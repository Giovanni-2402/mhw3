const apiKey = 'secret';


function onClick(event) {
  const button = event.currentTarget;
  const answer = button.nextElementSibling;
  const symbol = button.querySelector('.più');

  const isVisible = answer.style.display === 'block';
  answer.style.display = isVisible ? 'none' : 'block';
  symbol.textContent = isVisible ? '+' : 'x';
}
const buttons = document.querySelectorAll('.faq-question');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', onClick);
}



const nuoveImmagini = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSri0uII4RlLEOBPyiLLkSXS1GfHLQiiwzb6w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGu8K4SpsVuFtGHt_DgoDI5jkIF1tA-18cCfICP6rv221V7tTQ3e7iK5mMfwGe1x1pAEs&usqp=CAU",
  "https://compass-media.vogue.it/photos/67bfa59024e5c967afa47617/master/w_1600%2Cc_limit/nuovi%2520film%2520netflix.jpg",
  "https://media.gqitalia.it/photos/64e73d0ccb32096acc690e1a/16:9/w_2400,h_1350,c_limit/MCDOPPE_UV063%20Cillian%20Murphy%20in%20Oppenheimer.jpeg"
];

document.querySelectorAll(".locandina").forEach(function(img, index) {
  img.addEventListener("click", function() {
  
    if (nuoveImmagini[index]) {
      img.src = nuoveImmagini[index];
    }

    
    document.body.classList.add("no-scroll");

    
    const popup = document.createElement("div");
    popup.className = "popup-overlay";

    const content = document.createElement("div");
    content.className = "popup-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", () => {
      popup.remove();
      document.body.classList.remove("no-scroll"); 
    });

    const image = document.createElement("img");
    image.src = img.src;

    const title = document.createElement("h2");
    title.textContent = img.dataset.titolo;

    const tags = document.createElement("div");
    tags.textContent = img.dataset.anno + " • " + img.dataset.generi;

    const desc = document.createElement("p");
    desc.textContent = img.dataset.descrizione;

    content.append(closeBtn, image, title, tags, desc);
    popup.appendChild(content);
    document.body.appendChild(popup);
  });
});



var dark = true;
document.getElementById("tema-button").addEventListener("click", function() {
  document.body.classList.toggle("light-mode");
});


document.querySelectorAll(".locandina").forEach(function(img) {
  img.addEventListener("click", function() {
    this.classList.toggle("preferito");
  });
});
  



    



async function fetchMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=it-IT&page=1`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Lista dei film popolari:', data.results); 
  } catch (error) {
    console.error('C\'è stato un problema con la richiesta:', error);
  }
}

fetchMovies(); 






async function fetchMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=it-IT&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayMovies(data.results); 
  } catch (error) {
    console.error('C\'è stato un problema con la richiesta:', error);
  }
}


function displayMovies(movies) {
  const container = document.getElementById('movies-container'); 
  container.innerHTML = ''; 

  
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card'); 

  
    const movieImg = document.createElement('img');
    movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; 
    movieImg.alt = movie.title;

    
    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;

    
    movieCard.appendChild(movieImg);
    movieCard.appendChild(movieTitle);

    
    container.appendChild(movieCard);
  });
}


fetchMovies();









document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Errore nella richiesta");

    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error("Errore:", error);
    document.getElementById("results").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
  }
});

function displayResults(movies) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (movies.length === 0) {
    container.innerHTML = "<p>Nessun film trovato.</p>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const overview = document.createElement("p");
    overview.textContent = movie.overview || "Descrizione non disponibile.";

    const poster = document.createElement("img");
    poster.src = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
      : "https://via.placeholder.com/200x300?text=Nessuna+immagine";
    poster.alt = movie.title;

    card.appendChild(poster);
    card.appendChild(title);
    card.appendChild(overview);
    container.appendChild(card);
  });
}
