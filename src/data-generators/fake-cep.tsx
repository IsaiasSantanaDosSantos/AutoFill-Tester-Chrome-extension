// import cepPromise from "cep-promise";

// // Função para gerar um CEP aleatório válido
// export const generateRandomCep = (): string => {
//   const randomCep = Math.floor(Math.random() * 90000) + 10000; // Gera um número entre 10000 e 99999
//   return `${randomCep}-${Math.floor(Math.random() * 900) + 100}`; // Completa com o formato XXXXX-XXX
// };

// Função para buscar o número do CEP gerado
// export const newCep = async (): Promise<string> => {
//   try {
//     const randomCep = generateRandomCep(); // Gera um CEP aleatório válido
//     const cepResult = await cepPromise(randomCep); // Passa o CEP gerado para a função `cep-promise`

//     console.log("CEP Gerado: ", cepResult);
//     // Retorna apenas o número do CEP gerado, sem detalhes adicionais
//     return cepResult.cep; // Retorna apenas o número do CEP
//   } catch (error) {
//     console.error("Erro ao gerar o CEP:", error);
//     return "Erro ao gerar CEP";
//   }
// };

const cepsReais = [
  "01001-000",
  "20040-003",
  "30130-030",
  "70040-010",
  "40010-000",
  "50010-000",
  "69005-020",
  "80010-000",
  "90010-001",
  "85860-000",
  "64000-000",
  "49000-000",
  "88015-310",
  "35110-020",
  "55000-000",
  "69100-000",
  "61000-000",
  "35000-000",
  "65000-000",
  "69050-000",
  "75000-000",
  "78100-000",
  "58000-000",
  "69030-000",
  "20700-000",
  "66000-000",
  "35010-000",
  "14800-000",
  "29300-000",
  "68700-000",
  "75010-000",
  "21000-000",
  "23000-000",
  "11010-000",
  "95000-000",
  "74000-000",
  "57000-000",
  "88060-000",
  "10000-000",
  "26400-000",
  "86000-000",
  "15000-000",
  "67000-000",
  "84000-000",
  "32000-000",
  "24000-000",
  "29000-000",
  "20010-000",
  "02010-000",
  "75090-000",
  "34000-000",
  "12000-000",
];

export const newCep = () => {
  const randomCep = cepsReais[Math.floor(Math.random() * cepsReais.length)];
  console.log("CEP aleatório escolhido: ", randomCep);
  return randomCep;
};
