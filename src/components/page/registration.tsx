import { Field, Form, Formik, type FormikHelpers } from "formik";

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
import { Eye, EyeOff } from "lucide-react";
import { ButtonRegister } from "../ui/buttonRegister";

import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/auth/operation";
import type { AppDispatch } from "@/redux/store";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Registration() {
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (
    values: RegistrationFormValues,
    action: FormikHelpers<RegistrationFormValues>
  ) => {
    try {
      setIsLoading(true);
      dispatch(
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );

      action.resetForm();
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleRegister}>
            <Form className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Field
                    id="name"
                    name="name"
                    as={Input}
                    placeholder="Name"
                    className={`pl-4 h-[54px] w-full `}
                  />
                </div>
                {/* error */}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Field
                    id="email"
                    name="email"
                    as={Input}
                    placeholder="Email"
                    className={`pl-4 h-[54px] w-full `}
                  />
                </div>
                {/* {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )} */}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    as={Input}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`pl-4 h-[54px] w-full `}
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
                {/* {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )} */}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    as={Input}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`pl-4 h-[54px] w-full `}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {/* {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )} */}
              </div>

              <ButtonRegister
                type="submit"
                className="w-full mt-10 h-16 
              "
                disabled={isLoading}>
                {isLoading ? "Sign in..." : "Sign Up"}
              </ButtonRegister>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
