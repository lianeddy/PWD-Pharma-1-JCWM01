import Axios from "axios";
import { API_URL } from "../../constants/API";
import { getCartData } from "./cart";

export const registerUser = ({
  nama_depan,
  nama_belakang,
  jenis_kelamin,
  tanggal_lahir,
  email,
  password,
  konfirmasi_password,
}) => {
  return (dispatch) => {
    if (
      nama_depan === "" ||
      nama_belakang === "" ||
      jenis_kelamin === "" ||
      tanggal_lahir === "" ||
      email === "" ||
      password === "" ||
      konfirmasi_password === ""
    ) {
      return dispatch({
        type: "USER_ERROR",
        payload: "Mohon isi semua form",
      });
    } else if (password !== konfirmasi_password) {
      return dispatch({
        type: "USER_ERROR",
        payload: "Mohon sesuaikan password dan konfirmasi password",
      });
    } else {
      return Axios.post(`${API_URL}/user/add-user`, {
        nama_depan,
        nama_belakang,
        email,
        password,
        jenis_kelamin,
        status: "UNVERIFIED",
        tanggal_lahir,
        role: "USER",
      })
        .then((result) => {
          delete result.data.password;
          dispatch({
            type: "USER_LOGIN",
            payload: result.data,
          });
          alert("Berhasil Mendaftar");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    if (email == "" || password == "") {
      alert("Please fill all the form");
    }
    Axios.post(`${API_URL}/user/login`, {
      email,
      password,
    })
      .then((res) => {
        if (res.data.dataLogin !== 1) {
          if (res.data.dataLogin) {
            localStorage.setItem(
              "userDataAMR",
              JSON.stringify(res.data.dataLogin)
            );
            dispatch({
              type: "USER_LOGIN",
              payload: res.data.dataLogin,
            });
            dispatch(getCartData(res.data.dataLogin.id_user));
          } else {
            dispatch({
              type: "USER_ERROR",
              payload:
                "Your Account is not Verified. Please Verify your Account",
            });
          }
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: "Wrong Username or Password",
          });
        }
      })
      .catch((err) => {
        alert("Kesalahan saat Login");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataAMR");
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/user/keep-login`, {
      id_user: userData.id_user,
    })
      .then((res) => {
        localStorage.setItem("userDataAMR", JSON.stringify(res.data.dataLogin));
        dispatch({
          type: "USER_LOGIN",
          payload: res.data.dataLogin,
        });
        dispatch(getCartData(res.data.dataLogin.id_user));
      })
      .catch((err) => {
        alert("Error has occurred");
        console.log(err);
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};

export const searchProduct = (searchProduct) => {
  return (dispatch) => {
    dispatch({
      type: "SEARCH_PRODUCT",
      payload: searchProduct,
    });
  };
};
