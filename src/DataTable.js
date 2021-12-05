import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import articles from "./articles.json";
import scholars from "./scholars.json";
const columns = [
  "ID",
  "Tag",
  "Arabic",
  "Arabic without Tashkel",
  "Translation",
  "Chain",
  // {field: 'id',headerName: 'ID',width: 100,height: 200},
  // {
  //   field: 'tag',
  //   headerName: 'Tag',
  //   width: 200,
  //   height: 200
  // },
  // { field: 'arabic', headerName: 'Arabic', width: 200,height: 200 },
  // { field: 'arabic_no_dash', headerName: 'Arabic without Tashkel', width: 200,height: 200 },
  // {
  //   field: 'translation',
  //   headerName: 'Translation',
  //   width: 200,
  //   height: 200
  // },
  // { field: 'chain', headerName: 'Chain', width: 50,height: 200 },
];

export default function DataTable() {
  const [searchstring, setSearchString] = React.useState("");
  const [leftLimit, setLeftLimit] = React.useState(0);
  const [rowList, setRowList] = React.useState([]);
  const [searchedScholar, setScholar] = React.useState(null);
  React.useEffect(() => {
    const rows = [];
    articles.map((row, index) => {
      rows.push({ ...row, id: index + 1 });
    });
    setRowList(rows);
  }, []);
  const searchStringHandler = (event) => {
    setSearchString(event.target.value);
  };
  const searchSubmitHandler = (event) => {
    event.preventDefault();
    const newRowList = rowList.filter((row) =>
      String(row.chain).includes(searchstring)
    );
    const foundScholar = scholars.find(
      (scholar) => scholar.scholar_id == searchstring
    );
    console.log(newRowList);
    setScholar(foundScholar);
    setRowList(newRowList);
  };
  return (
    <>
      <form>
        <label htmlFor="search">Search ScholarID: </label>
        <input
          id="search"
          type="text"
          name="searchtext"
          onChange={searchStringHandler}
        />
        <button onClick={searchSubmitHandler}> Search</button>
      </form>
      {searchedScholar ? (
        <div>
          <div><b>Scholar iD</b>: {searchedScholar.scholar_id}</div>
          <div><b>Name</b>: {searchedScholar.name}</div>
          <div><b>Full Name</b>:{searchedScholar.full_name}</div>
          <div><b>Places Of Stay</b>:
            {searchedScholar.places_of_stay
              ? searchedScholar.places_of_stay
              : "N/A"}
          </div>
          <div><b>Birth Place and Date</b>:
            {searchedScholar.birth_date_and_place
              ? searchedScholar.birth_date_and_place
              : "N/A"}
          </div>
          <div><b>Death Place and Date</b>:
            {searchedScholar.death_date_and_place
              ? searchedScholar.death_date_and_place
              : "N/A"}
          </div>
        </div>
      ) : (
        ""
      )}
      <div style={{ textAlign: "right" }}>
        <button
          style={{ marginRight: "5px" }}
          onClick={(leftLimit) => {
            if (leftLimit > 0) setLeftLimit(leftLimit - 100);
          }}
        >
          {"<"}
        </button>
        <button onClick={(leftLimit) => setLeftLimit(leftLimit + 100)}>
          {">"}
        </button>
      </div>
      <div style={{ width: "100%" }}>
        <table className="table">
          <tr className="tablerow">
            {columns.map((head) => (
              <th className={`tablecell ${head == "ID" ? "idcell" : ""}`}>
                {head}
              </th>
            ))}
          </tr>
          {rowList.map((row) => {
            if (row.id < 1000) {
              return (
                <tr className="tablerow">
                  <td className="tablecell idcell">{row.id}</td>
                  <td className="tablecell tabledatacell tagcell">{row.tag}</td>
                  <td className="tablecell tabledatacell">{row.arabic}</td>
                  <td className="tablecell tabledatacell">
                    {row.arabic_no_dash}
                  </td>
                  <td className="tablecell tabledatacell">{row.translation}</td>
                  <td className="tablecell tabledatacell">{row.chain}</td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </>
  );
}
