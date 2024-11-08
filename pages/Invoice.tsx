import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";



interface ProductType {
    id: number;
    name: string;
    price: number;
    qty: number | null; // Quantity might be nullable based on the response
    description?: string;
}

interface InvoiceType {
    id: number;
    orderDateTime: string;
    totalPrice: number;
    
    orderedProducts: ProductType[];
}

function Invoice() {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<InvoiceType | null>(null);
    const { jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(() => {
        const loadInvoice = async () => {
            try {
                const response = await axios.get<InvoiceType>(`http://localhost:8080/orders/${id}`, config);
                setInvoice(response.data);
            } catch (error) {
                console.log("Error loading invoice:", error);
            }
        };
        loadInvoice();
    }, [id]);

    if (!invoice) return <p>Loading...</p>;

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Invoice for Order #{invoice.id}</h1>
            <p><strong>Order Date:</strong> {new Date(invoice.orderDateTime).toLocaleString()}</p>

            <table className="w-full border-separate border-spacing-0 text-left mt-5">
                <thead>
                    <tr>
                        <th className="w-[80px]">ID</th>
                        <th className="w-[200px]">Description</th>
                        <th className="w-[100px] text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.orderedProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="py-2">{product.id}</td>
                            <td className="py-2">{product.name}</td>
                            <td className="py-2 text-right">Rs. {product.price.toLocaleString()}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2} className="border-t border-gray-400 pt-2 text-right font-bold">Total</td>
                        <td className="border-t border-gray-400 pt-2 text-right font-bold">Rs. {invoice.totalPrice.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Invoice;