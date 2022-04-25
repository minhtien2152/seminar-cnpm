const request = require("request");
const fs = require("fs");

// request.get("https://google.com", function (err, response) {
//   console.log(
//     "Time elapsed since queuing the request:",
//     new Date().getTime() - start_time
//   );
// });

// request.get(
//   { url: "http://www.google.com", time: true },
//   function (err, response) {
//     console.log("The actual time elapsed:", response.elapsedTime);
//   }
// );
let body =
  "o5DmUQ9DHRb4MaGd4Mi7fmuBST0NnsgmR5Hz1FIt7awXp0hwc1Dwm2wNghFh49qEQHUny1Qfjh307xXXP4jTtuaA1NtlvIPGf7As8UUCR2xknkvW4xNksprBuNmv8WmKDzeKY3ALo3Rht8ZLRHKEwgT0gObXRS0klybX07U6QDtDF0BD36hy4EwkQMDYTh3vmvi7IFSPOe7sN6GhV9nPofTiDONMRhW7HdiAPepLF6xl2MrAY4YzzPfahFvhRFXfgepYELYfh9anaURSyd0ky3fPRb9hHESPjGetAoThea9IVnc7BaPbSmEPCMBNiyNqNdWuNaYWtwranZEDtoHQ9r2tRzEVWtzcOnin0REVncoJYo0PJRdEQGjPHLum8SEWVFFvBOt3WtYMXMgNghNPDCI3NB4NA4ez4tPMmcjYSbC2lGMhlcRKP6LcVQrRgK5pKktP2RsEABxGVHDFGTZfFb06kGxQVjoO66Xsd4BvXPao4ZY2kFofEu5CQSmxCewnNXZ10JsTJPARX5hshakjNkWY1SIYkfbU0EXbAxLl7FSmsRW9TJxsPQhlB59KuQZa3VlrclGoElBm5haRTBAgJl8doHGDGah7ZkJujPr7M9Rioe4FIalmIguZTpsGDSfonA0eyqgWrOKY1JC1GKm0sUO99QMaxgJbJM96GqaDqxCWvx5BaqVAXVXalsVSYArIQgs7KPxuBK7CgyfDOTYtgvy8NwhS1AsJemnc880sBaLpPQDaZQH0oiTiJW121BXtfuVZ2ArPzgiTDQgNsTuZVX63KsmzqUMAKHFF4WHiDUN2MJ3J20UL81CWNVmmC3CR2zH8UkBXCOnCymUqhrhHQvBkhliJE6NElvfc2ljTcBcZDeqO1ZYRnnsukAvbit2UA7NUspNVFBLamwWYXNygOBLkVVnJyTd4L4zbmyJkHiVVO81aX2Lhj0vC0iVYzuxLGRVykQpDrxtvR6BXk5wYNALhCffAnzIcPs6KxpKA61YKjHlD4LmBn5TY7d5hwRr0";

const array = [...Array(1000)].map(
  (i) =>
    new Promise((resolve, reject) => {
      request(
        {
          uri: "http://localhost:3000",
          method: "POST",
          time: true,
          body: body,
        },
        (err, resp) => {
          if (err) reject(err);
          else resolve(resp.elapsedTime);
        }
      );
    })
);

let start_time = new Date().getTime();

Promise.all(array).then((values) => {
  console.log(values[0]);
  // const sum = values.reduce((partialSum, a) => partialSum + a, 0);
  // console.log(sum);
  console.log(
    "Time elapsed since queuing the request:",
    new Date().getTime() - start_time
  );
  //console.log("The actual time elapsed:", values.elapsedTime);
});
