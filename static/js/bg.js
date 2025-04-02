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
});