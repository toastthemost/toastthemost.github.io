---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---

<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="main-content">
      <label for="speechType" style="text-align: left; font-weight: bold; margin-top: 30px;">Speaker's Details</label>
      <div class="note">Enter speaker name and speech type manually or insert from the list</div>
      <div class="controls">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <button onclick="pickFromList()" id="pickBtn" disabled>Insert Name from List</button>
          <div style="text-align: center; font-weight: bold; margin-top: 10px;">OR</div>
          <div class="row-group">
            <select id="speechType" style="flex: 1;">
                <option value="4,5,6">Ice Breaker (4-6 min)</option>
                <option value="5,6,7">Other Speech (5-7 min)</option>
                <option value="1,1.5,2">Table Topic (1-2 min)</option>
                <option value="2,2.5,3">Evaluator (2-3 min)</option>
            </select>
            <input type="text" id="speakerName" placeholder="Enter speaker name" style="flex: 1"/>
          </div>
        </div>
        <div style="text-align: left; font-weight: bold;margin-top: 30px; margin-bottom: 10px;">Current Speech</div>
        <div class="note">The timer for selected current speaker will appear here</div>
        <div class="playground">
          <div id="timer">00:00</div>
          <div class="row-group">
            <button id="startBtn" class="btn-start" onclick="toggleStartPause()" disabled>Start</button>
            <button id="stopBtn" class="btn-stop" onclick="stopTimer()" disabled>Stop</button>
          </div>
        </div>
      </div>
      <div class="log-section" style="margin-top: 30px;">
        <label for="logBox" style="text-align: left; font-weight: bold; margin-top: 30px;">Meeting Logs</label>
        <div class="note">Records every speaker's timings after every speech</div>
        <textarea id="logBox" rows="6"></textarea>
        <div class="row-group">
          <button onclick="exportLogs()">Export Logs</button>
          <button onclick="resetLogs()" class="danger-button">Reset Logs</button>
        </div>
      </div>
    </div>
    <div class="speakerSection">
      <h4>Speakers' List</h4>
      <div class="note">Use this section to add speakers in advance.</div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <select id="newSpeechType" style="flex: 1; min-width: 200px;">
          <option value="4,5,6">Ice Breaker (4-6 min)</option>
          <option value="5,6,7">Other Speech (5-7 min)</option>
          <option value="1,1.5,2">Table Topic (1-2 min)</option>
          <option value="2,2.5,3">Evaluator (2-3 min)</option>
        </select>
        <input type="text" id="newSpeakerName" placeholder="Speaker name" style="flex: 1; min-width: 200px;">
      </div>
      <div class="row-group">
        <button onclick="addSpeaker()" id="addSpeakerBtn" disabled>Add Speaker</button>
        <button onclick="deleteSpeaker()" class="danger-button" id="deleteSpeakerBtn" disabled>Delete Last</button>
      </div>
      <ul id="speakerList"></ul>
    </div>
  </div>
  <script src="timer_script.js"></script>
</body>
</html>
