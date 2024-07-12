// import User from "../model/user.model.js";
import Order from "../model/order.model.js";

// import bcryptjs from "bcryptjs";

export const order = async (req, res) => {
  try {
    const { fullname, email, address, phone } = req.body;
    // const user = await User.findOne({ email });
    // if (user) {
    //   return res.status(400).json({ message: "User already exist" });
    // }
    // const hashPassword = await bcryptjs.hash(password, 10);
    const customer = new Order({
      fullname: fullname,
      email: email,
      address: address,
      phone: phone,
    });
    async function dropIndexIfExists() {
      try {
        await Order.collection.dropIndex("email_1");
        console.log("Unique index on email field dropped successfully");
      } catch (err) {
        if (err.codeName === "IndexNotFound") {
          // console.log("Index not found, skipping drop operation");
        } else {
          console.error("Error dropping index:", err);
        }
      }
    }
    dropIndexIfExists();
    await customer.save();
    res.status(201).json({
      message: "Book Ordered successfully",
      user: {
        _id: customer._id,
        fullname: customer.fullname,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};
