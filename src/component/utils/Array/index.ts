export default class Arrays {

    /**
     * 检查是为数组
     *
     * @param value
     * @return true 空 false 非空
     */
    public static isArray(value: any): boolean {
        return Array.isArray(value);
    }

    /**
     * 检查是为数组，不是数组返回默认值
     *
     * @param value
     * @return true 空 false 非空
     */
    public static isArrayGetDefault<S>(value: any, defaultval: S): S | any {
        if (Array.isArray(value)) {
            return value
        }
        return defaultval
    }

    /**
     * 检查是为数组
     *
     * @param value
     * @return true 空 false 非空
     */
    public static getArrayLength(value: any): number {
        if (Array.isArray(value)) {
            return value.length
        }
        return 0
    }
}
