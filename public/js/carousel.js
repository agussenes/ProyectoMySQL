document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const items = document.querySelectorAll(".carouselItem");
    const prevButton = document.querySelector(".carouselButton.left");
    const nextButton = document.querySelector(".carouselButton.right");

    let activeIndex = 0;

    function updateCarousel() {
        items.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        const offset = -activeIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    nextButton.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % items.length;
        updateCarousel();
    });

    updateCarousel();
});
