let subMenu = document.getElementById("subMenu")
        function toggleMenu(){
            subMenu.classList.toggle("open-menu")
        }

document.addEventListener('DOMContentLoaded', function() {
    const userid = localStorage.getItem('UserID');
    if (!userid) {
        console.log('ไม่พบข้อมูล UserID');
        return;
    }

    const apiURL = `https://neko-skills-api.replit.app/history/user/${userid}`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
                throw new Error('ไม่สามารถดึงข้อมูลได้');
            }
            return response.json();
        })
        .then(data => {
            const historyList = document.querySelector('.table');
            if (data.error) {
                console.log('ไม่พบข้อมูล History');
                // แสดงข้อความที่คุณต้องการในหน้าเว็บ
                historyList.innerHTML = data.error;
            } else {
                // ทำงานกับข้อมูล History ที่ดึงมาได้ที่นี่
                data.forEach(history => {
                    const historyDiv = document.createElement('tr');

                    const coursenameParagraph = document.createElement('td');
                    coursenameParagraph.textContent = `${history.CourseName}`;
                    coursenameParagraph.classList.add('coursenanme');
                    // historyDiv.appendChild(coursenameParagraph);

                    const videotitleParagraph = document.createElement('td');
                    videotitleParagraph.textContent = `${history.VideoTitle}`;
                    videotitleParagraph.classList.add('videoname');
                    // historyDiv.appendChild(videotitleParagraph);

                    // แปลงวันที่ให้เป็น Date object
                    const date = new Date(history.Date);

                    // นำวันที่มาแสดงในรูปแบบที่คุณต้องการ
                    const formattedDate = date.toLocaleDateString();

                    const dateParagraph = document.createElement('td');
                    dateParagraph.textContent = `${formattedDate}`;
                    dateParagraph.classList.add('date');
                    // historyDiv.appendChild(dateParagraph);

                    historyDiv.append(coursenameParagraph, videotitleParagraph, dateParagraph)

                    historyList.append(historyDiv);
                });
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            // แสดงข้อความข้อผิดพลาดที่คุณต้องการในหน้าเว็บ
        });
});