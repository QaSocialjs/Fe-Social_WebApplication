import Form from "../../lib/components/Form";
import TextField from "../../lib/components/TextField";
import Button from "../../lib/components/Button";
import Link from "../../lib/components/Link";
import Checkbox from "../../lib/components/Checkbox";

function Formlogin() {
  return (
    <div className="w-[30rem]">
      <Form className="flex flex-col gap-6 w-full">
        <TextField
          name="email"
          id="email"
          isRequired
          label="Email address"
          type="text"
          className="flex flex-col text-primary-0"
          inputClassName="text-base font-bold py-3 bg-primary-100"
          labelClassName="text-base"
        ></TextField>
        <TextField
          name="password"
          id="password"
          isRequired
          label="Password"
          type="password"
          className="flex flex-col"
          inputClassName="text-base font-bold py-3 bg-primary-100"
          labelClassName="text-base"
        ></TextField>
        <div className="flex justify-between">
          <Checkbox className="flex gap-x-2 items-center w-fit">
            <div>Remember me</div>
          </Checkbox>
          <Link className="text-accent-300 decoration-3 decoration-accent-300">
            Forgot password?
          </Link>
        </div>
        <div className="text-xs text-center text-primary-300">
          By clicking Log in, you accept Quizlet's
          <span className="font-bold text-accent-300 px-2">
            Terms of Service
          </span>
          and
          <span className="font-bold text-accent-300 px-2">Privacy Policy</span>
        </div>
        <Button className="w-full py-3 rounded-full">Login</Button>
      </Form>
    </div>
  );
}

export default Formlogin;
