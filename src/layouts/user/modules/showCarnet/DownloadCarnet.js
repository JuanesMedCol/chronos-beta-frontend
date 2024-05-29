import React, { useState } from "react";

const CarnetDownload = ({ carnetUrl }) => {
  const [selectedFormat, setSelectedFormat] = useState("pkpass");

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleDownload = () => {};

  return (
    <div>
      <p>Selecciona el formato de descarga:</p>
      <select value={selectedFormat} onChange={handleFormatChange}>
        <option value="pkpass">PKPASS</option>
        <option value="pdf">PDF</option>
        <option value="jpg">JPG</option>
      </select>
      <button onClick={handleDownload}>Descargar</button>
    </div>
  );
};

export default CarnetDownload;
