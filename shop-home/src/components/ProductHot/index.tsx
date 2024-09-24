import React, { FC, memo } from 'react'
import { Ellipsis } from "antd-mobile"

import "./index.css"

interface props {
  price: string,
  cashBackPrice: string
  productImage: string
  productTitle: string
}

const ProductHot: FC<props> = memo((props) => {
  const { price, cashBackPrice, productImage, productTitle } = props;
  return (
    <div className='productHot'>
      <div style={{ position: "relative" }}>
        <img src={productImage} alt="" className='productImage' />
        <div className="cashBack">{"约返" + cashBackPrice + "元"}</div>
      </div>
      <Ellipsis className='product_title' content={productTitle} />
      <div className="price">{"¥" + Number(price).toFixed(2)}</div>
    </div>
  )
})

export default ProductHot