import Contact from "../model/contact.model.js";

export const contact = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;
    // const user = await User.findOne({ email });
    // if (user) {
    //   return res.status(400).json({ message: "User already exist" });
    // }
    // const hashPassword = await bcryptjs.hash(password, 10);
    const customersinfo = new Contact({
      fullname: fullname,
      email: email,
      message: message,
    });
    async function dropIndexIfExists() {
      try {
        await Contact.collection.dropIndex("email_1");
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
    await customersinfo.save();
    res.status(201).json({
      message: "Message sent successfully",
      user: {
        _id: customersinfo._id,
        fullname: customersinfo.fullname,
        email: customersinfo.email,
        message: customersinfo.message,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};
