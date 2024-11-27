import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../action/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    {
      field: "image", // Use image field
      headerName: "Image",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <img
            src={params.value}
            alt="Product"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.6,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 120,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <div className="actionButtons">
          <Link to={`/admin/order/${params.row.id}`} className="editButton">
            <EditIcon />
          </Link>
          <Button
            onClick={() => deleteOrderHandler(params.row.id)}
            className="deleteButton"
          >
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      // Safely check if orderItems exists and has items
      const itemsQty =
        item.orderItems && Array.isArray(item.orderItems)
          ? item.orderItems.length
          : 0;

      // Get the image URL from the first item in orderItems (assuming 1 product per order)
      const image =
        item.orderItems && item.orderItems[0] && item.orderItems[0].image;

      rows.push({
        id: item._id,
        itemsQty: itemsQty,
        amount: item.totalPrice,
        status: item.orderStatus,
        image: image, // Add image field
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
