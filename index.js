const exploreBtn = document.querySelector('#exploreBtn');
const carouselBtn = document.querySelector('#carouselBtn');
const card = document.querySelector('#card');
const cardNext = document.querySelector('#cardNext');
const cardTitle = document.querySelector('#cardTitle');
const cardDesc = document.querySelector('#cardDescription');
const cardNumber = document.querySelector('#cardNumber');
const shownCards = document.querySelector('.single-img-wrapper');
const elementsFromHomePage = [{className: ".main-img", value: "none"}, {className: ".content", value: "none"}, {className: ".top-img", value: "none"}];
const elementsToHomePage = [{className: ".content-card", value: "none"}, {className: ".single-img-wrapper", value: "none"},
    {className: ".main-img", value: "block"}, {className: ".content", value: "block"}, {className: ".top-img", value: "block"}];
const backGroundsToHomePage = [{className: ".wrapper", value: "#161010"}, {className: ".circle", value: "#94ceed"}];
const backGroundsFromHomePage = [{className: ".wrapper", value: "#94ceed"}];
const cards = [{
    title: "Cat Witch",
    img: "img/card1.png",
    description: 'It was popularised in the 1960s with the release of Letroset sheets ' +
        'containing Lorem ipsum passages,and more recently with desktop publishing software',
    number: "01",
    backColor: " #94ceed"
},
    {
        title: "Kid Scull",
        img: "img/card2.png",
        description: "Embarrassing hidden in the middle of text. All the\n" +
            "Lorem Ipsum generators on the Internet tend to\n" +
            "repeat predefined chunks as necessary",
        number: "02",
        backColor: " #da5b61"

    }, {
        title: "Lone Mummy",
        img: "img/card3.png",
        description: 'Various versions have evolved over the years,\n' +
            'sometimes by accident, sometimes on purpose\n' +
            '(injected hurnour and the like).',
        number: "03",
        backColor: " #ff8c48"
    },
];
exploreBtn.addEventListener('click', () => {
        gsap.to(".circle", {padding: 1500, x: -5, y: -350, duration: 1});
        gsap.to(".content", {y: -800, opacity: 0.3, duration: 0.1,});
        gsap.to(".main-img", {y: 300, opacity: 0, duration: 0.5,});
        gsap.fromTo(".content-card", {y: 300, opacity: 0}, {display: 'block', duration: 2, y: 0, opacity: 1});
        gsap.fromTo(".top-img", {y: 0, opacity: 1,}, {y: -100, opacity: 0, duration: 1});
        gsap.fromTo(".single-img-wrapper", {y: 600, x: 600, transform: "skew(15deg, -15deg)", opacity: 0},
            {duration: 0.5, display: "flex", y: 0, x: 0, transform: "skew(0deg, -0deg)", opacity: 1, onComplete: fromHomePage});
    }
);


carouselBtn.addEventListener('click', () => {
    let currentCardSrc = shownCards.children[0].getAttribute("src");
    if (currentCardSrc === cards[cards.length - 1].img) {
        card.src = cards[0].img;
        cardNext.src = cards[1].img;
        toHomePage();
    } else {
        gsap.fromTo(cardNext, {y: 600, x: 600, opacity: 0},
            {duration: 1, display: "flex", y: 0, x: 0, opacity: 1});
        gsap.fromTo(card, {y: 180, x: 550, opacity: 1,},
            {duration: 1, display: "flex", y: 0, x: 0, opacity: 1, onComplete: changeCards(cards)});
    }
});
function changeCards(cards) {
    const currentCardSrc = shownCards.children[0].getAttribute("src");
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].img === currentCardSrc && (i + 2) < cards.length) {
            card.src = cards[i + 1].img;
            cardNext.src = cards[i + 2].img;
            putCardsInfo(cards[i + 1]);
            break;
        }
        if (cards[i].img === cards[cards.length - 1].img) {
            putCardsInfo(cards[cards.length - 1]);
            card.src = cards[cards.length - 1].img;
            cardNext.src = cards[0].img;
        }
    }
}


function fromHomePage() {
    mainStyleCircle('.circle',"circle-homepage","circle-position-with-card", );
    backgroundColor(backGroundsFromHomePage);
    displayShow(elementsFromHomePage);
}

function toHomePage() {
    gsap.fromTo(".circle", {y: -400, x: 200, padding: 1500}, {x: 0, y: 0, padding: "30vh", duration: 1});
    gsap.to(".main-img", {y: 0, opacity: 1, duration: 1.5,});
    gsap.to(".content", {y: 0, opacity: 1, duration: 1,});
    gsap.fromTo(".top-img", {y: -100, opacity: 0,}, {y: 0, opacity: 1, duration: 2,});
    mainStyleCircle('.circle',"circle-position-with-card", "circle-homepage");
    putCardsText(cards[0]);
    backgroundColor(backGroundsToHomePage);
    displayShow(elementsToHomePage)
}

function putCardsText(card) {
    cardTitle.innerHTML = card.title;
    cardDesc.innerHTML = card.description;
    cardNumber.innerHTML = card.number;
}

function backgroundColor(elements) {
    elements.forEach(element => document.querySelector(element.className).style.backgroundColor = element.value);
}

function displayShow(elements) {
    elements.forEach(element => document.querySelector(element.className).style.display = element.value);
}

function mainStyleCircle(className, removeClass, addClass) {
    document.querySelector(className).classList.remove(removeClass);
    document.querySelector(className).classList.add(addClass);
}
function backgroundAnimation(param) {
    document.querySelector('.circle').style.backgroundColor = param.backColor;
    gsap.fromTo(".circle", {y: 500, x: -500, opacity: 0, padding: 30},
        {y: 100, x: 300, opacity: 1, padding: 1500, duration: 1.2});
}

function putCardsInfo(card) {
    gsap.fromTo(".content-card", {opacity: 0}, {opacity: 1, duration: 10, function() {
            putCardsText(card);
            backgroundAnimation(card)
        }
    });
}