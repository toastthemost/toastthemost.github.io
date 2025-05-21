---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Ah-Counter
---

<body>
  <h1>Ah-Counter</h1>
  <div class="homepage">
    <div class="library">
      <h2>Fillers Library</h2>
      <div class="note">Use this section to add common fillers during speech</div>
      <h4>Vocal Pauses</h4>
      <div class="library-section">
        <button onclick="addWordToFillerTable('Uh')" class="btn-library">Uh</button>
        <button onclick="addWordToFillerTable('Um')" class="btn-library">Um</button>
        <button onclick="addWordToFillerTable('Er')" class="btn-library">Er</button>
        <button onclick="addWordToFillerTable('Hm')" class="btn-library">Hm</button>
      </div>
      <div class="library-section">
        <button onclick="addWordToFillerTable('Long Pause')" class="btn-library">Long Pause</button>
      </div>
      <h4>Single Words</h4>
      <div class="library-section">
        <button onclick="addWordToFillerTable('Yeah')" class="btn-library">yeah</button>
        <button onclick="addWordToFillerTable('Okay')" class="btn-library">Okay</button>
        <button onclick="addWordToFillerTable('So')" class="btn-library">So</button>
        <button onclick="addWordToFillerTable('Well')" class="btn-library">Well</button>
      </div>
      <div class="library-section">
        <button onclick="addWordToFillerTable('Actually')" class="btn-library">Actually</button>
        <button onclick="addWordToFillerTable('Basically')" class="btn-library">Basically</button>
        <button onclick="addWordToFillerTable('Literally')" class="btn-library">Literally</button>
      </div>
      <div class="library-section">
        <button onclick="addWordToFillerTable('Now')" class="btn-library">Now</button>
        <button onclick="addWordToFillerTable('And')" class="btn-library">And</button>
        <button onclick="addWordToFillerTable('Right')" class="btn-library">Right?</button>
      </div>
      <h4>Phrases</h4>
      <div class="library-section">
        <button onclick="addWordToFillerTable('You know')" class="btn-library">You know</button>
        <button onclick="addWordToFillerTable('I mean')" class="btn-library">I mean</button>
      </div>
      <div class="library-section">
        <button onclick="addWordToFillerTable('Kind of')" class="btn-library">Kind of</button>
        <button onclick="addWordToFillerTable('Sort of')" class="btn-library">Sort of</button>
      </div>
    </div>
    <div class="main-content">
      <label for="speechType" class="main-section-label">Speaker Details</label>
      <div class="note">Enter speaker name and speech type manually or insert from the list</div>
      <div class="controls">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <button onclick="pickFromList()" id="pickBtn" disabled>Insert Name from List</button>
          <div style="text-align: center; font-weight: bold; margin-top: 20px;">OR</div>
          <div class="row-group">
            <select id="speechType" style="flex: 1;">
              <option value="4,5,6">Ice Breaker</option>
              <option value="5,6,7">Other Speech</option>
              <option value="1,1.5,2">Table Topic</option>
              <option value="2,2.5,3">Evaluator</option>
            </select>
            <input type="text" id="speakerName" placeholder="Enter speaker name" style="flex: 1" />
          </div>
        </div>
        <div class="main-section-label">Current Speech</div>
        <div class="note">Use the library or enter fillers for selected speaker during the speech</div>
        <div class="playground">
          <div class="currentFillerSection">
            <input type="text" id="newFiller" placeholder="Enter New Filler" />
            <button onclick="addToFillerTable()" id="addBtn" disabled>Add</button>
          </div>
          <table id="fillerTable">
              <thead>
                  <tr>
                      <th>Filler</th>
                      <th>Count</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  <!-- Rows will be added here dynamically -->
              </tbody>
          </table>
          <div class="action-group">
            <button id="resetTable" onclick="resetFillerTable()" class="danger-button">Reset Table</button>
            <button id="recordLogs" onclick="recordSpeechLogs()" disabled>Update Logs</button>
          </div>
        </div>
      </div>
      <div class="log-section" style="margin-top: 30px;">
        <label for="logBox" class="main-section-label">Meeting Logs</label>
        <div class="note">Use "Update Logs" to record each speaker's fillers after every speech</div>
        <textarea id="logBox" rows="6"></textarea>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button onclick="exportLogs()">Export Logs</button>
          <button onclick="resetLogs()" class="danger-button">Reset Logs</button>
        </div>
      </div>
    </div>
    <div class="speakerSection">
      <h2>Speakers' List</h2>
      <div class="note">Use this section to add speakers in advance</div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <select id="newSpeechType" style="flex: 1; min-width: 200px;">
          <option value="4,5,6">Ice Breaker</option>
          <option value="5,6,7">Other Speech</option>
          <option value="1,1.5,2">Table Topic</option>
          <option value="2,2.5,3">Evaluator</option>
        </select>
        <input type="text" id="newSpeakerName" placeholder="Speaker name" style="flex: 1; min-width: 200px;">
      </div>
      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button onclick="addSpeaker()" id="addSpeakerBtn" disabled>Add Speaker</button>
        <button onclick="deleteSpeaker()" class="danger-button" id="deleteSpeakerBtn" disabled>Delete Last</button>
      </div>
      <ul id="speakerList"></ul>
    </div>
  </div>
  <script src="assets/js/ah_counter.js"></script>
</body>
