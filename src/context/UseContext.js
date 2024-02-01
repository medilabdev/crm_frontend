import axios from "axios";
// ini khusus get

export const getPackageProduct =async (token) => {
   const datas = axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/packages-product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async(res)  =>{
        const data = await res.data.data
        return data
      } )
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      })
      return datas
  };


  // export const getCompany = (token) => {
  //   const datas = axios
  // }

