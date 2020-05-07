export interface IFormValue {
    id?: string
    /**
     * 供应商
     */
    supplier: string
    /**
     * 原纸名称
     */
    paperName: string
    /**
     * 卷轴幅宽
     */
    reelWidth: number | string
    /**
     * 原纸等级
     */
    level: string
    /**
     * 原纸类型
     */
    type: string
    /**
     * 进价
     */
    buyPrice: number | string
    /**
     * 克重(定量)
     */
    weight: number | string
    /**
     * 平方价
     */
    squarePrice: number | string
    /**
     * 厚度
     */
    thickness: number | string
    /**
     * 紧度
     */
    density: number | string
    /**
     * 横向环压强度
     */
    horizontalPower: number | string
    /**
     * 纵向裂断长
     */
    verticalPower: number | string

}

export const IStateFormValue: IFormValue = {
    /**
     * 供应商
     */
    supplier: '',
    /**
     * 原纸名称
     */
    paperName: '',
    /**
     * 卷轴幅宽
     */
    reelWidth: '',
    /**
     * 原纸等级
     */
    level: '',
    /**
     * 原纸类型
     */
    type: '',
    /**
     * 进价
     */
    buyPrice: '',
    /**
     * 克重(定量)
     */
    weight: '',
    /**
     * 平方价
     */
    squarePrice: '',
    /**
     * 厚度
     */
    thickness: '',
    /**
     * 紧度
     */
    density: '',
    /**
     * 横向环压强度
     */
    horizontalPower: '',
    /**
     * 纵向裂断长
     */
    verticalPower: ''
}

export interface IArrayDatas {
    value?: string | number
    label?: string | number,
    children?: Array<IArrayDatas>

    [x: string]: any
}
