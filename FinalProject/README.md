# Chess.com Lookup

A simple web app that lets you browse top Chess.com players and look up any player's profile and ratings.

Live site: https://amermunassar.github.io/FinalProject/

## How to use

1. Open the site in a browser.
2. The home page (`index.html`) shows a leaderboard of top players.
   - Use the **Category** dropdown to switch between Blitz, Bullet, Rapid, and Daily.
   - Use the **Filter by username** box to narrow down the list.
   - Use the **Previous** / **Next** buttons to page through results (25 per page).
   - Click any player to open their detail page.
3. The player page (`player.html`) shows that player's profile info and ratings.
   - You can also type any username into the search box on this page to look someone up directly.

## API

This project uses the Chess.com Published-Data API.

- Base URL: `https://api.chess.com`
- Authentication: **None required**
- API docs: https://www.chess.com/news/view/published-data-api

Endpoints used:

- `GET /pub/leaderboards` - top players in each game category
- `GET /pub/player/{username}` - a player's profile (name, country, joined date, etc.)
- `GET /pub/player/{username}/stats` - a player's ratings across game types

## Third-party libraries / tools

- **Bootstrap** — for layout, styling, and responsive design. Loaded via CDN, no install needed.

