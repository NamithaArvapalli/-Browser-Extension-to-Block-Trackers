# Browser-Extension-to-Block-Trackers   
# Privacy Shield Extension

A browser extension that blocks tracking scripts to protect user privacy.

## Features

- Blocks known tracking scripts and domains
- Real-time counter of blocked trackers
- User-configurable whitelist/blacklist
- Lightweight and privacy-focused

## Installation

### Chrome
1. Download this repository
2. Go to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

### Firefox
1. Download this repository
2. Go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select any file from the extension folder

## Usage
- Click the extension icon to see blocked trackers count
- Add domains to whitelist/blacklist via the popup interface

## Tracking Domains
The extension includes a basic list of tracking domains. To use DuckDuckGo's Tracker Radar list:
1. Download https://raw.githubusercontent.com/duckduckgo/tracker-radar/main/dist/trackers.json
2. Add the domains to `trackingDomains` in background.js

## Contributing
Pull requests are welcome. For major changes, please open an issue first.

## License
[MIT](https://choosealicense.com/licenses/mit/)
