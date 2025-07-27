document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const blockedCountEl = document.getElementById('blockedCount');
  const whitelistItemsEl = document.getElementById('whitelistItems');
  const blacklistItemsEl = document.getElementById('blacklistItems');
  const whitelistInput = document.getElementById('whitelistInput');
  const blacklistInput = document.getElementById('blacklistInput');
  const addWhitelistBtn = document.getElementById('addWhitelist');
  const addBlacklistBtn = document.getElementById('addBlacklist');
  const updateTrackingListBtn = document.getElementById('updateTrackingList');
  
  let whitelist = [];
  let blacklist = [];
  let blockedCount = 0;
  
  // Fetch current data from background
  chrome.runtime.sendMessage({ type: 'getData' }, (response) => {
    blockedCount = response.blockedCount;
    whitelist = response.whitelist;
    blacklist = response.blacklist;
    
    updateUI();
  });
  
  // Update the UI with current data
  function updateUI() {
    blockedCountEl.textContent = blockedCount;
    
    // Update whitelist
    whitelistItemsEl.innerHTML = '';
    whitelist.forEach(domain => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${domain}
        <button class="delete-btn" data-domain="${domain}" data-list="whitelist">×</button>
      `;
      whitelistItemsEl.appendChild(li);
    });
    
    // Update blacklist
    blacklistItemsEl.innerHTML = '';
    blacklist.forEach(domain => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${domain}
        <button class="delete-btn" data-domain="${domain}" data-list="blacklist">×</button>
      `;
      blacklistItemsEl.appendChild(li);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const domain = e.target.dataset.domain;
        const listType = e.target.dataset.list;
        
        if (listType === 'whitelist') {
          whitelist = whitelist.filter(d => d !== domain);
        } else {
          blacklist = blacklist.filter(d => d !== domain);
        }
        
        saveSettings();
      });
    });
  }
  
  // Save settings to storage
  function saveSettings() {
    chrome.runtime.sendMessage({
      type: 'updateSettings',
      whitelist,
      blacklist
    }, () => {
      updateUI();
    });
  }
  
  // Add domain to whitelist
  addWhitelistBtn.addEventListener('click', () => {
    const domain = whitelistInput.value.trim();
    if (domain && !whitelist.includes(domain)) {
      whitelist.push(domain);
      whitelistInput.value = '';
      saveSettings();
    }
  });
  
  // Add domain to blacklist
  addBlacklistBtn.addEventListener('click', () => {
    const domain = blacklistInput.value.trim();
    if (domain && !blacklist.includes(domain)) {
      blacklist.push(domain);
      blacklistInput.value = '';
      saveSettings();
    }
  });
  
  // Handle Enter key in input fields
  whitelistInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addWhitelistBtn.click();
    }
  });
  
  blacklistInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addBlacklistBtn.click();
    }
  });
  
  // Update tracking list from DuckDuckGo
  updateTrackingListBtn.addEventListener('click', () => {
    // In a real implementation, this would fetch DuckDuckGo's list
    // For now we'll just show an alert
    alert('This would fetch DuckDuckGo\'s tracking list in a full implementation');
  });
});
