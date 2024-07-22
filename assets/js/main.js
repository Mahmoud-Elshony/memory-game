let flibCardAudio = new Audio("./assets/audio/cardPlace2.ogg");
let matchTwoCard = new Audio("./assets/audio/jingles-pizzicato_00.ogg");
let winnnerAudio = new Audio("./assets/audio/you_win.ogg");
let flibedImg = [];
let score = 0;
function makeCardsArray(cardCount) {
  let cardsArray = [];
  for (let i = 1; i <= cardCount; i++) {
    cardsArray.push(i, i);
  }
  return cardsArray;
}
function shufllImage(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function handelClick(imgElem, imgIndex) {
  if (flibedImg.length < 2 && ![...imgElem.classList].includes("flibr")) {
    flibCardAudio.play();
    imgElem.classList = "flibr";
    flibedImg.push(imgElem);
    imgElem.src ="./assets/image/"+ imgSrcArr[imgIndex] + ".gif";
  }
  if (flibedImg.length == 2) {
    setTimeout(() => {
      let [firstImg, secondImg] = flibedImg;
      if (firstImg.src == secondImg.src) {
        score++;
        if(score==6){
            winnnerAudio.play();
            return;
        }
        matchTwoCard.play();
        flibedImg.length = 0;
      } else {
        firstImg.src = "./assets/image/Moon.gif";
        secondImg.src = "./assets/image/Moon.gif";
        firstImg.classList.remove("flibr");
        secondImg.classList.remove("flibr");
        console.log(flibedImg);
        flibedImg.length = 0;
      }
    }, 500);
  }
  console.log(document.images);
}
function startGame() {
    imgSrcArr = shufllImage(makeCardsArray(6));
    [...document.images].forEach((imgElem, imgIndex) => {
        imgElem.src = "./assets/image/Moon.gif";
        imgElem.onclick = () => handelClick(imgElem, imgIndex);
    });
}
restartBtn.onclick = function(){
  this.hidden = true;
  startGame();
}
window.onload = function (){
  startGame();
}
