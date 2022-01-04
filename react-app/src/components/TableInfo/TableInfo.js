import React from 'react';
import "./TableInfo.css";

const TableInfo = (props) => {
  const { tableHead, tableBody, tableRowOrder, tableRowOnClick } = props;

  const clickFunc = (val) => {
    return tableRowOnClick ? tableRowOnClick(val) : null;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {tableHead.length > 0 &&
              tableHead.map((headerText) => {
                return (
                  <th
                    scope="col"
                    key={headerText}
                  >
                    {headerText}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {tableBody.length > 0 &&
            tableBody.map((bodyObj) => {
              return (
                <tr
                  key={bodyObj.id}
                  onClick={() => clickFunc(bodyObj)}
                >
                  {tableRowOrder.length > 0 &&
                    tableRowOrder.map((detail) => {
                      return (
                        <td key={`${bodyObj.id}-${detail}:${bodyObj[detail]}`}>
                          {bodyObj[detail]}
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableInfo;
