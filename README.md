# NHL Stats Browser
View stats from yesterdays games.

http://nhl-stats-browser.s3-website-us-east-1.amazonaws.com/game/2018021138
## Build
### Proxy:
`cd proxy`

`npm install`

`node proxy.js`

### Application:
Change BASE_URL in `utils.ts` to `http://localhost:8000`

`yarn install`

`yarn start`
