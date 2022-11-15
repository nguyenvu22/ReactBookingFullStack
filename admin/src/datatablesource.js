export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 260,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.img ||
              "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-No-Background.png"
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 260,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 260 },
  { field: "name", headerName: "Name", width: 280 },
  { field: "type", headerName: "Type", width: 100 },
  { field: "title", headerName: "Title", width: 230 },
  { field: "city", headerName: "City", width: 100 },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 260 },
  { field: "title", headerName: "Title", width: 180 },
  { field: "desc", headerName: "Description", width: 230 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "maxPeople", headerName: "Max People", width: 100 },
];
