import React from "react";

import { FaCoffee } from "react-icons/fa";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

const Menu = [
  {
    id: 1,
    name: "Trang Chủ",
    link: "/#",
  },
  {
    id: 2,
    name: "Dịch Vụ",
    link: "/#services",
  },
  {
    id: 3,
    name: "Về Chúng Tôi",
    link: "/#about",
  },
  {
    id: 4,
    name: "Thực Đơn",
    link: "/menu/0",
  },
  // {
  //   id: 5,
  //   name: "Đăng nhập",
  //   link: "/login",
  // },
];
const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
    return (
    <>
      <div className="bg-gradient-to-r from-secondary to-secondary/90 shadow-md bg-gray-900 text-white">
        <div className="container py-2">
          <div className="flex justify-between items-center">
              {/* Logo section */}
            <div data-aos="fade-down" data-aos-once="true">
              <a
                href="#"
                className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive"
              >
               
                UDA Coffee
              </a>
            </div>

            {/* Link section */}
            <div
              data-aos="fade-down"
              data-aos-once="true"
              data-aos-delay="300"
              className="flex justify-between items-center gap-4"
            >
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block text-xl py-4 px-4 text-white/70 hover:text-white duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
              </ul>
              <Link to={"/cart"}>
                <button className=" bg-primary/70 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3">
                  Giỏ Hàng
                  <FaCoffee className="text-xl text-white drop-shadow-sm cursor-pointer" />
                  <span className="relative">
                    <span className="absolute -top-4 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
                      {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
                      {cartItems.length}
                    </span>
                  </span>
                </button>
              </Link>
              <Link to={"/login"}>
                <button className=" bg-dark hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3">
                  Đăng nhập
                
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
