function escapeHTML(str) {
  return str.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

const newSpeakerInput = document.getElementById('newSpeakerName');
const newSpeechSelect = document.getElementById('newSpeechType');
const addSpeakerBtn = document.getElementById('addSpeakerBtn');
const deleteSpeakerBtn = document.getElementById('deleteSpeakerBtn');
const speakerList = document.getElementById('speakerList');
const pickBtn = document.getElementById('pickBtn');
const currentSpeakerInput = document.getElementById('speakerName');
const startBtn = document.getElementById('startBtn');

newSpeakerInput.addEventListener('input', () => {
  addSpeakerBtn.disabled = !newSpeakerInput.value.trim();
});

currentSpeakerInput.addEventListener('input', () => {
    const hasSpeaker = currentSpeakerInput.value.trim() !== '';
    startBtn.disabled = !hasSpeaker;
    newFillerInput.disabled = !hasSpeaker;
    addBtn.disabled = !hasSpeaker;

});

let speakerQueue = [];
let timer;
let startTime = null;
let elapsedBeforePause = 0;
let isPaused = false;
let minShown = false;
let midShown = false;
const counterSection = document.getElementById('counterSection');

function toggleStartPause() {
  const btn = document.getElementById('startBtn');
  const nameInput = document.getElementById('speakerName');
  const speechSelect = document.getElementById('speechType');

  if (!nameInput.value.trim()) {
    alert('Please enter a speaker name.');
    return;
  }

  if (btn.textContent === 'Start' || btn.textContent === 'Resume') {
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
      document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const times = speechSelect.value.split(',');
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
    btn.textContent = 'Pause';
    btn.className = 'btn-pause';
    document.getElementById('stopBtn').disabled = false;
    nameInput.disabled = true;
    speechSelect.disabled = true;
    document.getElementById('pickBtn').disabled = true;
  } else if (btn.textContent === 'Pause') {
    clearInterval(timer);
    elapsedBeforePause = Date.now() - startTime;
    isPaused = true;
    btn.textContent = 'Resume';
    btn.className = 'btn-start';
  }
}

function stopTimer() {
  clearInterval(timer);
  const elapsed = isPaused ? elapsedBeforePause : (Date.now() - startTime);
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const speakerName = document.getElementById('speakerName').value.trim();
  const speechLabel = document.getElementById('speechType').selectedOptions[0].text.split(' (')[0];
  if (speakerName) {
    const logEntry = `${speakerName} (${speechLabel}): ${formattedTime}`;
    const logBox = document.getElementById('logBox');
    logBox.value += (logBox.value ? '\n' : '') + logEntry;
  }

  document.getElementById('timer').textContent = '00:00';
  const startBtn = document.getElementById('startBtn');
  startBtn.textContent = 'Start';
  startBtn.className = 'btn-start'
  startBtn.disabled = true;
  document.getElementById('stopBtn').disabled = true;
  document.getElementById('speakerName').disabled = false;
  document.getElementById('speechType').disabled = false;
  document.getElementById('pickBtn').disabled = speakerQueue.length === 0;
  document.getElementById('speakerName').value = '';
  startTime = null;
  elapsedBeforePause = 0;
  document.body.style.backgroundColor = '#f4f4f4';
  isPaused = false;
}

function resetLogs() {
  document.getElementById('logBox').value = '';
  document.getElementById('speakerName').value = '';
}

function exportLogs() {
  const content = document.getElementById('logBox').value;
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
  document.getElementById('speakerName').value = speaker.name;
  document.getElementById('speechType').value = speaker.value;
  renderSpeakerList();
  document.getElementById('startBtn').disabled = !speaker.name.trim();
  document.getElementById('addBtn').disabled = false;
}