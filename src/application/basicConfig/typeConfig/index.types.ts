export interface IData {
    value?: string | number
    label?: string | number
    children: Array<IData>

    [x: string]: any
}


export declare namespace IConstant {
    type types = 'All' | 'Other'
    type alone = 'title' | 'group' | 'item'
}
