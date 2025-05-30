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
})

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

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

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