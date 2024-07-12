import Cards from "./Cards";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:3000/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          {/* <p className="mt-12 text-2xl ">
            "Experience the joy of reading. Buy any book you desire and pay only
            when it arrives at your doorstep. Immerse yourself in captivating
            stories, expand your knowledge with insightful non-fiction, or
            explore new worlds through thrilling adventures. Our vast collection
            ensures that there's a perfect book for every reader. Happy
            reading!"
          </p> */}
          <br />
          <p className="">
            <span className="text-pink-500 text-2xl">
              Mode of payment : Cash on Delivery(COD)
            </span>
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
