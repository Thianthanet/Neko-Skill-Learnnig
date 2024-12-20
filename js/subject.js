let subMenu = document.getElementById("subMenu")
        function toggleMenu(){
            subMenu.classList.toggle("open-menu")
        }

        document.addEventListener("DOMContentLoaded", function () {
            // เลือก HTML element ที่คุณต้องการแสดงรายการ Tags
            var tagsContainer = document.querySelector(".tags-subject");
        
            // ส่งคำขอ GET ไปยัง API เพื่อดึงข้อมูล Tags
            fetch("https://neko-skills-api.replit.app/tags")
                .then(function (response) {
                    return response.json();
                })
                .then(function (tags) {
                    // สร้างรายการ Tags และแสดงใน HTML
                    tags.forEach(function (tag) {
                        var tagLink = document.createElement("a");
                        tagLink.href = "course_subject.html?tagid=" + tag.TagID; // กำหนด URL ที่คุณต้องการเชื่อมโยงไป
                        tagLink.className = "tags-text-name";
                        var tagHeading = document.createElement("h1");
                        tagHeading.textContent = tag.TagName;
                        tagLink.appendChild(tagHeading);
                        tagsContainer.appendChild(tagLink);
                    });
                })
                .catch(function (error) {
                    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล Tags", error);
                });
        })