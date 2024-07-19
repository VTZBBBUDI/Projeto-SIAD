export const formatPhoneNumber = (value: string): string => {
  // Remove caracteres que não são dígitos
  const phoneNumber = value.replace(/\D/g, '');

  // Formata o telefone conforme o usuário digita
  if (phoneNumber.length <= 2) {
    return `(${phoneNumber}`;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  } else if (phoneNumber.length <= 10) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
  } else {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  }
};
