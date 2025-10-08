import "./All.css";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaFileAlt, FaPlus } from "react-icons/fa";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import api from "src/services/api"; // Axios com interceptors já configurado
import { DashboardContent } from "src/layouts/dashboard";

interface DocumentType {
  id: number;
  title: string;
  details: string;
  fileUrl?: string;
  recipients: number[];
}

interface UserType {
  id: number;
  username: string;
}

export function BlogView() {
  const navigate = useNavigate();

  // Pega o usuário logado do localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id || null;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [docs, setDocs] = useState<DocumentType[]>([]);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  const [newDoc, setNewDoc] = useState({
    title: "",
    details: "",
    file: null as File | null,
    recipients: [] as number[],
  });

  // ---------------- Fetch documents e usuários ----------------
  useEffect(() => {
    if (!userId) return; // garante que usuário existe

    const fetchDocuments = async () => {
      try {
        const res = await api.get("/documents");
        const myDocs = res.data.filter(
          (doc: DocumentType) =>
            !doc.recipients?.length || doc.recipients.includes(userId)
        );
        setDocs(myDocs);
      } catch (err) {
        console.error("Erro ao buscar documentos:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setAllUsers(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };

    fetchDocuments();
    fetchUsers();
  }, [userId]);

  // ---------------- Handlers ----------------
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDoc({ ...newDoc, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setNewDoc({ ...newDoc, file: e.target.files[0] });
  };

  const handleRecipientsChange = (e: SelectChangeEvent<number[]>) => {
    const value = e.target.value;
    setNewDoc({
      ...newDoc,
      recipients: typeof value === "string" ? value.split(",").map(Number) : value,
    });
  };

  const handleAddDocument = async () => {
    if (!newDoc.title.trim() || !newDoc.file || newDoc.recipients.length === 0) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newDoc.title);
      formData.append("details", newDoc.details);
      formData.append("file", newDoc.file);
      formData.append("recipients", JSON.stringify(newDoc.recipients));

      const res = await api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Adiciona o documento recém-criado no topo
      setDocs([res.data, ...docs]);
      setNewDoc({ title: "", details: "", file: null, recipients: [] });
      handleCloseModal();
    } catch (err) {
      console.error("Erro ao criar documento:", err);
      alert("Erro ao criar documento");
    }
  };

  // ---------------- JSX ----------------
  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Todos os Documentos de Proteção de Dados</Typography>

        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={handleOpenModal}
          sx={{
            backgroundColor: "#031634",
            color: "#fff",
            "&:hover": { backgroundColor: "#1f4d91" },
          }}
        >
          Novo Documento
        </Button>
      </Box>

      <div className="cards-grid">
        {docs.map((doc, index) => (
          <div
            key={doc.id}
            className={`document-card ${expandedIndex === index ? "expanded" : ""}`}
          >
            <FaFileAlt className="document-icon" />
            <div className="document-content">
              <h2 className="document-title">{doc.title}</h2>
              <div className="document-details">{doc.details}</div>
              {doc.fileUrl && (
                <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                  Abrir PDF
                </a>
              )}
            </div>
            <div className="document-action">
              <button onClick={() => toggleExpand(index)}>
                {expandedIndex === index ? "Fechar" : "Ler Mais"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE CRIAÇÃO */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Criar Novo Documento</Typography>

          <TextField
            label="Título"
            name="title"
            value={newDoc.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Descrição"
            name="details"
            value={newDoc.details}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />

          <input type="file" onChange={handleFileChange} />

          <Box>
            <InputLabel>Destinatários</InputLabel>
            <Select
              multiple
              value={newDoc.recipients}
              onChange={handleRecipientsChange}
              fullWidth
            >
              {allUsers.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.username}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={handleCloseModal} color="inherit">
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddDocument}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardContent>
  );
}
