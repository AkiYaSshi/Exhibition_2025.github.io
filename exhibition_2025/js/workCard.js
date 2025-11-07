
let videos = [], games = [], medias = [];
const body = document.querySelector('body');

createBase("aa");
createBase("md");
createBase("nma");

const videoContainer = document.getElementById("aa-container");
const gameContainer = document.getElementById("md-container");
const mediaContainer = document.getElementById("nma-container");

fetch('https://raw.githubusercontent.com/AkiYaSshi/Exhibition_2025.github.io/master/exhibition_2025/works.json')
    .then(response => {
        if (!response.ok) {

        }
        return response.json();
    })
    .then(data => {
        videos = data.videos;
        games = data.games;
        medias = data.medias;
        createWorks(videos, videoContainer, "aa");
        createWorks(games, gameContainer, "md");
        createWorks(medias, mediaContainer, "nma");
    })
    .catch (error => {
        console.error("載入 JSON 失敗：", error);
        videoContainer.innerHTML = "<p style='color:grey;'>無法載入作品資料</br>請聯繫網站程式</p>";
        gameContainer.innerHTML = "<p style='color:grey;'>無法載入作品資料</br>請聯繫網站程式</p>";
        mediaContainer.innerHTML = "<p style='color:grey;'>無法載入作品資料</br>請聯繫網站程式</p>";
    });
function createBase(sec) {
    const section = document.createElement("div");
    section.className = "work-section";
    section.id = sec;
    section.innerHTML = `
                            <div class="frame">
                                <div class="title">
                                    <a href="#aa">
                                        <span class="title-card">
                                            <img class="background" src="img/04/4-2-01.png" />
                                        </span>
                                    </a>
                                    <a href="#md">
                                        <span class="title-card">
                                            <img class="background" src="img/04/4-2-02.png" />
                                        </span>
                                    </a>
                                    <a href="#nma">
                                        <span class="title-card">
                                            <img class="background" src="img/04/4-2-03.png" />
                                        </span>
                                    </a>
                                </div>
                                <div class="works-container" id="${sec}-container">
                                </div>
                            </div>
                            <div class="noise-texture"></div>
                        `;
    body.appendChild(section);
}

function createWorks(type, container, name) {
    type.forEach((work, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                            <a href="#${name}-${index}" class="description" title="作品資訊">
                                <h2>${work.title}</h2>
                                <img src="${work.cover}" frameborder="0" scrolling="no" allowfullscreen=allowfullscreen />
                            </a>
                        `;

        container.appendChild(card);
        
    });
    type.forEach((work, index) => {
        createDescription(type, name, index, work);
    });

}

function createDescription(type, name, index, work) {
    const style = document.createElement("style");
    const section = document.createElement("div");

    const pre = (index - 1) >= 0 ? index - 1 : type.length - 1;
    const next = (index + 1) < type.length ? index + 1 : 0;

    style.textContent = `
        #${name}-${index}{ 
            display: none; 
        }
        #${name}-${index}:target { 
            display: block; 
        }
    `;
    const cover = work.cover;
    console.log(cover);
    let covers = "";

    cover.forEach((img, index) => {
        covers += `<img class="cover${index = 0 ? " active" : ""}" src="${img}" alt="cover ${index + 1}" />`;
    });

    section.className = "work-section";
    section.id = `${name}-${index}`;
    section.innerHTML = `
                            <div class="frame">
                                <div class="work-page">
                                    <div class="work-slider">
                                        <div class="work-cover">
                                            <div class="carousel-container">
                                                <div class="carousel-track">
                                                    ${covers}
                                                </div>
                                                <button class="carousel-btn prev-btn">
                                                    <span class="material-symbols-outlined">
                                                        chevron_left
                                                    </span></button>
                                                <button class="carousel-btn next-btn">
                                                    <span class="material-symbols-outlined">
                                                        chevron_right
                                                    </span></button>
                                                </button>
        
                                                <!-- 圓點指示器（可選） -->
                                                <div class="carousel-dots"></div>
                                            </div>                                            
                                            <img class="background" src="img/04/4-3-07.png" />
                                            <span class="work-cover-deco">
                                                <img class="background" src="img/04/4-3-08.png" />
                                            </span>
                                        </div>
                                        <div class="work-navi-grp">
                                            <a href="#${name}-${pre}">
                                                <span class="arrow">
                                                    <img class="background" src="img/04/4-3-01.png" />
                                                </span>
                                                上一個作品
                                            </a>
                                            <span class="navi-bar">
                                                <img class="background" src="img/04/4-3-04.png" />
                                            </span>
                                            <a href="#${name}-${next}">
                                                下一個作品
                                                <span class="arrow">
                                                    <img class="background" src="img/04/4-3-02.png" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="work-intro-grp">
                                        <div class="work-intro-sticker-grp">
                                            <div class="work-intro-sticker">
                                                <img class="background" src="img/04/4-3-03.png" />
                                                <div class="work-intro-content">
                                                    <div class="work-intro-title">
                                                        <h3>${work.title}</h3>
                                                        <h4>${work.author}</h4>
                                                    </div>
                                                    <p>${work.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sticker-deco">
                                            <span class="top-sticker">
                                                <img class="background" src="img/04/4-3-05.png" />
                                            </span>
                                            <span class="bottom-sticker">
                                                <img class="background" src="img/04/4-3-6.png" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="noise-texture"></div>
                        `;
    section.appendChild(style);
    body.appendChild(section);

    console.log(`${window.location.hash} == #${section.id}`);
    if (window.location.hash == `#${section.id}`) {
        console.log(`${window.location.href} to #${name}`);
        window.location.href = `#${section.id}`;
    }
}