const { db } = require("../database");

module.exports = {
  getRawDrugs: (req, res) => {
    let scriptQuery =
      "select prescriptions.id_prescriptions, prescriptions.tanggal, user.nama_depan, user.nama_belakang, user.email from prescriptions left join user on user.id_user = prescriptions.id_user;";
    if (req.query.id_prescriptions) {
      scriptQuery = `select user.id_user, user.nama_depan, user.nama_belakang, user.email, prescriptions.id_prescriptions, prescriptions.foto_prescription, prescriptions.tanggal from prescriptions
            left join user on user.id_user = prescriptions.id_user
            where prescriptions.id_prescriptions = ${db.escape(
              req.query.id_prescriptions
            )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  restockRawDrugs: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE obat_bahan set ${dataUpdate} where id_bahan_obat = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  prescriptionToCart: (req, res) => {
    console.log(req.body);
    let { id_user, id_bahan_obat, kandungan, tanggal } = req.body;
    let insertQuery = `Insert into prescription_cart (id_user, id_bahan_obat, kandungan, tanggal, status) values (${db.escape(
      id_user
    )}, ${db.escape(id_bahan_obat)}, ${db.escape(kandungan)}, ${db.escape(
      tanggal
    )}, "Menunggu Pembayaran");`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) return res.status(500).send(err);
      db.query(
        `Select * from prescription_cart where id_user = ${db.escape(
          id_user
        )};`,
        (err2, result2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send({
            message: `Berhasil menambah permintaan resep ke cart user`,
            data: result2,
          });
        }
      );
    });
  },

  deletePrescriptionRequest: (req, res) => {
    let deleteQuery = `Delete from prescriptions where id_prescriptions = ${db.escape(
      req.params.id_prescriptions
    )};`;
    console.log(deleteQuery);
    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  rejectPrescription: (req, res) => {
    let { id_user, tanggal, reason } = req.body;
    let insertQuery = `Insert into rejected_prescriptions (id_user, tanggal, reason) values (${db.escape(
      id_user
    )}, ${db.escape(tanggal)}, ${db.escape(reason)});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) return res.status(500).send(err);
      db.query(
        `Select * from rejected_prescriptions where id_user = ${db.escape(
          id_user
        )};`,
        (err2, result2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send({
            message: `Permintaan resep telah ditolak`,
            data: result2,
          });
        }
      );
    });
  },

  getRejectedPrescriptions: (req, res) => {
    let scriptQuery = `select rejected_prescriptions.idrejected_prescriptions, rejected_prescriptions.tanggal, rejected_prescriptions.reason, user.nama_depan, user.nama_belakang from rejected_prescriptions
    left join user on user.id_user = rejected_prescriptions.id_user;`;
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
