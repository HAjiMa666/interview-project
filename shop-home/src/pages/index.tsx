import React, { useEffect, useRef, useState } from 'react'
import { Tabs, InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { useRequest } from "ahooks"

import "./index.css"
import { getHotProductInfo, getProductInfo, ProductInfo } from "@/service/home"
import ProductProfile from '@/components/ProductProfile'
import ProductHot from '@/components/ProductHot'

type SortStrategy = "0" | "1" | "2" | "3"

const TABINFO = [
  { title: '综合', key: '0' },
  { title: '销量', key: '1' },
  { title: '价格', key: '2' },
  { title: '最新', key: '3' }
]
export default function HomePage() {
  const [sortStrategy, setSortStrategy] = useState<SortStrategy>("0")
  const pageNo = useRef(1)
  const { runAsync } = useRequest(() => getProductInfo({ sortStrategy, pageNo: pageNo.current }), {
    manual: true
  })
  const { data: hotData, loading: hotLoading } = useRequest(() => getHotProductInfo({ sortStrategy, pageNo: 1 }), {
    refreshDeps: [sortStrategy]
  })
  const [hasMore, setHasMore] = useState(true)
  const [productData, setProductData] = useState<ProductInfo[] | null>(null);
  const [hotProductData, setHotProductData] = useState<ProductInfo[] | null>(null);

  useEffect(() => {
    setHotProductData(hotData?.data?.ldata as any)
  }, [hotData])

  useEffect(() => {
    setHotProductData([])
  }, [sortStrategy])
  async function loadMore() {
    const data = await runAsync()
    setProductData(val => [...(val ?? []), ...data?.data?.ldata])
    if (data?.data?.ldata?.length === 0) {
      setHasMore(false)
    } else {
      setHasMore(true)
      pageNo.current++
    }
  }

  return (
    <div className='home_page'>
      <div className="hot">
        <div className="hot_title">热门爆品</div>
        <div className="hot_container">
          {hotLoading && "加载中...."}
          {hotProductData?.map(item => {
            return <ProductHot
              key={item.productNo}
              price={item.originalPrice}
              productImage={item.mainImageUrl}
              productTitle={item.title}
              cashBackPrice={item.incomeAmount}
            />
          })}
        </div>
      </div>
      <Tabs
        style={{
          "--active-line-color": "#f03f7d",
          "--active-title-color": "#f03f7d",
          "--title-font-size": "1.4rem"
        }}
        activeLineMode="full" onChange={(key) => {
          setSortStrategy(key as any)
          setHasMore(true)
          setProductData(null)
        }}>
        {TABINFO.map(item => {
          return <Tabs.Tab title={item.title} key={item.key}>
            <PullToRefresh onRefresh={async () => {
              pageNo.current = 1;
              setProductData(null)
            }}>
              <div className='product_list'>
                {productData?.map(item => {
                  return <ProductProfile
                    key={item.productNo}
                    price={item.originalPrice}
                    productImg={item.mainImageUrl}
                    productName={item.title}
                    platform={item.allianceType}
                    discountPrice={item.discountPrice}
                    coupons={item.couponAmount}
                    cashBack={item.incomeAmount}
                  />
                })}
                <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
              </div>
            </PullToRefresh>

          </Tabs.Tab>
        })}
      </Tabs>
    </div >
  );
}
