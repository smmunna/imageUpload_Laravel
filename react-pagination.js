import React, { useEffect, useState } from "react";
import "../App.css";
import ReactPaginate from "react-paginate";

function FetchData() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };

    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };

  if (items.length === 0) {
    return (
      <div>
        <h1>Loading......!</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="paginate">
          <ReactPaginate
            previousLabel="< previous"
            nextLabel="next >"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
          {items.map((value) => {
            return (
              <tr className="myrow">
                <td className="mytd">{value.id}</td>
                <td className="mytd">{value.title}</td>
                <td className="mytd">{value.body}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default FetchData;
