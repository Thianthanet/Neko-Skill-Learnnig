let subMenu = document.getElementById("subMenu")
        function toggleMenu(){
            subMenu.classList.toggle("open-menu")
        }

let userid; // ประกาศตัวแปร userid
let courseID; // ประกาศตัวแปร courseID

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  courseID = urlParams.get("courseid");
  userid = localStorage.getItem('UserID');
        
  const apiUrl = `https://neko-skills-api.replit.app/videos/course/${courseID}`;
        
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const videoList = document.getElementById("videoList");
        
      data.forEach((video) => {
        const videoTitle = video.VideoTitle;
        const videoURL = video.URL;
        const videoID = video.VideoID;

        const videoItem = document.createElement("div");
        videoItem.className = "video-item";

        const videoTitleP = document.createElement("p");
        videoTitleP.textContent = videoTitle;

        const videoCheckbox = document.createElement("input");
        videoCheckbox.type = "checkbox";
        videoCheckbox.id = `checkbox-${videoID}`;
        videoCheckbox.className = "video-checkbox";

        const videoURLButton = document.createElement("button");
        videoURLButton.textContent = "Watch Video";
        videoURLButton.className = "watch-video"
        videoURLButton.addEventListener("click", () => {
          window.open(videoURL, "_blank"); // เปิด videourl ในหน้าต่างใหม่
          
          // ส่งข้อมูลไปที่ API สำหรับประวัติ
          const historyData = {
            UserID: userid,
            CourseID: courseID,
            VideoID: videoID
          };

          fetch("https://neko-skills-api.replit.app/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(historyData),
          })
            .then((response) => {
              if (response.ok) {
                console.log("ส่งประวัติสำเร็จ");
              } else {
                console.error("เกิดข้อผิดพลาดในการส่งประวัติ");
              }
            })
            .catch((error) => {
              console.error("เกิดข้อผิดพลาดในการส่งประวัติ:", error);
            });
        });
        
        videoItem.appendChild(videoCheckbox);
        videoItem.appendChild(videoTitleP);
        videoItem.appendChild(videoURLButton);

        videoList.appendChild(videoItem);
      });
    })
    .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    });
});   

function addcertificate() {
  const checkboxes = document.querySelectorAll(".video-checkbox");
  const checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);

  if (checkedCheckboxes.length !== checkboxes.length) {
    alert("ไม่สามารถขอใบรับรองได้ เนื่องจากคุณต้องติดตามทุกวิดีโอ");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const courseID = urlParams.get("courseid");
  const userid = localStorage.getItem('UserID');

  const certificateData = {
    userid: userid,
    courseid: courseID,
  };

  fetch("https://neko-skills-api.replit.app/certificate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(certificateData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("ขอใบรับรองสำเร็จ");
      } else {
        alert("เกิดข้อผิดพลาดในการขอใบรับรอง");
      }
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการส่งคำขอใบรับรอง:", error);
    });
}

  // const apiUrl2 = `https://neko-skills-api.replit.app/catalogs/${catalogId}`;

  // fetch(apiUrl2)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const pictureList = document.getElementById("picture");
  
  //     data.forEach((picture) => {
  //       const catalogName = picture.CatalogName;
  //       const catalogImg = picture.Image;
  
  //       // สร้าง HTML element สำหรับแสดงรูปภาพและชื่อ catalog
  //       const catalogInfoElement = document.createElement('div');
  //       catalogInfoElement.classList.add('catalog-info'); // เพิ่มคลาส CSS ตามที่คุณต้องการ
  
  //       const catalogImageElement = document.createElement('img');
  //       catalogImageElement.src = catalogImg;
  //       catalogImageElement.alt = catalogName;
  
  //       const catalogNameElement = document.createElement('h2');
  //       catalogNameElement.textContent = catalogName;
  
  //       catalogInfoElement.appendChild(catalogImageElement);
  //       catalogInfoElement.appendChild(catalogNameElement);
  
  //       pictureList.appendChild(catalogInfoElement);
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  //   });