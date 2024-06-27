let click = 0;
let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
    });
    console.log('Wake Lock is active');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

function triggerClick() {
  const buttonElement = document.getElementById('my-button');
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  buttonElement.dispatchEvent(clickEvent);
  buttonElement.classList.add('clicked'); // Apply the 'clicked' class
  click++;
  displayClickCount();

  setTimeout(() => {
    buttonElement.classList.remove('clicked');
  }, 500);
}

function autoClicker(interval) {
  setInterval(() => {
    triggerClick();
  }, interval);
}

function displayClickCount() {
  document.getElementById('click-count').textContent = `Clicks: ${click}`;
}

document.addEventListener('DOMContentLoaded', () => {
  requestWakeLock();
  autoClicker(5000); // Clicks every 5000 milliseconds (5 seconds)
});
