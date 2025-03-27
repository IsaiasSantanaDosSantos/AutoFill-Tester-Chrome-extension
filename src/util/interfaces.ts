export interface FormFields {
  nome: string;
  id: string;
  placeholder: string;
  tipo: string;
  category?: string;
}

export interface Field {
  nome: string;
  id: string;
  placeholder: string;
  tipo: string;
  value: string;
}

export interface EditFormProps {
  fields: Field[];
  onClose: () => void;
}
