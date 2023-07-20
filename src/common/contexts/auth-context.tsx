import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IUserKeyInfo {
    privateKey?: string;
    publickey?: string;
    timestamp?: number;
}

interface IAuthContext {
    userKeyInfo: IUserKeyInfo;
    setUserKeyInfo: (userKeyInfo: IUserKeyInfo) => void;
    removeUserKeyInfo: () => void;
}

interface IAuthContextProvider {
    children: JSX.Element;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = (props: IAuthContextProvider) => {
    const navigate = useNavigate();

    const [authInfo, setAuthInfo] = useState<IUserKeyInfo>({});

    const setUserKeyInfo = (userKeyInfo: IUserKeyInfo) => {
        setAuthInfo({ ...authInfo, ...userKeyInfo });
    };

    const removeUserKeyInfo = async () => {
        setAuthInfo({});
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ userKeyInfo: authInfo, setUserKeyInfo, removeUserKeyInfo }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (authContext === undefined || authContext === null) {
        throw new Error("There is no existing auth context");
    }
    return authContext;
};
