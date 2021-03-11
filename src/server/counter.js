import connection from "./mysql";
import logger from "./logger";

const counter = (req, res, next) => {
  if (!req.cookies.visitor) {
    connection.query(
      `SELECT date FROM counter WHERE date=${new Date().toLocaleDateString()}`,
      (err, rows) => {
        if (err) {
          logger.error(err);
        } else {
          if (rows.length === 0) {
            connection.query(
              `INSERT INTO counter (date, count) VALUES(?, ?)`,
              [new Date().toLocaleDateString(), 1],
              (err) => {
                if (err) {
                  logger.error(err);
                }
              }
            );
          } else if (rows.length === 1) {
            connection.query(
              `UPDATE counter SET count=count+1 WHERE date=?`,
              [new Date().toLocaleDateString()],
              (err) => {
                if (err) {
                  logger.error(err);
                }
              }
            );
          } else {
            logger.error(rows.length, rows);
          }
        }
      }
    );

    res.cookie("visitor", "counted", {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
    });
  }

  return next();
};

export default counter;
