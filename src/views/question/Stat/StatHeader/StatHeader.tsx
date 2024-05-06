import { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Space,
	Button,
	Typography,
	Input,
	Tooltip,
	InputRef,
	message,
	QRCode,
	Popover
} from "antd";
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import styles from "./StatHeader.module.scss";
import useGetPageInfo from "@/hooks/useGetPageInfo";
const { Title } = Typography;
const StatHeader: FC = () => {
	const nav = useNavigate();
	const { id } = useParams();
	const { title, isPublished } = useGetPageInfo();
	//拷贝链接
	const urlInputRef = useRef<InputRef>(null);
	function copy() {
		const elem = urlInputRef.current;
		if (elem == null) return;
		elem.select(); //选中input的内容
		document.execCommand("copy"); //拷贝选中的内容
		message.success("拷贝成功");
	}
	function getLinkAndQRCodeElem() {
		if (!isPublished) return null;
		//拼接url，需要参考C端端规则
		const url = `http://localhost:3000/question/${id}`;
		//定义二维码组件
		const QRCodeElem = (
			<div style={{ textAlign: "center" }}>
				<QRCode value={url} size={150} />
			</div>
		);
		return (
			<Space>
				<Input value={url} style={{ width: "300px" }} ref={urlInputRef}></Input>
				<Tooltip title="拷贝链接">
					<Button icon={<CopyOutlined />} onClick={copy}></Button>
				</Tooltip>
				<Popover content={QRCodeElem}>
					<Button icon={<QrcodeOutlined />}></Button>
				</Popover>
			</Space>
		);
	}
	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<Title>{title}</Title>
					</Space>
				</div>
				<div className={styles.main}>{getLinkAndQRCodeElem()}</div>
				<div className={styles.right}>
					<Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
						编辑问卷
					</Button>
				</div>
			</div>
		</div>
	);
};
export default StatHeader;
