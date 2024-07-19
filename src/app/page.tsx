"use client";

import React, { useState } from 'react';
import Image from 'next/image'
import Modal from './modals/modalReceberDados';
import Formulario from './form';
import ErroModal from './modals/erroModal';
import SucessoModal from './modals/sucessoModal';

const Page: React.FC = () => {
  // Estados para controlar a abertura do modal, o sucesso do envio e erros
  const [modalOpen, setModalOpen] = useState(false);
  const [envioSucesso, setEnvioSucesso] = useState(false);
  const [envioErro, setEnvioErro] = useState('');

  // Função para abrir o modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Função para fechar o modal e resetar os estados de sucesso e erro
  const handleCloseModal = () => {
    setModalOpen(false);
    setEnvioSucesso(false);
    setEnvioErro('');
  };

  // Função chamada ao submeter o formulário
  const handleSubmitForm = async (formData: any) => {
    console.log('Dados do formulário:', formData);

    try {
      // Verifica se o e-mail já está cadastrado
      const emailExiste = await verificarEmailNaAPI(formData.email);
      if (emailExiste) {
        throw new Error('Seu email já foi cadastrado.');
      }

      // Envia os dados do formulário para a API
      const response = await fetch('https://fvendas.ddns.net/api/contato/1', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Resposta da API:', data);

      // Verifica se a resposta da API foi bem-sucedida
      if (response.ok) {
        if (response.status === 201) {
          setEnvioSucesso(true);
          setEnvioErro('');
          console.log('Registros inseridos com sucesso.');
        } else {
          setEnvioSucesso(false);
          setEnvioErro(data.message || 'Erro ao inserir registros.');
          console.error('Erro ao inserir registros:', data.message || 'Erro desconhecido');
        }
      } else {
        throw new Error('Erro na requisição.');
      }
    } catch (error) {
      setEnvioSucesso(false);
      setEnvioErro(error.message || 'Erro ao enviar dados. Verifique sua conexão ou tente novamente mais tarde.');
      console.error('Erro ao enviar dados:', error);
    }
  };

  // Função para verificar se o e-mail já está cadastrado na API
  const verificarEmailNaAPI = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://fjinfor.ddns.net/fvendas/api/api_contato.php?funcao=get_contato_email&email=${email}`);
      const data = await response.json();
      console.log('Resposta de verificação de email:', data);

      // Retorna true se o e-mail estiver cadastrado, caso contrário, retorna false
      if (response.ok && data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao verificar email na API:', error);
      throw new Error('Erro ao verificar email na API.');
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='relative w-4/5 h-screen overflow-hidden'>
        <Image 
          src="/background.png" 
          alt="Background-image" 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0"
        />
      </div>
      <div className='w-3/7 p-0 overflow-auto'>
        <Formulario onSubmit={handleSubmitForm} onOpenModal={handleOpenModal} />
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} />
      {envioSucesso && <SucessoModal mensagem="Sua mensagem foi enviada com sucesso, entraremos em contato em breve!" onClose={handleCloseModal} />}
      {envioErro && <ErroModal mensagem={`${envioErro}`} onClose={handleCloseModal} />}
    </div>
  );
};

export default Page;
