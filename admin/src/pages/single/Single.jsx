import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Tablee from "../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="data:image/jpeg;base64,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" alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">jane@gmail.com </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">+09 01203120</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue">120/26 29 district newyork</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country: </span>
                  <span className="itemValue">Vietnam</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="User Spending ( Last 7 months )" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <Tablee />
        </div>
      </div>
    </div>
  )
}

export default Single