document.addEventListener("DOMContentLoaded", function () {
    const musicIcon = document.getElementById("music-icon");
    const musicControl = document.getElementById("music-control");
    if (!musicIcon || !musicControl) return;

    const musicUrl = musicControl.dataset.musicUrl || "music/Jazz.mp3";
    const music = new Audio(musicUrl);
    music.loop = true;
    music.volume = 0.5;

    let isPlaying = false;
    let rotationAngle = parseFloat(sessionStorage.getItem("iconRotation")) || 0;
    let rotationLoop;

    musicIcon.style.transform = `rotate(${rotationAngle}deg)`;

    if (sessionStorage.getItem("isMusicPlaying") === "true") {
        const currentTime = parseFloat(sessionStorage.getItem("musicCurrentTime")) || 0;
        music.currentTime = currentTime;
        music.play().then(() => {
            isPlaying = true;
            rotateIcon();
        }).catch(error => console.log("Error playing music:", error));
    }

    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("musicCurrentTime", music.currentTime);
        sessionStorage.setItem("isMusicPlaying", isPlaying ? "true" : "false");
        sessionStorage.setItem("iconRotation", rotationAngle);
    });

    function fadeInMusic() {
        music.volume = 0;
        music.play().then(() => {
            isPlaying = true;
            let fadeAudio = setInterval(() => {
                if (music.volume < 0.5) {
                    music.volume += 0.05;
                } else {
                    clearInterval(fadeAudio);
                }
            }, 100);
            rotateIcon();
        }).catch(error => console.log("Error playing music:", error));
    }

    function fadeOutMusic() {
        let fadeAudio = setInterval(() => {
            if (music.volume > 0.05) {
                music.volume -= 0.05;
            } else {
                music.pause();
                clearInterval(fadeAudio);
                isPlaying = false;
                stopRotation();
            }
        }, 100);
    }

    musicIcon.addEventListener("click", function () {
        if (!isPlaying) {
            fadeInMusic();
            sessionStorage.setItem("isMusicPlaying", "true");
        } else {
            fadeOutMusic();
            sessionStorage.setItem("isMusicPlaying", "false");
            stopRotation();
        }
    });

    if (sessionStorage.getItem("playMusic") === "true") {
        sessionStorage.removeItem("playMusic");
        fadeInMusic();
        sessionStorage.setItem("isMusicPlaying", "true");
    }

    function rotateIcon() {
        cancelAnimationFrame(rotationLoop);
        function animate() {
            if (!isPlaying) return;
            rotationAngle += 0.5;
            musicIcon.style.transform = `rotate(${rotationAngle}deg)`;
            sessionStorage.setItem("iconRotation", rotationAngle);
            rotationLoop = requestAnimationFrame(animate);
        }
        rotationLoop = requestAnimationFrame(animate);
    }

    function stopRotation() {
        cancelAnimationFrame(rotationLoop);
        musicIcon.style.transform = `rotate(${rotationAngle}deg)`;
    }
});