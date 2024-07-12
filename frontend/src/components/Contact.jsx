import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function Contact() {
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
      message: data.message,
    };
    await axios
      .post("http://localhost:3000/contact/contact", customerInfo)
      .then((res) => {
        console.log(res.body);
        if (res.data) {
          alert("Message sent successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Contact", JSON.stringify(res.data.user));
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
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Contact Us</h3>
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
                <span>Message </span>
                <input
                  type="text"
                  placeholder="Enter your message"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("message", { required: true })}
                />
                <br />
                {errors.message && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Number */}
              {/* <div className="mt-4 space-y-2">
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
              </div> */}
              {/* button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
