import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { Alert } from 'react-native';

type Props = {
  children?: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  user: User | null;
  checkEmailVerification: () => Promise<boolean>;
};

const initialValue = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  checkEmailVerification: async () => false,
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        checkIsAdmin(user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  const checkEmailVerification = async () => {
    if (user) {
      await user.reload();
      return user.emailVerified;
    }
    return false;
  };

  const checkIsAdmin = async (user: User) => {
    const adminDocRef = doc(db, 'admin', user.uid);
    const adminDocSnap = await getDoc(adminDocRef);

    if (adminDocSnap.exists()) {
      setIsAdmin(true); // User is an admin
      Alert.alert('Admin has logged in!');
    } else {
      setIsAdmin(false); // User is not an admin
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, checkEmailVerification, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export { AuthContext, AuthContextProvider };
