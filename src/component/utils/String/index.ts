import _ from 'lodash';


export default class Strings {

    /**
     * 检查字符串是否为空
     * 长度为零的判断为空
     * @param value
     * @return 如果 value 非字符串，那么返回 true，否则返回 false
     */
    public static isEmpty(value: any): boolean {
        if (value) {
            return !_.isString(value)
        }
        return true
    }


    /**
     * 检查字符串是否为空
     *
     * @param value
     * @return 如果 value 非字符串，那么返回 true，否则返回 false
     */
    public static isBlank(value?: any): value is string | boolean {
        return _.isString(value)
    }


    /**
     * 检查字符串是否不为空
     * "" 长度为零
     * @param value
     * @return 如果 value 为字符串，那么返回 true，否则返回 false
     */
    public static isNotEmpty(value: any): boolean {
        if (!Strings.isEmpty(value)) {
            return true
        }
        return false
    }

    /**
     * 检查字符串是否为空,并且获取到默认值
     *
     * @param value
     * @return 返回非空的value
     * @exception 空字符串异常
     */
    public static isEmptyGetDefault(value: any, defaults: string): string {
        if (Strings.isNotEmpty(value)) {
            return value
        }
        return defaults

    }

}
