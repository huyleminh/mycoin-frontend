import { faArrowRightFromBracket, faArrowUpRightFromSquare, faChartLine, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../common/contexts";
import "./styles.scss";

export interface SidebarProps {}

const SidebarList = [
    {
        name: "Portfolio",
        path: "/wallet/dashboard/portfolio",
        icon: faChartLine,
    },
    {
        name: "Send Coin",
        path: "/wallet/dashboard/send-tx",
        icon: faPaperPlane,
    },
    {
        name: "Explorer",
        path: "/explorer",
        icon: faArrowUpRightFromSquare,
    },
];

export function Sidebar(_props: SidebarProps) {
    const authContext = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        authContext.removeUserKeyInfo();
    };

    return (
        <Nav className="flex-column main-sidebar-container" variant="pills" activeKey={location.pathname}>
            <div className="custom-nav-item__container">
                {SidebarList.map((item) => {
                    return (
                        <Nav.Item key={item.path}>
                            <Nav.Link
                                className={`custom-nav-item-nav ${
                                    location.pathname === item.path && "active"
                                } d-flex align-items-center`}
                                as={Link}
                                to={item.path}
                            >
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <FontAwesomeIcon icon={item.icon} fontSize="18px" />
                                    <span className="custom-nav-item__nav-name d-block">{item.name}</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    );
                })}

                <hr className="mx-3" />

                <Nav.Item>
                    <Nav.Link className={`custom-nav-item-nav d-flex align-items-center`} onClick={handleLogout}>
                        <div className="d-flex justify-content-start align-items-center">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize="18px" />
                            <span className="custom-nav-item__nav-name">Logout</span>
                        </div>
                    </Nav.Link>
                </Nav.Item>
            </div>
        </Nav>
    );
}
