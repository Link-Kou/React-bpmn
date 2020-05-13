export interface IMaterialProduct {
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
    productWeight: string
    /**
     * 商品长度
     */
    productLength: string
    /**
     * 商品体积
     */
    productVolume: string
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


}


export interface IImages {
    main: string
    logo: string
    detailsMain: Array<string>
    detailsList: Array<string>
}

export interface ISku {
    id: string
    name: string
    /**
     * 1:图片2:无图片
     */
    image: boolean,
    value: Array<{
        id: string
        name: string
        image: string
    }>
}

export interface ISkuTable {
    id: string
    disable?: boolean,
    mainImage?: string,
    numberStarts?: number | string,
    numberStock?: number | string,
    marketPrice?: number | string,
    costPrice?: number | string
    tableColumn?: string

    [x: string]: any
}

export interface IProductSpecification {
    id?: string,
    key: string,
    value: Array<{
        id: string,
        key?: string,
        main?: boolean,
        value?: string,
        order?: number
    }>,
    order?: number
}


/**
 * 添加编辑的对象
 */
export interface IAddEditMaterialProduct extends IMaterialProduct {
    /**
     * 图片
     */
    images: IImages,
    /**
     * sku 键值对
     */
    sku: Array<ISku>,
    /**
     * sku 笛卡尔积
     */
    skuTable: Array<ISkuTable>,
    /**
     * 包装与规格
     */
    specification: Array<IProductSpecification>
}


/**
 * 列表返回对象
 */
export interface IReturnMaterialProduct extends IMaterialProduct {
    /**
     * 图片
     */
    images: Array<{
        id: string
        /**
         * 路径
         */
        url: string
        /**
         * 父id
         */
        parent: string
        /**
         * 顺序
         */
        index: number
        /**
         * 类型 1:主图 2:详情主图 3:详情列表图 4:品牌logo
         */
        type: number
    }>,
    /**
     * sku 键值对
     */
    sku: Array<{
        id: string
        /**
         * 父id
         */
        parent: string
        /**
         * 业务id
         */
        businessId: string
        /**
         * 名称
         */
        name: string
        /**
         * 1:图片2:无图片
         */
        isImage: number

        /**
         * List ProductMaterialSkuSpecListDTO
         */
        skuSpecList: Array<{
            id: string
            /**
             * 业务id
             */
            businessId: string
            /**
             * 父id
             */
            parent: string
            /**
             * 名称
             */
            name: string
            /**
             * 图片地址
             */
            image: string
        }>
    }>,
    /**
     * sku 笛卡尔积
     */
    skuTable: Array<{
        id: string
        /**
         * 父id
         */
        parent: string
        /**
         * 业务id(sku spec business id 算出来)
         */
        businessId: string
        /**
         * 主图地址
         */
        mainimage: string
        /**
         * 起卖数量
         */
        numberStarts: number
        /**
         * 库存量
         */
        numberStock: number
        /**
         * 市场价
         */
        marketPrice: number
        /**
         * 成本价
         */
        costPrice: number

        /**
         * 是否禁用 0:不禁用 1:禁用
         */
        isDisable: number
    }>,
    /**
     * 包装与规格
     */
    specification: Array<{
        id: string
        /**
         * 业务id
         */
        businessId: string
        /**
         * 父id
         */
        parent: string
        /**
         * 列顺序
         */
        rowIndex: string
        /**
         * 名称
         */
        name: string
        packagingValue: Array<{
            id: string
            /**
             * 业务id
             */
            businessId: string
            /**
             * 父id
             */
            parent: string
            /**
             * 列顺序
             */
            rowIndex: string
            /**
             * 名称
             */
            name: string
            /**
             * 值
             */
            value: string
            /**
             * 是否主体显示 0:不是 1:是
             */
            isMain: number
        }>
    }>
}
