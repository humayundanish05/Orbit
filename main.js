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
  speechSynthesis.speak(utter);

  // Show response as text on the screen
  const box = document.getElementById("responseBox");
  if (box) box.textContent = "🧠 " + text;
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
    speak("Hello! I'm Orbit. How can I assist you today?");
  } else if (lower.includes("write poem")) {
    speak("Here's a short poem: Roses are red, violets are blue, Orbit is here, just for you.");
  } else if (lower.includes("write funny poem")) {
    speak("Here's a funny one: My code went dancing on the screen, now it's the sassiest AI you've ever seen.");
  } else if (lower.includes("draw tree")) {
    drawTree();
    speak("Here's your tree.");
  } else if (lower.includes("draw sun")) {
    drawSun();
    speak("Here's your bright sun.");
  } else if (lower.includes("sing a song")) {
    speak("La la la... I can sing, though not as well as a nightingale.");
  } else if (lower.includes("tell me a joke")) {
    speak("Why don't robots ever panic? Because they always keep their circuits together.");
  } else if (lower.includes("good night")) {
    document.body.style.background = "#000022";
    speak("Good night! May your dreams be bug-free.");
  } else if (lower.includes("who are you")) {
    speak("I am Orbit, your personal web assistant created by Humayun Danish.");
  } else if (lower.includes("math")) {
    speak("Sure, try saying something like: what is 5 plus 3?");
  } else if (lower.match(/what is \d+ [+\-*/] \d+/)) {
    try {
      const result = eval(lower.split("what is ")[1]);
      speak(`The answer is ${result}`);
    } catch {
      speak("I couldn't calculate that.");
    }
  } else if (lower.includes("fact")) {
    speak("Did you know? Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs that's still edible.");
  } else if (lower.includes("compliment me")) {
    speak("You're brilliant, creative, and capable of anything you set your mind to.");
  } else {
    speak("Sorry, I didn't understand that. Try saying something like 'write poem' or 'draw sun'.");
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
