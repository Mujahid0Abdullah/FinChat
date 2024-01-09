import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = (req, res) => {

    const q = "SELECT c.* ,u.id AS userId , name , profilePic FROM comments c JOIN users u ON (u.id= c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC "
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });

}
/*
function acc(id){
    let oran =0
    let all=1

    const q = "SELECT count(sentiment) as oran FROM comments  WHERE postId = ? and sentiment=1"
    db.query(q, [id], (err, data) => {
          oran= data.oran
          const q2 = "SELECT count(sentiment) as al FROM comments  WHERE postId = ? "
          db.query(q2, [id], (err, data) => {
             
              console.log("dataall"+data.al)
      
              all= data.al
              console.log("alliç"+all)

              console.log("alldiş"+all)
              if (all != 0 && all != null ){const sonuc= oran/all
              console.log("sonuç"+sonuc)
          
              const q3 ="UPDATE posts SET `img`=? WHERE id=? ";
              db.query(q3, [sonuc,id], (err, data) => {
                 
                  console.log(data)
              });
          
          }
              
          });

    });

   

   
}
*/
async function acc(id) {
    try {
      let oran = 0;
      let all = 1;
  
      // First query using a promise
      const oranData = await new Promise((resolve, reject) => {
        db.query(
          "SELECT count(sentiment) as oran FROM comments WHERE postId = ? and sentiment=1",
          [id],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
  
      oran = oranData[0].oran;
      console.log(oran)
      // Second query using a promise
      const allData = await new Promise((resolve, reject) => {
        db.query(
          "SELECT count(sentiment) as al FROM comments WHERE postId = ?",
          [id],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
  
      all = allData[0].al;
      console.log(all)

      if (all !== 0 && all !== null) {
        const sonuc = oran / all;
        console.log(sonuc)

        // Update query using a promise
        await new Promise((resolve, reject) => {
          db.query(
            "UPDATE posts SET `img`=? WHERE id=?",
            [sonuc, id],
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            }
          );
        });
  
        console.log("Data updated successfully");
      } else {
        console.log("Cannot calculate ratio: all is 0 or null");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
/*
  async function acc(id) {
    try {
      const oranData = await new Promise((resolve, reject) => {
        db.query(
          "SELECT count(sentiment) as oran FROM comments WHERE postId = ? and sentiment=1",
          [id],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
  
      const allData = await new Promise((resolve, reject) => {
        db.query(
          "SELECT count(sentiment) as al FROM comments WHERE postId = ?",
          [id],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
  
      let oran = oranData.oran;
      let all = allData.al;
  
      if (all !== 0 && all !== null) {
        const sonuc = oran / all;
  
        // Update query using a promise
        await new Promise((resolve, reject) => {
          db.query(
            "UPDATE posts SET `img`=? WHERE id=?",
            [sonuc, id],
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            }
          );
        });
  
        console.log("Data updated successfully");
      } else {
        console.log("Cannot calculate ratio: all is 0 or null");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }*/
export const addComment = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("giriş yapılmadı")

    jwt.verify(token, "SecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO comments (`desc`, `postId`, `userId`, `createdAt`, `sentiment`) VALUES (?)";

        const descValue = req.body.desc;//req çalışmıyor
        console.log(descValue);
        const values = [
            descValue,
            req.query.postId,
            userInfo.id,
           

            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.sentiment
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            acc(req.query.postId)
            return res.status(200).json("comment eklendi");
        });
    })

}


export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("giriş yapılmadı");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const commentId = req.params.id;
        const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Comment has been deleted!");
            return res.status(403).json("You can delete only your comment!");
        });
    });
};