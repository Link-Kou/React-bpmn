/**
 * 瓦楞参数
 */
export interface ICorrugatedProductTypes {
    /**
     * 瓦楞类型
     */
    type: string

    /**
     * 楞型名称
     */
    name: string

    /**
     * 成本价
     */
    costPrice: number | string

    /**
     * 成本价加价
     */
    costPriceMarkup: number | string

    /**
     * 瓦楞系数
     */
    coefficient: number | string

    /**
     * 楞高
     */
    height: number | string

    /**
     * 楞数
     */
    flute: number | string

    /**
     * 制造方式
     * 内制 in =1
     * 外协 out =2
     */
    makeMode: number

    /**
     * 供应商
     */
    supplier: string

    /**
     * 关联原纸
     */
    basePaperId: string

    /**
     * 关联原纸
     */
    basePaperName: string

    /**
     * 平方价
     */
    squarePrice: number | string
}
