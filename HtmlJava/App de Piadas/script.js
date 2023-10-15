document.addEventListener('DOMContentLoaded', () => {
    const jokeContainer = document.getElementById('joke-container');
    const likedJokesContainer = document.getElementById('liked-jokes');
    const getJokesBtn = document.getElementById('get-jokes-btn');
    const nextJokeBtn = document.getElementById('next-joke-btn');
    const likeJokeBtn = document.getElementById('like-joke-btn');
  
    let jokes = [];
    let currentJokeIndex = 0;
    let likedJokes = JSON.parse(localStorage.getItem('likedJokes')) || [];
  
    function showJoke(joke) {
      jokeContainer.innerHTML = `<p>${joke}</p>`;
    }
  
    function fetchJokes() {
      jokeContainer.innerHTML = 'Carregando...';
  
      fetch('https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10')
        .then(response => response.json())
        .then(data => {
          jokes = data.jokes;
          showJoke(jokes[currentJokeIndex].setup + ' ' + jokes[currentJokeIndex].delivery);
          nextJokeBtn.disabled = false;
          likeJokeBtn.disabled = false;
        })
        .catch(error => {
          jokeContainer.innerHTML = 'Erro ao achar piadas.';
          console.error(error);
        });
    }
  
    function getNextJoke() {
      currentJokeIndex++;
      if (currentJokeIndex >= jokes.length) {
        currentJokeIndex = 0;
      }
      showJoke(jokes[currentJokeIndex].setup + ' ' + jokes[currentJokeIndex].delivery);
    }
  
    function likeJoke() {
      const currentJoke = jokes[currentJokeIndex].setup + ' ' + jokes[currentJokeIndex].delivery;
      if (!likedJokes.includes(currentJoke)) {
        likedJokes.push(currentJoke);
        localStorage.setItem('likedJokes', JSON.stringify(likedJokes));
        renderLikedJokes();
      }
    }
  
    function unlikeJoke(joke) {
      const jokeIndex = likedJokes.indexOf(joke);
      if (jokeIndex !== -1) {
        likedJokes.splice(jokeIndex, 1);
        localStorage.setItem('likedJokes', JSON.stringify(likedJokes));
        renderLikedJokes();
      }
    }
  
    function renderLikedJokes() {
      likedJokesContainer.innerHTML = '';
  
      if (likedJokes.length === 0) {
        likedJokesContainer.innerHTML = '<p>Sem piadas curtidas.</p>';
      } else {
        likedJokes.forEach(joke => {
          const li = document.createElement('li');
          li.innerHTML = joke;
          li.addEventListener('click', () => unlikeJoke(joke));
          likedJokesContainer.appendChild(li);
        });
      }
    }
  
    getJokesBtn.addEventListener('click', fetchJokes);
    nextJokeBtn.addEventListener('click', getNextJoke);
    likeJokeBtn.addEventListener('click', likeJoke);
  
    renderLikedJokes();
  });