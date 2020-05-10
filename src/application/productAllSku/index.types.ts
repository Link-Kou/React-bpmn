export interface IFormValue {
    id?: string
    /**
     * 标题
     */
    name: string
    /**
     * 描述
     */
    subname: string
    /**
     * 品牌名称
     */
    brandName: string
    /**
     * 商品单位
     */
    productUnit: string
    /**
     * 产品编码
     */
    productCode: string
    /**
     * 产品产地
     */
    productOrigin: string
    /**
     * 产品型号
     */
    productModel: string
    /**
     * 商品类型
     */
    productType: string
    /**
     * 商品重量
     */
    productWeight: number | string
    /**
     * 商品长度
     */
    productLength: number | string
    /**
     * 商品体积
     */
    productVolume: number | string
    /**
     * 价格显示模式
     * 1:优惠价 2:对比价
     */
    priceMode: number
    /**
     * 销售模式
     * 1:零售;2:批发3:都支持;
     */
    salesModel: number
    /**
     * 市场价
     */
    marketPrice: number | string
    /**
     * 优惠价
     */
    preferentialPrice: number | string

    /**
     * 图片
     */
    images: IImages,
}

export const IStateFormValue: IFormValue = {
    /**
     * 标题
     */
    name: '',
    /**
     * 描述
     */
    subname: '',
    /**
     * 品牌名称
     */
    brandName: '',
    /**
     * 商品单位
     */
    productUnit: '',
    /**
     * 产品编码
     */
    productCode: '',
    /**
     * 产品产地
     */
    productOrigin: '',
    /**
     * 产品型号
     */
    productModel: '',
    /**
     * 商品类型
     */
    productType: '',
    /**
     * 商品重量
     */
    productWeight: '',
    /**
     * 商品长度
     */
    productLength: '',
    /**
     * 商品体积
     */
    productVolume: '',
    /**
     * 价格显示模式
     * 1:优惠价 2:对比价
     */
    priceMode: 1,
    /**
     * 销售模式
     * 1:零售;2:批发3:都支持;
     */
    salesModel: 0,
    /**
     * 市场价
     */
    marketPrice: '',
    /**
     * 优惠价
     */
    preferentialPrice: '',

    /**
     * 图片
     */
    images: {
        main: '',
        logo: '',
        detailsMain: [],
        detailsList: []
    }
}

export interface IImages {
    main: string
    logo: string
    detailsMain: Array<string>
    detailsList: Array<string>
}
