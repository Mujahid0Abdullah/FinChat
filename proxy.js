import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json("Not logged in");
    }

    jwt.verify(token, "SecretKey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }

        // Kullanıcı doğrulandı, bir sonraki adıma geç
        req.userInfo = userInfo; // İsteği işlerken kullanıcı bilgilerini taşımak için isteğe ekleyebilirsiniz
        next();
    });
};