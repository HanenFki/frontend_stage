import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8081/",
  realm: "myrealm",
  clientId: "myhanen",
});

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        await keycloak.init({ onLoad: "login-required", checkLoginIframe: false });

        if (keycloak.authenticated) {
          const fetchedToken = keycloak.token;
          const tokenParsed = keycloak.tokenParsed || {};
          const fetchedRoles = tokenParsed.realm_access?.roles || [];
          const userId = tokenParsed.sub;

          setToken(fetchedToken);
          setRoles(Array.isArray(fetchedRoles) ? fetchedRoles : []);
          setUserId(userId);
          setIsLogin(true);

          // Store the token in localStorage
          localStorage.setItem('token', fetchedToken);

          // Handle token refresh
          keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
              localStorage.setItem('token', keycloak.token);
            }
          }).catch(error => console.error('Failed to refresh token', error));
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Keycloak initialization failed:", error);
        setIsLogin(false);
      }
    };

    initKeycloak();
  }, []);

  return [isLogin, token, roles, userId];
};

export default useAuth;
