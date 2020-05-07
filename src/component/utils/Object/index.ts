import _ from 'lodash';

export default class Objects {


    public static isUndefined(value: any): boolean {
        return _.isUndefined(value)
    }

    /**
     * 判断为空
     * null Undefined {} 判断为空
     * @param value
     */
    public static isEmpty(value: any): boolean {
        return _.isUndefined(value) || value === null || Object.keys(value).length <= 0
    }

    /**
     * 判断为非空
     * null Undefined Objectkeys=0
     * @param value
     */
    public static isNotEmpty(value: any): boolean {
        return !this.isEmpty(value)
    }

    /**
     * 检查是为空，返回默认值
     *
     * @param value
     * @return true 空 false 非空
     */
    public static isEmptyGetDefault(value: any, defaultval: any): any {
        if (this.isEmpty(value)) {
            return defaultval
        }
        return value
    }

    /**
     * 检查是为对象，返回默认值
     *
     * @param value
     * @param defaultval 为空获取
     * @param notnullval 非空获取
     * @return true 空 false 非空
     */
    public static ifEmptyGetDefault(value: any, defaultval: any, notnullval: () => any): any {
        if (value === undefined || value === null) {
            return defaultval
        }
        return notnullval?.()
    }

    /**
     * 是否为标准的返回格式
     * {
     *    code: number,
     *    msg: string,
     *    data: Array<IReqMarketingPriceschemeSelectPageModel>,
     *    success: boolean
     * }
     */
    public static isReqBaseObject = <T>(obj: T, callback: (data: T) => void, callerror?: () => void) => {
        try {
            if (typeof obj === 'object') {
                const def = {
                    code: -1,
                    success: undefined,
                    ...obj
                }
                if (typeof def.success === 'boolean') {
                    callback && callback(obj)
                    return
                }
            }
            callerror && callerror()
        } catch (e) {
            callerror && callerror()
        }
    }

    /**
     * 获取到对象中的指定对象
     * @param v
     * @param key
     */
    public static get(v: any, key: any): any {
        return _.get(v, key);
    }

    /**
     * 根据vlKey查询,如果vlKey不存在,查询key
     * 都不存在返回undefined
     * 存在返回对象值
     * @param props
     * @param props.key 查询的默认key
     * @param props.vlKey 自定义的key
     * @param k
     */
    public static getKey(props: { key: string, vlKey?: string }, k: any): any {
        const {key, vlKey} = props
        const _labelvalueKey = _.isString(vlKey) ? k?.[vlKey as string] : k?.[key]
        return _labelvalueKey
    }

    /**
     * 根据对象中取默认值 {value,label}
     * 传递 {labelKey,valueKey} 则优先查询
     * @param props
     * @param props.labelKey
     * @param props.valueKey
     * @param k
     */
    public static getLabeValuelKey(props: { labelKey?: string, valueKey?: string }, k: any): { _labelKey: any, _valueKey: any } {
        const {valueKey, labelKey} = props
        const _valueKey = this.getKey({
            key: 'value',
            vlKey: valueKey
        }, k)
        const _labelKey = this.getKey({
            key: 'label',
            vlKey: labelKey
        }, k)
        return {
            _labelKey,
            _valueKey
        }
    }
}
