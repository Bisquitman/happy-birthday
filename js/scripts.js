const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const body = document.body;
const cardImage = document.querySelector('.card__image');
const cardText = document.querySelector('.card__text');
const btnText = document.querySelector('.header__button-change_text');
const btnImg = document.querySelector('.header__button-change_image');

const state = {
  gender: body.classList.contains('women') ? 'women' : 'men',
};

const getRandomForArr = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

const getData = () => fetch('db.json').then((response) => response.json());

const changeDOM = () => {
  if (state.photo.includes('black')) {
    cardText.style.color = '#fff';
  } else {
    cardText.style.color = '';
  }

  cardImage.src = `./img/${state.photo}`;
  cardText.innerHTML = state.text.replaceAll('\n', '<br />');
};

const getDataToCard = () => {
  getData().then((data) => {
    state.text = getRandomForArr(data.text[state.gender]);
    state.photo = getRandomForArr(data.photo[state.gender]);

    changeDOM();
  });
};

const changeToMen = () => {
  if (state.gender !== 'men') {
    body.classList.add('men');
    body.classList.remove('women');

    state.gender = 'men';

    getDataToCard();
  }
};

const changeToWomen = () => {
  if (state.gender !== 'women') {
    body.classList.add('women');
    body.classList.remove('men');

    state.gender = 'women';

    getDataToCard();
  }
};

const changeText = () => {
  getData().then((data) => {
    state.text = getRandomForArr(data.text[state.gender]);

    changeDOM();
  });
};

const changeImage = () => {
  getData().then((data) => {
    state.photo = getRandomForArr(data.photo[state.gender]);

    changeDOM();
  });
};

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
btnText.addEventListener('click', changeText);
btnImg.addEventListener('click', changeImage);

getDataToCard();

// Сохранение картинки с текстом
function exportimage() {
  html2canvas(document.querySelector('.card__wrapper')).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob, `${state.photo}`);
    });
  });
}

const saveBtn = document.querySelector('.card__save-btn');
saveBtn.addEventListener('click', (e) => {
  e.preventDefault(); // prevent
  exportimage();
});
