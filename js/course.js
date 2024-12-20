let subMenu = document.getElementById("subMenu")
        function toggleMenu(){
            subMenu.classList.toggle("open-menu")
        }

// เรียกใช้ URLSearchParams เพื่อแยกพารามิเตอร์ใน URL
const urlParams = new URLSearchParams(window.location.search);
const catalogId = urlParams.get("catalogid");

// สร้าง URL ของ API โดยใช้ catalogId
const apiUrl = `https://neko-skills-api.replit.app/courses/catalog/${catalogId}`;

// ทำการดึงข้อมูลจาก API โดยใช้ fetch
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const courseList = document.getElementById("courseList");

    // สร้างแท็ก <a> สำหรับแต่ละข้อมูล
    data.forEach((course) => {
      const courseid = course.CourseID;
      const courseName = course.CourseName;
      const courseDescription = course.Description;

      // สร้างแท็ก <a> พร้อมกับ description ใต้ coursename
      const courseLink = document.createElement("a");
      courseLink.href = `video.html?courseid=${courseid}`;  // กำหนดลิงก์ที่เป็น placeholder
      // courseLink.textContent = `${courseName} == ${courseDescription}`;
      courseLink.innerHTML = `${courseName} - ${courseDescription}<br>`;

      // เพิ่มคลิกเหตุการณ์ให้แท็ก <a> เพื่อแสดง description
      courseLink.addEventListener("click", () => {

      });

      courseList.appendChild(courseLink);
    });
  })
  .catch((error) => {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  });

  const apiUrl2 = `https://neko-skills-api.replit.app/catalogs/${catalogId}`;

  fetch(apiUrl2)
    .then((response) => response.json())
    .then((data) => {
      const pictureList = document.getElementById("picture");
  
      data.forEach((picture) => {
        const catalogName = picture.CatalogName;
        const catalogImg = picture.Image;
  
        // สร้าง HTML element สำหรับแสดงรูปภาพและชื่อ catalog
        const catalogInfoElement = document.createElement('div');
        catalogInfoElement.classList.add('catalog-info'); // เพิ่มคลาส CSS ตามที่คุณต้องการ
  
        const catalogImageElement = document.createElement('img');
        catalogImageElement.src = catalogImg;
        catalogImageElement.alt = catalogName;
  
        const catalogNameElement = document.createElement('h2');
        catalogNameElement.textContent = catalogName;
  
        catalogInfoElement.appendChild(catalogImageElement);
        catalogInfoElement.appendChild(catalogNameElement);
  
        pictureList.appendChild(catalogInfoElement);
      });
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    });
  