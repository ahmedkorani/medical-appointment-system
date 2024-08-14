import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useEffect } from "react";
import { auth } from "../utils/FirebaseConfig";

const Login = () => {
    useEffect(() => {
        const uiConfig = {
            signInSuccessUrl: '/role-selector',
            signInOptions: [
                {
                    provider: 'google.com',
                    authMethod: 'https://accounts.google.com',
                    clientId: import.meta.env.VITE_CLIENT_ID,
                },
            ],
            tosUrl: '/terms-of-service',
            privacyPolicyUrl: '/privacy-policy',
        };

        const ui = firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(auth); ui.start('#firebaseui-auth-container', uiConfig);
    }, []);


    return <div id="firebaseui-auth-container"></div>;
};

export default Login;
