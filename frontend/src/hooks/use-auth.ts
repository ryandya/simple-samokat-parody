import { AuthContext } from '@/app/providers/auth-provider';
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext)
