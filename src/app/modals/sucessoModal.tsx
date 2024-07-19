import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Interface para as propriedades do modal de sucesso
interface SucessoModalProps {
  mensagem: string; // Mensagem de sucesso a ser exibida no modal
  onClose: () => void; // Função para fechar o modal
}

const SucessoModal: React.FC<SucessoModalProps> = ({ mensagem, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-2/5 bg-white rounded-lg shadow-lg">
        <button 
          onClick={onClose} 
          className="absolute top-0 right-0 p-2 m-4 mr-0 mt-0 text-red-500 hover:text-red-600 focus:outline-none"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <div className="bg-green-500 p-10 h-36 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Enviada com sucesso!</h2>
          <p className="text-white">{mensagem}</p>
        </div>
      </div>
    </div>
  );
};

export default SucessoModal;
