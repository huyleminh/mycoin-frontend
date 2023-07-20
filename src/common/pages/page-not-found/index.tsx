import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.scss";

export function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div className="page-not-found-content">
            <Stack className="page-not-found-content-stack" gap={3}>
                <h2>Không tìm thấy trang</h2>

                <p className="mx-3">Xin lỗi! Chúng tôi không tìm thấy liên kết này. Vui lòng trở về trang chủ</p>

                <div className="mb-3">
                    <img
                        src="svgs/undraw_page_not_found.svg"
                        style={{ width: "500px" }}
                        alt="page-not-found-illustration"
                        className="img-fluid"
                    ></img>
                </div>

                <Button variant="primary" onClick={() => navigate("/", { replace: true })}>
                    Về trang chủ
                </Button>
            </Stack>
        </div>
    );
}
