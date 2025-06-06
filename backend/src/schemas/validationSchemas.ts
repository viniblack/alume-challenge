import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(25, 'Nome não pode exceder 25 caracteres'),

  lastName: z.string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(25, 'Sobrenome não pode exceder 25 caracteres'),

  email: z.string()
    .email('Formato de email inválido'),

  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(22, 'Senha não pode exceder 22 caracteres'),

  confirmPassword: z.string()
    .min(8, 'Confirmação da nova senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmNewPassword']
});

export const loginSchema = z.object({
  email: z.string()
    .email('Formato de email inválido'),

  password: z
    .string()
    .min(1, 'Senha é obrigatória')
})

export const updateStudentSchema = z.object({
  firstName: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(25, 'Nome não pode exceder 25 caracteres'),

  lastName: z.string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(25, 'Sobrenome não pode exceder 25 caracteres'),

  email: z.string()
    .email('Formato de email inválido')
    .optional(),
})

export const financingSimulationSchema = z.object({
  totalAmount: z.number()
    .positive('Valor total deve ser positivo')
    .min(5000, 'Valor mínimo é R$5.000')
    .max(50000, 'Valor máximo é R$ 50.000'),

  numberOfInstallments: z.number()
    .int('Quantidade de parcelas deve ser um número inteiro')
    .min(6, 'Mínimo de 6 parcela')
    .max(36, 'Máximo de 36 parcelas'),
  monthlyInterestRate: z.number()
    .min(0, 'Taxa de juros não pode ser negativa')
    .max(0.15, 'Taxa de juros mensal máxima é 15%'),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(8, 'Nova senha deve ter no mínimo 8 caracteres'),
  confirmNewPassword: z.string().min(8, 'Confirmação da nova senha é obrigatória'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmNewPassword']
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type SimulationInput = z.infer<typeof financingSimulationSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const validateSchema = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }

      return res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
}