// Side-effect CSS imports primeiro
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Bibliotecas externas
import React from "react";
import { FaArrowLeft } from "react-icons/fa";        // <- antes do react-router-dom
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Imports internos
import { DashboardContent } from "src/layouts/dashboard";

// PDF
import manualPDF from "../../../public/assets/documents/documents.pdf";



 // coloque o PDF correto aqui

export default function Manual() {
  const navigate = useNavigate();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <DashboardContent>
      {/* Botão de voltar e título */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2960B0",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: 4,
            marginRight: 12,
          }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft style={{ marginRight: 6 }} /> Voltar
        </button>
        <h2 style={{ color: "#031634", margin: 0 }}>Política de Proteção de Dados</h2>
      </div>

      {/* PDF Viewer */}
      <div style={{ height: "80vh" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={manualPDF} plugins={[defaultLayoutPluginInstance]} defaultScale={1.0} />
        </Worker>
      </div>

      {/* Botões Aceitar / Cancelar */}
      <div style={{ 
  marginTop: 16, 
  display: "flex", 
  gap: 8, 
  justifyContent: "flex-end" // adiciona isso
}}>
  <button
    style={{
      backgroundColor: "#fff",
      color: "#2960B0",
      border: "1px solid #2960B0",
      padding: "8px 16px",
      cursor: "pointer",
      borderRadius: 4,
    }}
    onClick={() => navigate(-1)}
  >
    Cancelar
  </button>
  <button
    style={{
      backgroundColor: "#2960B0",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      cursor: "pointer",
      borderRadius: 4,
    }}
    onClick={() => alert("Você aceitou o documento!")}
  >
    Aceitar
  </button>
  
</div>
    </DashboardContent>
  );
}
