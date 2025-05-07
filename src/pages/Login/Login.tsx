import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabeledInput } from "../../components/LabeledInput/LabeledInput";
import { LayoutComponents } from "../../components/Layout/LayoutComponents";
import { Title } from "../../components/Title/Title";
import { Button } from "../../components/Button/Button";
// import axios from "axios"; // Descomente se for usar uma API real

interface FormData {
  email: string;
  password: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpa o erro do campo quando o usuário começa a digitar
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setFormError("");
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // const response = await axios.post("/api/login", formData);

      navigate("/", { state: { isLoggedIn: true } });
    } catch (error: unknown) {
      console.error("Erro ao realizar login:", error);
      const message =
        error?.response?.data?.message || "Erro ao realizar login. Por favor, tente novamente.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LayoutComponents>
      <div className="max-w-96 bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-center">
            <Title text="LOGIN" />
          </div>

          {formError && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
              {formError}
            </div>
          )}

          <LabeledInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            required
          />

          <LabeledInput
            id="password"
            name="password"
            type="password"
            label="Senha"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            required
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                PROCESSANDO...
              </span>
            ) : (
              "ENTRAR"
            )}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-700">Não possui uma conta? </span>
            <Link
              to="/cadastro"
              className="text-violet-600 hover:text-violet-800 hover:underline transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </LayoutComponents>
  );
};
