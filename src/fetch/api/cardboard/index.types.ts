/**
 * 纸板参数
 */
export interface ICardboardProduct {
    /**
     * id
     */
    id?: string
    /**
     * 名称
     */
    name: string
    /**
     * 瓦楞名称
     */
    corrugatedName: string
    /**
     * 用料名称
     */
    materialsName: string
    /**
     * 层数
     */
    layerNum: number
    /**
     * 最大接单长
     */
    maxLength: number | string
    /**
     * 最小接单长
     */
    minLength: number | string
    /**
     * 落料长加
     */
    blankingLengthAdd: number | string
    /**
     * 最大接单宽
     */
    maxWidth: number | string
    /**
     * 最小接单宽
     */
    minWidth: number | string
    /**
     * 落料宽加
     */
    blankingWidthAdd: number | string
    /**
     * 厚度
     */
    thickness: number | string
    /**
     * 耐破
     */
    burst: number | string
    /**
     * 边压
     */
    edgePressure: number | string
    /**
     * 戳穿
     */
    puncture: number | string
    /**
     * 粘合
     */
    glue: number | string
    /**
     * 抗压
     */
    compressive: number | string

    /**
     * 是否强制关联价格
     */
    relatedPrice: number
    /**
     * 市场价
     */
    marketPrice: number | string
    /**
     * 成本
     */
    costPrice: number | string
    /**
     * 成本加价
     */
    costPriceMarkup: number | string
}

/**
 * 纸板参数-成本参数
 */
export interface ICardboardProductCost {
    /**
     * id
     */
    id?: string
    /**
     * 名称
     */
    name: string
    /**
     * 瓦楞名称
     */
    corrugatedName: string
    /**
     * 用料名称
     */
    materialsName: string
    /**
     * 层数
     */
    layerNum: number
    /**
     * 市场价
     */
    marketPrice: number | string
    /**
     * 成本
     */
    costPrice: number | string
    /**
     * 成本加价
     */
    costPriceMarkup: number | string
}

export interface ILayers {
    /**
     * 纸id
     */
    paperId: string
    /**
     * 纸名称
     */
    paperName: string
    /**
     * 系数克重
     */
    coefG: number | string
    /**
     * 纸类型
     */
    paperType: number | string
    /**
     * 成本
     */
    cost: number | string
    /**
     * 层数
     */
    layerNum: number | string
}

export interface IAddCardboardProduct extends ICardboardProduct {
    /**
     * 纸板每层参数
     */
    layers: Array<ILayers>
    /**
     * 图片
     */
    images: {
        main: Array<string>
        details: Array<string>
    },
}

export interface IReturnCardboardProduct extends ICardboardProduct {
    /**
     * 纸板每层参数
     */
    layers: Array<ILayers>
    /**
     * 图片
     */
    images: Array<{
        /**
         * id
         */
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
        index: string
        /**
         * 类型 1:主图 2:详情图
         */
        type: number
    }>

    createtime: string

    updatedtime: string
}
