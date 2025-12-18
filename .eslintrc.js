module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
  ],
  rules: {
    // ปรับระดับได้ตามต้องการ
    'react-hooks/exhaustive-deps': 'warn', // หรือ 'off'
  },
};
