import { Navigate, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./common/pages";
import { PrivateRoute } from "./common/routes";
import { ExplorerFeature } from "./features/explorer";
import { HomePage } from "./features/home";
import { WalletFeature } from "./features/wallet";
import { WalletDashboadFeature } from "./features/wallet-dashboad";
import { SendTransactionPage, WalletPortfolio } from "./features/wallet-dashboad/pages";

function App() {
    return (
        <main className="main">
            <Routes>
                {/* Features */}
                <Route path="/wallet/dashboard/*" element={<PrivateRoute element={<WalletDashboadFeature />} />}>
                    <Route path="send-tx" element={<SendTransactionPage />} />

                    <Route path="portfolio" element={<WalletPortfolio />} />

                    <Route index element={<Navigate to={"portfolio"} replace />} />

                    <Route path="*" />
                </Route>

                <Route path="/wallet/*" element={<WalletFeature />} />

                <Route path="/explorer/*" element={<ExplorerFeature />} />

                {/* Error */}
                <Route path="/404" element={<PageNotFound />} />

                <Route path="/" element={<HomePage />} />

                <Route path="*" element={<Navigate to={"/404"} replace />} />
            </Routes>
        </main>
    );
}

export default App;
