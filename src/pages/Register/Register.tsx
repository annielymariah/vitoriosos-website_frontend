import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabeledInput } from "../../components/LabeledInput/LabeledInput";
import { LayoutComponents } from "../../components/Layout/LayoutComponents";
import { Title } from "../../components/Title/Title";
import { Button } from "../../components/Button/Button";

interface FormData {
  name: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FieldErrors {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name.trim()) {
      errors.name = "Nome completo é obrigatório";
      isValid = false;
    }

    if (!formData.cpf.trim()) {
      errors.cpf = "CPF é obrigatório";
      isValid = false;
    } else if (!/^\d{11}$/.test(formData.cpf)) {
      errors.cpf = "CPF deve conter 11 dígitos";
      isValid = false;
    }

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

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirmação de senha é obrigatória";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
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
      const resposta = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          senha: formData.password
        }),
      });

      if (resposta.status === 201) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
      } else if (resposta.status === 409) {
        setFormError("E-mail já está cadastrado!");
      } else {
        setFormError("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setFormError("Erro de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LayoutComponents>
      <div className="w-auto bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-center">
            <Title text="CADASTRO" />
          </div>

          {formError && (
            <div className="text-red-500 text-sm font-inter text-center p-2 mb-6 bg-red-50 rounded">
              {formError}
            </div>
          )}

          <LabeledInput
            id="name"
            name="name"
            type="text"
            label="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
            required
          />

          <LabeledInput
            id="cpf"
            name="cpf"
            type="text"
            label="CPF (apenas números)"
            value={formData.cpf}
            onChange={handleChange}
            error={fieldErrors.cpf}
            required
          />

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

          <LabeledInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmar Senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={fieldErrors.confirmPassword}
            required
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                PROCESSANDO...
              </span>
            ) : (
              "CRIAR CONTA"
            )}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-700">Já possui uma conta? </span>
            <Link
              to="/login"
              className="text-violet-600 hover:text-violet-800 hover:underline transition-colors"
            >
              Acesse já
            </Link>
          </div>
        </form>
      </div>
    </LayoutComponents>
  );
};