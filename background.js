// URL for creating a new Google Meet
const GOOGLE_MEET_URL = 'https://meet.google.com/new';

// Function to handle tab updates
function handleTabUpdate(tabId, changeInfo, tab) {
  // Only proceed if the tab is fully loaded and it's a Google Meet tab
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('https://meet.google.com/')) {
    // If the URL contains a meeting code (meet.google.com/xxx-yyyy-zzz)
    // This means the meeting is fully loaded and ready
    if (tab.url.match(/meet\.google\.com\/[a-z0-9\-]+$/)) {
      console.log('Meeting loaded:', tab.url);
      
      // Copy the meeting URL to clipboard
      copyToClipboard(tab.url);
      
      // Turn off camera
      chrome.tabs.sendMessage(tabId, { action: 'turnOffCamera' })
        .catch(error => {
          console.log('Error sending message to turn off camera:', error);
        });
      
      // Remove the listener after we've found and processed the meeting
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    }
  }
}

// Function to copy text to clipboard
async function copyToClipboard(text) {
  // Create a temporary tab to execute the clipboard copy
  // This is needed because background scripts don't have direct clipboard access
  const tempTab = await chrome.tabs.create({ url: 'clipboard.html', active: false });
  
  setTimeout(async () => {
    try {
      await chrome.tabs.sendMessage(tempTab.id, { action: 'copy', text: text });
    } catch (error) {
      console.error('Error sending message to copy tab:', error);
    }
  }, 500); // Give the tab time to load
}

// Listen for extension icon click
chrome.action.onClicked.addListener(() => {
  // Create a new tab with Google Meet
  chrome.tabs.create({ url: GOOGLE_MEET_URL }, (tab) => {
    // Set up a listener to detect when the meeting is ready
    chrome.tabs.onUpdated.addListener(handleTabUpdate);
  });
});