const exploreBtn = document.querySelector('#exploreBtn');
const carouselBtn = document.querySelector('#carouselBtn');
const card = document.querySelector('#card');
const cardNext = document.querySelector('#cardNext');
const cardTitle = document.querySelector('#cardTitle');
const cardDesc = document.querySelector('#cardDescription');
const cardNumber = document.querySelector('#cardNumber');
const shownCards = document.querySelector('.single-img-wrapper');


exploreBtn.addEventListener('click', () => {
        gsap.to(".circle", {padding: 1500, x: -5, y: -350, duration: 1});
        gsap.to(".content", {y: -800, opacity: 0.3, duration: 0.1,});
        gsap.to(".main-img", {y: 300, opacity: 0, duration: 0.5,});
        gsap.fromTo(".content-card", {y: 200, opacity: 0}, {display: 'block', duration: 2, y: 0, opacity: 1});
    gsap.fromTo(".top-img",  {y: 0, opacity: 1, },{y: -100, opacity: 0, duration: 1});
        gsap.fromTo(".single-img-wrapper", {y: 600, x: 600, transform: "skew(15deg, -15deg)", opacity: 0},
            {duration: 0.5, display: "flex", y: 0, x: 0, transform: "skew(0deg, -0deg)", opacity: 1, onComplete: fromHomePage});
    }
);
const cards = [{title: "Cat Witch",
    img: "img/card1.png",
    description: 'It was popularised in the 1960s with the release of Letroset sheets ' +
        'containing Lorem ipsum passages,and more recently with desktop publishing software',
    number: "01",
    backColor: " #94ceed"},
    {title: "Kid Scull",
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

function backgroundAnimation(param) {
    document.querySelector('.circle').style.backgroundColor = param.backColor;
    gsap.fromTo(".circle", {y: 500, x: -500, opacity: 0, padding: 30},
        {y: 100, x: 300, opacity: 1, padding: 1500, duration: 1.2});
}

function putCardsInfo(param) {

    gsap.fromTo(".content-card", {opacity: 0}, {
        opacity: 1, duration: 10, function() {
            cardTitle.innerHTML = param.title;
            cardDesc.innerHTML = param.description;
            cardNumber.innerHTML = param.number;
            backgroundAnimation(param)
        }
    });
}


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

carouselBtn.addEventListener('click', () => {
    let currentCardSrc = shownCards.children[0].getAttribute("src");

    if (currentCardSrc === cards[cards.length - 1].img) {
        toHomePage();
    } else {
        gsap.fromTo(cardNext, {y: 600, x: 600, opacity: 0},
            {duration: 1, display: "flex", y: 0, x: 0, opacity: 1});
        gsap.fromTo(card, {y: 180, x: 550, opacity: 1,},
            {duration: 1, display: "flex", y: 0, x: 0, opacity: 1, onComplete: changeCards(cards)
            });
    }
});

const elementsFromHomePage = [{className: ".main-img", value: "none"}, {className: ".content", value: "none"}, {className: ".top-img", value: "none"}];

function fromHomePage() {

    document.querySelector('.circle').classList.remove("circle-homepage");
    document.querySelector('.circle').classList.add("circle-position-with-card");

    backgroundColor('.wrapper', '#94ceed');

    displayShow(elementsFromHomePage);
}


const elementsToHomePage = [{className: ".content-card", value: "none"}, {className: ".single-img-wrapper", value: "none"},
    {className: ".main-img", value: "block"}, {className: ".content", value: "block"},{className: ".top-img", value: "block"}];


function toHomePage() {
    document.querySelector('.circle').classList.remove("circle-position-with-card");
    document.querySelector('.circle').classList.add("circle-homepage");

    gsap.fromTo(".circle", {y: -400, x: 200, padding: 1500},
        {x: 0, y: 0, padding: "30vh", duration: 1}
    );

    gsap.to(".main-img", {y: 0, opacity: 1, duration: 1.5,});
    gsap.to(".content", {y: 0, opacity: 1, duration: 1,});
    gsap.fromTo(".top-img",  {y: -100, opacity: 0, },{y: 0, opacity: 1, duration: 2,});

    card.src = cards[0].img;
    cardNext.src = cards[1].img;

    cardTitle.innerHTML = cards[0].title;
    cardDesc.innerHTML = cards[0].description;
    cardNumber.innerHTML = cards[0].number;

    backgroundColor('.wrapper', '#161010');
    backgroundColor('.circle', '#94ceed');
    displayShow(elementsToHomePage)
}


function backgroundColor(elClass, color) {
    document.querySelector(elClass).style.backgroundColor = color;
}

function displayShow(elements) {
    elements.forEach(element => document.querySelector(element.className).style.display = element.value);
}