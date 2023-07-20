import { Navigate, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./common/pages";
import { HomePage } from "./features/home";
import { WalletFeature } from "./features/wallet";
import { PrivateRoute } from "./common/routes";
import { WalletDashboadFeature } from "./features/wallet-dashboad";

function App() {
    return (
        <main className="main">
            <Routes>
                {/* Features */}
                <Route path="/wallet/dashboard" element={<PrivateRoute element={<WalletDashboadFeature />} />} />

                <Route path="/wallet/*" element={<WalletFeature />} />

                {/* Error */}
                <Route path="/404" element={<PageNotFound />} />

                <Route path="/" element={<HomePage />} />

                <Route path="*" element={<Navigate to={"/404"} replace />} />
            </Routes>
        </main>
    );
}

export default App;
