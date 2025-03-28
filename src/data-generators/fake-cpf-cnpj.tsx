import { cpf, cnpj } from "cpf-cnpj-validator";

// export const newCnpj = cnpj.generate();

export const newCpf = async (): Promise<string> => {
  try {
    const cpfResult = await cpf.generate(); // Aqui, a Promise é resolvida
    return cpfResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o CPF:", error);
    return "Erro ao gerar CPF";
  }
};

export const newCnpj = async (): Promise<string> => {
  try {
    const cnpjResult = await cnpj.generate(); // Aqui, a Promise é resolvida
    return cnpjResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o CNPJ:", error);
    return "Erro ao gerar CNPJ";
  }
};
