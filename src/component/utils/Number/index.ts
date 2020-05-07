
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
