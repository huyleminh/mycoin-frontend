import React from "react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/scss/index.scss";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./common/contexts/auth-context.tsx";

const reactToastifyConfigs: ToastContainerProps = {
    position: "top-center",
    closeOnClick: true,
    limit: 5,
    hideProgressBar: true,
    theme: "colored",
    draggable: true,
};

function NotificationContainer() {
    return createPortal(<ToastContainer {...reactToastifyConfigs} />, document.querySelector("body") as HTMLElement);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.Fragment>
        <BrowserRouter>
            <AuthContextProvider>
                <>
                    <App />
                    <NotificationContainer />
                </>
            </AuthContextProvider>
        </BrowserRouter>
    </React.Fragment>
);
