    // JavaScript source code
window.addEventListener('load', function () {

    const body = document.querySelector('body');
    const containers = body.querySelectorAll('.carousel-container');
    let slides_grp = [],tracks_grp = [], prevBtns = [], nextBtns = [], currentIndexs = [] ,totalSlides = [];
    //第一層
    containers.forEach((container) => {
        tracks_grp.push(container.querySelector('.carousel-track'));
        prevBtns.push(container.querySelector('.prev-btn'));
        nextBtns.push(container.querySelector('.next-btn'));
    });
    //第二層
    tracks_grp.forEach((tracks) => {
        slides_grp.push(Array.from(tracks.querySelectorAll('.cover')));
    });
    slides_grp.forEach((slides) => {
        totalSlides.push(slides.length);
        currentIndexs.push(0);
    });

    function updateCarousel(target) {
        // 切換 active 圖片
        slides_grp[target].forEach((slide, index) => {
            slide.classList.toggle('active', index == currentIndexs[target]);
        });
    }

    function goToSlide(index, target) {
        currentIndexs[target] = (index + totalSlides[target]) % totalSlides[target];
        updateCarousel(target);
    }

    prevBtns.forEach((prevBtn, i) => {
        prevBtn.addEventListener('click', () => goToSlide((currentIndexs[i] - 1), i));
    });
    nextBtns.forEach((nextBtn, i) => {
        nextBtn.addEventListener('click', () => goToSlide((currentIndexs[i] + 1), i));
    });
    containers.forEach((container, index) => {
        updateCarousel(index);
    });
    console.log(`Carousel Load Complete!`);
});