import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { addToCart, decreaseQuantity } from "../../../reduxs/carts/cart.slices.js";
import axios from "axios";  
import { useNavigate } from 'react-router-dom';


function Cart() {
    const cartItems = useSelector(state => state.cart.items);
    const tableNumber = useSelector(state => state.cart.tableNumber);
    const dispatch = useDispatch();

    const handleQuantityChange = (item, change) => {
        if (change === -1) {
            dispatch(decreaseQuantity(item._id));
        } else {
            dispatch(addToCart({ ...item, quantity: change }));
        }
    };
    const navigate = useNavigate();

    console.log(cartItems)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleConfirm = async () => {
        const apiUrl = `http://157.10.53.52:5000/api/order/?tableNumber=${tableNumber}`;
        
        const orderDetails = {
            products: cartItems.map(item => ({
                product: item._id,
                quantity: item.quantity
            }))
        };

        console.log(orderDetails)

        try {
            const response = await axios.post(apiUrl, orderDetails);
            console.log('Order placed successfully:', response.data);
            alert("Bạn đã đặt thành công")
            navigate(`/menu/${tableNumber}`);

            // You can handle the response further as needed
        } catch (error) {
            console.error('There was a problem with the Axios request:', error);
        }
    };

    return (
        <>
            <div>
                <div className="w-full h-full bg-black bg-opacity-90 top-0" id="chec-div">
                    <Navbar className="z-20" />
                    <div className="w-full z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                        <div className="flex md:flex-row flex-col justify-end" id="cart">
                            <div className="lg:w-full md:pl-10 pl-12 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bàn {tableNumber}</p>
                                {cartItems.map((item) => (
                                    <div key={item._id} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                                        <div className="w-1/4">
                                            <img src={item.imageUrl[0]} alt={item.name} className="w-full h-full object-center object-cover" />
                                        </div>
                                        <div className="md:pl-3 md:w-3/4">
                                            <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{item._id.slice(-4)}</p>
                                            <div className="flex items-center justify-between w-full pt-1">
                                                <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                                                <div className="flex items-center">
                                                    <button 
                                                        className="px-2 py-1 border border-gray-200" 
                                                        onClick={() => handleQuantityChange(item, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <p className="px-3">{item.quantity}</p>
                                                    <button 
                                                        className="px-2 py-1 border border-gray-200" 
                                                        onClick={() => handleQuantityChange(item, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">{item.description}</p>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                                <div className="flex flex-col md:h-screen px-14 py-20 overflow-y-auto">
                                    <div>
                                        <p className="text-4xl font-black leading-9 text-gray-800">Thành Tiền</p>
                                        <div className="flex items-center justify-between pt-16">
                                            <p className="text-base leading-none text-gray-800">Tổng tiền</p>
                                            <p className="text-base leading-none text-gray-800">{subtotal} đ</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-5">
                                            <p className="text-base leading-none text-gray-800">Phụ Thu</p>
                                            <p className="text-base leading-none text-gray-800">0 đ</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                            <p className="text-2xl leading-normal text-gray-800">Thành tiền</p>
                                            <p className="text-2xl font-bold leading-normal text-right text-gray-800">{subtotal} đ</p>
                                        </div>
                                        <button onClick={handleConfirm}  className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer className="z-20" />
                </div>
            </div>
        </>
    );
}

export default Cart;
