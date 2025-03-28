import { faker } from "@faker-js/faker";

// export const useId = faker.string.uuid();
// export const email = faker.internet.email()
// export const username = faker.internet.username();
// export const password = faker.internet.password();
// export const birthdate = faker.date.birthdate();
// export const fullName = faker.person.fullName();

export const useId = async (): Promise<string> => {
  try {
    const useIdResult = await faker.string.uuid(); // Aqui, a Promise é resolvida
    return useIdResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o useId: ", error);
    return "Erro ao gerar useId";
  }
};

export const email = async (): Promise<string> => {
  try {
    const emailResult = await faker.internet.email(); // Aqui, a Promise é resolvida
    return emailResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o email: ", error);
    return "Erro ao gerar email";
  }
};

export const username = async (): Promise<string> => {
  try {
    const usernameResult = await faker.internet.username(); // Aqui, a Promise é resolvida
    return usernameResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o username: ", error);
    return "Erro ao gerar username";
  }
};

export const password = async (): Promise<string> => {
  try {
    const passwordResult = await faker.internet.password(); // Aqui, a Promise é resolvida
    return passwordResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o password: ", error);
    return "Erro ao gerar password";
  }
};

export const birthdate = async (): Promise<string> => {
  try {
    const birthdateResult = await faker.date.birthdate(); // Aqui, a Promise é resolvida
    return birthdateResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o birthdate: ", error);
    return "Erro ao gerar birthdate";
  }
};

export const fullName = async (): Promise<string> => {
  try {
    const fullNameResult = await faker.person.fullName(); // Aqui, a Promise é resolvida
    return fullNameResult.toString(); // Garantir que o resultado seja uma string
  } catch (error) {
    console.error("Erro ao gerar o fullName: ", error);
    return "Erro ao gerar fullName";
  }
};
