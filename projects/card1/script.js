function generateQR() {
  const input = document.getElementById("qrInput").value.trim();
  const output = document.getElementById("qrOutput");
  const downloadSection = document.getElementById("downloadOptions");

  if (!input) {
    output.innerHTML = "<p>Please enter something!</p>";
    downloadSection.style.display = "none";
    return;
  }

  output.innerHTML = ""; // Clear previous QR
  const canvas = document.createElement("canvas");
  canvas.id = "qrImage";
  output.appendChild(canvas);

  QRCode.toCanvas(canvas, input, function (error) {
    if (error) {
      console.error(error);
      output.innerHTML = "<p>Failed to generate QR.</p>";
      return;
    }
    downloadSection.style.display = "block";
  });
}

function downloadImage(format) {
  const canvas = document.getElementById("qrImage");
  if (!canvas) return alert("QR code not loaded yet!");

  const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
  const link = document.createElement("a");
  link.href = canvas.toDataURL(mimeType);
  link.download = `qr-code.${format}`;
  link.click();
}

function downloadPDF() {
  const canvas = document.getElementById("qrImage");
  if (!canvas) return alert("QR code not loaded yet!");

  const imgData = canvas.toDataURL("image/png");

  const pdfWindow = window.open("");
  pdfWindow.document.write(`
    <html>
      <head><title>QR PDF</title></head>
      <body style="margin:0">
        <img src="${imgData}" style="width:100%;"/>
        <script>
          window.print();
        </script>
      </body>
    </html>
  `);
}