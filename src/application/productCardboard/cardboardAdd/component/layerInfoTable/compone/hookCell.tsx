import * as React from 'react';
import {SelectPicker, Table} from 'rsuite';

const {Cell} = Table;

interface IProps {

    data: Array<any>

    valueKey: string

    labelKey: string

    dataKey: string

    oneCellDataKey: string

    twoCellDataKey: string

    paperType: number | string

    /**
     * 渲染的容器
     */
    container?: any,

    [x: string]: any

    onChangeValue(dataKey: string, data: any): void
}

export const SelectLayerCell = (props: IProps) => {
    const {rowIndex, rowData, dataKey, oneCellDataKey, twoCellDataKey, data, container, valueKey, labelKey, onChangeValue, paperType} = props
    const change = (value: any) => {
        const find = data.find(x => x[valueKey] === value);
        if (find) {
            find.paperType = paperType
            onChangeValue?.(dataKey, find)
        }
    }
    const select = (index: number) => {
        const datas = {
            0: <SelectPicker valueKey={valueKey}
                             labelKey={labelKey}
                             container={container}
                             style={{width: '100%'}}
                             onSelect={change}
                             data={data}/>,
            1: rowData?.[dataKey]?.[oneCellDataKey],
            2: rowData?.[dataKey]?.[twoCellDataKey]
        }
        return datas[index]
    }
    return (
        <Cell {...props} >
            {
                select(rowIndex)
            }
        </Cell>
    )
}
