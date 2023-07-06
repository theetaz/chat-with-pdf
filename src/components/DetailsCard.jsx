import { Card } from "antd";
const DetailsCard = ({ cardTitle, description1, description2 }) => (
 
    <Card
      title={`${cardTitle}`}
      bordered={false}
      style={{
        width: 350,
        marginTop: 16,
      }}
      className="detailsCard "
    >
      <p className="text-start">{description1}</p>
      <p className="text-start">{description2}</p>
    </Card>
  
);
export default DetailsCard;
