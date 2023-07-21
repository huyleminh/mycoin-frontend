import { Badge } from "react-bootstrap";

export const TxStatusBadge = ({ status }: { status: string }) => {
    let badgeConfig = {
        type: "secondary",
        display: status,
    };

    switch (status) {
        case "success":
            badgeConfig.type = "success";
            break;
        case "pending":
            badgeConfig.type = "warning";
            break;
        default:
            break;
    }
    return (
        <Badge bg={badgeConfig.type} className="text-capitalize">
            {status}
        </Badge>
    );
};
