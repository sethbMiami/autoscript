let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
      updateWakeLockStatus(false);
    });
    console.log('Wake Lock is active');
    updateWakeLockStatus(true);
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
    updateWakeLockStatus(false, `Error - ${err.message}`);
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