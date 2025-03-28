import luhn from "luhn-generator";

// export const cardNumber = luhn.generate;

export const cardNumber = async (): Promise<string> => {
  try {
    const cardNumberResult = await luhn.generate; // Aqui, a Promise é resolvida
    return cardNumberResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o cardNumber:", error);
    return "Erro ao gerar cardNumber";
  }
};
