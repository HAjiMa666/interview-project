import React, { FC, memo } from 'react'
import { Ellipsis } from "antd-mobile"

import { ReactComponent as JingDong } from "@/assets/jingdong.svg"
import { ReactComponent as TaoBao } from "@/assets/shejiaotubiao-44.svg"
import { ReactComponent as Pdd } from "@/assets/pdd.svg"

import "./index.css"

interface Props {
  productName: string;
  productImg: string;
  platform: string;
  price: string;
  discountPrice: string;
  coupons: string;
  cashBack: string;
}

const ProductProfile: FC<Props> = memo((props) => {
  const { productImg, productName, platform, price, discountPrice, coupons, cashBack } = props
  return (
    <div className='product_profile'>
      <div className='product_img' >
        <img src={productImg} alt="" />
      </div>
      <div className='product_name'>
        {platform === "0" && <TaoBao className="platform" />}
        {platform === "1" && <JingDong className="platform" />}
        {platform === "2" && <Pdd className="platform" />}
        {productName}
      </div>

      <div className='price'>
        <div className='discountPrice'>{"¥" + Number(discountPrice).toFixed(2)}</div>
        <div className='originalPrice'>{"¥" + Number(price).toFixed(2)}</div>
      </div>

      <div className='discountInfo'>
        <div className='coupons'>
          {
            coupons && <>
              <div className="quanIcon">
                券
              </div>
              <div className="couponsPrice">
                {Number(coupons).toFixed(2)}
              </div>
            </>

          }
        </div>
        <div className='cashBack'>
          <div className="yuefanIcon">
            约返
          </div>
          <div className="cashBackPrice">
            {Number(cashBack).toFixed(2)}
          </div>
        </div>
      </div>

    </div >
  )
})

export default ProductProfile