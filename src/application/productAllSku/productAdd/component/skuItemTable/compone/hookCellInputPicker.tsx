import * as React from 'react';
import {InputPicker, Table} from 'rsuite';
import {utilsObject, utilsString} from '@utils/index';
import _ from 'lodash';

const {Cell} = Table;

export interface ISpecifica {

    datas: Array<any>

    valueKey: string

    onSelectChange?(value: any): void

    [x: string]: any
}


export const HookCellInputPicker = (props: ISpecifica) => {
    const {datas, onSelectChange, rowData, rowIndex, valueKey} = props
    const [select, setSelect] = React.useState();
    //所有可以选择的列表
    const seen = new Set();
    const newdatas: Array<any> = datas?.map((k: any, i: any, a: any) => {
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
    }).filter((k, i, a) => {
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
            const rowDatum = datas[rowIndex];
            rowDatum[valueKey] = select
            onSelectChange?.(rowDatum)
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
                value={rowData[valueKey]}
                data={newdatas}
                onClean={() => {
                    setSelect('')
                }}
                onSelect={(value) => {
                    setSelect(value)
                    //onSelect?.(value)
                }}/>
        </Cell>

    )
}
