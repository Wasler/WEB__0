$(document).ready(function() {
    alertify.set('notifier', 'position', 'bottom-right');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        $('#clock').text(`${hours}:${minutes}:${seconds}`);
    }

    updateClock();
    setInterval(updateClock, 1000);

    let recordCount = 0;

    $('#record-btn').on('click', function() {
        const currentTime = $('#clock').text();
        recordCount++;

        const newRecord = $(`<li>Запись №${recordCount}: ${currentTime}</li>`).hide();
        $('#records').prepend(newRecord);
        newRecord.fadeIn(300);

        alertify.success(`Запись №${recordCount} сделана в ${currentTime}`);
    });
});