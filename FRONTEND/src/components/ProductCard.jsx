import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../assets/styles/product_card.css";
import { connect } from "react-redux";
import { API_URL } from "../constants/API";
import { getCartData } from "../redux/actions/cart";

class ProductCard extends React.Component {
  addToCartHandler = () => {
    Axios.get(`${API_URL}/cart/get-cart`, {
      params: {
        id_user: this.props.userGlobal.id_user,
        idobat: this.props.productData.idobat,
        status: "Menunggu Pembayaran",
      },
    }).then((result) => {
      if (result.data.length) {
        // jika barang sudah ada di cart user
        return Axios.patch(
          `${API_URL}/cart/edit-cart/${result.data[0].id_cart}`,
          {
            qty_obat: result.data[0].qty_obat + 1,
          }
        )
          .then(() => {
            alert("Berhasil menambahkan qty ke cart");
            this.props.getCartData(this.props.userGlobal.id_user);
          })
          .catch((err) => {
            alert("Gagal saat patch data");
            console.log(err);
          });
      } else {
        // jika barang belum ada di cart user
        return Axios.post(`${API_URL}/cart/add-to-cart`, {
          id_user: this.props.userGlobal.id_user,
          idobat: this.props.productData.idobat,
          qty_obat: 1,
          harga: this.props.productData.harga,
          status: "Menunggu Pembayaran",
        })
          .then(() => {
            alert("Berhasil menambahkan obat ke cart");
            this.props.getCartData(this.props.userGlobal.id_user);
          })
          .catch((err) => {
            alert(`Gagal menambahkan obat ke cart`);
            console.log(err);
          });
      }
    });
  };

  render() {
    return (
      <div className="card product-card">
        <img
          className="img-fluid"
          src={this.props.productData.foto_obat}
          alt=""
        />
        {this.props.productData.golongan === "Obat Bebas" ? (
          <i className="fas fa-circle text-success"></i>
        ) : this.props.productData.golongan === "Obat Keras" ? (
          <div
            className="circle text-center"
            style={{
              width: "18px",
              height: "18px",
              backgroundColor: "red",
              borderRadius: "100%",
              fontWeight: "bolder",
              fontSize: "10px",
              border: "2px solid",
            }}
          >
            K
          </div>
        ) : this.props.productData.golongan === "Obat Bebas Terbatas" ? (
          <i className="fas fa-circle text-primary"></i>
        ) : this.props.productData.golongan === "Herbal" ? (
          <i className="fas fa-circle text-warning"></i>
        ) : this.props.productData.golongan === "Alat Kesehatan" ? (
          <i className="fas fa-plus-square"></i>
        ) : null}
        <div className="mt-2">
          <div>
            <h6 className="text-truncate mb-3">
              {this.props.productData.nama_obat}
            </h6>
            <div className="d-flex justify-content-start">
              <h6>
                Rp {this.props.productData.harga.toLocaleString("id")} /{" "}
                {this.props.productData.satuan_jual}
              </h6>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row justify-content-between">
              <Link
                to={`/product-detail/${this.props.productData.idobat}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <i className="fas fa-eye text-dark"></i> View Detail
              </Link>
            </div>
            {this.props.userGlobal.id_user ? (
              <button
                onClick={this.addToCartHandler}
                className="btn btn-sm text-dark"
                style={{ backgroundColor: "#50c878" }}
              >
                <i className="fas fa-shopping-cart text-dark mr-1 "></i> Add to
                cart
              </button>
            ) : (
              <button disabled className="btn btn-info btn-sm text-dark">
                <i className="fas fa-shopping-cart text-dark mr-1 "></i> Add to
                cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
