document.addEventListener("DOMContentLoaded", function () {
    // Card flip functionality
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("flipped");
        });
    });

    // PBN file upload and conversion
    const convertButton = document.getElementById("convertButton");
    const pbnFileInput = document.getElementById("pbnFile");

    document.getElementById('convertButton').addEventListener('click', function(event) {

        event.preventDefault(); // ป้องกันไม่ให้ฟอร์มทำงานปกติ (ไม่รีเฟรชหน้า)

        let formData = new FormData();
        formData.append('file', document.getElementById('pbnFile').files[0]);

        // ส่งคำขอไปยัง Flask ด้วย Fetch API
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // แสดงข้อมูลที่ได้จากการประมวลผล
                console.log('Boards:', data.boards);
                console.log('All Card Tracking:', data.all_card_tracking);

                // เปลี่ยนหน้าไปที่ URL ที่ได้รับจาก redirect_url
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