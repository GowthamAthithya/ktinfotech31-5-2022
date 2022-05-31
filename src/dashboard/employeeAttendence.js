import React, { useState, useEffect } from "react";
import { Table } from "antd";
//import { DownOutlined } from "@ant-design/icons";
import Dashboardnav from "./dashboardnav";
import HeaderNav from "../headernav";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
import Cookies from "universal-cookie";
//import { async } from "@firebase/util";
const cookies = new Cookies();

const EditableTable = () => {
  const [data, _data] = useState();
  const usersRef = collection(db, "Users");

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const userData = await getDocs(usersRef);
    const usersData = userData.docs.map((doc) => ({
      ...doc.data(),
      created_at: moment(doc.created_at),
      id: doc.id,
    }));
    // const userCookieData =
    cookies.get("userData");
    console.log("usersData", usersData);
    const userTable = [];
    usersData.map((user) =>
      user?.date?.map((el) =>
        userTable.push({
          date: el.date,
          status: el.loginStatus,
          clockIn: el?.clockIn,
          clockOut: el?.clockOut,
          hours: el?.hours,
          totalWords: el?.totalWords || "NA",
          name: user.name,
        })
      )
    );
    _data(userTable);
  };

  const columns = [
    {
      title: "Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "1",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "1",
    },

    {
      title: "Clock In",
      dataIndex: "clockIn",
    },
    {
      title: "Clock Out",
      dataIndex: "clockOut",
    },
    {
      title: "In Hours",
      dataIndex: "hours",
    },
    {
      title: "Total Words",
      dataIndex: "totalWords",
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   fixed: 'right',
    //   width: 100,
    //   render: () => <a>action</a>,
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1300,
      }}
    />
  );
};

export default function employeeAttendence() {
  return (
    <div>
      <HeaderNav />
      <div className="dashboard">
        <Dashboardnav />
        <div className="dashboardContent">
          <EditableTable />
        </div>
      </div>
    </div>
  );
}
