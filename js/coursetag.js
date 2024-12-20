let subMenu = document.getElementById("subMenu")
        function toggleMenu(){
            subMenu.classList.toggle("open-menu")
        }

// เรียกใช้ URLSearchParams เพื่อแยกพารามิเตอร์ใน URL
const urlParams = new URLSearchParams(window.location.search);
const tagID = urlParams.get("tagid");

const apiUrl = `https://neko-skills-api.replit.app/courses/${tagID}`;

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
      courseLink.innerHTML = `${courseName} - ${courseDescription} <br>`;

      // เพิ่มคลิกเหตุการณ์ให้แท็ก <a> เพื่อแสดง description
      courseLink.addEventListener("click", () => {

      });

      courseList.appendChild(courseLink);
    });
  })
  .catch((error) => {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  });