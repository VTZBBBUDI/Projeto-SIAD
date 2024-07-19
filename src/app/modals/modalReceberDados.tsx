import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Interface para as propriedades do modal
interface ModalProps {
  isOpen: boolean; // Estado que indica se o modal está aberto ou fechado
  onClose: () => void; // Função para fechar o modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Estado para armazenar o e-mail digitado
  const [email, setEmail] = useState('');
  // Estado para armazenar os dados do contato retornados pela API
  const [contatoData, setContatoData] = useState<any>(null);
  // Estado para indicar se a requisição está em andamento
  const [loading, setLoading] = useState(false);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState('');

  // Função chamada quando o valor do campo de entrada muda
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Função para buscar o contato na API com base no e-mail
  const buscarContato = () => {
    setLoading(true); // Inicia o carregamento
    setError(''); // Reseta o erro

    fetch(`https://fjinfor.ddns.net/fvendas/api/api_contato.php?funcao=get_contato_email&email=${email}`)
      .then(response => {
        console.log('Status da resposta:', response.status); // Log do status da resposta
        return response.json();
      })
      .then(data => {
        console.log('Dados recebidos da API:', data); // Log dos dados recebidos
        if (Array.isArray(data) && data.length > 0) {
          setContatoData(data[0]); // Armazena o primeiro item dos dados retornados
        } else {
          setError('Nenhum contato encontrado ou dados inválidos.'); // Mensagem de erro se nenhum contato for encontrado
        }
      })
      .catch(error => {
        console.error('Erro ao buscar contato:', error); // Log do erro
        setError('Erro ao buscar contato. Por favor, tente novamente.'); // Mensagem de erro em caso de falha na requisição
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento independentemente do sucesso ou falha da requisição
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="relative w-2/5 bg-white rounded-lg shadow-lg p-8">
        <button 
          onClick={onClose} 
          className="absolute top-0 right-0 p-2 m-4 mr-0 mt-0 text-red-500 hover:text-red-600 focus:outline-none"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Buscar Contato por E-mail</h2>
        <h3 className='font-semibold mb-1 ml-1'>Digite seu e-mail:</h3>
        <div className="flex">
          <input 
            type="email" 
            value={email} 
            onChange={handleInputChange} 
            placeholder="Digite o e-mail" 
            className="border p-2 w-full mr-2 rounded-lg" 
          />
          <button 
            onClick={buscarContato} 
            className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center ml-4"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </div>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {contatoData && (
          <div>
            <hr className="my-4 border-2 rounded" />
            <h3 className="text-lg font-semibold mt-4">Dados do Contato</h3>
            <p className='mt-4'>E-mail: {contatoData.email}</p>
            <p className='mt-[24px]'>Segmento: {contatoData.segmento}</p>
            <p className='mt-[24px]'>Mensagem:</p>
            <p className='mt-2 border rounded p-2 bg-gray-100'>{contatoData.informacao}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
