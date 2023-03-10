import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../api/axios";
import request from "../api/request";

const Home = (props) => {
  const [bookli, setBookli] = useState([]);
  const fetchData = async () => {
    const params = {
      page: 0,
      size: 6,
    };
    const resultBookli = await instance.get(request.fetchBookList, {
      params,
    });
    setBookli(resultBookli.data.list.content);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const list = props.bookli.map((item) => {
  //     return (
  //       <li key={item.seq}>
  //         <Link to={"/bookdetail"} className="block overflow-hidden group">
  //           <img
  //             src={process.env.PUBLIC_URL + "/images/book1.jpg"}
  //             alt=""
  //             className="h-[250px] w-full object-contain transition duration-500 group-hover:scale-105 sm:h-[350px]"
  //           />
  //           <div className="relative pt-3 bg-white">
  //             <p>
  //               <span className="tracking-wider text-gray-900 group-hover:underline group-hover:underline-offset-4">
  //                 {item.title}
  //               </span>
  //             </p>
  //             <span className="text-xs text-gray-700">{item.author}</span>
  //           </div>
  //         </Link>
  //       </li>
  //     );
  // });

  const list = bookli
    .filter((item, index) => index < 4)
    .map((item) => {
      return (
        <li key={item.seq}>
          <Link
            to={`/bookdetail/${item.seq}`}
            className="block overflow-hidden group"
          >
            <img
              src={item.image}
              alt=""
              className="h-48 w-full object-contain sm:h-64"
            />
            <div className="relative pt-3 bg-white">
              <p>
                <span className="tracking-wider text-xs font-semibold text-gray-900 group-hover:underline group-hover:underline-offset-4 truncate">
                  {item.title}
                </span>
              </p>
              <span className="text-xs text-gray-700">{item.author}</span>
            </div>
          </Link>
        </li>
      );
    });

  return (
    <div className="container">
      <div
        id="carouselExampleInterval"
        className="carousel slide carousel-fade mt-3 mb-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner pt-200">
          <div className="carousel-item  active" data-bs-interval="7000">
            <h3 className="carousel-caption position-absolute text-end text-sm md:text-lg lg:text-2xl font-semibold">
              Front 1??? - Back 6??? <br />
              ???????????? ?????? ????????????
            </h3>
            <img
              src={process.env.PUBLIC_URL + "/images/banner_1.png"}
              className="img-fluid"
              alt="banner_1"
            />
          </div>
          <div className="carousel-item">
            <h3 className="carousel-caption position-absolute text-end text-sm md:text-lg lg:text-2xl font-semibold">
              ???????????? ?????? ?????? ?????? <br />
              3?????? ?????? ?????????
            </h3>
            <img
              src={process.env.PUBLIC_URL + "/images/banner1.jpg"}
              className="img-fluid"
              alt="banner1"
            />
          </div>
          <div className="carousel-item">
            <h3 className="carousel-caption position-absolute text-end text-sm md:text-lg lg:text-2xl font-semibold">
              ????????? ???????????? <br />
              ????????? ?????? ????????????
            </h3>
            <img
              src={process.env.PUBLIC_URL + "/images/banner2.jpg"}
              className="img-fluid"
              alt="banner2"
            />
          </div>
          <div className="carousel-item">
            <h3 className="carousel-caption position-absolute text-end text-sm md:text-lg lg:text-2xl font-semibold">
              ????????? ????????? <br />
              ????????? ????????? ????????????
            </h3>
            <img
              src={process.env.PUBLIC_URL + "/images/banner3.jpg"}
              className="img-fluid"
              alt="banner3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container home-book mb-5">
        <div className="section-title d-flex justify-content-between m-1 mb-2">
          <h2 className="text-3xl font-semibold tracking-tight">
            # ????????? ??????
          </h2>
          <Link
            className="btn text-base align-self-center home-book-link"
            to={"/booklist"}
            role="button"
          >
            MORE
          </Link>
        </div>
        <hr />
        <ul className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4 ps-0">
          {list}
        </ul>
      </div>
      <div className="container mb-5 grid gap-4 md:grid-cols-2">
        <div>
          <div className="d-flex justify-content-between m-1">
            <span className="text-xl text-gray-800 font-semibold align-self-center">
              ????????????
            </span>
            <Link
              className="btn text-base align-self-center home-book-link"
              to={"/"}
              role="button"
            >
              MORE
            </Link>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <article className="card p-3">
              <Link to={"/"}>
                <span className="block text-gray-400 text-sm">2022.12.16</span>
                <div className="mt-1">
                  <h3 className="notice-title text-lg text-gray-900 font-semibold hover:underline text-ellipsis overflow-hidden">
                    ????????? ?????? ???????????? ?????? (12/16~)
                  </h3>
                  <p className="notice-txt text-sm text-gray-400 mt-1 leading-relaxed text-ellipsis overflow-hidden">
                    ???????????????. ?????? ????????? ??????, ?????????????????????. ?????? ?????????
                    ?????? ??????????????? ???????????? ??????????????????.
                  </p>
                </div>
                <button className="mt-2 outline-none flex items-center text-[14px] text-blue-600 decoration-blue-600 hover:underline">
                  READ MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </Link>
            </article>
            <article className="card p-3 hidden md:block">
              <Link to={"/"}>
                <span className="block text-gray-400 text-sm">2022.11.16</span>
                <div className="mt-1">
                  <h3 className="notice-title text-lg text-gray-900 font-semibold hover:underline text-ellipsis overflow-hidden">
                    ????????????(????????????, ???????????? ??????) ?????? ??????
                  </h3>
                  <p className="notice-txt text-sm text-gray-400 mt-1 leading-relaxed text-ellipsis overflow-hidden">
                    ???????????????. ?????? ????????? ?????? ?????????????????????. ?????? ?????? ??????
                    ??? ?????? ?????? ???????????? ?????? ????????????.
                  </p>
                </div>
                <button className="mt-2 outline-none flex items-center text-[14px] text-blue-600 decoration-blue-600 hover:underline">
                  READ MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </Link>
            </article>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between m-1">
            <span className="text-xl text-gray-800 font-semibold align-self-center">
              ????????? ??????
            </span>
            <Link
              className="btn text-base align-self-center home-book-link"
              to={"/"}
              role="button"
            >
              MORE
            </Link>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <article className="card p-3">
              <Link to={"/"}>
                <span className="block text-gray-400 text-sm">2022.12.21</span>
                <div className="mt-1">
                  <h3 className="notice-title text-lg text-gray-900 font-semibold hover:underline text-ellipsis overflow-hidden">
                    [??????]????????? ????????? ??????#9 ????????? ??????
                  </h3>
                  <p className="notice-txt text-sm text-gray-400 mt-1 leading-relaxed text-ellipsis overflow-hidden">
                    ???????????????. ????????? [????????? ????????? ??????#9]??? ?????????
                    ??????????????????. ???????????? ???????????? ?????? ????????? ????????????.
                  </p>
                </div>
                <button className="mt-2 outline-none flex items-center text-[14px] text-blue-600 decoration-blue-600 hover:underline">
                  READ MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </Link>
            </article>
            <article className="card p-3 hidden md:block">
              <Link to={"/"}>
                <span className="block text-gray-400 text-sm">2022.12.21</span>
                <div className="mt-1">
                  <h3 className="notice-title text-lg text-gray-900 font-semibold hover:underline text-ellipsis overflow-hidden">
                    [????????????]????????? ??? ??? ?????? ????????? ?????? ????????? ????????? ??????
                  </h3>
                  <p className="notice-txt text-sm text-gray-400 mt-1 leading-relaxed text-ellipsis overflow-hidden">
                    ???????????????. ????????? [????????? ??? ??? ?????? ????????? ?????? ?????????]???
                    ????????? ??????????????????. ???????????? ???????????? ?????? ????????? ????????????.
                  </p>
                </div>
                <button className="mt-2 outline-none flex items-center text-[14px] text-blue-600 decoration-blue-600 hover:underline">
                  READ MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </Link>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
