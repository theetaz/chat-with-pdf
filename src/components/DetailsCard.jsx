import { Card } from "antd";
const DetailsCard = ({ icon, title, description1 }) => (
  <Card
    bordered={false}
    style={{
      width: 350,
      marginTop: 16,
    }}
    className="detailsCard "
  >
    <div className="d-flex align-items-center ">
      <div className="d-flex align-items-center ">
        <span className="icon">{icon}</span>
      </div>
      <h3
        className="text-start"
        style={{
          fontSize: "21px",
          margin: "0px",
          marginLeft: "10px",
          fontWeight: "700",
        }}
      >
        {title}
      </h3>
    </div>
    <p className="text-start mt-3">{description1}</p>
  </Card>
);
export default DetailsCard;
