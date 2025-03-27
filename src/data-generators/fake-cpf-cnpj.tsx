import { cpf, cnpj } from "cpf-cnpj-validator";

export const newCpf = cpf.generate();
export const newCnpj = cnpj.generate();
