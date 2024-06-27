let wakeLock = null;
let retryCount = 0;
const maxRetries = 3;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', handleWakeLockRelease);
    console.log('Wake Lock is active');
    updateWakeLockStatus(true);
    retryCount = 0; // Reset retry count on successful acquisition
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
    updateWakeLockStatus(false, `Error - ${err.message}`);
    if (retryCount < maxRetries) {
      retryCount++;
      setTimeout(requestWakeLock, 3000); // Retry after 3 seconds
    }
  }
}

function handleWakeLockRelease() {
  console.log('Wake Lock was released');
  updateWakeLockStatus(false);
  if (retryCount < maxRetries) {
    retryCount++;
    setTimeout(requestWakeLock, 3000); // Retry after 3 seconds
  }
}

function updateWakeLockStatus(isActive, errorMessage = '') {
  const statusElement = document.getElementById('wake-lock-status');
  if (isActive) {
    statusElement.textContent = 'Wake Lock Status: Active';
    statusElement.classList.remove('status-inactive');
    statusElement.classList.add('status-active');
  } else {
    statusElement.textContent = `Wake Lock Status: Inactive ${errorMessage}`;
    statusElement.classList.remove('status-active');
    statusElement.classList.add('status-inactive');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  requestWakeLock();
});
