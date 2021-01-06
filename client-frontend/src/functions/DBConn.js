import axios from "axios";

// Get Connection Status
export const DBStatus = async () => {
  await axios.get(`http://localhost:8000/dbconn`).then((res) => {
    //     res.respone.status === 200
    //       ? NotificationManager.success(
    //           "CONNECTED TO DATABASE SUCCESSFULLY!",
    //           "DBConn SUCCESS!",
    //           3000
    //         )
    //       : NotificationManager.error(
    //           "DATABASE CONNECTION UNSUCCESSFUL!",
    //           "DBConn ERROR!",
    //           3000
    //         );
  });
};
