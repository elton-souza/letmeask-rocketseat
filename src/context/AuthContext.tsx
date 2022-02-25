//Criação de um contexto onde engloba todos as funções/dados que serão acessados por outros dois ou mais componentes

import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; //Tipagem para funções assincronas
};
type AuthContextProviderProps = {
  children: ReactNode; //Tipagem para componente React
};

export const AuthContext = createContext({} as AuthContextType); //Context

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // Verificar se um usuario ja fez login e retorna os dados do usuario
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        if (!displayName || !photoURL) {
          throw new Error("Missing Information from Google Account");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    //Função que ao clicar no botao, realiza a autenticação com o google através de um pop-up e retorna os dados autenticados
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { uid, displayName, photoURL } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Missing Information from Google Account");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
