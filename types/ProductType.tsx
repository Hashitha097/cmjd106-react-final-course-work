import CategoryType from "./CategoryType";

interface ProductType {
    id: number;
    name: string;
    price:number;
    qty:number,
    description: string;
    category_Id :CategoryType,
    category?: CategoryType;
}

export default ProductType;