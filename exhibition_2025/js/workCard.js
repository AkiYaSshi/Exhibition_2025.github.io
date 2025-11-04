
let videos = [], games = [], medias = [];
let nowContainer;
const body = document.querySelector('body');

createBase("aa");
createBase("md");
createBase("nma");

const videoContainer = document.getElementById("aa-container");
const gameContainer = document.getElementById("md-container");
const mediaContainer = document.getElementById("nma-container");

nowContainer = videoContainer;
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
        nowContainer.innerHTML = "<p style='color:grey;'>無法載入作品資料</br>請聯繫網站程式</p>";
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
        createDescription(name + "-" + index);
    });
}

function createDescription(_id) {
    const style = document.createElement("style");
    const section = document.createElement("div");
    style.textContent = `
        #${_id}{ 
            display: none; 
        }
        #${_id}:target { 
            display: block; 
        }
    `;

    section.className = "work-section";
    section.id = _id;
    section.innerHTML = `
                            <div class="frame">
                            </div>
                            <div class="noise-texture"></div>
                        `;
    section.appendChild(style);
    body.appendChild(section);

}