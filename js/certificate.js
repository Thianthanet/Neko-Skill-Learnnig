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
    
    const apiURL = `https://neko-skills-api.replit.app/certificate/user/${userid}`;


    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
                throw new Error('ไม่สามารถดึงข้อมูลได้');
            }
            return response.json();
        })
        .then(data => {
            const certificateList = document.querySelector('.certificate-details');
            if (data.error) {
                console.log('ไม่พบข้อมูล Certificate');
                // แสดงข้อความที่คุณต้องการในหน้าเว็บ
                certificateList.innerHTML = data.error;
            } else {
                // ทำงานกับข้อมูล Certificate ที่ดึงมาได้ที่นี่
                data.forEach(certificate => {
                    const certificateDiv = document.createElement('div');

                    const firstNameParagraph = document.createElement('h');
                    firstNameParagraph.innerHTML = `<br>${certificate.FirstName}`;
                    firstNameParagraph.classList.add('firstname');
                    // certificateDiv.appendChild(firstNameParagraph);

                    const lastNameParagraph = document.createElement('h');
                    lastNameParagraph.textContent = `${certificate.LastName}`;
                    lastNameParagraph.classList.add('lastname');
                    // certificateDiv.appendChild(lastNameParagraph);

                    const emailParagraph = document.createElement('h');
                    emailParagraph.textContent = `Email: ${certificate.Email}`;
                    // certificateDiv.appendChild(emailParagraph);

                    const courseNameParagraph = document.createElement('h');
                    courseNameParagraph.innerHTML = `<br>${certificate.CourseName}`;
                    courseNameParagraph.classList.add('course-name');
                    // certificateDiv.appendChild(courseNameParagraph);

                    // แปลงวันที่ให้เป็น Date object
                    const date = new Date(certificate.Date);

                    // นำวันที่มาแสดงในรูปแบบที่คุณต้องการ
                    const formattedDate = date.toLocaleDateString();

                    const dateParagraph = document.createElement('h');
                    dateParagraph.innerHTML = `<br>${formattedDate}`;
                    dateParagraph.classList.add('date');
                    // certificateDiv.appendChild(dateParagraph);

                    certificateDiv.append(firstNameParagraph, lastNameParagraph, courseNameParagraph, dateParagraph);

                    certificateList.append(certificateDiv);
                });
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            // แสดงข้อความข้อผิดพลาดที่คุณต้องการในหน้าเว็บ
        });
});

// Function to generate and download the PDF
function generatePDF() {
  const contentToConvert = document.getElementById('content-to-convert');
  const downloadButton = document.getElementById('download-pdf-button');

  // Configuration options for PDF generation
  const pdfOptions = {
      margin: 10,
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  // Generate the PDF
  html2pdf()
      .from(contentToConvert)
      .set(pdfOptions)
      .outputPdf()
      .then(function (pdf) {
          // Offer the PDF for download
          const blob = new Blob([pdf], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'certificate.pdf';
          a.click();
          URL.revokeObjectURL(url);
      });

  // Optionally, disable the download button to prevent multiple clicks
  downloadButton.disabled = true;
}

// Attach the generatePDF function to the button click event
document.getElementById('download-pdf-button').addEventListener('click', generatePDF);
