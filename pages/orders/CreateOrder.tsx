import { useEffect, useState } from "react";
import ProductType from "../../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder() {

    const [products, setProducts] = useState<ProductType[]>([]);
    

    async function loadProducts() {
        try{
            const response = await axios.get("http://localhost:8081/products");
            setProducts(response.data);
        }catch(error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        loadProducts();
    }, [])

    const [orderedProducts, setOrderedProducts] = useState<ProductType[]>([]);
    const [total, setTotal] = useState<number>(0);

    function addProductToOrder(product: ProductType) {

        const updatedOrder = [...orderedProducts,product];
        setOrderedProducts(updatedOrder);
    }

    useEffect(function () {
        orderedProducts.map(function (product) {
            const totalPrice = total + product.price;
            setTotal(totalPrice);
        })
    },[orderedProducts])


    const navigate = useNavigate();

    async function saveOrder() {
        var productIds:any =[];

        orderedProducts.map(function (product) {
            productIds.push(product.id);
        });

        try{
            await axios.post("http://localhost:8081/orders", {
                productIds: productIds
            })

            navigate("/order");
        } catch (error) {
            console.log(error)
        }
        
    }


    return (
        <div className="flex">
            <div className="w-[400px] border-r border-slate-100 p-2">
                <span className="text-x1 font-semibold text-slate-800">Products</span>

                <div className="mt-5">
                    {products.map(function(product) {
                        return (
                            <div onClick={() => addProductToOrder(product)} className="border border-slate-200 roundrd-lg p-2 mb-3">
                                <div className="text-lg font-semibold text-slate-800">{product.name}</div>
                                <div className="text-sm text-slate-400">{product.category?.name}</div>
                                <div className="text-sm text-green-600 text-right">Rs. {product.price}</div>
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className="p-2">
                <span className="text-x1 font-semibold text-slate-800">New Order</span>

                <table className="w-full border-separate border-spacing-0 border-none text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {orderedProducts.map(function (product) {
                            return (
                                <tr>
                                <td className="w-[80px]">{product.id}</td>
                                <td className="w-[200px]">{product.name}</td>
                                <td className="w-[200px] text-right">{product.price}</td>
                                </tr>

                            )
                        })}

                            <tr>
                                <td colSpan={2}>
                                    <strong>Total</strong>

                                </td>
                                <td className="border-t border-slate-500">
                                    <strong>{total}</strong>
                                </td>
                            </tr>

                    </tbody>
                </table>

                <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={saveOrder}>Save Order</button>

            </div>

        </div>
    )
}

export default CreateOrder;