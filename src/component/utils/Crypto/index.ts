import * as CryptoJS from 'crypto-js'


export default class Crypto {
    /**
     * 获取到Md5值
     * @param value
     * @constructor
     */
    public static MD5(value: string): string {
        return CryptoJS.MD5(value).toString()
    }

}
