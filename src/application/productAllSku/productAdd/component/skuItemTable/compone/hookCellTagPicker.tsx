import * as React from 'react';
import {Table, TagPicker} from 'rsuite';

const {Cell} = Table;

export interface ISpecifica {

    valueKey: string

    onSelectChange?(value: any): void

    [x: string]: any
}


export const HookCellTagPicker = (props: ISpecifica) => {
    const {onSelectChange, rowData, valueKey} = props
    const [select, setSelect] = React.useState();
    //所有可以选择的列表
    const seen = new Set();
    const datas: Array<any> = rowData[valueKey]?.map((k: any, i: any, a: any) => {
        return {
            value: k,
            label: k
        }
    }).filter((k: any, i: any, a: any) => {
        if (seen.has(k)) {
            return false;
        }
        seen.add(k);
        return true;
    })
    React.useEffect(() => {
        if (select) {
            rowData[valueKey] = select
            onSelectChange?.([])
        }
    }, [select])
    return (
        <Cell {...props}>
            <TagPicker
                style={{width: '100%'}}
                preventOverflow={true}
                creatable={true}
                cleanable={true}
                placement={'bottom'}
                //container={container}
                //defaultValue={rowData[dataKey][valueKey]}
                maxHeight={150}
                value={rowData[valueKey]}
                data={datas}
                onClean={() => {
                    setSelect([])
                }}
                onChange={(value) => {
                    setSelect(value)
                }}/>
        </Cell>

    )
}
