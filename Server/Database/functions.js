const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

module.exports = {
  getServerMessage: message => {
    console.log(`<${new Date().toLocaleString()}> ${message}`);
  },
  login: (db_conn, username, password, callback) => {
    db_conn.query(
      'SELECT userPass, token FROM userAccounts WHERE username=$1',
      [username],
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        let rows = result.rows;
        if (rows.length > 0) {
          bcrypt.compare(password, rows[0].userpass, (err, res) => {
            if (err) {
              callback({
                error: true,
                message: err
              });
            }
            if (res) {
              let token = rows[0].token;
              callback({
                auth: res,
                token: token
              });
            } else {
              callback({
                auth: res
              });
            }
          });
        } else {
          callback({
            auth: false
          });
        }
      }
    );
  },
  save_events: (db_conn, deviceName, deviceType, deviceMac) => {
    const message = `${deviceName} ${deviceType} sensor triggered.`
    db_conn.query(
      'INSERT INTO systemEvents (deviceName, deviceType, deviceMac, eventMessage) VALUES ($1,$2,$3,$4)',
      [deviceName, deviceType, deviceMac, message],
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          console.log(
            `<${new Date().toLocaleString()}> System event logged to database.\n[Device Name: ${deviceName}, type: ${deviceType}, MAC: ${deviceMac}, message: ${message}]`
          );
        }
      }
    );
  },
  retrieve_events: (db_conn, callback) => {
    db_conn.query(
      'SELECT * FROM systemEvents ORDER BY eventTime',
      [],
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        callback(result.rows);
      }
    );
  }
};
