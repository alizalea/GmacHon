$(document).ready(function () {
    console.error("gg");
    var media = $('#video')[0];
    $('#playVideo').click(function () {
        console.error("ff");
        if (!media.paused) {
            media.pause();
            this.innerText = "הפעל";
            media.currentTime = 0;
        } else {
            media.play();
            this.innerText = "עצור";
        }
    });
});