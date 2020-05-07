import {IFormValue as BaseCorrugated} from '../baseCorrugated/index.types'
import {IFormValue as BasePaper} from '../basePaper/index.types'
import {IReturnCardboardProduct as IReqCardboardProduct} from '@fetch/api/cardboard/index.types'

export interface IFormValue {
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
     * 纸板每层参数
     */
    layers: Array<ILayers>
    /**
     * 图片
     */
    images: IImages,
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

export interface IImages {
    main: Array<string>
    details: Array<string>
}

export const IStateFormValue: IFormValue = {
    name: '',
    corrugatedName: '',
    materialsName: '',
    layerNum: 3,
    layers: [
        {
            paperId: '',
            paperName: '',
            coefG: '',
            cost: '',
            paperType: 1,
            layerNum: 1
        },
        {
            paperId: '',
            paperName: '',
            coefG: '',
            cost: '',
            paperType: 2,
            layerNum: 2
        },
        {
            paperId: '',
            paperName: '',
            coefG: '',
            cost: '',
            paperType: 1,
            layerNum: 3
        }
    ],
    images: {
        main: [],
        details: []
    },
    maxLength: '',
    minLength: '',
    blankingLengthAdd: '',
    maxWidth: '',
    minWidth: '',
    blankingWidthAdd: '',
    thickness: '',
    burst: '',
    edgePressure: '',
    puncture: '',
    glue: '',
    compressive: '',
    relatedPrice: 1,
    marketPrice: '',
    costPrice: 0,
    costPriceMarkup: ''
}


export interface IBaseCorrugated extends BaseCorrugated {

}

export interface IBasePaper extends BasePaper {

}

export interface IReturnCardboardProduct extends IReqCardboardProduct {

}
