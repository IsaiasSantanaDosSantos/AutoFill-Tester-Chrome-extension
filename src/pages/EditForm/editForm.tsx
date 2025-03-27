import { useState } from "react";

import { EditFormProps } from "../../util/interfaces";

// interface Field {
//   nome: string;
//   id: string;
//   placeholder: string;
//   tipo: string;
//   value: string;
// }

// interface EditFormProps {
//   fields:  Field[];
//   onClose: () => void;
// }

const EditForm = ({ fields, onClose }: EditFormProps) => {
  const [formData, setFormData] = useState(fields);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData.map((field) => (field.id === name ? { ...field, value } : field))
    );
  };

  const handleSave = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageUrl = urlParams.get("url");

    if (pageUrl) {
      localStorage.setItem(
        `editFields_${encodeURIComponent(pageUrl)}`,
        JSON.stringify(formData)
      );
      alert("Campos salvos com sucesso!");
    }

    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-2">Editar Campos</h2>
      <form>
        {formData.map((field, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-medium" htmlFor={field.id}>
              {field.placeholder || field.nome}
            </label>
            {field.tipo === "input" && (
              <input
                className="w-full border p-2 rounded-md"
                type="text"
                name={field.id}
                id={field.id}
                value={field.value}
                onChange={handleChange}
              />
            )}
            {field.tipo === "select" && (
              <select
                className="w-full border p-2 rounded-md"
                name={field.id}
                id={field.id}
                value={field.value}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {/* Adicione opções dinamicamente aqui, se necessário */}
              </select>
            )}
            {field.tipo === "textarea" && (
              <textarea
                className="w-full border p-2 rounded-md"
                name={field.id}
                id={field.id}
                value={field.value}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </form>
      <div className="flex justify-between mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md  width-100"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md  width-100"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default EditForm;

/*
  // const urlParams = new URLSearchParams(window.location.search);
  // const pageUrl = urlParams.get("url");
  // const savedFields = localStorage.getItem(`editFields_${pageUrl}`);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const pageUrl = urlParams.get("url");

  //   if (pageUrl) {
  //     // Recupera os dados do localStorage
  //     const savedFields = localStorage.getItem(`editFields_${encodeURIComponent(pageUrl)}`);
  //     if (savedFields) {
  //       setFormData(JSON.parse(savedFields));
  //     }
  //     console.log("savedFields(editForm.tsx file): ", savedFields);
  //     console.log("fields(editForm.tsx file): ", fields);
  //     console.log("fields(editForm.tsx file): ", encodeURIComponent(pageUrl));

  //   }
  // }, []);

*/
