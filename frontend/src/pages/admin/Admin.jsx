import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Admin = () => {
    const [orders, setOrders] = useState([]);
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        category: '',
        imageUrl: [],
        description: '',
    });
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    
  const toggleSectionVisibility = () => {
    setIsSectionVisible(!isSectionVisible);
  };

    const ImagetoBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://157.10.53.52:5000/api/order/");
                const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://157.10.53.52:5000/api/category/');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };


        fetchCategories();
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-pending";
            case "Completed":
                return "bg-completed";
            case "Cancel":
                return "bg-cancel";
            default:
                return "bg-gray-300"; // Màu mặc định nếu trạng thái không khớp
        }
    };

    const handleConfirmation = async (orderId, action) => {
        try {
            // Define the endpoint URL
            const url = `http://157.10.53.52:5000/api/order/${orderId}`;

            // Define the request body based on the action
            const requestBody = {
                status: action // 'confirm' or 'reject' based on your backend implementation
            };

            // Send the POST request
            const response = await axios.put(url, requestBody);

            // Handle the response if needed
            console.log("Response:", response.data);
            alert(`${action}`)
            navigate('/admin');

        } catch (error) {
            // Handle errors
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://157.10.53.52:5000/api/product/', formValues);
            alert('Product added successfully');
            navigate('/menu/0');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };


    const handleImageChange = async (e) => {
        const files = e.target.files;
        const newImageUrls = await Promise.all(
            Array.from(files).map(file => ImagetoBase64(file))
        );
        setFormValues((prevValues) => ({
            ...prevValues,
            imageUrl: [...prevValues.imageUrl, ...newImageUrls],
        }));
    };


    // console.log(orders)

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    console.log(formValues)
    return (
        <>
            <Navbar />
            <div className="py-20">
                <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
                    <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
                        <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
                            <div className="flex items-center">
                                <a className="text-gray-600 dark:text-gray-400 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                        <line x1={16} y1={5} x2={19} y2={8} />
                                    </svg>
                                </a>
                                <a className="text-gray-600 dark:text-gray-400 mx-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-settings" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <circle cx={12} cy={12} r={3} />
                                    </svg>
                                </a>
                                <a className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                    </svg>
                                </a>
                                <a className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-copy" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <rect x={8} y={8} width={12} height={12} rx={2} />
                                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                                    </svg>
                                </a>
                                <a className="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-trash" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={7} x2={20} y2={7} />
                                        <line x1={10} y1={11} x2={10} y2={17} />
                                        <line x1={14} y1={11} x2={14} y2={17} />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                            <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                                <p className="text-base text-gray-600 dark:text-gray-400" id="page-view">
                                    Xem tiếp 1 - 20 
                                </p>
                                <a className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded" onClick="pageView(false)">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="15 6 9 12 15 18" />
                                    </svg>
                                </a>
                                <a className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer" onClick="pageView(true)">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="9 6 15 12 9 18" />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex items-center lg:border-r border-gray-300 dark:border-gray-200 pb-3 lg:pb-0 lg:px-6">
                                <div className="relative w-32 z-10">
                                    <div className="pointer-events-none text-gray-600 dark:text-gray-400 absolute inset-0 m-auto mr-2 xl:mr-4 z-0 w-5 h-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon cursor-pointer icon-tabler icon-tabler-chevron-down" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                    <select aria-label="Selected tab" className="focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 dark:text-gray-400 appearance-none bg-transparent">
                                        <option>Danh sách</option>
                                        <option>Lưới</option>
                                    </select>
                                </div>
                            </div>
                            <div className="lg:ml-6 flex items-center">
                                
                                <div className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center" onClick={toggleSectionVisibility}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={12} y1={5} x2={12} y2={19} />
                                        <line x1={5} y1={12} x2={19} y2={12} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
                        {isSectionVisible && (
                            <section class="bg-white dark:bg-gray-900">
                                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Thêm đồ uống mới</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div className="sm:col-span-2">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đồ uống</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formValues.name}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Type product name"
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    value={formValues.price}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="$2999"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại</label>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    value={formValues.category}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                >
                                                    <option value="" disabled>Chọn Loại</option>
                                                    {categories.map((category) => (
                                                        <option key={category._id} value={category._id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Hình Ảnh
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả chi tiết</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    value={formValues.description}
                                                    onChange={handleChange}
                                                    rows="8"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Mô tả"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="bg-completed transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-completed rounded text-white px-5 h-8 flex items-center text-sm">Tạo sản phẩm</button>
                                    </form>
                                </div>
                            </section>
                        )}
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <thead>
                                <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                                    <th className="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        <input type="checkbox" className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none" onClick="checkAll(this)" />
                                    </th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">ID</th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Bàn</th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Số món</th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Giá tiền</th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Thời gian</th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        Trạng thái
                                    </th>
                                    <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Thao tác</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="h-24 border-gray-300 dark:border-gray-200 border-b">
                                        <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                            <input type="checkbox" className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none" onClick="tableInteract(this)" />
                                        </td>

                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">#{order._id.slice(-4)}</td>
                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                            <div className="flex items-center">
                                                <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">Bàn {order.tableNumber}</p>
                                            </div>
                                        </td>
                                        <td className="pr-6 whitespace-no-wrap">
                                            <ol className="list-decimal">
                                                {order.products.map((p) => (
                                                    <li key={p.product._id}>{p.product.name} : {p.quantity}</li>
                                                ))}
                                            </ol>

                                        </td>
                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{order.totalPrice} đ</td>
                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{new Date(order.createdAt).toLocaleTimeString()} {new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="pr-6">
                                            <div className={`w-5 h-5 mx-1 rounded-full inline-block ${getStatusColor(order.status)}`} />
                                            <span>{order.status}</span>
                                        </td>
                                        <td className="pr-8 relative">

                                            <button onClick={() => handleConfirmation(order._id, "Completed")} style={{width: "110px"}} className=" bg-completed transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-completed rounded text-white px-5 h-8 flex items-center text-sm">Xác Nhận</button>
                                            <button onClick={() => handleConfirmation(order._id, "Cancel")} style={{width: "110px"}} className="  bg-cancel transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-cancel rounded text-white px-5 h-8 flex items-center text-sm">Từ Chối</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Admin;
