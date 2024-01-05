import { google } from 'googleapis';
import Express from "express";
import { authorize } from './proxy.js';
import bcrypt from "bcryptjs";
import fs from "fs";


const router = Express.Router()
const CLIENT_ID = '722858064637-u2nac9ejnl8car1hovq8g66u2oev3hm0.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04LBySGmii6nBCgYIARAAGAQSNwF-L9IrWKWHdQqj1WcfBCH4tJi4ZQSSpM_GHxEmh3GQMAKOkBoHdUI2li4cfjhev5RWv7HVW-w';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
//const filePath = path.join(__dirname, 'example.jpg');
/*
export async function uploadFile(img) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: Date.now() + 'example.jpg', //This can be name of your choice
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: img,
            },
        });

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}*/

export async function uploadFile(filename) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: Date.now() + filename, //This can be name of your choice
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream("public/" + filename),
            },
        });


        console.log(response.data);
        drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        return response.data.id;

    } catch (error) {
        console.log(error.message);
        return null
    }
}

// uploadFile();

async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: 'YOUR FILE ID',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

// deleteFile();

export async function generatePublicUrl(id) {
    try {
        const fileId = id;
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}

router.put("/", authorize, async (req, res) => {

    console.log("Password:", req.body.password);
    //yeni kullanıcı oluşturma
    const files = req.files;

    // Resim dosyasını bul
    console.log(req.file)
    console.log(req.files)
    const formData = req.body

    try {
        const response = await drive.files.create({
            requestBody: {
                name: Date.now() + 'example.jpg', //This can be name of your choice
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: req.files.file,
            },
        });

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }



    //hash password
    const Salt = bcrypt.genSaltSync(10); // şifreleme metodu
    const hashedPassword = bcrypt.hashSync(req.body.password, Salt)
    console.log("Salt:", Salt);

    const q =
        "UPDATE users SET `name`=?,`password`=? WHERE id=? ";

    db.query(
        q,
        [
            req.body.name,
            hashedPassword,
            req.userInfo.id,
        ],
        (err, data) => {
            if (err) res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
        }
    );

});


