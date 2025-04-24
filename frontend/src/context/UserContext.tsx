import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

//
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  checkIfUserIsLogedIn: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  async function checkIfUserIsLogedIn() {
    const token = localStorage.getItem("user-token");

    try {
      const res = (
        await axios.get(`${BACKEND_URL}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
      if (res.success) {
        setUser(res.data);
      }
    } catch (e: any) {
      console.log("error:", e);
    }
  }
  return (
    <UserContext.Provider value={{ user, setUser, checkIfUserIsLogedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)!;
  return context;
};
