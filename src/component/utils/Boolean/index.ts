import _ from 'lodash';

export default class Booleans {

    /**
     * 是否为Boolean
     * @param val 检查值
     */
    public static isBoolean(val: any): boolean {
        return _.isBoolean(val)
    }


    /**
     * 是否为Boolean
     * @param val 检查值
     * @param def 可选检查值非Boolean类型返回此默认参数
     * @return
     */
    public static toBoolean(val: any): boolean {
        if (_.isBoolean(val)) {
            return val
        }
        return Boolean(val)
    }

    /**
     * 是否为Boolean
     * @param val 检查值
     * @param def 可选检查值非Boolean类型返回此默认参数
     * @return
     */
    public static toBooleanGetDefault(val: any, def: boolean): boolean {
        if (_.isBoolean(val)) {
            return val
        }
        return def
    }
}
