import * as React from 'react';
import {Checkbox, Icon, IconButton, Table} from 'rsuite';
import TextSpan from '@component/textSpan';
import {utilsObject} from '@utils/index';

const {Cell} = Table;

interface IProps {
    dataKey?: string | undefined

    rowIndex?: number

    rowHeight?: number

    [x: string]: any
}


interface IControllerAlashnCell extends IProps {
    deg?: number
}

/**
 * 斜线分隔表格
 * @constructor
 */
export function ControllerAlashCell(props: IControllerAlashnCell) {
    const {rowData, dataKey, deg} = props;
    const degNum = (v: number = 50) => {
        return v
    }
    const suDiv = () => {
        if (dataKey) {
            const rowDatum: string = rowData[dataKey];
            const strings: Array<string> = rowDatum.split('/');
            if (Array.isArray(strings) && strings.length === 2) {
                return (
                    <Cell {...props}
                          style={{background: `linear-gradient(${degNum(deg)}deg, transparent 49.5%, #dedede 50%, transparent 50%, transparent 50%`}}>
                        <div>
                            <sub style={{bottom: '-2rem', fontSize: 14}}>
                                {strings[0]}
                            </sub>
                            <sup style={{top: '-2rem', fontSize: 14}}>
                                {strings[1]}
                            </sup>
                        </div>
                    </Cell>
                )
            }
            return (<Cell {...props}>{rowDatum}</Cell>);
        }
        return <Cell {...props}/>
    }

    return suDiv();
}


/**
 * 编号列
 * @param props
 * @constructor
 */
export function ControllerIndexCell(props: IProps) {
    const {rowIndex} = props;
    return (
        <Cell {...props}>
            <Checkbox
                style={{marginLeft: 0}}
                inline={true}
                checked={false}
                onChange={() => {
                }}
            >
                {rowIndex ?? rowIndex}
            </Checkbox>
        </Cell>
    )
}


interface IControllerExpandedIndexCell extends IProps {
    onExpanded(rowData: any, dataKey: any): void
}

/**
 * 编号与展开列
 * @param props
 * @constructor
 */
export function ControllerExpandedIndexCell(props: IControllerExpandedIndexCell) {
    const {rowIndex, expandedRowKeys, rowData, dataKey, rowKey, onExpanded, rowHeight} = props;
    return (
        <Cell {...props} style={{height: rowHeight ?? props.height}}>
            <IconButton
                size="xs"
                appearance="subtle"
                onClick={() => {
                    onExpanded?.(rowData, dataKey);
                }}
                icon={
                    <Icon
                        icon={
                            expandedRowKeys?.some((key: any) => key === rowKey)
                                ? 'minus-square-o'
                                : 'plus-square-o'
                        }
                    />
                }
            />
            <Checkbox
                style={{marginLeft: 0}}
                inline={true}
            >
                {rowIndex ?? rowIndex}
            </Checkbox>
        </Cell>
    )
}


interface IControllerTextSpanCell extends IProps {

}


/**
 * 常规 文本列表
 * @param props
 * @constructor
 */
export function ControllerTextSpanCell(props: IControllerTextSpanCell) {
    const {dataKey} = props;
    return (
        <Cell {...props}>
            {(rowData: any) => (
                <TextSpan>
                    {utilsObject.get(rowData, dataKey)}
                </TextSpan>
            )}
        </Cell>
    )
}
