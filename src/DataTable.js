import * as React from "react";
import articles from "./articles.json";
import scholars from "./scholars.json";
const columns = [
  "ID",
  "Tag",
  "Arabic",
  "Arabic without Tashkel",
  "Translation",
  "Chain",
];

export default function DataTable() {
  const [searchstring, setSearchString] = React.useState("");
  const [bookstring, setBookString] = React.useState("");
  const [hadithstring, setHadithString] = React.useState("");
  const [leftLimit, setLeftLimit] = React.useState(0);
  const [rowList, setRowList] = React.useState([]);
  const [searchedScholar, setScholar] = React.useState(null);

  const tagToBookHadih = (tag) => {
    const numArray = tag.match(/\d+/g);
    // console.log(numArray);
    return numArray;
  }
  const rows = [];
  articles.map((row, index) => {
    const chainArray = row.chain.split("->");
    const BookHadih = tagToBookHadih(row.tag);
    rows.push({ ...row, id: index + 1, chain: chainArray,book: BookHadih[0],hadith: BookHadih[1] });
  });
  React.useEffect(() => {
    const interestedrows = rows.slice(leftLimit, 1000 + leftLimit);

    console.log(interestedrows);
    setRowList(interestedrows);
  }, []);
  const searchStringHandler = (event) => {
    setSearchString(event.target.value);
  };
  const searchBookHandler = (event) => {
    setBookString(event.target.value);
  };
  const searchHadithHandler = (event) => {
    setHadithString(event.target.value);
  };
  const searchSubmitHandler = (event) => {
    event.preventDefault();
    const newRowList = rowList.filter((row) =>
      row.chain.includes(searchstring)
    );
    const foundScholar = scholars.find(
      (scholar) => scholar.scholar_id == searchstring
    );
    console.log(newRowList);
    setScholar(foundScholar);
    setRowList(newRowList);
  };
  const searchSubmitHandler2 = (event) => {
    event.preventDefault();
    const newRowList = rowList.filter((row) =>
      row.book == bookstring
    );
    
    console.log(newRowList);
    setRowList(newRowList);
  };
  const searchSubmitHandler3 = (event) => {
    event.preventDefault();
    const newRowList = rowList.filter((row) =>
      row.hadith == hadithstring
    );
    
    console.log(newRowList);
    setRowList(newRowList);
  };
  console.log(leftLimit);
  return (
    <>
      <form className="searchbar">
        <label htmlFor="search">Search ScholarID: </label>
        <input
          id="search"
          type="text"
          name="searchtext"
          onChange={searchStringHandler}
        />
        <button onClick={searchSubmitHandler}> Search</button>
      </form>
      <form className="searchbar">
        <label htmlFor="search">Search Book: </label>
        <input
          id="search"
          type="text"
          name="searchtext"
          onChange={searchBookHandler}
        />
        <button onClick={searchSubmitHandler2}> Search</button>
      </form>
      <form className="searchbar">
        <label htmlFor="search">Search Hadith: </label>
        <input
          id="search"
          type="text"
          name="searchtext"
          onChange={searchHadithHandler}
        />
        <button onClick={searchSubmitHandler3}> Search</button>
      </form>
      {searchedScholar ? (
        <div className="searchResult">
          <div>
            <b>Scholar ID:</b> {searchedScholar.scholar_id}
          </div>
          <div>
            <b>Name:</b> {searchedScholar.name}
          </div>
          <div>
            <b>Full Name:</b>
            {searchedScholar.full_name}
          </div>
          <div>
            <b>Places Of Stay:</b>
            {searchedScholar.places_of_stay
              ? searchedScholar.places_of_stay
              : "N/A"}
          </div>
          <div>
            <b>Birth Place and Date:</b>
            {searchedScholar.birth_date_and_place
              ? searchedScholar.birth_date_and_place
              : "N/A"}
          </div>
          <div>
            <b>Death Place and Date:</b>
            {searchedScholar.death_date_and_place
              ? searchedScholar.death_date_and_place
              : "N/A"}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div style={{ textAlign: "right" }}>
        <button
          style={{ marginRight: "5px" }}
          onClick={(prevState) => {
            const newvalue = prevState - 1000;
            if (newvalue>-1) setLeftLimit(newvalue);
          }}
        >
          {"<"}
        </button>
        <button onClick={(prevState) => setLeftLimit(prevState + 1000)}>
          {">"}
        </button>
      </div> */}
      <div style={{ width: "100%" }}>
        <table className="table">
          <thead>
            <tr className="tablerow">
              {columns.map((head) => (
                <th
                  className={`tablecell tableheadcell ${
                    head == "ID" ? "idcell" : ""
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowList.map((row) => {
              return (
                <tr className="tablerow">
                  <td className="tablecell idcell">{row.id}</td>
                  <td className="tablecell tabledatacell tagcell">{row.tag}</td>
                  <td className="tablecell tabledatacell">{row.arabic}</td>
                  <td className="tablecell tabledatacell">
                    {row.arabic_no_dash}
                  </td>
                  <td className="tablecell tabledatacell">{row.translation}</td>
                  <td className="tablecell tabledatacell chaincell">
                    {row.chain.map((scholarid, index) => {
                      if (index + 1 < row.chain.length)
                        return (
                          <>
                            <div
                              className="chaincircle"
                              style={{ textAlign: "center" }}
                              onClick={(e) => {
                                setSearchString(scholarid);
                                searchSubmitHandler(e);
                              }}
                            >
                              {scholarid}
                            </div>
                            <div style={{ textAlign: "center" }}>{"|"}</div>
                            <div style={{ textAlign: "center" }}>{"\\/"}</div>
                          </>
                        );
                      return (
                        <div
                          className="chaincircle"
                          style={{ textAlign: "center" }}
                          onClick={(e) => {
                            setSearchString(scholarid);
                            searchSubmitHandler(e);
                          }}
                        >
                          {scholarid}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
