import { useEffect, useRef, useState } from "react";

import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;

    const checkLogin = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };
          localStorage.setItem(
            "tasklist@detailsUser",
            JSON.stringify(userData)
          );

          setIsSigned(true);
        } else {
          setIsSigned(false);
        }

        setIsLoading(false);
      });
    };

    checkLogin();
    didLoad.current = true;
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  if (!isSigned) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Private;
