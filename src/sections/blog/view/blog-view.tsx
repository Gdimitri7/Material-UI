import "./All.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaClipboardList, FaKey, FaShieldAlt } from "react-icons/fa";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DashboardContent } from "src/layouts/dashboard";  

// ----------------------------------------------------------------------

export function BlogView() {
  const navigate = useNavigate();

  const initialDocs = [  
    {
      title: "Manual da Proteção de Dados",
      details: "Conteúdo completo do Manual da Proteção de Dados...",
      icon: <FaFileAlt className="document-icon" />,
      route: "/blog/manual",
    },
    {
      title: "Código de Conduta",
      details: "Detalhes completos do Código de Conduta...",
      icon: <FaClipboardList className="document-icon" />,
      route: "/blog/conduct",
    },
    {
      title: "Política de Proteção de Dados",
      details: "Política detalhada sobre proteção de dados...",
      icon: <FaShieldAlt className="document-icon" />,
      route: "/blog/policy",
    },
    {
      title: "Gestão de Acessos",
      details: "Informações completas sobre gestão de acessos...",
      icon: <FaKey className="document-icon" />,
      route: "/blog/manager",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Todos os Documentos de Proteção de Dados
        </Typography>
      </Box>

      <div className="cards-grid">
        {initialDocs.map((doc, index) => (
          <div
            key={index}
            className={`document-card ${expandedIndex === index ? "expanded" : ""}`}
          >
            {doc.icon}
            <div className="document-content">
              <h2 className="document-title">{doc.title}</h2>
              <div className="document-details">{doc.details}</div>
            </div>
            <div className="document-action">
              <button onClick={() => toggleExpand(index, doc.route)}>
                {doc.route
                  ? "Ler / Aceitar"
                  : expandedIndex === index
                  ? "Fechar"
                  : "Ler / Aceitar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardContent>
  );
}
