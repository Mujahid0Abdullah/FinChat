import { google } from 'googleapis';


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

async function generatePublicUrl() {
    try {
        const fileId = 'YOUR FILE ID';
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