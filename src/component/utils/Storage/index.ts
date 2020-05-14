import * as CryptoJS from 'crypto-js'

const IK = '714240662791563856286731259914543874714240662791563856286731259914543874';
const IV = '69765079845076747668220833171881';

export default class Storage {

    /**
     * 加密设置
     * @param keyname
     * @param val
     */
    public static setItem(keyname: string, val: string, callback?: (e: boolean) => void) {
        try {
            if (keyname && val) {
                const key = CryptoJS.enc.Hex.parse(IK);
                const iv = CryptoJS.enc.Hex.parse(IV)
                const enc = CryptoJS.AES.encrypt(val, key, {
                    iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                })
                if (window.sessionStorage) {
                    const sessionStoragekey = CryptoJS.MD5(keyname).toString()
                    const sessionStorageval = enc.ciphertext.toString()
                    window.sessionStorage.setItem(sessionStoragekey, sessionStorageval)
                    const item = this.getItem(keyname);
                    if (item === val) {
                        callback && callback(true)
                        return
                    }
                }
                callback && callback(false)
            }
        } catch (e) {
            callback && callback(false)
        }
    }

    /**
     * 解密获取
     * @param keyname
     * @param val
     */
    public static getItem(keyname: string): string | undefined {
        try {
            if (window.sessionStorage) {
                const sessionStoragekey = CryptoJS.MD5(keyname).toString()
                const val = window.sessionStorage.getItem(sessionStoragekey)
                if (val) {
                    const key = CryptoJS.enc.Hex.parse(IK);
                    const iv = CryptoJS.enc.Hex.parse(IV)
                    const enc = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(val), key, {
                        iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    })
                    return CryptoJS.enc.Utf8.stringify(enc)
                }
            }
        } catch (e) {
            console.warn(e)
        }
        return undefined
    }


    /**
     * 删除
     * @param keyname
     * @param val
     */
    public static delItem(keyname: string): void {
        if (window.sessionStorage) {
            window.sessionStorage.removeItem(CryptoJS.MD5(keyname).toString())
        }
    }

    /**
     * 删除所有 sessionStorage
     * @param keyname
     * @param val
     */
    public static clearItem(): void {
        if (window.sessionStorage) {
            window.sessionStorage.clear()
        }
    }

}
