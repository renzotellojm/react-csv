
import { useState } from "react";
import Papa from "papaparse";
//Set of extension
const fileExtensions = ["csv"];

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  //State to store error
  const[error, setError] = useState("");

  const changeHandler = (event) => {
    //Checking file
    setError("");
    //Check file extension
    const ext  = event.target.files[0].type.split("/")[1];
    if(!fileExtensions.includes(ext)) {
      debugger;
      setError("Please input a csv file");
      return;
    }

    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header:true,
      skipEmptyLines:true,
      complete:function(results){
        //console.log("Parsing complete:", results.data)
        const rowsArray = [];
        const valuesArray =[];
        // Iterating data to get column
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed data response in array format
        setParsedData(results.data);
        // column names
        setTableRows(rowsArray[0]);
        //Values
        setValues(valuesArray);
      }
    })
  }

  return (
    <div>

      {/* File uploader */}
      <label htmlFor="csvInput" style={{display:"block"}}>Enter CSV file</label>
      <input
        type="file"
        name="file"
        accept='.csv'
        style={{display:"block",margin:"10px auto"}}
        onChange={changeHandler}
      />

      <br />
      <div style={{marginTop:"3rem"}}>
        {error}
      </div>
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
