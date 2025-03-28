export const fakePIS = () => {
  // Gera os 10 primeiros números aleatórios
  const base = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));

  // Multiplicadores fixos para calcular o dígito verificador
  const multipliers = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Calcula o dígito verificador
  const sum = base.reduce(
    (acc, digit, index) => acc + digit * multipliers[index],
    0
  );
  const remainder = sum % 11;
  const dv = remainder < 2 ? 0 : 11 - remainder;

  // Retorna o PIS completo como string
  return `${base.join("")}${dv}`;
};
