import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header2 from '../../components/Header2';
import './styles.css';
import api from '../../services/api';

export default function Cadastro() {
  const history = useHistory();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [CPF, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState('');
  const [notificacao, setNotificacao] = useState(null);
  const params = useParams();
  const [isEdit, setIsEdit] = useState(true);
  const [data, setData] = useState({
    nome: '',
    email: '',
    CPF: '',
    telefone: '',
    status: '',
    id: '',
  });

  useEffect(() => {
    if (params.id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [params.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    api.put(`/editar/:id/${params.id}`, data).then((response) => {
      setData(response.id);
    });

    // * atualizar um usuário
    await api.put(`galera/${params.id}`, {
      nome,
      email,
      CPF,
      telefone,
      status,
    });
    console.log(params.id);
    /*toast.success('Usuário editado com sucesso');*/
    history.push('/');
  }

  const handleBack = () => {
    localStorage.clear();
    history.push('/');
  };

  const handleClick = () =>
    api
      .post('/galera', {
        nome,
        email,
        CPF,
        telefone,
        status,
      })
      .then(() => {
        if (!nome && !email && !CPF && telefone && status) {
          console.error('Por favor, preencha todos os campos');
          return;
        }
        setNome('');
        setEmail('');
        setCpf('');
        setTelefone('');
        setStatus('');
        setNotificacao('Usuário cadastrado com sucesso!');
        setTimeout(() => {
          setNotificacao(null);
        }, 5000);
      })
      .catch((erro) => console.error('ops! ocorreu um erro' + erro));

  useEffect(() => {
    if (params.id) {
      api.get(`galera/${params.id}`).then((response) => {
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCpf(response.data.CPF);
        setTelefone(response.data.telefone);
        setStatus(response.data.status);
      });
    }
  }, [params]);

  return (
    <>
      <section className='section-cadastro'>
        <div className='div-herder2'>
          <Header2 />
        </div>
        <section className='section-cadastroTwo'>
          <div className='titulo-cadastro'>
            <strong className='header-cadastro'>Novo Usuário</strong>
          </div>
          <div className='paragrafo-cadastro'>
            <p>Informe os campos a seguir para criar novo usuário:</p>
          </div>
        </section>
        <form onSubmit={handleSubmit} className='section-cadastroThree'>
          <input
            required
            value={nome}
            onChange={({ target }) => setNome(target.value)}
            type='text'
            placeholder='Nome'
          />
          <input
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type='text'
            placeholder='E-mail'
          />
          <input
            required
            value={CPF}
            onChange={({ target }) => setCpf(target.value)}
            type='text'
            placeholder='CPF'
          />
          <input
            required
            value={telefone}
            onChange={({ target }) => setTelefone(target.value)}
            type='text'
            placeholder='telefone'
          />
          <input
            required
            value={status}
            onChange={({ target }) => setStatus(target.value)}
            type='text'
            placeholder='status. por exemplo: ativo, inativo etc'
          />

          <section className='section-cadastroFour'>
            <div>
              <strong>{notificacao}</strong>
            </div>

            {
              isEdit ? (
                <button type='Submit' className='button-cadastro'>
                  {' '}
                  Editar{' '}
                </button>
              ) : (
                <button onClick={handleClick} className='button-cadastro'>
                  Salvar
                </button>
              )

              /* <button onClick={handleClick} className='button-cadastro'>
                {isEdit ? 'Salvar' : 'Criar'}
              </button>*/
            }

            <button onClick={handleBack} className='button-cadastro'>
              Voltar
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
