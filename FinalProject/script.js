let players = [];
let page = 1;

async function loadLeaderboard() {
  let category = document.getElementById('category').value;
  let result = document.getElementById('result');

  result.innerHTML = 'Loading...';
  page = 1;

  let response = await fetch('https://api.chess.com/pub/leaderboards');

  if (!response.ok) {
    result.innerHTML = 'Could not load leaderboard';
    return;
  }

  let data = await response.json();
  players = data[category];
  showPage();
}

function showPage() {
  let filter = document.getElementById('filter').value.toLowerCase();
  let result = document.getElementById('result');

  let filtered = [];
  for (let i = 0; i < players.length; i++) {
    if (players[i].username.toLowerCase().includes(filter)) {
      filtered.push(players[i]);
    }
  }

  if (filtered.length == 0) {
    result.innerHTML = 'No players found';
    return;
  }

  let start = (page - 1) * 25;
  let end = start + 25;
  if (end > filtered.length) {
    end = filtered.length;
  }

  let totalPages = Math.ceil(filtered.length / 25);

  let html = '<div class="list-group shadow-sm mb-3">';
  for (let i = start; i < end; i++) {
    let p = filtered[i];
    let avatar = p.avatar ? p.avatar : 'https://www.chess.com/bundles/web/images/user-image.svg';

    html += '<a href="player.html?username=' + p.username + '" class="list-group-item player-row d-flex align-items-center gap-3">';
    html += '<div class="rank-circle">' + p.rank + '</div>';
    html += '<img src="' + avatar + '" class="player-pfp">';
    html += '<div class="flex-grow-1">';
    html += '<div class="fw-bold fs-5">' + p.username + '</div>';
    html += '<div class="text-muted small">Elo: ' + p.score + '</div>';
    html += '</div>';
    html += '</a>';
  }
  html += '</div>';

  html += '<div class="d-flex justify-content-between align-items-center">';
  html += '<button class="btn btn-primary" onclick="prevPage()">Previous</button>';
  html += '<span>Page ' + page + ' of ' + totalPages + '</span>';
  html += '<button class="btn btn-primary" onclick="nextPage()">Next</button>';
  html += '</div>';

  result.innerHTML = html;
}

function nextPage() {
  let totalPages = Math.ceil(players.length / 25);
  if (page < totalPages) {
    page = page + 1;
    showPage();
  }
}

function prevPage() {
  if (page > 1) {
    page = page - 1;
    showPage();
  }
}

loadLeaderboard();
