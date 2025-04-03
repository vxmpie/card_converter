document.addEventListener("DOMContentLoaded", function() {
    const cardFallContainer = document.getElementById("cardFallContainer");
    const cardIconsContainer = document.getElementById("cardIconsContainer");

    const icons = ["♠️", "♥️", "♦️", "♣️"];
    for (let i = 0; i < 50; i++) {
        let icon = document.createElement("div");
        icon.classList.add("card-icon");
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = Math.random() * 100 + "vw";
        icon.style.top = Math.random() * 100 + "vh";
        icon.style.animationDelay = Math.random() * 2.5 + "s";
        cardIconsContainer.appendChild(icon);
    }

    document.querySelectorAll(".button-group button").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();

            const targetPage = this.getAttribute("data-target");

            if (this.id === "enterWithMusic") {
                sessionStorage.setItem("playMusic", "true");
                sessionStorage.setItem("isMusicPlaying", "true");
            } else {
                sessionStorage.setItem("isMusicPlaying", "false");
            }

            const cardWidth = 10;
            const cardHeight = 15;
            const cardsPerRow = Math.ceil(100 / cardWidth);
            const rows = Math.ceil(130 / cardHeight);
            const totalCards = cardsPerRow * rows;

            cardFallContainer.innerHTML = '';

            for (let i = 0; i < totalCards; i++) {
                let card = document.createElement("div");
                card.classList.add("falling-card");

                let row = Math.floor(i / cardsPerRow);
                let col = i % cardsPerRow;
                let startLeft = col * cardWidth + "vw";
                let startTop = 100 - (row * cardHeight) + "vh";

                card.style.setProperty("--start-left", startLeft);
                card.style.setProperty("--start-top", startTop);
                card.style.setProperty("--end-top", startTop);
                let rotateAngle = Math.random() * 40 - 20 + "deg";
                card.style.setProperty("--rotate-angle", rotateAngle);

                cardFallContainer.appendChild(card);

                setTimeout(() => {
                    card.classList.add("active");
                }, row * 200);
            }

            setTimeout(() => {
                document.body.classList.add("blur-out");
                console.log("Blur out started");

                setTimeout(() => {
                    window.location.href = targetPage;
                }, 1000); 
            }, rows * 250 + 2000);
        });
    });
});