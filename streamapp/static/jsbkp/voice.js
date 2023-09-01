function voice(message){
    let speech = new SpeechSynthesisUtterance();
        speech.lang = "en";
        voices = window.speechSynthesis.getVoices();
        speech.text = message;
        speech.voice = voices[0];
        window.speechSynthesis.speak(speech);
}
