export const fakeRG = () => {
  const digits = Math.floor(10000000 + Math.random() * 90000000); // Gera 8 dígitos
  const lastDigit = Math.random() < 0.2 ? "X" : Math.floor(Math.random() * 10); // 20% chance de ser "X"
  return `${digits}${lastDigit}`;
};
