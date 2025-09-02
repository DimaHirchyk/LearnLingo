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
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { logInUser } from "@/redux/auth/operation";
import type { AppDispatch } from "@/redux/store";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LogIn() {
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: LoginFormValues,
    action: FormikHelpers<LoginFormValues>
  ) => {
    try {
      dispatch(
        logInUser({
          email: values.email,
          password: values.password,
        })
      );

      action.resetForm();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-[570px] flex flex-col">
        <CardHeader className="space-y-5 mb-10">
          <CardTitle className="text-5xl font-bold">Log In</CardTitle>
          <CardDescription className="text-left ">
            Welcome back! Please enter your credentials to access your account
            and continue your search for an teacher.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="block">
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ email: "", password: "" }}>
            <Form className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Field
                    id="email"
                    name="email"
                    as={Input}
                    placeholder="Email"
                  />
                </div>
                {/* {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )} */}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Field
                    id="empasswordail"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    as={Input}
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

              <ButtonRegister type="submit" className="w-full mt-10 h-16">
                {isLoading ? "Login..." : "Log In"}
              </ButtonRegister>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
