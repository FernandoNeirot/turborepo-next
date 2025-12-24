// Tipos compartidos entre diferentes features
// Aquí puedes agregar tipos que sean usados por múltiples features

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}
