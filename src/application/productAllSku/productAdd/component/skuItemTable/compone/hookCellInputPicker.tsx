import * as React from 'react';
import {InputPicker, Table, Alert} from 'rsuite';
import {utilsNumber, utilsObject, utilsString} from '@utils/index';
import _ from 'lodash';
import {TableCellProps} from 'rsuite/lib/Table/TableCell';

const {Cell} = Table;

export interface ISpecifica extends TableCellProps {

    onDatas?(): Array<any>

    valueKey: string

    /**
     * 规格重复
     */
    onSpecRepeat?(): boolean

    onSelectChange?(value: any): void

}


export const HookCellInputPicker = (props: ISpecifica) => {
    const {onDatas, onSelectChange, rowData, rowIndex, valueKey, onSpecRepeat} = props
    const [select, setSelect] = React.useState();
    //所有可以选择的列表
    const seen = new Set();
    const newdatas: Array<any> | undefined = onDatas?.()?.map((k: any, i: any, a: any) => {
        const key = utilsObject.getKey({
            key: 'label',
            vlKey: valueKey
        }, k);
        if (key && _.trim(key) !== '') {
            return {
                value: key,
                label: key
            }
        }
        return null;
    })?.filter((k, i, a) => {
        if (k) {
            if (seen.has(k.value)) {
                return false;
            }
            seen.add(k.value);
            return true;
        }
        return false
    });
    React.useEffect(() => {
        if (utilsString.isBlank(select)) {
            if (utilsNumber.isNumber(rowIndex)) {
                const rowDatum = onDatas?.()?.[rowIndex];
                if (rowDatum) {
                    rowDatum[valueKey] = select
                    onSelectChange?.(rowDatum)
                }
            }
        }
    }, [select])
    return (
        <Cell {...props}>
            <InputPicker
                style={{width: '100%'}}
                preventOverflow={true}
                creatable={true}
                cleanable={true}
                placement={'bottom'}
                //container={container}
                //defaultValue={rowData[dataKey][valueKey]}
                maxHeight={150}
                value={rowData?.[valueKey]}
                data={newdatas ?? []}
                onClean={() => {
                    setSelect('')
                }}
                onSelect={(value) => {
                    const b = onSpecRepeat?.() ?? true;
                    if (b) {
                        setSelect(value)
                    } else {
                        const number = onDatas?.()?.findIndex((k, i, a) => k.name === value);
                        if (number === -1) {
                            setSelect(value)
                        } else {
                            Alert.warning('规格名称重复')
                        }
                    }
                    //onSelect?.(value)
                }}/>
        </Cell>

    )
}
