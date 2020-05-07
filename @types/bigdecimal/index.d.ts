declare module 'bigdecimal' {

    /**
     * 参考Java，BigDecimal所有实现
     */
    export class BigDecimal {


        constructor(val: string)

        /**
         * 加法
         * @param val
         */
        add(val: BigDecimal): BigDecimal

        /**
         * 保留小数
         * @param val
         * @param nu
         */
        setScale(val: number, nu: number): BigDecimal

        /**
         * 除法
         * @param val
         * @param nu
         * @param DOWN
         */
        divide(val: BigDecimal, nu: number, DOWN: RoundingMode): BigDecimal

        /**
         * 减
         * @param val
         */
        subtract(val: BigDecimal): BigDecimal

        /**
         * 乘
         * @param val
         */
        multiply(val: BigDecimal): BigDecimal

        toString(): any

        /**
         * 遇到.5的情况时往上近似,例: 1.5 ->;2
         */
        public static ROUND_HALF_UP: number
        /**
         * 遇到.5的情况时往下近似,例: 1.5 ->;1
         */
        public static ROUND_HALF_DOWN: number
    }

    export class RoundingMode {

        /**
         * 始终对非零舍弃部分前面的数字加 1。
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.1 │─▶│ 2  ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.6│─▶│ -2 ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static UP(): any

        /**
         * 从不对舍弃部分前面的数字加 1（即截尾）
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.6 │─▶│ 1  ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.6│─▶│ -1 ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static DOWN(): any

        /**
         * 向正无限大方向舍入。
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.6 │─▶│ 2  ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.6│─▶│ -1 ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static CEILING(): any

        /**
         * 向负无限大方向舍入
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.6 │─▶│ 1  ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.6│─▶│ -2 ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static FLOOR(): any

        /**
         * 向最接近的数字方向舍入，如果与两个相邻数字的距离相等，则向上舍入。
         * 四舍五入。
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.5 │─▶│ 2  ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.6│─▶│ -2 ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static HALF_UP(): any

        /**
         * 向最接近的数字方向舍入，如果与两个相邻数字的距离相等，则向下舍入。
         * 五舍六入
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.6 │─▶│ 2  ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.6│─▶│ -2 ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static HALF_DOWN(): any

        /**
         * 向最接近数字方向舍入，如果与两个相邻数字的距离相等，则向相邻的偶数舍入。
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.6 │─▶│ 2  ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.5│─▶│ -1 ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static HALF_EVEN(): any

        /**
         * 用于断言请求的操作具有精确结果，因此不发生舍入。
         * ┌───────────────┐
         * │ ┌────┐  ┌────┐│
         * │ │1.0 │─▶│ su ││
         * │ └────┘  └────┘│
         * │ ┌────┐  ┌────┐│
         * │ │-1.1│─▶│ er ││
         * │ └────┘  └────┘│
         * └───────────────┘
         * @constructor
         */
        public static UNNECESSARY(): any

    }

}

