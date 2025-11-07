window.location.hash = (window.location.hash == "") ? '#top' : window.location.hash;

const sections = ['#top', '#about', '#info', '#works', '#merch', '#traffic', '#links'];
let currentIndex = 0;
let isScrolling = false;

// 滾動到指定 section
function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;

    window.location.href = sections[index];

    // 更新 URL hash（可選）
    history.pushState(null, null, sections[index]);

    currentIndex = index;

    // 避免連續滾動
    setTimeout(() => { isScrolling = false; }, 300);
}

// 監聽滾輪
window.addEventListener('wheel', (e) => {
    const currentHash = window.location.hash || '#top'; // 預設為 #top

    // 只有當前 hash 在 sections 陣列中，才允許滾動
    if (!sections.includes(currentHash)) {
        return; // 不在陣列 → 直接 return，不執行滾動
    }

    if (e.deltaY > 0) {
        scrollToSection(currentIndex + 1);
    } else if (e.deltaY < 0) {
        scrollToSection(currentIndex - 1);
    }
}, { passive: false });

// 手機觸控支援（可選）
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});
window.addEventListener('touchend', (e) => {
    const currentHash = window.location.hash || '#top';

    if (!sections.includes(currentHash)) {
        return; // 不在陣列 → 直接 return，不執行滾動
    }
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 20) {  // 滑動距離夠大才觸發
        if (diff > 0) scrollToSection(currentIndex + 1);
        else scrollToSection(currentIndex - 1);
    }
});

window.addEventListener('load', () => {
    const hash = window.location.hash || '#top';
    const index = sections.indexOf(hash);
    if (index !== -1) {
        currentIndex = index;
        scrollToSection(index); // 確保畫面在正確位置
    }
});
sections.forEach((sec, index) => {
    document.querySelector("a[href='" + sec + "']").addEventListener('click', () => {
        currentIndex = sections.indexOf(sec);
    });
});

