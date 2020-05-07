import * as React from 'react';
import {Checkbox, Input, Table} from 'rsuite';
import {CellAddReduce, CellSortUpDown} from '@component/table';
import nanoid from 'nanoid';

const {Column, HeaderCell, Cell} = Table;


interface IProps {

    rowdatas: Array<{ id: string, key: string, value: string, order: number }>,

    rowindexs: number

    onChange?(rowindexs: number, value: Array<{ id: string, key: string, value: string, order: number }>): void

}

/**
 * 包装与规格
 */
export default class ProductSpecificationItem extends React.Component<IProps> {

    public Columns = [
        {
            HeaderCell: <HeaderCell className="app-header-cell-group">
                <div className="app-header-cell-group-title">
                    <span>名称</span>
                </div>
            </HeaderCell>,
            Cell: <CellAddReduce dataKey="id" addrow={this._addRow.bind(this)} delRow={this._delRow.bind(this)}/>,
            colSpan: 2,
            width: 85,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="key">
                {(rowData: any) => (
                    <Input defaultValue={rowData.key}
                           style={{width: '100%'}}
                           onChange={(e) => {
                           }}/>
                )}
            </Cell>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>规格值</HeaderCell>,
            Cell: <Cell dataKey="value">
                {(rowData: any) => (
                    <Input defaultValue={rowData.key}
                           style={{width: '100%'}}
                           onChange={(e) => {
                           }}/>
                )}
            </Cell>,
            flexGrow: 1,
            width: 350,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>主体显示</HeaderCell>,
            Cell: <Cell dataKey="value">
                {(rowData: any) => (
                    <Checkbox/>
                )}
            </Cell>,
            width: 55,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>顺序</HeaderCell>,
            Cell: <CellSortUpDown dataKey="id" maxRow={this._getMax.bind(this)} sortRow={this._sortRow.bind(this)}/>,
            width: 65,
            fixed: false,
            resizable: false
        }
    ]


    private _getMax() {
        return this.props.rowdatas.length
    }

    /**
     * 添加行
     * @private
     */
    public _addRow(rowData: any, rowIndex: number) {
        const {rowdatas, rowindexs, onChange} = this.props
        rowdatas?.splice(rowIndex + 1, 0, {
            id: nanoid(),
            key: '',
            value: '',
            order: rowIndex + 1
        })
        onChange?.(rowindexs, rowdatas)
    }

    /**
     * 删除行
     * @private
     */
    public _delRow(rowData: any, rowIndex: number) {
        const {rowdatas, rowindexs, onChange} = this.props
        rowdatas.splice(rowIndex, 1)
        onChange?.(rowindexs, rowdatas)
    }

    /**
     * 排序
     * @private
     */
    public _sortRow(rowIndex: number, upOrDown: number) {
        const {rowdatas, rowindexs, onChange} = this.props
        const datum1 = rowdatas[rowIndex];
        const datum2 = rowdatas[rowIndex + upOrDown];
        if (upOrDown < 0) {
            rowdatas.splice(rowIndex - 1, 2, datum1, datum2)
        } else {
            rowdatas.splice(rowIndex, 2, datum2, datum1)
        }
        onChange?.(rowindexs, rowdatas)
    }


    public render() {
        const {rowdatas} = this.props
        return (
            <Table
                loading={false}
                wordWrap={true}
                headerHeight={65}
                autoHeight={true}
                bordered={true}
                cellBordered={false}
                data={rowdatas}
            >
                {
                    this.Columns.map((k: any, i, a) => (
                        <Column width={k.width} align="center" flexGrow={k.flexGrow} colSpan={k.colSpan}
                                verticalAlign={'middle'} fixed={k.fixed} resizable={k.resizable}>
                            {k.HeaderCell}
                            {k.Cell}
                        </Column>
                    ))
                }
            </Table>
        )
    }

}
