import Toto from './Toto.js';

document.addEventListener('DOMContentLoaded', () => {
    const toto = new Toto();
    const matchesContainer = document.getElementById('matches');
    const resultElement = document.getElementById('result');

    // Generate random match results
    for (let i = 0; i < 14; i++) {
        const csapat1 = `Csapat${i + 1}`;
        const csapat2 = `Csapat${i + 2}`;
        const gol1 = Math.floor(Math.random() * 5);
        const gol2 = Math.floor(Math.random() * 5);
        toto.ujEredmeny(csapat1, gol1, csapat2, gol2);

        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-item';
        matchDiv.innerHTML = `
            <label>${csapat1} vs ${csapat2}</label>
            <select name="match${i}">
                <option value="1">1</option>
                <option value="X">X</option>
                <option value="2">2</option>
            </select>
        `;
        matchesContainer.appendChild(matchDiv);
    }

    document.getElementById('toto-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const ticket = [];
        for (let i = 0; i < 14; i++) {
            ticket.push(formData.get(`match${i}`));
        }

        try {
            const score = toto.szelvenytEllenoriz(ticket);
            resultElement.textContent = `Helyes tippek száma: ${score}`;
        } catch (error) {
            resultElement.textContent = error.message;
        }
    });
});