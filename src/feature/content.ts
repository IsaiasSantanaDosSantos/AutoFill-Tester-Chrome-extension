function getFieldType(name: string, placeholder: string): string {
  const text = (name + " " + placeholder).toLowerCase();

  if (text.includes("cpf")) return "CPF";
  if (text.includes("cnpj")) return "CNPJ";
  if (text.includes("email")) return "E-mail";
  if (text.includes("telefone") || text.includes("celular")) return "Telefone";
  if (text.includes("cep")) return "CEP";
  if (text.includes("endereço")) return "Endereço";
  if (text.includes("rg")) return "RG";
  if (text.includes("cartão") || text.includes("credito"))
    return "Cartão de Crédito";

  return "Texto Genérico";
}

export default getFieldType;
