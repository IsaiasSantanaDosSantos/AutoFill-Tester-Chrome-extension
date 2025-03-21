console.log("✅ Content script carregado!");

interface FormFields {
  nome: string;
  id: string;
  placeholder: string;
  tipo: string;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📩 Mensagem recebida no content script:", request);

  if (request.action === "getFields") {
    console.log("sender: ", sender);
    const fields = Array.from(
      document.querySelectorAll("input, textarea, select")
    ).map((el) => ({
      nome: el.getAttribute("name") || el.id || "sem_nome",
      type: el.tagName.toLowerCase(),
      value: (el as HTMLInputElement).value || "",
    }));

    sendResponse({ fields });
    console.log("Campos coletados:", fields);
  }
});

function captureAllFormFields(): FormFields[] {
  const elements = document.querySelectorAll("input, textarea, select");

  console.log(`📌 Número de formulários encontrados: ${elements.length}`);

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
    { keys: ["passwordCheck", "verificar-senha","verificarSenha", "verificar_senha"], categoria: "passwordCheck" },
    { keys: ["telefone"], categoria: "telefone" },
    { keys: ["celular"], categoria: "celular" },
    { keys: ["fantasia", "fantasyName"], categoria: "fantasyName" },
    { keys: ["inscricao-estadual","inscricao_estadual", "stateRegistration", "inscricaoEstadual"], categoria: "inscricao-estadual" },
    { keys: ["cep"], categoria: "cep" },
    { keys: ["cartao", "card"], categoria: "cartao" },
    { keys: ["escola", "shool", "instituicao", "institution", "Instituição"], categoria: "shcool" },
    { keys: ["validade"], categoria: "validade" },
    { keys: ["security-code", "security_code", "securityCode", "codigoSeguranca", "codigo-seguranca", "codigo_seguranca"], categoria: "security-code" },
    { keys: ["nome", "name","customerName"], categoria: "nome" },
    { keys: ["endereco", "address"], categoria: "endereco" },
    { keys: ["number", "numero"], categoria: "numero_casa" },
    { keys: ["neighborhood", "bairro"], categoria: "neighborhood" },
    { keys: ["complement", "complemento"], categoria: "complement" },
    { keys: ["captcha", "captchaCode"], categoria: "captcha" },
    { keys: ["coupon", "cupom"], categoria: "coupon" },
    { keys: ["corporateReason", "razao-social","razao_social", "razaoSocial"], categoria: "corporateReason" },
    { keys: ["city", "cidade"], categoria: "cidade" },
    { keys: ["estado", "state"], categoria: "estado" },
    { keys: ["countryCode", "codigo-pais", "codigo_pais", "codigoPais"], categoria: "countryCode" },
    { keys: ["data", "date", "date-nasc", "date_nasc", "dateNasc"], categoria: "data_nascimento" },
    { keys: ["pis"], categoria: "pis" },
    { keys: ["titulo"], categoria: "titulo" },
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

function captureAndSortFields() {
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("📌 DOM completamente carregado!");
  captureAndSortFields();
});

let observerTimeout: NodeJS.Timeout | null = null;
let observerDisconnected = false;

const observer = new MutationObserver(() => {
  if (observerTimeout) clearTimeout(observerTimeout);

  observerTimeout = setTimeout(() => {
    // console.log("📌 Alterações no DOM detectadas! Atualizando campos...");
    captureAndSortFields();

    if (!observerDisconnected) {
      observerDisconnected = true;
      setTimeout(() => {
        observer.disconnect();
        // console.log("🔴 Observer desconectado após 5 segundos.");
      }, 5000);
    }
  }, 500);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
});
