const SETTING_TIME = 5;
let words = ["console", "gitignore", "element", "queryselect", "document", "javascript", "class", "innertext"];
let time;
let isPlaying = false;
let score = 0;
let timeInterval;


const wordDis = document.querySelector(".word-display");
console.log(wordDis.innerText);
const wordInput = document.querySelector(".word-input");
const scoreDis = document.querySelector(".score");
const timeDis = document.querySelector(".time");
const btn = document.querySelector(".btn");

//남은시간 이벤트
time = 9;
const count = () => {
    if (time > 0) {
        time--;
        clearInterval(timeInterval);
    }
    timeDis.innerText = time;
}
const run = () => {
    timeInterval = setInterval(count, 1000);
}
//input 일치하면 점수 추가
const checkMatch = () => {
    if (wordInput.value === wordDis.innerText) { //wordInput은 일반 요소가 아닌 input이기 때문에 value가 필요
        score++
        wordInput.value = "";

        //랜덤
        const randomIndex = Math.floor(Math.random()*words.length)
        wordDis.innerText = words[randomIndex];
    }
    scoreDis.innerText = score;
}
wordInput.addEventListener("input", checkMatch);