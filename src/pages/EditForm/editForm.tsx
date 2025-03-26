import { useState, useEffect } from "react";

interface EditFormProps {
  fields: Record<string, string>;
  onClose: () => void;
}

const EditForm = ({ fields, onClose }: EditFormProps) => {
  const [formData, setFormData] = useState(fields);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageUrl = urlParams.get("url");

    if (pageUrl) {
      // Recupera os dados do localStorage
      const savedFields = localStorage.getItem(`editFields_${pageUrl}`);
      if (savedFields) {
        setFormData(JSON.parse(savedFields));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageUrl = urlParams.get("url");

    if (pageUrl) {
      localStorage.setItem(`autofill_${pageUrl}`, JSON.stringify(formData));
      alert("Campos salvos com sucesso!");
    }

    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-2">Editar Campos</h2>
      <form>
        {Object.entries(formData).map(([name, value]) => (
          <div key={name} className="mb-2">
            <label className="block text-sm font-medium">{name}</label>
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
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
