import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Interface para as propriedades do modal de erro
interface ErroModalProps {
  mensagem: string; // Mensagem de erro a ser exibida no modal
  onClose: () => void; // Função para fechar o modal
}

const ErroModal: React.FC<ErroModalProps> = ({ mensagem, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-2/5 bg-white rounded-lg shadow-lg">
        <button 
          onClick={onClose} 
          className="absolute top-0 right-0 p-2 m-4 mr-0 mt-0 text-white hover:text-gray-600 focus:outline-none"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <div className='bg-red-800 rounded-lg p-10 h-36'>
          <h2 className="text-white text-lg font-semibold mb-4">Erro ao enviar sua mensagem!</h2>
          <p className="text-white">{mensagem}</p>
        </div>
      </div>
    </div>
  );
};

export default ErroModal;
