import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
  renderCart = () => {
    return this.props.cartGlobal.cartList.map((val) => {
      return (
        <tr>
          <td className="align-middle">
            <img src={val.foto_obat} alt="" style={{ width: "50px" }} />{" "}
            {val.nama_obat}
          </td>
          <td className="align-middle">Rp. {val.harga},-</td>
          <td className="align-middle"> {val.qty_obat}</td>
          <td className="align-middle">Rp. {val.harga * val.qty_obat},-</td>
          <td className="align-middle">
            <button className="btn btn-sm btn-danger">
              <i className="fa fa-times"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h2 className="text-center display-4">KERANJANG BELANJA</h2>
        <div className="row px-xl-5 mt-4">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover table-striped text-center mb-0">
              <thead className="thead-dark border-bottom">
                <tr>
                  <th>Obat</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                  <th>Hapus</th>
                </tr>
              </thead>
              <tbody className="align-middle">{this.renderCart()}</tbody>
            </table>
          </div>
          <div className="bg-light col-lg-4">
            <h5 className="section-title position-relative text-uppercase text-center mb-3">
              <span className="pr-3">Cart Summary</span>
            </h5>
            <div className="p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>Rp ,-</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Biaya Pengiriman</h6>
                  <h6 className="font-weight-bold">GRATIS</h6>
                </div>
              </div>
              <div className="pt-2 text-center">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>Rp ,-</h5>
                </div>
                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                  KE PEMBAYARAN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartGlobal: state.cart,
  };
};

export default connect(mapStateToProps)(Cart);
