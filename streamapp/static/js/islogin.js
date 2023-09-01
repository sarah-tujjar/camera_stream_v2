function isLoggedIn() {
    const sessionDataString = localStorage.getItem('sessionData');
    return sessionDataString !== null;
  }
  

  if (!isLoggedIn()) {
    window.location.href = ''; 
  } else {

  }