// Function to turn off camera
function turnOffCamera() {
  // Wait for the page to load and find the camera button
  const checkCameraButton = setInterval(() => {
    const cameraButton = document.querySelector('[data-is-muted="false"][aria-label*="camera"]');
    if (cameraButton) {
      cameraButton.click();
      clearInterval(checkCameraButton);
    }
  }, 1000);

  // Stop checking after 10 seconds
  setTimeout(() => {
    clearInterval(checkCameraButton);
  }, 10000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'turnOffCamera') {
    turnOffCamera();
    sendResponse({ success: true });
  }
  return true;
}); 