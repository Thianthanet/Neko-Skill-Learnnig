let subMenu = document.getElementById("subMenu")
        function toggleMenu(){
            subMenu.classList.toggle("open-menu")
        }

const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("userid");

const apiUrl = `https://neko-skills-api.replit.app/userdetail/${userID}`;
fetch(apiUrl)
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function (userData) {
    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (userData) {
        document.getElementById("user-id").textContent = userData.UserID;
        document.getElementById("user-username").textContent = userData.Username;
        document.getElementById("email").textContent = userData.Email;
        document.getElementById("first-name").textContent = userData.FirstName;
        document.getElementById("last-name").textContent = userData.LastName;
        let memberLevelText = '';
        if (userData.Memberlevel === 1) {
            memberLevelText = 'Stray cat';
        } else if (userData.Memberlevel === 2) {
            memberLevelText = 'Nekomata';
        }
        document.getElementById("member-level").textContent = memberLevelText;
        } else {
            console.error('ไม่พบข้อมูลผู้ใช้');
        }
  })
  .catch(function (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้', error);
  });