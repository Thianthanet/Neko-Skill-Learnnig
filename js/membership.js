let subMenu = document.getElementById("subMenu")
        function toggleMenu(){
            subMenu.classList.toggle("open-menu")
        }

document.addEventListener('DOMContentLoaded', function() {
    // ดึง UserID จาก LocalStorage
    const userid = localStorage.getItem('UserID');
    // ตรวจสอบว่ามี UserID ใน LocalStorage หรือไม่
    if (!userid) {
        console.log('ไม่พบข้อมูล UserID');
        return;
    }
          
    // คำนวณ URL สำหรับยกเลิกระดับสมาชิก
    const cancelMemberUrl = `https://neko-skills-api.replit.app/cancel/${userid}`;
          
    // คำนวณ URL สำหรับอัพเกรดระดับสมาชก
    const upgradeMemberUrl = `https://neko-skills-api.replit.app/upgrade/${userid}`;
          
    // ระบุปุ่มสำหรับยกเลิกระดับสมาชก
    const cancelMemberButton = document.getElementById('cancel-member');
          
    // ระบุปุ่มสำหรับอัพเกรดระดับสมาชก
    const upgradeMemberButton = document.getElementById('upgrade-member');
          
    // เพิ่มการทำงานของปุ่มยกเลิกระดับสมาชก
    cancelMemberButton.addEventListener('click', function() {
        fetch(cancelMemberUrl, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            // ดำเนินการตามผลลัพธ์ที่ได้จาก API หลังจากยกเลิกระดับสมาชก
            if (data && data.Memberlevel) {
                const newMemberlevel = data.Memberlevel;
                
                // บันทึกค่า Memberlevel ลงใน LocalStorage
                localStorage.setItem('Memberlevel', newMemberlevel);
            }
            alert('ยกเลิกระดับสมาชิกสำเร็จ');
            // สามารถทำการ refresh หน้าหรือทำอย่างอื่นตามที่ต้องการ
            window.location.reload(); // รีเฟรชหน้าเว็บ
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการยกเลิกระดับสมาชก', error);
            alert('เกิดข้อผิดพลาดในการยกเลิกระดับสมาชก');
            });
        });
          
        // เพิ่มการทำงานของปุ่มอัพเกรดระดับสมาชก
    upgradeMemberButton.addEventListener('click', function() {
        fetch(upgradeMemberUrl, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            // ดำเนินการตามผลลัพธ์ที่ได้จาก API หลังจากอัพเกรดระดับสมาชก
            if (data && data.Memberlevel) {
                const newMemberlevel = data.Memberlevel;
                
                // บันทึกค่า Memberlevel ลงใน LocalStorage
                localStorage.setItem('Memberlevel', newMemberlevel);
            }
            alert('อัพเกรดระดับสมาชิกสำเร็จ');
            // สามารถทำการ refresh หน้าหรือทำอย่างอื่นตามที่ต้องการ
            window.location.reload(); // รีเฟรชหน้าเว็บ
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการอัพเกรดระดับสมาชก', error);
            alert('เกิดข้อผิดพลาดในการอัพเกรดระดับสมาชก');
        });
    });
    const memberlevel = localStorage.getItem('Memberlevel');

    if (memberlevel) {
        // สร้างตัวแปรเก็บข้อความระดับสมาชิก
        let membershipText = '';

        // ตรวจสอบค่า memberlevel
        if (memberlevel === '1') {
            membershipText = 'Stray cat';
        } else if (memberlevel === '2') {
            membershipText = 'Nekomata';
        }

        // แสดงข้อความระดับสมาชิกในส่วนที่คุณต้องการแสดง
        document.getElementById('membership-level').textContent = membershipText;
      }
});
          