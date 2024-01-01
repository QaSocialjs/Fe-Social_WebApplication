import Button from "@components/Button";

function AuthenticatedError() {
  return (
    <div className="flex flex-col gap-5 mt-4 justify-center items-center">
      <div className="w-[36rem] text-lg text-primary-950">
        It seems like you are not logged in to our website but are trying to use
        the service, please log in to continue using our service.
      </div>
      <Button className="p-2 w-fit underline" as="link" href="/login">
        Back to login
      </Button>
    </div>
  );
}

export default AuthenticatedError;
