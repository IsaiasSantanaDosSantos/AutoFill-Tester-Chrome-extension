import { newCep } from "../data-generators/fake-cep";
import { fakeCNH } from "../data-generators/fake-cnh";
import { newCnpj, newCpf } from "../data-generators/fake-cpf-cnpj";
import {
  fullName,
  birthdate,
  email,
  password,
  useId,
  username,
} from "../data-generators/fake-digital-info";
import { fakePhone } from "../data-generators/fake-phoneNumber";
import { fakePIS } from "../data-generators/fake-pis";
import { fakeReservista } from "../data-generators/fake-reservist";
import { fakeRG } from "../data-generators/fake-rg";
import { fakeVoterRegistration } from "../data-generators/fake-voter-registration";
import { cardNumber } from "../data-generators/fakeCreditCard";

// const dataCategories = [
//   newCep,
//   fakeCNH,
//   newCnpj,
//   newCpf,
//   fullName,
//   birthdate,
//   email,
//   password,
//   useId,
//   username,
//   fakePhone,
//   fakePIS,
//   fakeReservista,
//   fakeRG,
//   fakeVoterRegistration,
//   cardNumber,
// ];

const dataGenerators: Record<string, () => string | Promise<string>> = {
  cep: newCep,
  cpf: newCpf,
  cnpj: newCnpj,
  email: email,
  telefone: fakePhone,
  celular: fakePhone,
  nome: fullName,
  nascimento: birthdate,
  senha: password,
  usuario: username,
  rg: fakeRG,
  cnh: fakeCNH,
  pis: fakePIS,
  titulo: fakeVoterRegistration,
  reservista: fakeReservista,
  cartao_credito: cardNumber,
  id: useId,
};

export async function generateFakeData(category: string): Promise<string> {
  const generator = dataGenerators[category];
  if (generator) {
    const result = await generator(); // Aguarda a função ser resolvida, seja síncrona ou assíncrona
    return result;
  }

  return "Categoria não encontrada";
}
