document.addEventListener('DOMContentLoaded', () => {
  const startMeetButton = document.getElementById('startMeetButton');
  const statusElement = document.getElementById('status');

  startMeetButton.addEventListener('click', async () => {
    try {
      startMeetButton.disabled = true;
      startMeetButton.textContent = 'Starting meeting...';
      
      // Send message to background script to create a new meeting
      chrome.runtime.sendMessage({ action: 'createMeeting' }, (response) => {
        if (response && response.success) {
          showStatus('Meeting link copied to clipboard!', 'success');
          
          // Reset button after 2 seconds
          setTimeout(() => {
            startMeetButton.disabled = false;
            startMeetButton.innerHTML = '<span class="btn-text">Start a new meeting</span>';
          }, 2000);
        } else {
          showStatus('Failed to create meeting. Try again.', 'error');
          startMeetButton.disabled = false;
          startMeetButton.innerHTML = '<span class="btn-text">Start a new meeting</span>';
        }
      });
    } catch (error) {
      console.error('Error creating meeting:', error);
      showStatus('An error occurred. Try again.', 'error');
      startMeetButton.disabled = false;
      startMeetButton.innerHTML = '<span class="btn-text">Start a new meeting</span>';
    }
  });

  function showStatus(message, type) {
    statusElement.textContent = message;
    statusElement.className = `status show ${type}`;
    
    // Add animation to draw attention
    statusElement.style.animation = 'pulse 0.5s';
    
    setTimeout(() => {
      statusElement.style.animation = '';
    }, 500);
    
    // Hide status after 5 seconds
    setTimeout(() => {
      statusElement.className = 'status';
    }, 5000);
  }
});