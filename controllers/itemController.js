const { Item, User } = require('../models');

// 1. Ambil semua item (Read - All)
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email']
        }
      ],
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil semua data item',
      total: items.length,
      data: items
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data item',
      error: error.message
    });
  }
};

// 2. Ambil detail item berdasarkan ID (Read - By ID)
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item dengan ID ${id} tidak ditemukan`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil detail item',
      data: item
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail item',
      error: error.message
    });
  }
};

// 3. Tambah data item baru (Create)
exports.createItem = async (req, res) => {
  try {
    const { nama, deskripsi, harga, stok } = req.body;
    const userId = req.user ? req.user.id : null;

    const newItem = await Item.create({
      nama,
      deskripsi,
      harga,
      stok,
      userId
    });

    return res.status(201).json({
      success: true,
      message: 'Item berhasil ditambahkan',
      data: newItem
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validasi data gagal',
        errors: messages
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan item',
      error: error.message
    });
  }
};

// 4. Update data item berdasarkan ID (Update)
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi, harga, stok } = req.body;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item dengan ID ${id} tidak ditemukan`
      });
    }

    await item.update({
      nama: nama !== undefined ? nama : item.nama,
      deskripsi: deskripsi !== undefined ? deskripsi : item.deskripsi,
      harga: harga !== undefined ? harga : item.harga,
      stok: stok !== undefined ? stok : item.stok
    });

    return res.status(200).json({
      success: true,
      message: 'Item berhasil diperbarui',
      data: item
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validasi data update gagal',
        errors: messages
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui item',
      error: error.message
    });
  }
};

// 5. Hapus item berdasarkan ID (Delete)
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item dengan ID ${id} tidak ditemukan`
      });
    }

    await item.destroy();

    return res.status(200).json({
      success: true,
      message: `Item dengan ID ${id} berhasil dihapus`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus item',
      error: error.message
    });
  }
};