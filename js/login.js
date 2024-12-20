const apiUrl = 'https://neko-skills-api.replit.app/login';

// Find the necessary HTML elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const userData = {
    username: username,
    password: password
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.UserID) {
        // เก็บชื่อผู้ใช้จากข้อมูลที่ได้รับ
        localStorage.setItem('UserID', data.UserID);
        localStorage.setItem('Username', data.Username);
        localStorage.setItem('Memberlevel', data.Memberlevel);
        // Redirect to catalog.html
        window.location.href = `catalog.html?userid=${data.UserID}&username=${data.Username}&memberlevel=${data.Memberlevel}`;
      } else {
        alert('Login failed');
      }
    })
    .catch(error => {
      console.error('Error calling the API:', error);
      alert('An error occurred during login');
    });
});