import { Stack } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import "./styles.scss";

export interface IWalletDashboadFeatureProps {}

export function WalletDashboadFeature(_props: IWalletDashboadFeatureProps) {
    const navigate = useNavigate();

    return (
        <div className="dashboard-layout">
            <div className={`dashboard-layout-backdrop`}>
                <aside className="dashboard-layout-sidebar-container" onClick={(e) => e.stopPropagation()}>
                    <Stack
                        direction="horizontal"
                        className="sidebar-container-app-logo text-capitalize align-items-center cursor-pointer"
                        onClick={() => navigate("/wallet/dashboard")}
                    >
                        <div className="app-logo-container">
                            <img
                                className="app-logo-container-app-logo"
                                src="/images/digital_wallet.jpg"
                                alt="app-logo"
                                loading="lazy"
                            />
                        </div>

                        <h1 className="mb-0 ms-2 fs-3 text-white">TECO WALLET</h1>
                    </Stack>

                    <Sidebar />
                </aside>
            </div>

            <div className="dashboard-layout-main-content">
                <div className="main-content-static-header">
                    <div className="static-header-header-actions"></div>
                </div>

                <div className="main-content-dynamic-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
