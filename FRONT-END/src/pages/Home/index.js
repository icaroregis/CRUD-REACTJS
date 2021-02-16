import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/index.js';
import Status from '../../components/Status';
import Header2 from '../../components/Header2';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

const Home = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [galera, setGalera] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    api.get('/galera').then((response) => {
      setGalera(response.data);
      console.log(response.data);
    });
  }, []);

  async function deleteUser(id) {
    await api.delete(`/galera/${id}`);
    setGalera(
      galera.filter((user) => {
        return user.id !== id;
      })
    );
    setId(null);
    handleClose();
  }

  // Como fazer um tratamento de erros

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const rotas = () => {
    history.push(`/cadastro`);
  };

  function editUser(id) {
    history.push(`/editar/${id}`);
    console.log(id);
  }

  return (
    <>
      <section className='container-headerTwo'>
        <div className='listagem-strong'>
          <Header2 />
          <div className='titulo-two'>
            <strong className='header'>Listagem de Usuários</strong>
          </div>
          <div className='headerAndButton-section'>
            <p className='header-p'>
              Escolha um cliente para visualizar os detalhes
            </p>
            <button className='newUser-button' onClick={rotas}>
              Novo Usuário
            </button>
          </div>
        </div>
        <div>
          <div>
            {galera.map((user) => (
              <Card>
                <div key={user.id} className='section-padrao'>
                  <p>{user.nome}</p>
                  <p>{user.email}</p>
                </div>
                <div className='section-padrao'>
                  <p>{user.cpf}</p>
                  <p>{user.telefone}</p>
                </div>
                <div className='section-padrao'>
                  <Status status={user.status} />
                </div>
                <div className='section-buttons'>
                  <button
                    onClick={() => editUser(user.id)}
                    className='editar-button'
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      handleShow();
                      setId(user.id);
                    }}
                    className='excluir-button'
                  >
                    Excluir
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Lista de Usuários</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir esse Usuário?
            </Modal.Body>
            <Modal.Footer>
              <Button variant='outline-primary' onClick={handleClose}>
                Fechar
              </Button>

              <Button variant='outline-danger' onClick={() => deleteUser(id)}>
                Excluir definitivamente
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default Home;
