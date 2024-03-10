import io, { Socket } from "socket.io-client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UseUserContext } from "./usercontext";

type PropsSocket = {
  socketIo: Socket | null | undefined;
};

const SocketContext = React.createContext<PropsSocket>({ socketIo: io() });

export const UseSocketContext = (): PropsSocket => {
  return useContext<PropsSocket>(SocketContext);
};

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socketIo, setSocketIo] = useState<Socket | null>();
  const { user } = UseUserContext();
  useEffect(() => {
    if (!user?.id) return;
    const newSocket = io("http://localhost:8080/");
    newSocket.emit("connected", { id: user?.id });
    setSocketIo(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id]);
  const values = useMemo(
    () => ({
      socketIo,
    }),
    [socketIo]
  );
  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}
