console.log("✅ Content script carregado!");

interface FormFields {
  nome: string;
  id: string;
  placeholder: string;
  tipo: string;
  category?: string;
}

function fillInFields(fields: FormFields[]) {
  fields.forEach((field) => {
    const element = document.querySelector(
      `[name="${field.nome}"], [id="${field.id}"]`
    );
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    ) {
      element.value = "Teste Preenchimento";
      element.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log("📩 Mensagem recebida no content script:", request);

  if (request.action === "getFields") {
    console.log("sender: ", sender);
    const fields = Array.from(
      document.querySelectorAll("input, textarea, select")
    ).map((el) => ({
      nome: el.getAttribute("name") || "sem_nome",
      id: el.id || "",
      placeholder: el.getAttribute("placeholder") || "",
      tipo: el.tagName.toLowerCase(),
      value: (el as HTMLInputElement).value || "",
    }));

    sendResponse({ fields });
    console.log("Campos coletados:", fields);

    fillInFields(fields);

    return true;
  }
});

function captureAllFormFields(): FormFields[] {
  const elements = document.querySelectorAll("input, textarea, select");

  console.log(`📌 Número de campos encontrados: ${elements.length}`);

  const fields: FormFields[] = [];

  elements.forEach((element) => {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    ) {
      const fieldData = {
        nome: element.getAttribute("name") || "",
        id: element.getAttribute("id") || "",
        placeholder: element.getAttribute("placeholder") || "",
        tipo:
          element instanceof HTMLInputElement
            ? element.type
            : element.tagName.toLowerCase(),
      };

      // console.log("📌 Campo encontrado:", fieldData);
      fields.push(fieldData);
    }
  });

  return fields;
}

function classifyField(campo: FormFields) {
  const nome = campo.nome.toLowerCase();
  const id = campo.id.toLowerCase();
  const placeholder = campo.placeholder.toLowerCase();
  const tipo = campo.tipo;

  const categorias = [
    { keys: ["cpf"], categoria: "cpf" },
    { keys: ["rg"], categoria: "rg" },
    { keys: ["nis"], categoria: "nis" },
    { keys: ["cnpj"], categoria: "cnpj" },
    { keys: ["email"], categoria: "email" },
    { keys: ["password", "senha"], categoria: "password" },
    {
      keys: [
        "passwordCheck",
        "verificar-senha",
        "verificarSenha",
        "verificar_senha",
      ],
      categoria: "passwordCheck",
    },
    { keys: ["telefone"], categoria: "telefone" },
    { keys: ["celular"], categoria: "celular" },
    { keys: ["fantasia", "fantasyName"], categoria: "fantasyName" },
    {
      keys: [
        "inscricao-estadual",
        "inscricao_estadual",
        "stateRegistration",
        "inscricaoEstadual",
      ],
      categoria: "inscricao-estadual",
    },
    { keys: ["cep"], categoria: "cep" },
    { keys: ["creditCar", "cartao", "card"], categoria: "creditCar_radio" },
    { keys: ["boleto", "ticket"], categoria: "ticket_radio" },
    { keys: ["pix"], categoria: "pix_radio" },
    {
      keys: ["escola", "shool", "instituicao", "institution", "Instituição"],
      categoria: "shcool",
    },
    { keys: ["validade"], categoria: "validade" },
    {
      keys: [
        "security-code",
        "security_code",
        "securityCode",
        "codigoSeguranca",
        "codigo-seguranca",
        "codigo_seguranca",
      ],
      categoria: "security-code",
    },
    { keys: ["nome", "name", "customerName"], categoria: "nome" },
    { keys: ["endereco", "address"], categoria: "endereco" },
    { keys: ["number", "numero"], categoria: "numero-residencia" },
    { keys: ["neighborhood", "bairro"], categoria: "neighborhood" },
    { keys: ["complement", "complemento"], categoria: "complement" },
    { keys: ["captcha", "captchaCode"], categoria: "captcha" },
    { keys: ["coupon", "cupom"], categoria: "coupon" },
    {
      keys: ["corporateReason", "razao-social", "razao_social", "razaoSocial"],
      categoria: "corporateReason",
    },
    { keys: ["city", "cidade"], categoria: "cidade" },
    { keys: ["estado", "state"], categoria: "estado" },
    {
      keys: ["countryCode", "codigo-pais", "codigo_pais", "codigoPais"],
      categoria: "countryCode",
    },
    {
      keys: ["data", "date", "date-nasc", "date_nasc", "dateNasc"],
      categoria: "data_nascimento",
    },
    { keys: ["pis"], categoria: "pis" },
    { keys: ["titulo"], categoria: "titulo" },
    { keys: ["Digite aqui"], categoria: "textarea" },
  ];

  for (const categoria of categorias) {
    if (
      categoria.keys.some(
        (key) =>
          nome.includes(key) ||
          id.includes(key) ||
          placeholder.includes(key) ||
          tipo.includes(key)
      )
    ) {
      return categoria.categoria;
    }
  }

  return "desconhecido";
}

function captureAndSortFields(): FormFields[] {
  const fields = captureAllFormFields();

  const classifiedFields = fields.map((field) => {
    return {
      ...field,
      category: classifyField(field),
    };
  });

  console.log("Campos encontrados: ", classifiedFields);
  return classifiedFields;
}

function callSequentially() {
  const times = [5000, 10000];
  times.forEach((time) => {
    setTimeout(() => {
      captureAndSortFields();
    }, time);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("📌 DOM completamente carregado!");
  captureAndSortFields();
  callSequentially();
});
