require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Koneksi database PostgreSQL berhasil.');

    await sequelize.sync({ alter: true });
    console.log(' Model & Tabel berhasil disinkronkan.');

    app.listen(PORT, () => {
      console.log(` Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Gagal menjalankan server:', error.message);
  }
};

startServer();