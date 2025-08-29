import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { ButtonRegister } from "../ui/buttonRegister";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function Registration() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль повинен містити мінімум 6 символів";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Підтвердження паролю є обов'язковим";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Тут буде логіка реєстрації
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Симуляція API виклику
      console.log("Реєстрація:", formData);
      // Перенаправлення після успішної реєстрації
    } catch {
      // (error)
      setErrors({ general: "Помилка при реєстрації. Спробуйте ще раз." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card className="w-[570px] flex flex-col">
        <CardHeader className="space-y-5 mb-10">
          <CardTitle className="text-5xl font-bold">Registration</CardTitle>
          <CardDescription className="text-left">
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information
          </CardDescription>
        </CardHeader>
        <CardContent
          className="block
        ">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <Alert variant="destructive">
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  className={`pl-4 h-[54px] w-full ${
                    errors.name ? "border-destructive" : ""
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className={`pl-4 h-[54px] w-full ${
                    errors.email ? "border-destructive" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  className={`pl-4 h-[54px] w-full ${
                    errors.password ? "border-destructive" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  className={`pl-4 h-[54px] w-full${
                    errors.confirmPassword ? "border-destructive" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <ButtonRegister
              type="submit"
              className="w-full mt-10 h-16 
              "
              disabled={isLoading}>
              {isLoading ? "Sign in..." : "Sign Up"}
            </ButtonRegister>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
