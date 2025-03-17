// Your script here.
// Assign message text and settings
msg.text = document.querySelector('[name="text"]').value;

// Function to populate available voices
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set voice for the utterance
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

// Restart speaking
function toggle(startOver = true) {
  speechSynthesis.cancel(); // Stop any current speech
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Update message settings dynamically
function setOption() {
  msg[this.name] = this.value;
}

// Listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
