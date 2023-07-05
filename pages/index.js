import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Upload, message, Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				{/* <h1 className={styles.title}>Chat with any PDF</h1> */}
				<h1 className={styles.title}>Next js</h1>

				<Upload.Dragger
					name="file"
					action="/upload"
					accept=".pdf"
					className="full-width-uploader"
					beforeUpload={(file) => {
						const isPDF = file.type === 'application/pdf';
						if (!isPDF) {
							message.error('You can only upload PDF files!');
						}
						return isPDF;
					}}
					onChange={(info) => {
						const { status } = info.file;
						if (status === 'done') {
							message.success(`${info.file.name} file uploaded successfully.`);
						} else if (status === 'error') {
							message.error(`${info.file.name} file upload failed.`);
						}
					}}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">Support for a single or bulk upload.</p>
				</Upload.Dragger>
				<Row style={{ marginTop: '10px' }}>
					<Col sm={24} md={8} lg={8} xl={8}>
						<Card title="For Students 🎓">
							<p>
								Enhance your learning experience with ChatPDF. Comprehend textbooks, handouts, and
								presentations effortlessly. Don't spend hours flipping through research papers and
								academic articles.
							</p>
							<p>Support your academic growth and succeed in your studies effectively and responsibly.</p>
						</Card>
					</Col>
					<Col sm={24} md={8} lg={8} xl={8}>
						<Card title="For Work 👩‍💻">
							<p>
								Efficiently analyze your documents. From financial and sales reports to project and
								business proposals, training manuals, and legal contracts, ChatPDF can quickly provide
								you with the information you need.
							</p>
							<p>
								Your data is kept confidential in a secure cloud storage and can be deleted at any time.
							</p>
						</Card>
					</Col>
					<Col sm={24} md={8} lg={8} xl={8}>
						<Card title="For Curious Minds 🤔">
							<p>
								Unlock a wealth of knowledge with ChatPDF. Discover new insights and answers from
								historical documents, poetry, and literature, effortlessly.
							</p>
							<p>
								ChatPDF can understand any language and reply in your preferred one. Satisfy your
								curiosity and expand your horizons with the tool that can answer any question from any
								PDF.
							</p>
						</Card>
					</Col>
				</Row>
			</main>

			<footer>
				{/* <a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
				</a> */}
			</footer>

			<style jsx>{`
				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid #eaeaea;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				footer img {
					margin-left: 0.5rem;
				}
				footer a {
					display: flex;
					justify-content: center;
					align-items: center;
					text-decoration: none;
					color: inherit;
				}
				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.75rem;
					font-size: 1.1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
						Bitstream Vera Sans Mono, Courier New, monospace;
				}
			`}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
						Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
				}
				* {
					box-sizing: border-box;
				}
				.full-width-uploader .ant-upload {
					width: 100%;
				}
			`}</style>
		</div>
	);
}
