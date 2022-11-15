import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];       //take category (user or hotel or room)

  const { data, loading, error } = useFetch(`/${path}`);
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row._id);
              }}
            >
              Detele
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.toUpperCase()}
        <Link
          to={`/${path}/new`}
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        width="100%"
        rows={list}
        // columns={userColumns.concat(actionColumn)}
        columns={columns.concat(actionColumn)}
        pageSize={4}
        rowsPerPageOptions={[3]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
