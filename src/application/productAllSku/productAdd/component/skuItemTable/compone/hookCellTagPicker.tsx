import * as React from 'react';
import {Table, TagPicker} from 'rsuite';
import {ImageUploaderLibraryGroup} from '@common/imageUploader';
import nanoid from 'nanoid';

const {Cell} = Table;

export interface ISpecifica {

    valueKey: string

    imageKey?: string

    onSelectChange?(value: any): void

    [x: string]: any
}


export const HookCellTagPicker = (props: ISpecifica) => {
    const {onSelectChange, rowData, valueKey, imageKey} = props
    const [select, setSelect] = React.useState();
    //所有可以选择的列表
    const seen = new Set();
    const datas: Array<{
        value: string,
        label: string,
        image: string
    }> = rowData[valueKey]?.map((k: any, i: any, a: any) => {
        return {
            value: k.id,
            label: k.name,
            image: k.image
        }
    }).filter((k: any, i: any, a: any) => {
        if (seen.has(k)) {
            return false;
        }
        seen.add(k);
        return true;
    })

    const selectImage = (value: any, fileUrl: Array<string>) => {
        const rowDatum: Array<any> = rowData[valueKey];
        rowDatum?.forEach((k, i, a) => {
            if (value === k.name) {
                k.image = fileUrl[0]
            }
        })
        onSelectChange?.(rowData)
    }

    React.useEffect(() => {
        if (select) {
            const map = select.map((k: any, i: any, a: any) => {
                const filter = datas.filter((ki: any, ii, ai) => ki.value === k);
                return {
                    id: filter[0] ? filter[0].value : nanoid(),
                    name: filter[0] ? filter[0].label : k,
                    image: filter[0] ? filter[0].image : undefined
                }
            });
            rowData[valueKey] = map
            onSelectChange?.(rowData)
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
                renderValue={(value, item: any, selectedElement) => {
                    const fileUrls = () => {
                        const filter = datas.filter((ki: any, ii, ai) => ki.value === value);
                        if (filter[0]) {
                            const image = filter[0].image
                            if (image) {
                                return [image]
                            }
                        }
                        return []
                    };
                    return (
                        <>
                            {
                                rowData[imageKey ?? ''] ? (
                                    <ImageUploaderLibraryGroup maxSize={1}
                                                               isDragDisabled={true}
                                                               onChange={(fileUrl) => {
                                                                   selectImage(value, fileUrl)
                                                               }}
                                                               fileUrl={fileUrls()}/>
                                ) : undefined
                            }
                            <div style={{textAlign: 'center', fontSize: 14}}>
                                {item.label}
                            </div>
                        </>
                    )
                }}
                maxHeight={150}
                value={rowData[valueKey].map((k: any, i: any, a: any) => k.id)}
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
