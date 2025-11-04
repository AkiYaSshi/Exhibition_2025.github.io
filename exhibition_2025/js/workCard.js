let videos = [], games = [], medias = [];
let nowContainer;

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
        createWorks(games, gameContainer, "mb");
        createWorks(medias, mediaContainer, "nma");
    })
    .catch (error => {
        console.error("載入 JSON 失敗：", error);
        title.textContent = "載入失敗";
        nowContainer.innerHTML = "<p style='color:grey;'>無法載入作品資料</br>請聯繫網站程式</p>";
    });
function createWorks(type, container, name) {
    type.forEach((work, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                            <a href="${name}-${index}" class="description" title="作品資訊">
                                <h2>${work.title}</h2>
                                <img src="${work.cover}" frameborder="0" scrolling="no" allowfullscreen=allowfullscreen />
                            </a>
                        `;

    });
    container.appendChild(card);
}
