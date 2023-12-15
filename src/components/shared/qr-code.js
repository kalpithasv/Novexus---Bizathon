import { QRCode } from "antd";

const QRCodeGen = ({ data }) => {
    return (
        <QRCode value={data} bgColor="#fff" />
    )
}

export default QRCodeGen;