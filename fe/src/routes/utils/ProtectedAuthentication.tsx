import { hookDispatchThunk } from "@lib/hook/ReduxHook";
import { verifyAuthentication } from "@lib/redux/user/UserThunk";
import { typeProps } from "@lib/utils/typeProps";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedAuthentication({ children }: typeProps): React.ReactElement {
  const dispatch = hookDispatchThunk();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(verifyAuthentication("")).then((e: any) => {
      if (e.payload.isErr()) {
        navigate("/");
      }
    });
  }, []);
  return <div>{children}</div>;
}

export default ProtectedAuthentication;
