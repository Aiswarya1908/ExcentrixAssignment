import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DataTable.css"; 

const DataTable = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/files`);

        console.log(data);

        const filteredFiles = data.filter(
          (eachData) => eachData.projectId === id
        );

        setData(filteredFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);
  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Filename</th>
          <th>Path</th>
          <th>Project ID</th>
          <th>Created At</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.filename}</td>
            <a href={`${item.path}`} target="_blank">
              <td>{item.path}</td>
            </a>
            <td>{item.projectId}</td>
            <td>{new Date(item.createdAt).toLocaleString()}</td>
            <td>{item.__v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
