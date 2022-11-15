import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Tablee = () => {
  const rows = [
    {
      id: 113124,
      product: "Acer Nitro 5",
      img: "https://www.pcworld.com/wp-content/uploads/2021/09/acer-nitro-5-an515-44-r99q-main-100865204-orig.jpeg?quality=50&strip=all&w=1024",
      customer: "John Smith",
      date: "1 March",
      amount: 786,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 113125,
      product: "Playstation 5",
      img: "https://assets.reedpopcdn.com/ps5-pre-order-header.jpg/BROK/thumbnail/1200x900/quality/100/ps5-pre-order-header.jpg",
      customer: "Huy",
      date: "4 May",
      amount: 456,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 113126,
      product: "ASUS ROG strix",
      img: "https://file.hstatic.net/1000238589/file/laptop_asus_rog_strix_gaming_g513ih___hn015w__2016adb19a014096b74a076605d9d43b.png",
      customer: "Huy",
      date: "15 June",
      amount: 1186,
      method: "Online",
      status: "Pending",
    },
    {
      id: 113127,
      product: "Redragon s101",
      img: "https://cdn-amz.woka.io/images/I/71kr3WAj1FL.jpg",
      customer: "Ngu",
      date: "31 July",
      amount: 500,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tablee;
