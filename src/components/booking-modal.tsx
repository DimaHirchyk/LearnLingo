import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonSubmit } from "./ui/buttonSubmit";
import type { Teachers } from "@/redux/teacher/slice";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Fragment, useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teachers | null;
}

interface FormValues {
  reason: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ValidationSchema = Yup.object().shape({
  reason: Yup.string()
    .oneOf(["career", "kids", "abroad", "exams", "culture"])
    .required("Choose the main reason for learning a language"),
  fullName: Yup.string()
    .min(3, "Short name")
    .max(20, "Very long name")
    .required("Enter name"),
  email: Yup.string().email().required("Enter email"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(5, "Short phone")
    .max(16, "Long Phone")
    .required("Enter phone"),
});

export function BookingModal({ isOpen, onClose, teacher }: BookingModalProps) {
  const [resultModal, setResultModal] = useState<null | "success" | "error">(
    null
  );

  if (!teacher) return null;

  const initialValues: FormValues = {
    reason: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  };

  const handleSubmit = (
    value: FormValues,
    action: FormikHelpers<FormValues>
  ) => {
    try {
      console.log(value);

      setResultModal("success");
      action.resetForm();
      onClose();
    } catch {
      setResultModal("error");
    }
  };

  return (
    <Fragment>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className=" p-16">
          <DialogHeader className="relative">
            <DialogTitle className="text-4xl font-semibold text-left">
              Book trial lesson
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-10">
            <DialogDescription className="text-base">
              Our experienced tutor will assess your current language level,
              discuss your learning goals, and tailor the lesson to your
              specific needs.
            </DialogDescription>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={teacher.avatar_url} alt={teacher.name} />
                <AvatarFallback>
                  {teacher.name[0]}
                  {teacher.surname[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Your teacher</p>
                <p className="font-medium">
                  {teacher.name} {teacher.surname}
                </p>
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={ValidationSchema}>
              {({ values, setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <Label className="text-2xl font-medium mb-4 block">
                      What is your main reason for learning English?
                    </Label>
                    <RadioGroup
                      value={values.reason}
                      onValueChange={(values) =>
                        setFieldValue("reason", values)
                      }>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="career" id="career" />
                        <Label htmlFor="career" className="font-normal">
                          Career and business
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="kids" id="kids" />
                        <Label htmlFor="kids" className="font-normal">
                          Lesson for kids
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="abroad" id="abroad" />
                        <Label htmlFor="abroad" className="font-normal">
                          Living abroad
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="exams" id="exams" />
                        <Label htmlFor="exams" className="font-normal">
                          Exams and coursework
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="culture" id="culture" />
                        <Label htmlFor="culture" className="font-normal">
                          Culture, travel or hobby
                        </Label>
                      </div>
                    </RadioGroup>

                    <ErrorMessage
                      name="reason"
                      component="p"
                      className="text-red-500  mt-3"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Field
                        as={Input}
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                      />
                      <ErrorMessage
                        component="p"
                        name="fullName"
                        className="text-red-500  mt-1.5 ml-1.5"
                      />
                    </div>
                    <div>
                      <Field name="email" as={Input} placeholder="Email" />

                      <ErrorMessage
                        component="p"
                        name="email"
                        className="text-red-500  mt-1.5 ml-1.5"
                      />
                    </div>
                    <div>
                      <Field
                        name="phoneNumber"
                        as={Input}
                        type="tel"
                        placeholder="Phone number"
                      />

                      <ErrorMessage
                        component="p"
                        name="phoneNumber"
                        className="text-red-500  mt-1.5 ml-1.5"
                      />
                    </div>
                  </div>

                  <ButtonSubmit
                    type="submit"
                    className="w-full bg-chart-4 hover:bg-chart-5 text-black font-bold text-lg py-4 h-15
              ">
                    Book
                  </ButtonSubmit>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={resultModal !== null}
        onOpenChange={() => setResultModal(null)}>
        <DialogContent className="h-72 p-5 pt-14">
          <DialogTitle className="text-4xl font-semibold text-center">
            {resultModal === "success"
              ? "Booking successful 🎉"
              : "Something went wrong ❌"}
          </DialogTitle>
          <p className="mt-2">
            {resultModal === "success"
              ? "Your request has been sent to the teacher. You will be contacted soon."
              : "Please try again later."}
          </p>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
