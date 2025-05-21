function escapeHTML(str) {
  return str.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

const newSpeakerInput = document.getElementById('newSpeakerName');
const newSpeechSelect = document.getElementById('newSpeechType');
const addSpeakerBtn = document.getElementById('addSpeakerBtn');
const deleteSpeakerBtn = document.getElementById('deleteSpeakerBtn');
const speakerList = document.getElementById('speakerList');
const pickBtn = document.getElementById('pickBtn');
const nameInput = document.getElementById('speakerName');
const speechSelection = document.getElementById('speechType');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn')
const timerDisplay = document.getElementById('timer');
const logBox = document.getElementById('logBox');

newSpeakerInput.addEventListener('input', () => {
  addSpeakerBtn.disabled = !newSpeakerInput.value.trim();
});

nameInput.addEventListener('input', () => {
    const emptyNameInput = nameInput.value.trim() === '';
    startBtn.disabled = emptyNameInput;
});

let speakerQueue = [];
let timer;
let startTime = null;
let elapsedBeforePause = 0;
let isPaused = false;
let minShown = false;
let midShown = false;


function toggleStartPause() {

  if (!nameInput.value.trim()) {
    alert('Please enter a speaker name.');
    return;
  }

  if (startBtn.textContent === 'Start' || startBtn.textContent === 'Resume') {
    minShown = false;
    midShown = false;
    if (!isPaused) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - elapsedBeforePause;
    }
    timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const times = speechSelection.value.split(',');
      const minTime = parseFloat(times[0]) * 60000;
      const midTime = parseFloat(times[1]) * 60000;
      const maxTime = parseFloat(times[2]) * 60000;

      if (elapsed >= maxTime) {
        document.body.style.backgroundColor = '#ff4d4d';
        midShown = true;
        minShown = true;
      } else if (elapsed >= midTime && !midShown) {
        midShown = true;
        document.body.style.backgroundColor = '#ffff66';
        const currentMidTime = Date.now();
        setTimeout(() => {
          if (!isPaused && Date.now() - currentMidTime >= 5000 && document.body.style.backgroundColor === '#ffff66') {
            document.body.style.backgroundColor = '#f4f4f4';
          }
        }, 5000);
      } else if (elapsed >= minTime && !minShown) {
        minShown = true;
        document.body.style.backgroundColor = '#66ff66';
        const currentMinTime = Date.now();
        setTimeout(() => {
          if (!isPaused && Date.now() - currentMinTime >= 5000 && document.body.style.backgroundColor === '#66ff66') {
            document.body.style.backgroundColor = '#f4f4f4';
          }
        }, 5000);
      }
    }, 1000);

    isPaused = false;
    startBtn.textContent = 'Pause';
    startBtn.className = 'btn-pause';
    stopBtn.disabled = false;
    nameInput.disabled = true;
    speechSelection.disabled = true;
    pickBtn.disabled = true;
  } else if (startBtn.textContent === 'Pause') {
    clearInterval(timer);
    elapsedBeforePause = Date.now() - startTime;
    isPaused = true;
    startBtn.textContent = 'Resume';
    startBtn.className = 'btn-start';
  }
}

function stopTimer() {
  clearInterval(timer);
  const elapsed = isPaused ? elapsedBeforePause : (Date.now() - startTime);
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const speakerName = nameInput.value.trim();
  const speechLabel = speechSelection.selectedOptions[0].text.split(' (')[0];
  const times = speechSelection.value.split(',');
  const minTime = parseFloat(times[0]) * 60000;
  const maxTime = parseFloat(times[2]) * 60000;

  let withinTime = "Yes";

  if (elapsed > maxTime || elapsed < minTime) {
    withinTime = "No";
  }
  if (speakerName) {
    const logEntry = `${speakerName} (${speechLabel}) | ${formattedTime} | Within Time: ${withinTime}`;
    logBox.value += (logBox.value ? '\n' : '') + logEntry;
  }

  timerDisplay.textContent = '00:00';
  startBtn.textContent = 'Start';
  startBtn.className = 'btn-start'
  startBtn.disabled = true;
  stopBtn.disabled = true;
  nameInput.disabled = false;
  speechSelection.disabled = false;
  pickBtn.disabled = speakerQueue.length === 0;
  nameInput.value = '';
  startTime = null;
  elapsedBeforePause = 0;
  document.body.style.backgroundColor = '#f4f4f4';
  isPaused = false;
}

function resetLogs() {
  logBox.value = '';
  nameInput.value = '';
}

function exportLogs() {
  const content = logBox.value;
  if (!content.trim()) {
    alert("No logs to export.");
    return;
  }
  const filename = "timekeeper_log.txt";
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const popup = window.open('', '_blank');
    if (popup) {
      popup.document.write('<pre>' + escapeHTML(content) + '</pre>');
      popup.document.close();
    } else {
      alert("Popup blocked. Please allow popups for this site.");
    }
  } else {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

function renderSpeakerList() {
  speakerList.innerHTML = '';
  speakerQueue.forEach((speaker) => {
    const li = document.createElement('li');
    li.textContent = `${speaker.name} (${speaker.label})`;
    speakerList.appendChild(li);
  });
  deleteSpeakerBtn.disabled = speakerQueue.length === 0;
  pickBtn.disabled = speakerQueue.length === 0;
}

function addSpeaker() {
  const name = newSpeakerInput.value.trim();
  const value = newSpeechSelect.value;
  const label = newSpeechSelect.selectedOptions[0].text.split(' (')[0];
  if (name) {
    speakerQueue.push({ name, value, label });
    newSpeakerInput.value = '';
    addSpeakerBtn.disabled = true;
    renderSpeakerList();
  }
}

function deleteSpeaker() {
  speakerQueue.pop();
  renderSpeakerList();
}

function pickFromList() {
  if (speakerQueue.length === 0) return;
  const speaker = speakerQueue.shift();
  nameInput.value = speaker.name;
  speechSelection.value = speaker.value;
  renderSpeakerList();
  startBtn.disabled = !speaker.name.trim();
}