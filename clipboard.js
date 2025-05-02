// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'copy' && request.text) {
    copyTextToClipboard(request.text);
    sendResponse({ success: true });
    
    // Close this tab after copying
    setTimeout(() => {
      window.close();
    }, 500);
  }
  return true;
});

// Function to copy text to clipboard
function copyTextToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  
  // Make the textarea out of viewport
  textarea.style.position = 'fixed';
  textarea.style.left = '-999999px';
  textarea.style.top = '-999999px';
  
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text was ' + msg);
  } catch (err) {
    console.error('Unable to copy', err);
  }
  
  document.body.removeChild(textarea);
}