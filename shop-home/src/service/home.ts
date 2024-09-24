import request from "./index";

interface ProductInfoParam {
  sortStrategy: string; // 0:综合排序 1:销量排序 2:价格排序 3:最新排序
  pageNo: number;
}

export interface ProductInfo {
  type: number;
  mainImageUrl: string; // 主图链接
  number: any;
  interactiveCount: any;
  createTime: any;
  allianceType: string; // 平台类型：0 淘宝、1 京东、2 拼多多
  allianceLogoUrl: string;
  productNo: any;
  skuNo: any;
  originalPrice: string;
  noPrice: boolean;
  discountPrice: string;
  title: string;
  monthlySales: string;
  couponAmount: string; // 优惠券金额
  showIncomeAmount: boolean;
  incomeAmount: string; // 约返金额
  requireIntegral: boolean;
  integralAmount: any;
  integralDeductAmount: any;
  shopName: string;
  externalProductNo: string;
  priceComparisonFlag: boolean;
}

// 获取首页商品信息
export function getProductInfo(param: ProductInfoParam): Promise<{
  data: {
    ldata: ProductInfo[] | undefined;
  };
}> {
  const finalParam = {
    ...param,
    _currentPageType: 1, // 取值固定
    _currentPageNo: "166072354552493993", // 取值固定
    categoryNo: "166072430564787549", // 取值固定
    sortType: 1, // 取值固定
    displayMode: 0, // 取值固定
    pageSize: 10, // 取值固定
  };
  return request("/api/product/portal/search", {
    params: finalParam,
    headers: {
      "App-No": "166072354509830337",
      "Shop-No": "166072354520574632",
    },
  });
}

export function getHotProductInfo(param: ProductInfoParam): Promise<{
  data: {
    ldata: ProductInfo[] | undefined;
  };
}> {
  const finalParam = {
    ...param,
    _currentPageType: 1, // 取值固定
    _currentPageNo: "166072354552493993", // 取值固定
    categoryNo: "166072575996815433", // 取值固定
    sortType: 1, // 取值固定
    displayMode: 0, // 取值固定
    pageSize: 10, // 取值固定
  };
  return request("/api/product/portal/search", {
    params: finalParam,
    headers: {
      "App-No": "166072354509830337",
      "Shop-No": "166072354520574632",
    },
  });
}
