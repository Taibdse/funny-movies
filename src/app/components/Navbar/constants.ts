import { LoginOrRegisterForm } from "@/types/app";
import * as yup from "yup";

export const loginOrRegisterValidationSchema = yup
  .object()
  .shape({
    email: yup.string().email("Must be valid email!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Min length is 6!"),
  })
  .required();

export const defaultLoginOrRegisterFormValues: LoginOrRegisterForm = {
  email: "",
  password: "",
};
