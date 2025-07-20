const startBtn = document.getElementById("startBtn");
const transcriptEl = document.getElementById("transcript");
const canvas = document.getElementById("drawArea");
const ctx = canvas.getContext("2d");

// Voice setup
const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

// Voice response
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  synth.speak(utter);
}

// Drawing example
function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.fillRect(240, 200, 20, 100); // trunk
  ctx.beginPath();
  ctx.arc(250, 180, 60, 0, Math.PI * 2); // leaves
  ctx.fillStyle = "#060";
  ctx.fill();
}

// Command handler
function handleCommand(text) {
  const lower = text.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi")) {
    speak("Hello, I am Orbit. How can I help you?");
  } else if (lower.includes("write poem")) {
    speak("Here is a short poem for you. Roses are red, violets are blue, I am your Jarvis, always with you.");
  } else if (lower.includes("draw tree")) {
    drawTree();
    speak("Here is your tree.");
  } else if (lower.includes("sing a song")) {
    speak("La la la... I can sing, but only with synthetic voice.");
  } else if (lower.includes("سلام") || lower.includes("salam")) {
    speak("وعلیکم سلام. څنګه یی؟");
  } else if (lower.includes("weather")) {
    speak("I'm not connected to the internet yet, but I can help you in other ways.");
  } else {
    speak("Sorry, I didn't understand. Try another command.");
  }
}

// Start listening
startBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  transcriptEl.textContent = text;
  handleCommand(text);
};

recognition.onerror = (e) => {
  transcriptEl.textContent = "Error: " + e.error;
};
