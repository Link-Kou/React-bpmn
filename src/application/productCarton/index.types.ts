import {ICardboardProductCost as CardboardProductCost} from '@fetch/api/cardboard/index.types'
import {IReturnCartonProduct as ReturnCartonProduct} from '@fetch/api/carton/index.types'

export interface IFormValue {
    /**
     * 商品名称
     */
    name: string
    /**
     * 辅助名称
     */
    subname: string
    /**
     * 箱型
     * 1:全包
     * 2:半包
     * 3:天地盖
     * 4:有底无盖
     */
    boxType: number
    /**
     * 成型方式
     *
     * 1:一页成型
     * 2:两页成型
     */
    molding: number
    /**
     * 成箱方式
     * 1:钉箱
     * 2:粘箱
     */
    moldBox: number
    /**
     * 尺寸类型
     * 1:制造尺寸
     * 2:内径尺寸
     * 3:外径尺寸
     */
    sizeType: number
    /**
     * 长度
     */
    length: number | string
    /**
     * 宽度
     */
    width: number | string
    /**
     * 高度
     */
    height: number | string
    /**
     * 印刷方式
     * 1：无印刷
     * 2：水印
     * 3：胶印
     * 4：数码
     */
    printingType: number
    /**
     * 印刷参数
     */
    printingWay?: IPrintingnNone | IPrintingnDigital | IPrintingnGlue | IPrintingnWatermark
    /**
     * 图片信息
     */
    images: {
        main: Array<string>,
        details: Array<string>
    },
    /**
     * 关联纸板
     */
    associatedCardboard?: Array<{
        /**
         * 纸板id
         */
        cardboardId: string
        /**
         * 成本
         */
        cost: number | string
    }>
    /**
     * 市场价
     */
    marketPrice: number | string
    /**
     * 成本价
     */
    costPrice: number | string
    /**
     * 成本价加价
     */
    costPriceMarkup: number | string
    /**
     * 是否关联价格  0:否 1:是
     */
    relatedPrice: number
}

/**
 * 无印刷
 */
export interface IPrintingnNone {
    /**
     * 面纸类型
     * 1:牛皮纸
     * 2:涂布纸
     */
    tissueType?: number
    /**
     * 开槽模切
     * 1:无
     * 2:开槽
     * 3:模切
     */
    slottingCutting?: number
}

/**
 * 数码印刷
 */
export interface IPrintingnDigital {
    /**
     * 版面
     * 1:AA
     * 2:AB
     */
    layoutType?: number
    /**
     * 面纸类型
     * 1:牛皮纸
     * 2:涂布纸
     */
    tissueType?: number
    /**
     * 开槽模切
     * 1:无
     * 2:开槽
     * 3:模切
     */
    slottingCutting?: number
    /**
     * 印刷面积
     * 1:30%以内
     * 2:31%-50%
     * 3:50%-70%
     * 4:70%以上
     */
    printingArea?: number
    /**
     * 数码表处理
     * 1:水性光油
     * 2:UV油
     */
    surfaceType?: number
}

/**
 * 胶印印刷
 */
export interface IPrintingnGlue {
    /**
     * 版面
     * 1:AA
     * 2:AB
     */
    layoutType?: number
    /**
     * 开槽模切
     * 1:无
     * 2:开槽
     * 3:模切
     */
    slottingCutting?: number
    /**
     * 裱胶处理
     * 1:裱瓦楞
     * 2:裱平板
     */
    mountSurfaceType?: number
    /**
     * 胶印处理
     * 1:无
     * 2:UV油
     * 3:亮光膜
     * 4:亚光膜
     * 5:防剥离UV
     * 6:吸塑油
     * 7:红外油
     * 8:亚光油
     */
    glueSurfaceType?: number
    /**
     * 专色数
     */
    specialColorNumber?: number | string
    /**
     * 普色数
     */
    normalColorNumber?: number | string
}

/**
 * 水印印刷
 */
export interface IPrintingnWatermark {
    /**
     * 版面
     * 1:AA
     * 2:AB
     */
    layoutType?: number
    /**
     * 开槽模切
     * 1:无
     * 2:开槽
     * 3:模切
     */
    slottingCutting?: number
    /**
     * 印刷面积
     * 1:30%以内
     * 2:31%-50%
     * 3:50%-70%
     * 4:70%以上
     */
    printingArea?: number
    /**
     * 色数
     * 1：单黑
     * 2：单杂
     * 3：2色
     * 4：3色
     * 5：4色
     * 6：5色
     * 7：5色以上
     */
    colorNumber?: number
    /**
     * 水印表处
     * 1:无
     * 2:水性光油
     */
    surfaceType?: number
    /**
     * 橡皮版面积
     */
    rubberArea?: number | string
    /**
     * 柔版面积
     */
    softArea?: number | string

}

/**
 * 状态
 */
export const IStateFormValue: IFormValue = {
    /**
     * 商品名称
     */
    name: '',
    /**
     * 辅助名称
     */
    subname: '',
    /**
     * 箱型
     */
    boxType: 0,
    /**
     * 成型方式
     */
    molding: 0,
    /**
     * 成箱方式
     */
    moldBox: 0,
    /**
     * 尺寸类型
     */
    sizeType: 0,
    /**
     * 长度
     */
    length: '',
    /**
     * 宽度
     */
    width: '',
    /**
     * 高度
     */
    height: '',
    /**
     * 印刷方式
     */
    printingType: 0,
    /**
     * 印刷参数
     */
    printingWay: {},
    /**
     * 图片信息
     */
    images: {
        main: [],
        details: []
    },
    /**
     * 关联纸板
     */
    associatedCardboard: [],
    /**
     * 市场价
     */
    marketPrice: '',
    /**
     * 成本价
     */
    costPrice: '',
    /**
     * 成本价加价
     */
    costPriceMarkup: '',
    /**
     * 是否关联价格  0:否 1:是
     */
    relatedPrice: 1
}

/**
 * 纸板成本产品
 */
export interface ICardboardProductCost extends CardboardProductCost {

}

/**
 * 返回的纸箱参数
 */
export interface IReturnCartonProduct extends ReturnCartonProduct {

}


export class IEnum {

    public static BoxType(index: number = 0): String {
        return ['', '全包', '半包', '天地盖', '有底无盖'][index]
    }

    public static SizeType(index: number = 0): String {
        return ['', '制造尺寸', '内径尺寸', '外径尺寸'][index]
    }

    public static Molding(index: number = 0): String {
        return ['', '一页成型', '两页成型'][index]
    }

    public static MoldBox(index: number = 0): String {
        return ['', '钉箱', '粘箱'][index]
    }

    public static PrintingType(index: number = 0): String {
        return ['', '无印刷', '水印', '胶印', '数码'][index]
    }

}
