const countDiv = document.querySelector("#count");
const minDiv = document.querySelector("#min-random");
const maxDiv = document.querySelector("#max-random");
const genButton = document.querySelector("#generator");
const generatedSection = document.querySelector("#generated-numbers")

const getGenNumHtml = (randomNums) => {
    let genStrings = ""
    randomNums.forEach(num => {
        genStrings += `<div class="generated">${num}</div>`
    });
    return genStrings;
}

generator.addEventListener("click", () => {
    changeValue()
})

function changeValue(){
    generatedSection.innerHTML = getGenNumHtml(getRandomNum(
        countDiv.value,
        minDiv.value,
        maxDiv.value
    ))
}

const getRandomNum = (count, min, max) => {
    count = Number(count)
    min = Number(min)
    max = Number(max)
    let randomNums = [];
    for(let i = 0; i < count; i++){
        contains = true;
        while(contains){
            rand = (Math.floor(Math.random() * max)) + min
            if(!randomNums.includes(rand)){
                contains = false
                randomNums.push(rand)
            }
        }
    }
    return randomNums;
}