import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const withAuth = (WrappedComponent, includedRoles = []) => {
  const AuthComponent = (props) => {
    const { isLoggedIn, profiles, user } = useSelector((state) => state.auth);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        if (!isLoggedIn) {
          Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'You must log in before accessing this page.',
          });
          router.push('/');
        } else if (!includedRoles.includes(profiles?.role || user?.role)) {
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You do not have permission to access this page.',
          });
          router.back();
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [isLoggedIn, profiles, router, user, includedRoles]);

    return loading ? null : <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
