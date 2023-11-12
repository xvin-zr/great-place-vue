const myHeaders = {
  "Content-type": "application/json",
  "Authorization": `${sessionStorage.getItem("token")}`,
};

export default myHeaders;