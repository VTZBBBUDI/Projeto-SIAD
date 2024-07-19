import React, { useState } from 'react';
import { formatPhoneNumber } from './utils/formatPhoneNumber';
import Image from 'next/image';
import './globals.css';

// Define as propriedades que o componente Formulario aceitará
interface FormularioProps {
  onSubmit: (formData: FormData) => void; // Função chamada ao submeter o formulário
  onOpenModal: () => void; // Função chamada ao clicar no botão "Receber Dados"
}

// Define o formato dos dados do formulário
interface FormData {
  nome: string;
  telefone: string;
  email: string;
  segmento: string;
  informacao: string;
}

// Componente funcional que representa o formulário
const Formulario: React.FC<FormularioProps> = ({ onSubmit, onOpenModal }) => {
  // Estado local para armazenar os dados do formulário
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    email: '',
    segmento: '',
    informacao: ''
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Formata o número de telefone se o campo "telefone" for alterado
    if (name === 'telefone') {
      const formattedPhoneNumber = value === '' ? '' : formatPhoneNumber(value);
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedPhoneNumber
      }));
    } 
    // Limita o valor do campo "informacao" a 191 caracteres
    else if (name === 'informacao') {
      const limitedValue = value.slice(0, 191);
      setFormData(prevState => ({
        ...prevState,
        [name]: limitedValue
      }));
    } 
    // Atualiza o estado para outros campos do formulário
    else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Função chamada ao submeter o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    onSubmit(formData); // Chama a função onSubmit passando os dados do formulário
  };

  return (
    <div className="w-full max-w-lg h-full flex flex-col">
      <div className="bg-white shadow-md border border-gray-300 p-[15] flex flex-col flex-grow">
        <div className="text-center mb-6 mt-2 mx-4">
          <Image 
            src="/Logo.jpeg" 
            alt="Descrição da Imagem" 
            layout="responsive" 
            width={236} 
            height={81}
            className="object-cover" 
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-grow">
          <div className="flex flex-col pt-2">
            <label htmlFor="nome" className="mx-4 block">Nome Completo:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              className="mx-4 border p-2 h-[45px] rounded-[10px] border-[1px]" 
              placeholder="Ex: Maria do Carmo" 
              required 
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="telefone" className="mx-4 block">Telefone:</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              value={formData.telefone} 
              onChange={handleChange} 
              className="mx-4 border p-2 h-[45px] rounded-[10px] border-[1px]" 
              placeholder="(27)3700-3700" 
              required 
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="email" className="mx-4 block">E-mail:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="mx-4 border p-2 h-[45px] rounded-[10px] border-[1px]" 
              placeholder="mariadocarmo@gmail.com" 
              required 
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="segmento" className="mx-4 block">Segmento:</label>
            <select 
              id="segmento" 
              name="segmento" 
              value={formData.segmento} 
              onChange={handleChange} 
              className="mx-4 border p-2 h-[45px] rounded-[10px] border-[1px] bg-transparent" 
              required
            >
              <option value="" disabled selected className="select-placeholder">Selecione um segmento...</option>
              <option value="Mercearia">Mercearia</option>
              <option value="Farmacia">Farmacia</option>
              <option value="Consultorio">Consultorio</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="informacao" className="mx-4 block">Como podemos te ajudar?</label>
            <textarea 
              id="informacao" 
              name="informacao" 
              value={formData.informacao} 
              onChange={handleChange}  
              className="mx-4 border p-2 rounded-[10px] border-[1px] h-28" 
              maxLength={191}
              required 
            />
            <div className="mx-4 text-right text-sm text-gray-500">
              {formData.informacao.length}/191 caracteres
            </div>
          </div>
          <div className="flex flex-col pt-2 space-y-10 mt-auto">
            <button 
              type="submit" 
              className="mx-4 h-[70px] bg-custom-blue text-white p-2 rounded-[5px] hover:bg-blue-600"
            >
              Enviar
            </button>
            <button 
              type="button" 
              onClick={onOpenModal} 
              className="mx-4 h-[70px] bg-custom-gray text-white p-2 rounded-[5px] hover:bg-gray-600"
            >
              Receber Dados
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default Formulario;
