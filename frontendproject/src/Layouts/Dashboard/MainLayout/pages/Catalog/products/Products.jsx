import React, { useEffect, useState } from 'react'
import ProductsTable from './ProductsTable'
import { API } from '../../../../../../axios';
import "./ProductsModal.css";
import ProductsModal from './ProductsModal';

export default function Products() {

  const [productModal, setProductModal] = useState(false);
  const [product, setProduct] = useState([]);
  const getProduct = () => {
    const page = 1;
    const perPage = 999999;
    const url = `/dashboard/products?page=${page}&perPage=${perPage}`;
    API.get(url)
      .then(res => {
        setProduct(res.data.data);
      })
      .catch(err => console.error(err));
  };


  useEffect(() => {
    getProduct();
  }, []);

  const productModalHandle = () => {
    setProductModal(!productModal);
  };


  return (
    <>

      <button onClick={productModalHandle}>Create product</button>
      <ProductsModal productModalHandle={productModalHandle} productModal={productModal} getProduct={getProduct} />
      <ProductsTable data={product.product} getProduct={getProduct}  />

    </>

  )
}
