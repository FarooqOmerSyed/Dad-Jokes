const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');
const copyBtn = document.getElementById('copyBtn')

jokeBtn.addEventListener('click', generateJoke);
copyBtn.addEventListener('click', copyJokeToClipboard);

generateJoke();

async function generateJoke() {
    const config = {
        headers: {
            'Accept': 'application/json'
        },
    };

    try {
        const res = await fetch('https://icanhazdadjoke.com', config);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        jokeEl.innerHTML = data.joke;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        jokeEl.innerHTML = 'Failed to fetch joke. Please try again later.';
    }
}

function copyJokeToClipboard() {
    const jokeText = jokeEl.innerText;
    navigator.clipboard.writeText(jokeText).then(() => {
        console.log('Joke copied to clipboard');
        alert('Joke copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy joke: ', err);
    });
}