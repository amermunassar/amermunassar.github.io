async function loadPlayer(username) {
  let profileDiv = document.getElementById('profile');
  let statsDiv = document.getElementById('stats');

  profileDiv.innerHTML = 'Loading...';
  statsDiv.innerHTML = '';

  let response = await fetch('https://api.chess.com/pub/player/' + username);

  if (response.status == 404) {
    profileDiv.innerHTML = 'Player not found';
    return;
  }

  let data = await response.json();
  let joined = new Date(data.joined * 1000).toLocaleDateString();

  let html = '<div class="card mb-3 shadow-sm"><div class="card-body">';
  if (data.avatar) {
    html += '<img src="' + data.avatar + '" width="80"><br><br>';
  }
  html += '<h2>' + data.username + '</h2>';
  html += '<p>Name: ' + (data.name || 'N/A') + '</p>';
  html += '<p>Followers: ' + data.followers + '</p>';
  html += '<p>Status: ' + data.status + '</p>';
  html += '<p>Joined: ' + joined + '</p>';
  html += '</div></div>';
  profileDiv.innerHTML = html;

  let response2 = await fetch('https://api.chess.com/pub/player/' + username + '/stats');
  let stats = await response2.json();

  let blitz = 'N/A';
  let bullet = 'N/A';
  let rapid = 'N/A';

  if (stats.chess_blitz) {
    blitz = stats.chess_blitz.last.rating;
  }
  if (stats.chess_bullet) {
    bullet = stats.chess_bullet.last.rating;
  }
  if (stats.chess_rapid) {
    rapid = stats.chess_rapid.last.rating;
  }

  let html2 = '<div class="card shadow-sm"><div class="card-body">';
  html2 += '<h3>Ratings</h3>';
  html2 += '<p>Blitz: ' + blitz + '</p>';
  html2 += '<p>Bullet: ' + bullet + '</p>';
  html2 += '<p>Rapid: ' + rapid + '</p>';
  html2 += '</div></div>';
  statsDiv.innerHTML = html2;
}

function searchPlayer() {
  let u = document.getElementById('searchUsername').value;
  if (u == '') {
    return;
  }
  window.location.href = 'player.html?username=' + u;
}

let params = new URLSearchParams(window.location.search);
let username = params.get('username');
if (username) {
  document.getElementById('searchUsername').value = username;
  loadPlayer(username);
}
