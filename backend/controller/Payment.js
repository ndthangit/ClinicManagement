exports.checkout = async (req, res) => {
    try {
      // Logic thanh toán ở đây
      res.status(200).json({ message: "Thanh toán thành công" });
    } catch (error) {
      res.status(500).json({ message: "Thanh toán thất bại", error });
    }
  };
  