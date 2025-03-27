export const fakeCNH = () => {
    // Gera os primeiros 9 dígitos aleatórios
    const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
  
    // Calcula os dígitos verificadores
    const calculateDV = (num: string) => {
      let sum = 0, weight = 2;
  
      // Primeiro dígito verificador
      for (let i = num.length - 1; i >= 0; i--) {
        sum += parseInt(num[i]) * weight;
        weight++;
      }
  
      let firstDV = sum % 11;
      if (firstDV >= 10) firstDV = 0; // Regra do módulo 11
  
      // Segundo dígito verificador
      sum = firstDV * 2;
      weight = 3;
      for (let i = num.length - 1; i >= 0; i--) {
        sum += parseInt(num[i]) * weight;
        weight++;
      }
  
      let secondDV = sum % 11;
      if (secondDV >= 10) secondDV = 0;
  
      return `${firstDV}${secondDV}`;
    };
  
    return `${base}${calculateDV(base)}`;
  };
  