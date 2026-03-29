import { useEffect, useState } from 'react';
import { refreshToken, logout } from './services/auth';
import { api } from './services/api';
import useAuthStore from './store/auth/authStore';
import { Center, Spinner } from '@chakra-ui/react';

export default function AuthInitializer({ children }) {
  const setUserData = useAuthStore((s) => s.setUserData);
  const logoutLocal = useAuthStore((s) => s.logout);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await refreshToken();
        const resp = await api('GET', '/users/me');
        const data = resp.data;
        if (data.status === 'success') {
          setUserData(data.data.user);
        }
      } catch (e) {
        // refresh failed — attempt server-side cleanup and clear local store
        try {
          await logout();
        } catch (_) {
          // ignore logout errors
        }
        logoutLocal();
      } finally {
        setChecked(true);
      }
    })();
  }, [setUserData, logoutLocal]);

  if (!checked) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return children;
}
