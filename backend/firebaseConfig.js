const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');  // Đường dẫn tới file key tải về

// Khởi tạo Firebase Admin SDK với Service Account Key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  // Đảm bảo rằng bạn sử dụng đúng file JSON
  storageBucket: 'soakls.appspot.com',  // Thay 'YOUR_PROJECT_ID' bằng ID dự án của bạn
});

const db = admin.firestore();  // Khởi tạo Firestore
const bucket = admin.storage().bucket();  // Khởi tạo Firebase Storage

module.exports = { db, bucket };
