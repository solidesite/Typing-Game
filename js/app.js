

const SETTING_TIME = 9;
let words = [];
let time;
let isReady = false;
let isPlaying = false;
let score = 0;
let timeInterval;

const url = "https://random-word-api.herokuapp.com/word?number=100";
const wordDis = document.querySelector(".word-display");
console.log(wordDis.innerText);
const wordInput = document.querySelector(".word-input");
const scoreDis = document.querySelector(".score");
const timeDis = document.querySelector(".time");
const btn = document.querySelector(".btn");


// Toastify
runToast = (text) => {
    const option = {
        text: text,
        duration: 3000,
        newWindow: true,
        gravity: 'top',
        position: "left",
        background: "linear-gradient(#00b09b, #96c3d)"
    }
    Toastify(option).showToast()
}
const getWords = () => {
    axios.get(url).then(res => {
        words = res.data.filter(word => {
            return word.length < 8;
        })
        btn.innerText = '게임 시작'
        btn.classList.remove('loading')
        isReady = true;
    }).catch(err=> console.log(err))
}
const init = () => {
    time = SETTING_TIME;
    getWords();
}

//남은시간 이벤트
const count = () => {
    if (time > 0) {
        time--;
    } else {
        clearInterval(timeInterval);
        isPlaying = false;
    }
    timeDis.innerText = time;
}
const run = () => {
    clearInterval(timeInterval)
    if (isReady === false) {
        return;
    }
    timeInterval = setInterval(count, 1000);
    wordInput.value = "";
    score = 0;
    time = SETTING_TIME;
    isPlaying = true;
}
//input 일치하면 점수 추가
const checkMatch = () => {
    if (!isPlaying) {
        return
    };
    if (wordInput.value === wordDis.innerText) { //wordInput은 일반 요소가 아닌 input이기 때문에 value가 필요
        score++
        runToast(wordDis.innerText)
        time = SETTING_TIME;
        wordInput.value = "";
        //랜덤출력
        const randomIndex = Math.floor(Math.random()*words.length)
        wordDis.innerText = words[randomIndex];
    }
    scoreDis.innerText = score;
}
wordInput.addEventListener("input", checkMatch);

// getting ready
init()