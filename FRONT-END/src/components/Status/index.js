import React from 'react';
import './styles.css';

const Status = ({ status }) => {
  const alteraStatus = () => {
    return status === 'aguardando ativação' ? 'aguardando' : status;
  };
  return (
    <div className="status-bolinha">
      <div className={`bolinha-status ${alteraStatus()}`}></div>
      <p>{status}</p>
    </div>
  );
};

export default Status;
