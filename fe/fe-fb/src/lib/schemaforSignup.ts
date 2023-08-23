import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Password must be at least 8 characters"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});
export default validationSchema;
