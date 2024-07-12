import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const customerInfo = {
      fullname: data.fullname,
      email: data.email,
      address: data.address,
      phone: data.phone,
    };
    async function dropIndexIfExists() {
      try {
        await Order.collection.dropIndex("email_1");
        console.log("Unique index on email field dropped successfully");
      } catch (err) {
        if (err.codeName === "IndexNotFound") {
          console.log("Index not found, skipping drop operation");
        } else {
          console.error("Error dropping index:", err);
        }
      }
    }
    dropIndexIfExists();
    await axios
      .post("http://localhost:3000/order/order", customerInfo)
      .then((res) => {
        console.log(res.body);
        if (res.data) {
          alert("Order placed successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Order", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          alert("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        {/* <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          open modal
        </button> */}
        <div className="w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/course"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Customer Details</h3>
              {/* name */}
              <div className="mt-4 space-y-2">
                <span>Name </span>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* email */}
              <div className="mt-4 space-y-2">
                <span>Email </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* address */}
              <div className="mt-4 space-y-2">
                <span>Address </span>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("address", { required: true })}
                />
                <br />
                {errors.address && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Number */}
              <div className="mt-4 space-y-2">
                <span>Phone </span>
                <input
                  type="numbers"
                  placeholder="Enter your phone number"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("phone", { required: true })}
                />
                <br />
                {errors.phone && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
