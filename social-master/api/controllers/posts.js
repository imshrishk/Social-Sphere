import { db }from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
    
        const q = 'SELECT p.*, u.user_ID, u.name, u.profilePic FROM posts AS p JOIN users AS u ON (p.user_ID = u.user_ID) ORDER BY p.timestamp DESC';
        
    db.query(q,[userInfo.user_ID,userInfo.user_ID], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
})

};

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
    
        const q = "INSERT INTO posts (content,img, timestamp, user_ID) VALUES (?)";

        const values = [
            req.body.content,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.user_ID
        ];
    
    db.query(q,[values], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json("post created");
    });
})

}