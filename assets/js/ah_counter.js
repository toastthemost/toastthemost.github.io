function escapeHTML(str) {
  return str.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
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
  const filename = "ah_counter_logs.txt";
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

let speakerQueue = [];
const newSpeakerInput = document.getElementById('newSpeakerName');
const newSpeechSelect = document.getElementById('newSpeechType');
const addSpeakerBtn = document.getElementById('addSpeakerBtn');
const deleteSpeakerBtn = document.getElementById('deleteSpeakerBtn');
const speakerList = document.getElementById('speakerList');
const pickBtn = document.getElementById('pickBtn');
const currentSpeakerInput = document.getElementById('speakerName');
const addBtn = document.getElementById('addBtn');
const newFillerInput = document.getElementById('newFiller');
const recordLogs = document.getElementById('recordLogs');

newSpeakerInput.addEventListener('input', () => {
  addSpeakerBtn.disabled = !newSpeakerInput.value.trim();
});

newFillerInput.addEventListener('input', () => {
    addBtn.disabled = !newFillerInput.value.trim();
});

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

function incrementCounter(counterId) {
    const counterElement = document.getElementById(counterId);
    if (counterElement) {
        let count = parseInt(counterElement.textContent, 10) || 0;
        counterElement.textContent = count + 1;
    }
}

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ✅ Reusable table insert logic
function addWordToFillerTable(fillerName) {
    const tableBody = document.querySelector('#fillerTable tbody');
    const existingRows = tableBody.querySelectorAll('tr');
    for (let row of existingRows) {
        const existingName = row.cells[0].textContent.trim();
        if (existingName.toLowerCase() === fillerName.toLowerCase()) {
            const countCell = row.cells[1];
            countCell.textContent = parseInt(countCell.textContent) + 1;
            return;
        }
    }

    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = capitalizeFirstLetter(fillerName);
    const countCell = document.createElement('td');
    countCell.textContent = 1;
    const actionCell = document.createElement('td');
    const incrementBtn = document.createElement('button');
    incrementBtn.textContent = '+1';
    incrementBtn.className = 'increment-btn';
    incrementBtn.onclick = function() {
        countCell.textContent = parseInt(countCell.textContent) + 1;
    };
    actionCell.appendChild(incrementBtn);
    row.appendChild(nameCell);
    row.appendChild(countCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
    document.getElementById('recordLogs').disabled = false;
}

// ✅ Keeps your original manual Add logic intact
function addToFillerTable() {
    const fillerInput = document.getElementById('newFiller');
    const fillerName = fillerInput.value.trim();;
    if (!fillerName) return;
    addWordToFillerTable(fillerName);
    fillerInput.value = '';
}

function resetFillerTable() {
    const tableBody = document.querySelector('#fillerTable tbody');
    tableBody.innerHTML = '';   // ✅ Clears all rows
    document.getElementById('recordLogs').disabled = true;
}


function recordSpeechLogs() {
    const speakerName = document.getElementById('speakerName').value.trim();
    const speechTypeSelect = document.getElementById('speechType');
    const speechType = speechTypeSelect.selectedOptions[0].text.split(' (')[0];

    if (!speakerName) {
        alert("Please enter Speaker Name before recording speech log.");
        return;
    }

    const tableBody = document.querySelector('#fillerTable tbody');
    const rows = tableBody.querySelectorAll('tr');

    if (rows.length === 0) {
        alert("Filler Table is empty.");
        return;
    }

    // Create single-line summary
    let logText = `${speakerName} (${speechType}) | `;
    rows.forEach(row => {
        const filler = row.cells[0].textContent.trim();
        const count = row.cells[1].textContent.trim();
        logText += `${filler}: ${count}  `;   // space between each entry
    });

    const logBox = document.getElementById('logBox');
    logBox.value += (logBox.value ? '\n' : '') + logText.trim();
    resetFillerTable()
    document.getElementById('speakerName').value = '';
    document.getElementById('addBtn').disabled = true;
    document.getElementById('recordLogs').disabled = true;
}

// ✅ Enter key support for New Filler input
document.addEventListener('DOMContentLoaded', function() {
    const fillerInput = document.getElementById('newFiller');
    const addButton = document.getElementById('addBtn');
    fillerInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!addButton.disabled) {
                addButton.click();
            }
        }
    });
});