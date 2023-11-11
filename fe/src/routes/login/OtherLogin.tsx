import React from "react";

function OtherLogin() {
  return (
    <div className="flex-col gap-4 flex">
      <div className="w-full py-2 h-fit border border-solid rounded-lg border-primary-950 border-opacity-30">
        <div className="text-center font-bold text-primary-300">
          Login with Google
        </div>
      </div>
      <div className="w-full py-2 h-fit border border-solid rounded-lg border-primary-950 border-opacity-30">
        <div className="text-center font-bold text-primary-300">
          Login with Facebook
        </div>
      </div>
      <div className="w-full py-2 h-fit border border-solid rounded-lg border-primary-950 border-opacity-30">
        <div className="text-center font-bold text-primary-300">
          Login with Twitter
        </div>
      </div>
    </div>
  );
}

export default OtherLogin;
