import _ from 'lodash';

export default class Numbers {

    /**
     * 转换为Number类型
     *
     * @param value
     * @return true 空 false 非空
     */
    public static toNumber(value: any): number {
        if (isNaN(Number(value))) {
            return 0
        }
        return Number(value)
    }

    /**
     * 转换为Number类型
     *
     * @param value
     * @param dv
     * @return true 空 false 非空
     */
    public static toNumberDefault(value: any, dv: number): number {
        if (isNaN(Number(value))) {
            return dv
        }
        return Number(value)
    }

    /**
     * 是否为Number
     * @param value
     */
    public static isNumber(value?: any): value is number | boolean {
        return _.isFinite(Number(value));
    }

    /**
     * 取整数
     * @param value
     * @param included true 向上舍入 ; false:向下舍入
     * @param precision 精度
     */
    public static toInteger(value: any, included: boolean = false, precision: number = 0): number {
        if (included) {
            return _.ceil(value, precision)
        }
        return _.floor(value, precision)
    }

    /**
     * 转换为Number类型,返回转换完成的Number,提供用户予以处理后再返回
     *
     * @param value
     * @param callback
     * @return true 空 false 非空
     */
    public static isNumberOption<T>(value: number | undefined | string, callback: (v: number) => T): T {
        return callback(this.toNumber(value))
    }
}
