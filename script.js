const countDiv = document.querySelector("#count");
const minDiv = document.querySelector("#min-random");
const maxDiv = document.querySelector("#max-random");
const genButton = document.querySelector("#generator");
const generatedSection = document.querySelector("#generated-numbers");

const getGenNumHtml = (randomNums) => {
    let genStrings = ""
    randomNums.forEach(num => {
        genStrings += `<div class="generated">${num}</div>`
    });
    return genStrings;
}

genButton.addEventListener("click", () => {
    changeValue();
});

function changeValue() {
    const count = countDiv.value;
    const min = minDiv.value;
    const max = maxDiv.value;
    if (Number(max) < Number(min)) {
        generatedSection.innerHTML = `<div class="generated">Max must be >= Min</div>`;
        return;
    }
    generatedSection.innerHTML = getGenNumHtml(
        getRandomNum(count, min, max)
    );
}

const getRandomNum = (count, min, max) => {
    count = Number(count);
    min = Number(min);
    max = Number(max);
    // Ensure inclusive range and avoid infinite loop when range smaller than count
    const size = (max - min) + 1;
    if (count > size) count = size; // cap to available unique numbers
    const randomNums = new Set();
    while (randomNums.size < count) {
        let rand = Math.floor(Math.random() * size) + min;
        // Defensive clamp (some mobile JS engines w/ unusual locale/float issues?)
        if (rand > max) {
            console.warn('Out-of-range rand detected', {rand, min, max, size});
            rand = max; // clamp
        }
        if (rand < min) {
            console.warn('Below-range rand detected', {rand, min, max, size});
            rand = min; // clamp
        }
        randomNums.add(rand);
    }
    return Array.from(randomNums);
};

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.error('SW registration failed', err));
    });
}