export default class ListRow {
    /**
     * 添加List或Array的新行
     * @param props 数据
     * @param props.state 需要进行处理的数据
     * @param props.addrow  新数据
     * @param props.id 匹配的唯一编号
     * @param props.order 排序 +1 或 -1
     * @param props.getNodeKey 获取到id字段
     * @param sort 设置排序
     * @constructor
     */
    public static AddRow(props: { state: Array<any>, addrow: any, id: string, order?: number, getNodeKey: (node: any) => string | number }, sort?: (node: any, order: number) => void) {
        const {state, addrow, id, order, getNodeKey} = props
        state.every((k, i, a) => {
            if (getNodeKey(k) === id) {
                const orderItem = typeof order === 'number' ? order : 1
                state.splice(i + orderItem, 0, addrow)
                return false
            }
            return true
        })
        state.forEach((k, i, a) => {
            sort && sort(k, i)
        })
        return state
    }

    /**
     * 删除List或Array的行
     * @param props 数据
     * @param props.state   需要进行处理的数据
     * @param props.id 匹配的唯一编号
     * @param props.getNodeKey  获取到id字段
     * @param sort 设置排序
     * @constructor
     */
    public static DelRow(props: { state: Array<any>, id: string | number, getNodeKey: (node: any) => string | number }, sort?: (node: any, order: number) => void) {
        const {state, id, getNodeKey} = props
        state.every((k, i, a) => {
            if (getNodeKey(k) === id) {
                state.splice(i, 1)
                return false
            }
            return true
        })
        state.forEach((k, i, a) => {
            sort && sort(k, i)
        })
        return state;
    }

    /**
     * 排序List或Array的行
     * @param props
     * @param props.state   需要进行处理的数据
     * @param props.id   需要排序的id值
     * @param props.sortKey   存储排除的key
     * @param props.order   -1 或 1确定下移或上移
     * @param props.getNodeKey  获取id值
     * @param props.getNodeKey  获取id的key
     * @param sort 实现排序
     * @constructor
     */
    public static SortRow(props: { state: Array<any>, id: string | number, sortKey: string, order: number, getNodeKey: (node: any) => string | number }, sort: (i1: any, i2: any) => number) {
        const {state, id, order, sortKey, getNodeKey} = props
        state.every((k, i, a) => {
            if (getNodeKey(k) === id) {
                k[sortKey] += order
                if (k[sortKey] < 0) {
                    k[sortKey] = 0;
                } else if (k[sortKey] >= a.length) {
                    k[sortKey] = a.length - 1;
                }
                if (a[i + order] !== undefined) {
                    a[i + order][sortKey] = i
                }
                return false
            }
            return true
        })
        state.sort((i1: any, i2: any) => {
            /*if (i1.order < i2.order) {
                return -1
            }
            return 1*/
            return sort && sort(i1, i2)
        })

    }
}
