import "../view/emails.css";

// 2. external imports
import { useState } from "react";

// 3. internal imports
import { DashboardContent } from "src/layouts/dashboard";

export function EmailsView() {
  const [emails, setEmails] = useState([
    { id: 1, usuario: "Gustavo Silva", email: "gustavo@gmail.com", lido: true, entregue: true, aceite: false },
    { id: 2, usuario: "Maria Oliveira", email: "maria@gmail.com", lido: true, entregue: false, aceite: true },
    { id: 3, usuario: "João Pereira", email: "joao@gmail.com", lido: false, entregue: false, aceite: false },
    { id: 4, usuario: "Ana Costa", email: "ana@gmail.com", lido: true, entregue: true, aceite: true },
    { id: 5, usuario: "Pedro Lima", email: "pedro@gmail.com", lido: false, entregue: true, aceite: false },
  ]);

  const toggleCheckbox = (id: number, field: "lido" | "entregue" | "aceite") => {
    setEmails(prev => prev.map(e => (e.id === id ? { ...e, [field]: !e[field] } : e)));
  };

  const handleResend = (email: string) => {
    alert(`Email reenviado para: ${email}`);
  };

  // paginação simples
  const rowsPerPage = 5;
  const [page, setPage] = useState(0);
  const displayedEmails = emails.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleChangePage = (direction: "next" | "prev") => {
    if (direction === "next" && (page + 1) * rowsPerPage < emails.length) setPage(page + 1);
    if (direction === "prev" && page > 0) setPage(page - 1);
  };

  return (
    <DashboardContent>
      <h1 className="emails-header">Emails Enviados pelo Sistema</h1>
      <hr className="emails-divider" />

      <div className="emails-list">
        <table className="emails-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Entregue</th>
              <th>Lido</th>
              <th>Aceito</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmails.map(e => (
              <tr key={e.id}>
                <td>{e.usuario}</td>
                <td>{e.email}</td>
                <td className="checkbox-center">
                  <input type="checkbox" checked={e.entregue} onChange={() => toggleCheckbox(e.id, "entregue")} />
                </td>
                <td className="checkbox-center">
                  <input type="checkbox" checked={e.lido} onChange={() => toggleCheckbox(e.id, "lido")} />
                </td>
                <td className="checkbox-center">
                  <input type="checkbox" checked={e.aceite} onChange={() => toggleCheckbox(e.id, "aceite")} />
                </td>
                <td className="actions-cell">
                  <button className="send-email-btn" onClick={() => handleResend(e.email)}>
                    Reenviar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação simples */}
        <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
          <button className="send-email-btn" onClick={() => handleChangePage("prev")}>Anterior</button>
          <button className="send-email-btn" onClick={() => handleChangePage("next")}>Próximo</button>
        </div>
      </div>
    </DashboardContent>
  );
}

export default EmailsView;
