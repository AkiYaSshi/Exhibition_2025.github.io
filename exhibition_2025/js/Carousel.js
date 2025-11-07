    // JavaScript source code
window.addEventListener('load', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('.cover'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // 創建圓點
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i == 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        // 切換 active 圖片
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i == currentIndex);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i == currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // 自動播放（可選）
    // let autoPlay = setInterval(() => goToSlide(currentIndex + 1), 4000);
    // document.querySelector('.carousel-container').addEventListener('mouseenter', () => clearInterval(autoPlay));
    // document.querySelector('.carousel-container').addEventListener('mouseleave', () => autoPlay = setInterval(() => goToSlide(currentIndex + 1), 4000));

    // 初始化
    updateCarousel();
});