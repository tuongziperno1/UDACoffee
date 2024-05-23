import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { addToCart, updateTableNumber } from "../../../reduxs/carts/cart.slices.js";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Product = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const path = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://157.10.53.52:5000/api/product/");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product)); // Dispatch addToCart action with the product
        alert("Đã thêm vô giỏ hàng");
    };

    useEffect(() => {
        const tableNumber = path.pathname.split("/")[2];
        dispatch(updateTableNumber(tableNumber))

    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="2xl:container 2xl:mx-auto">
                <div className=" bg-gray-50 text-center lg:py-10 md:py-8 py-6">
                    <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">Menu</p>
                </div>
                <div className=" py-6 lg:px-20 md:px-6 px-4">
                    <p className=" font-normal text-sm leading-3 text-gray-600 ">Trang chủ / Đặt</p>
                    <hr className=" w-full bg-gray-200 my-6" />

                    <div className=" flex justify-between items-center">
                        <div className=" flex space-x-3 justify-center items-center">
                            <svg className=" cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.75 7.5H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                                <path d="M3.75 12H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                                <path d="M3.75 16.5H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                            </svg>
                            <p className=" font-normal text-base leading-4 text-gray-800">Lọc</p>
                        </div>
                        <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">{products.length} Đồ uống</p>
                    </div>
                    <br />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    
                    <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                        {filteredProducts.map((product) => (
                            <div className="relative" key={product._id}>
                                <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50">
                                    <p className="text-xs leading-3 text-gray-800">Mới</p>
                                </div>
                                <div className="relative group h-52 rounded-3xl overflow-hidden">
                                    <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                                    <img className="w-full h-full object-cover" src={product.imageUrl[0]} alt={product.name} />
                                    <div className="absolute -bottom-5 p-8 w-full opacity-0 group-hover:opacity-100">
                                        <Link to={`/product/${product._id}`}>
                                        <button className="mb-3 font-medium text-base leading-4 text-white bg-gray-800 py-3 w-full opacity-50">Xem chi tiết</button>

                                        </Link>
                                        <button onClick={() => handleAddToCart(product)} className="font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Thêm vào giỏ</button>
                                    </div>
                                </div>
                                <p className="font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">{product.name}</p>
                                <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">{product.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className=" flex justify-center items-center">
                        <button className=" hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-primary/70 py-5 md:px-16 md:w-auto w-full lg:mt-28 md:mt-12 mt-10 text-white font-medium text-base leading-4">Xem thêm</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Product;
