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
import OrderList from "./OrderLIst.js";
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
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [0, 4000],
        fill: true,
        tension: 0.4, // Add smooth curves
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#4B5000", "#35014f"],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 8, // Modern hover effect
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div className="dashboardSummaryBox">
              <Link to="/admin/products">
                <div
                  className="iconContainer"
                  style={{ backgroundColor: "#DEDEFA" }}
                >
                  <LocalMallIcon sx={{ color: "#5C59E8", fontSize: "3rem" }} />
                </div>
                <p>Product</p>
                <h3>{products && products.length}</h3>
              </Link>
              <Link to="/admin/orders">
                <div
                  className="iconContainer"
                  style={{ backgroundColor: "#F4C3A0" }}
                >
                  <ListAltIcon sx={{ color: "#E46A11", fontSize: "3rem" }} />
                </div>
                <p>Orders</p>
                <h3>{orders && orders.length}</h3>
              </Link>
              <Link to="/admin/users">
                <div
                  className="iconContainer"
                  style={{ backgroundColor: "#9ED0B9" }}
                >
                  <PersonIcon sx={{ color: "#0D894F", fontSize: "3rem" }} />
                </div>
                <p>Users</p>
                <h3>{users && users.length}</h3>
              </Link>
              <Link to="/admin/total">
                <div
                  className="iconContainer"
                  style={{ backgroundColor: "#F9B4AF" }}
                >
                  <PersonIcon sx={{ color: "#F04438", fontSize: "3rem" }} />
                </div>
                <p>Total Amount</p>
                <h3>{Total_Amt}</h3>
              </Link>
            </div>
          </div>

          <div className="dashboardCharts">
            <div className="chartContainer lineChart">
              <h3>Total Amount Overview</h3>
              <Line
                data={lineState}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        font: {
                          size: 14,
                          family: "Roboto",
                        },
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="chartContainer doughnutChart">
              <h3>Stock Distribution</h3>
              <Doughnut
                data={doughnutState}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                      },
                    },
                    legend: {
                      position: "top",
                      labels: {
                        font: {
                          size: 14,
                          family: "Roboto",
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
