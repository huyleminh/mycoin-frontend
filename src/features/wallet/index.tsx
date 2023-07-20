import { Navigate, Route, Routes } from "react-router-dom";
import { AccessWalletPage, CreateWalletPage } from "./pages";
import "./styles.scss";

export interface IWalletFeatureProps {}

export function WalletFeature(_props: IWalletFeatureProps) {
    return (
        <div className="wallet-container">
            <Routes>
                <Route path="/access" element={<AccessWalletPage />} />

                <Route path="/create" element={<CreateWalletPage />} />

                <Route path="*" element={<Navigate to={"/404"} replace />} />
            </Routes>
        </div>
    );
}
