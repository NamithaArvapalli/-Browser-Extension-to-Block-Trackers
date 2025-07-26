// List of known tracking domains
const trackingDomains = [
  'google-analytics.com',
  'googletagmanager.com',
  'facebook.net',
  'facebook.com',
  'doubleclick.net',
  'adservice.google.com',
  'scorecardresearch.com',
  'hotjar.com',
  'newrelic.com',
  'optimizely.com'
];

// User's whitelist/blacklist
let whitelist = [];
let blacklist = [];

// Load stored settings
chrome.storage.local.get(['whitelist', 'blacklist'], (result) => {
  whitelist = result.whitelist || [];
  blacklist = result.blacklist || [];
});

// Intercept requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);
    const domain = url.hostname;
    
    // Check against lists
    if (whitelist.includes(domain)) {
      return { cancel: false };
    }
    
    if (blacklist.includes(domain) || trackingDomains.some(tracker => domain.includes(tracker))) {
      updateBadge();
      return { cancel: true };
    }
    
    return { cancel: false };
  },
  { urls: ["&lt;all_urls&gt;"] },
  ["blocking"]
);

// Update badge counter
let blockedCount = 0;
function updateBadge() {
  blockedCount++;
  chrome.action.setBadgeText({ text: blockedCount.toString() });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
}

// Reset counter on page navigation
chrome.webNavigation.onCommitted.addListener(() => {
  blockedCount = 0;
  chrome.action.setBadgeText({ text: '' });
});
