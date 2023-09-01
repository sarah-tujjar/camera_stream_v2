function playaudio(status) {
    console.log(status)
    $.ajax({
        type: 'GET',
        url: '/play_audio/',
        data: { status: status },
        success: function(response) {
            console.log('Audio played successfully');
        },
        error: function() {
            console.log('Error playing audio');
        }
    });
}