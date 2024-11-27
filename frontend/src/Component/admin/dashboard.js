import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.js";
import Sidebar from "./Sidebar.js";
import { Doughnut, Line } from "react-chartjs-2";
import "./dashboard.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAdminProduct } from "../../action/productAction.js";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  let Total_Amt = 0;
  orders &&
    orders.forEach((order) => {
      Total_Amt += order.totalPrice;
    });
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,40)"],
        data: [0, 4000],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#4B5000", "#35014f"],
        //data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {Total_Amt}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <div>
                <LocalMallIcon
                  sx={{
                    color: "#5C59E8",
                    fontSize: "70px",
                    backgroundColor: "#DEDEFA",
                    borderRadius: "50%",
                    padding: "15px",
                  }}
                />
              </div>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <div>
                <ListAltIcon
                  sx={{
                    color: "#E46A11",
                    fontSize: "70px",
                    backgroundColor: "#F4C3A0",
                    borderRadius: "50%",
                    padding: "15px",
                  }}
                />
              </div>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <div>
                <PersonIcon
                  sx={{
                    color: "#0D894F",
                    fontSize: "70px",
                    backgroundColor: "#9ED0B9",
                    borderRadius: "50%",
                    padding: "15px",
                  }}
                />
              </div>
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
