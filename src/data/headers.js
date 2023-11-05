const myHeaders = {
  "Content-type": "application/json",
  "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
};

export default myHeaders;