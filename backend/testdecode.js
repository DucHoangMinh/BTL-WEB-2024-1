const jwt = require('jsonwebtoken');

// Token cần giải mã
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGhhbmhkb25nMTMxN0BnbWFpbC5jb20iLCJpYXQiOjE3MzIzODE4NjcsImV4cCI6MTczMjQ2ODI2N30.gYGqq8AedabZDlrV7b7cAc1FpDEKhqsRWPBQotOTTHs';

try {
  // Decode payload mà không cần xác thực (không cần secret key)
  const decoded = jwt.decode(token);

  console.log('Decoded Token:', decoded);

  // Nếu muốn xác thực token, cần secret key
  const secretKey = 'YOUR_SECRET_KEY'; // Thay bằng secret của bạn
  const verified = jwt.verify(token, secretKey);

  console.log('Verified Token:', verified);
} catch (error) {
  console.error('Error decoding token:', error.message);
}
