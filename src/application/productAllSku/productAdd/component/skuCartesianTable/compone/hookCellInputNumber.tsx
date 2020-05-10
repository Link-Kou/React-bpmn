import * as React from 'react';
import {InputNumber, Table} from 'rsuite';
import {TableCellProps} from 'rsuite/lib/Table/TableCell';
import {utilsNumber} from '@utils/index';


const {Cell} = Table;

export interface IHookCellInputNumber extends TableCellProps {

    max?: number

    min?: number

    isInt?: boolean

    step?: number

    onSelectChange?(rowIndex?: number, rowData?: any): void

    [x: string]: any
}

//numeral(v1.costPrice.toString()).format('0.00')
export const HookCellInputNumber = (props: IHookCellInputNumber) => {
    const {dataKey, rowData, rowIndex, onSelectChange, isInt, step} = props
    return (
        <Cell {...props}>
            <InputNumber
                step={step}
                value={rowData?.[dataKey ?? ''] ?? ''}
                onChange={(value, event) => {
                    if (rowData) {
                        rowData[dataKey ?? ''] = isInt ? utilsNumber.toInteger(value) : value
                        onSelectChange?.(rowIndex, rowData)
                    }
                }}
                style={{width: '100%'}}
            />
        </Cell>

    )
}
