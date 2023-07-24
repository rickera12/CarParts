import { createContext, useContext, useEffect, useState } from 'react';
import { LS_KEYS } from '../constants';
import { getProfileApi } from '../services/user';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const apiKey = localStorage.getItem(LS_KEYS.TOKEN);

  useEffect(() => {
    const fetchProfile = async () => {
      if (apiKey) {
        const result = await getProfileApi(apiKey);

        if (result.success) {
          setUser({
            email: result.data.email,
            id: result.data.id,
            status: result.data.status,
            role: result.data.role,
          });
        } else {
          toast.error(`Error fetching user details`);
        }
      }
    };

    fetchProfile();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
