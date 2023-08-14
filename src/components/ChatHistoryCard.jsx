"use client";
import { calculateTheTime, truncateText, truncateTitle } from "@/utils";
import { Card } from "antd";
import { useRouter } from "next/navigation";

const ChatHistoryCard = ({ recentChats }) => {
  const router = useRouter();
  return (
    <Card
      title="My Chats"
      style={{
        textAlign: "start",
      }}
    >
      <div className="d-flex p-2 overflow-x-auto">
        {recentChats.map((chat, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              marginRight: "20px",
            }}
          >
            <Card
              onClick={() => router.push(`/chat/${chat.source_id}`)}
              size="small"
              title={truncateTitle(chat.source_name)}
              style={{
                width: 300,
                margin: "10px",
                cursor: "pointer",
              }}
            >
              <p>{truncateText(chat.summary)}</p>

              <p>{calculateTheTime(chat.created_date)}</p>
            </Card>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default ChatHistoryCard;
