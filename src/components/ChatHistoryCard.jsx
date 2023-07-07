import { Card, Space } from "antd";
const ChatHistoryCard = () => (
  <Card
    title="My Chats"
    style={{
      textAlign: "start",
    }}
  >
    <div className="d-flex overflow-x-scroll p-2">
      <Card
        size="small"
        title="Payment E-Receipt.pdf"
        style={{
          width: 300,
          margin: "10px",
        }}
      >
        <p>
          Greetings! Your payment has been confirmed with Transaction ID
          A173X0038893914. The payment was successful and made via credit…
        </p>
        <p>20 seconds ago</p>
      </Card>
      <Card
        size="small"
        title="WOOL-by-Hugh-Howey"
        style={{
          width: 300,
          margin: "10px",
        }}
      >
        <p>
          Greetings! Your payment has been confirmed with Transaction ID
          A173X0038893914. The payment was successful and made via credit…
        </p>
        <p>20 seconds ago</p>
      </Card>
      <Card
        size="small"
        title="WOOL-by-Hugh-Howey"
        style={{
          width: 300,
          margin: "10px",
        }}
      >
        <p>
          Greetings! Your payment has been confirmed with Transaction ID
          A173X0038893914. The payment was successful and made via credit…
        </p>
        <p>20 seconds ago</p>
      </Card>
    </div>
  </Card>
);
export default ChatHistoryCard;
