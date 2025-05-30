
/**
 * Calcula o valor da parcela mensal usando a fórmula parcela fixa (Price)
 * 
 * PMT = PV * (i / (1 - (1 + i)^-n))
 * 
 * @param totalAmount - Valor total do financiamento (PV)
 * @param interestPerMonth - Taxa de juros mensal (i)
 * @param installments - Número de parcelas (n)
 * @returns Valor da parcela mensal (PMT)
 */
export const calculateMonthlyInstallment = (
  totalAmount: number,
  interestPerMonth: number,
  installments: number
): number => {
  if (totalAmount <= 0) {
    throw new Error('Valor total deve ser maior que zero');
  }

  if (interestPerMonth < 0) {
    throw new Error('Taxa de juros não pode ser negativa');
  }

  if (interestPerMonth === 0) {
    return totalAmount / installments;
  }

  if (installments <= 0) {
    throw new Error('Quantidade de parcelas deve ser maior que zero');
  }

  // PMT = PV * (i / (1 - (1 + i)^-n))

  // Juros mensal
  const InterestFactor = interestPerMonth;

  // Denominador: 1 - (1 + juros mensal)^-parcelas
  const denominator = 1 - Math.pow(1 + InterestFactor, -installments);

  // Fórmula principal: valor total * (juros mensal / denominador)
  const MonthlyInstallment = totalAmount * (InterestFactor / denominator);

  // Arredonda para 2 casas decimais
  return Math.round(MonthlyInstallment * 100) / 100;
}

/**
 * Calcula o valor total de juros pagos
 * 
 * @param totalAmount - Valor total do financiamento
 * @param monthlyInstallment - Valor mensal
 * @param installments - Número de parcelas
 * @returns Valor total com juros
 */
export const calculateTotalInterest = (
  totalAmount: number,
  monthlyInstallment: number,
  installments: number
): number => {
  const totalPaid = monthlyInstallment * installments;
  return Math.round((totalPaid - totalAmount) * 100) / 100;
}

/**
 * Valida se os parâmetros de entrada são válidos
 * 
 * @param totalAmount - Valor total do financiamento
 * @param interestPerMonth - Taxa de juros mensal
 * @param installments - Número de parcelas
 */
export const validateParameters = (
  totalAmount: number,
  interestPerMonth: number,
  installments: number
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (totalAmount <= 0) {
    errors.push('Valor total deve ser maior que zero');
  }

  if (totalAmount > 50000) {
    errors.push('Valor total não pode exceder R$ 50.000');
  }

  if (installments <= 0) {
    errors.push('Quantidade de parcelas deve ser maior que zero');
  }

  if (installments > 36) {
    errors.push('Quantidade de parcelas não pode exceder 36 meses');
  }

  if (interestPerMonth < 0) {
    errors.push('Taxa de juros não pode ser negativa');
  }

  if (interestPerMonth > 0.15) {
    // errors.push('Taxa de juros mensal não pode exceder 15%');
    errors.push(`totalAmount: ${totalAmount} installments: ${installments} interestPerMonth:${interestPerMonth}`);

  }

  return {
    isValid: errors.length === 0,
    errors
  };

}