import axios from "axios";
import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import { Link } from "react-router-dom";

function Order() {

    const [orders, setOrders] = useState<OrderType[]>([]);

    async function loadOrders() {
        try {
            const response = await axios.get("http://localhost:8081/orders");
            setOrders(response.data);
        }catch(error) {
            console.log(error);
        }
        
    }

    useEffect(function() {
        loadOrders();
    },[])


    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3x1 font-semibold mb-5">Orders</h1>

            <Link to="/order/create" className="text-blue-500 mb-5">Add Order</Link>

            <table className="w-full border-separate-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Order ID</th>
                        <th className="w-[80px]">Order Date and Time</th>
                        <th className="w-[80px]">Total Amount</th>
                        <th className="w-[80px]">Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {orders.map(function (order){
                        return (
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.orderDateTime}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>

        </div>
    )
}

export default Order;