document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("flipped");
        });
    });

    const convertButton = document.getElementById("convertButton");
    const pbnFileInput = document.getElementById("pbnFile");

    document.getElementById('convertButton').addEventListener('click', function(event) {

        event.preventDefault();

        let formData = new FormData();
        formData.append('file', document.getElementById('pbnFile').files[0]);

        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Boards:', data.boards);
                console.log('All Card Tracking:', data.all_card_tracking);

                window.location.href = data.redirect_url;
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});