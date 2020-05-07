import nanoid from 'nanoid'


export default class Guid {
    /**
     * 默认规则 UUID
     */
    public static randomGUID(): string {
        const s: Array<any> = [];
        const hexDigits = '0123456789abcdef';
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = '4';
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
    }

    /**
     * 指定长度
     * @param len 长度
     * @param radix 基数
     */
    public static random(len: number, radix: number) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        const uuid = []
        let i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            // rfc4122, version 4 form
            let r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }

    /**
     * 生成6无符号id
     */
    public static random6() { // 生成6位长度的字符串
        return (~~(Math.random() * (1 << 30))).toString(36); // "<<"操作相当于乘上2的n次方，"~~"相当于parseInt
    }

    /**
     * 获取到nanoid
     * @param n
     */
    public static nanoid(n?: number) {
        if (n) {
            return nanoid(n)
        }
        return nanoid()
    }
}
