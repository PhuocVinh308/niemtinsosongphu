import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Capture the certificate as a high-resolution, unscaled canvas.
 * Clones the node to an isolated sandbox to prevent CSS transform scaling,
 * scroll offsets, and responsive parent clipping issues.
 */
export async function getCertificateCanvas(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Không tìm thấy khung chứng nhận!');
  }

  // Clone element into an unscaled, isolated container
  const clone = element.cloneNode(true);
  clone.id = 'certificate-export-clone';
  clone.style.position = 'fixed';
  clone.style.left = '0';
  clone.style.top = '0';
  clone.style.width = '840px';
  clone.style.minWidth = '840px';
  clone.style.height = '594px';
  clone.style.minHeight = '594px';
  clone.style.transform = 'none';
  clone.style.webkitTransform = 'none';
  clone.style.margin = '0';
  clone.style.zIndex = '-99999';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';
  clone.style.pointerEvents = 'none';

  document.body.appendChild(clone);

  try {
    // Wait for fonts to be ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // Small delay to ensure layout reflow
    await new Promise((resolve) => setTimeout(resolve, 120));

    const canvas = await html2canvas(clone, {
      scale: 2, // 1680x1188 crisp high definition
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width: 840,
      height: 594,
      windowWidth: 840,
      windowHeight: 594,
      logging: false,
      onclone: (clonedDoc) => {
        // Sanitize any style tags in clonedDoc that contain oklch
        const styles = clonedDoc.querySelectorAll('style');
        styles.forEach((style) => {
          try {
            if (style.textContent && style.textContent.includes('oklch')) {
              style.textContent = style.textContent.replace(/oklch\([^)]+\)/g, '#0f172a');
            }
          } catch (e) {
            style.remove();
          }
        });
      }
    });

    return canvas;
  } finally {
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
  }
}

/**
 * Download certificate as an official A4 landscape PDF
 */
export async function downloadCertificatePDF(elementId, studentName = 'HocVien', certCode = 'NTS-SP') {
  const canvas = await getCertificateCanvas(elementId);
  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  
  // A4 Landscape: 297 x 210 mm
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  
  const cleanName = (studentName || 'ThiSinh').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
  pdf.save(`Chung_Nhan_${cleanName}_${certCode}.pdf`);
  return true;
}

/**
 * Download certificate as a crisp PNG image
 */
export async function downloadCertificateImage(elementId, studentName = 'HocVien', certCode = 'NTS-SP') {
  const canvas = await getCertificateCanvas(elementId);
  const cleanName = (studentName || 'ThiSinh').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
  const fileName = `Chung_Nhan_${cleanName}_${certCode}.png`;

  if (canvas.toBlob) {
    canvas.toBlob((blob) => {
      if (!blob) {
        fallbackDataUrlDownload(canvas, fileName);
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1500);
    }, 'image/png');
  } else {
    fallbackDataUrlDownload(canvas, fileName);
  }
}

function fallbackDataUrlDownload(canvas, fileName) {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png', 1.0);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 1500);
}
