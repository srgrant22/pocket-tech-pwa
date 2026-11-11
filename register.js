if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Worker registered'))
      .catch(error => console.error('Registration failed:', error));
  });
}