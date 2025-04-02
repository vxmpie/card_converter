document.addEventListener("DOMContentLoaded", function () {
    const musicIcon = document.getElementById("music-icon");
    if (!musicIcon) {
        console.warn("⚠️ music-icon not found.");
        return;
    }

    // Initialize audio element
    const music = new Audio("{{ url_for('static', filename='music/Jazz.mp3') }}");
    music.loop = true;
    music.volume = 0.5;

    // State variables
    let isPlaying = false;
    let isRotating = false;
    let rotationAngle = parseFloat(sessionStorage.getItem("iconRotation")) || 0;
    let rotationLoop;

    // Set initial rotation angle from session storage
    musicIcon.style.transform = `rotate(${rotationAngle}deg)`;

    // Restore music state if it was playing before
    if (sessionStorage.getItem("isMusicPlaying") === "true") {
        const currentTime = sessionStorage.getItem("musicCurrentTime") || 0;
        music.currentTime = currentTime;
        music.play().then(() => {
            isPlaying = true;
            rotateIcon();
        }).catch(error => console.log("Error playing music:", error));
    }

    // Save music state before the window unloads
    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("musicCurrentTime", music.currentTime);
        sessionStorage.setItem("isMusicPlaying", isPlaying ? "true" : "false");
        sessionStorage.setItem("iconRotation", rotationAngle);
    });

    // Function to fade in music
    function fadeInMusic() {
        music.volume = 0;
        music.play().then(() => {
            let fadeAudio = setInterval(() => {
                if (music.volume < 0.5) {
                    music.volume += 0.05;
                } else {
                    clearInterval(fadeAudio);
                }
            }, 100);
        }).catch(error => console.log("Error playing music:", error));
    }

    // Function to fade out music
    function fadeOutMusic() {
        let fadeAudio = setInterval(() => {
            if (music.volume > 0.05) {
                music.volume -= 0.05;
            } else {
                music.pause();
                clearInterval(fadeAudio);
            }
        }, 100);
    }

    // Event listener for music icon click
    musicIcon.addEventListener("click", function () {
        if (!isPlaying) {
            fadeInMusic();
            isPlaying = true;
            sessionStorage.setItem("isMusicPlaying", "true");
            rotateIcon();
        } else {
            fadeOutMusic();
            isPlaying = false;
            sessionStorage.setItem("isMusicPlaying", "false");
            stopRotation();
        }
    });

    // Check if music should be playing on load
    if (sessionStorage.getItem("playMusic") === "true") {
        sessionStorage.removeItem("playMusic");
        rotateIcon();
    }

    // Function to rotate the music icon
    function rotateIcon() {
        if (isRotating) return;
        isRotating = true;

        function animate() {
            if (!isPlaying) {
                isRotating = false;
                return;
            }
            rotationAngle += 0.5;
            musicIcon.style.transform = `rotate(${rotationAngle}deg)`;
            sessionStorage.setItem("iconRotation", rotationAngle);
            rotationLoop = requestAnimationFrame(animate);
        }
        rotationLoop = requestAnimationFrame(animate);
    }

    // Function to stop rotating the music icon
    function stopRotation() {
        cancelAnimationFrame(rotationLoop);
        isRotating = false;
    }
});
