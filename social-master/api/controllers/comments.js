import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = 'SELECT c.*, u.user_ID, u.name, u.profilePic FROM comments AS c JOIN users AS u ON (c.user_ID = u.user_ID) WHERE c.post_ID = ? ORDER BY c.timestamp DESC';

  db.query(q, [req.query.post_ID], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments (text, timestamp, user_ID, post_ID) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.text,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.user_ID,
      req.body.post_ID // Corrected to req.body.post_ID
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Comment created");
    });
  });
};
