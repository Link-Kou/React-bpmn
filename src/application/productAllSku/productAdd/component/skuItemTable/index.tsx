import * as React from 'react';
import {Button, Grid, Table} from 'rsuite';
import {HeaderCellMulti, CellAddReduce, CellSortUpDown} from '@component/table';
import {HookCellInputPicker} from './compone/hookCellInputPicker';
import {HookCellTagPicker} from './compone/hookCellTagPicker';
import nanoid from 'nanoid';

const {Column, HeaderCell, Cell} = Table;


interface IProps {
    onChange?(data: Array<{ [x: string]: any }>): void
}


interface IState {
    data: Array<{
        id: string
        name: string
        value: Array<string>
    }>
}

/**
 * 商品规格
 */
export default class ProductSku extends React.Component<IProps> {


    public state: IState = {
        data: [
            {
                id: nanoid(),
                name: '',
                value: []
            }
        ]
    }


    public componentDidMount(): void {
        this._onBuild()
    }


    public Columns = [
        {
            HeaderCell: <HeaderCell className="app-header-cell-group">
                <HeaderCellMulti head={{
                    title: '规格名称'
                }}/>
            </HeaderCell>,
            Cell: <CellAddReduce dataKey="id" addrow={this._onAddRow.bind(this)} delRow={this._onDelRow.bind(this)}/>,
            align: 'center',
            colSpan: 2,
            width: 65,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <HookCellInputPicker datas={this.state.data}
                                       dataKey="name"
                                       valueKey={'name'}
                                       onSelectChange={(value) => {
                                           this._onBuild()
                                       }}/>,
            align: 'center',
            width: 240,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell style={{textAlign: 'center'}}>规格值 (可使用键盘"回车键”快速添加规格值）</HeaderCell>,
            Cell: <HookCellTagPicker valueKey={'value'}
                                     dataKey="value"
                                     onSelectChange={(value) => {
                                         this._onBuild()
                                     }}/>,
            align: 'left',
            flexGrow: 1,
            width: 350,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>设置图片(单选)</HeaderCell>,
            Cell: <Cell dataKey="image"/>,
            align: 'center',
            width: 75,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>顺序</HeaderCell>,
            Cell: <CellSortUpDown dataKey="value"
                                  maxRow={this._getMax.bind(this)}
                                  sortRow={this._onSortRow.bind(this)}/>,
            align: 'center',
            width: 65,
            fixed: false,
            resizable: false
        }
    ]

    private _getMax() {
        return this.state.data.length
    }

    private _onAddRow(rowData: any, rowIndex: number) {
        const {data} = this.state
        data.splice(rowIndex + 1, 0, {
            id: nanoid(),
            name: '',
            value: []
        })
        this.setState({
            data
        }, () => {
            this._onBuild()
        })
    }

    private _onDelRow(rowData: any, rowIndex: number) {
        const {data} = this.state
        data.splice(rowIndex, 1)
        this.setState({
            data
        }, () => {
            this._onBuild()
        })
    }

    private _onSortRow(rowIndex: number, upOrDown: number) {
        const {data} = this.state
        const datum1 = data[rowIndex];
        const datum2 = data[rowIndex + upOrDown];
        if (upOrDown < 0) {
            data.splice(rowIndex - 1, 2, datum1, datum2)
        } else {
            data.splice(rowIndex, 2, datum2, datum1)
        }
        this.setState({
            data
        }, () => {
            this._onBuild()
        })
    }

    private _onBuild = () => {
        const {data} = this.state
        const {onChange} = this.props
        const descartesListDesc = this._DescartesListDesc(data, 'name', 'value');
        onChange?.(descartesListDesc);
    }

    /**
     * 降序-构建所有组合
     * @private
     */
    public _DescartesListDesc(columns: Array<any>, keyname: string, valuename: string): Array<{ [x: string]: any }> {
        if (!Array.isArray(columns) || (Array.isArray(columns) && columns.length < 1)) {
            return []
        }
        //计算一共有多少种组合
        let rownum = 1
        /**
         * 算法：通过定义 [0,0,0] 表示每一行是否完成组合
         */
        const table: Array<number> = []
        columns.forEach((k, i, a) => {
            if (k.value.length > 0) {
                rownum = rownum * k.value.length
                table[i] = 0
            }
        })
        const tableGroup: Array<any> = []
        //i为总共的组合
        for (let i = 0; i < rownum; i++) {
            //ii为数组index
            for (let ii = table.length; ii > -1; ii--) {
                if (table[ii] !== undefined) {
                    if (tableGroup[i] === undefined) {
                        tableGroup[i] = []
                    }
                    const value: Array<string> = columns[ii][valuename]
                    const key: string = columns[ii][keyname]
                    const id: string = columns[ii].id
                    if (table[ii] >= value.length) {
                        table[ii] = 0
                        const getnexttable = (index: any) => {
                            if (index <= table.length) {
                                if (table[index - 1] !== undefined) {
                                    table[index - 1] = table[index - 1] + 1
                                } else {
                                    getnexttable(index - 1)
                                }
                            }
                        }
                        getnexttable(ii)
                    }
                    const add = {}
                    add[id] = {
                        name: key,
                        val: value[table[ii]]
                    };
                    tableGroup[i] = {
                        ...tableGroup[i],
                        ...add
                    }
                }
            }
            table[table.length - 1] = table[table.length - 1] + 1
        }
        /**
         [
         {'key':'val','key':'val'}
         {'key':'val','key':'val'}
         ]
         */
        return tableGroup;
    }

    /**
     * 升序-构建所有组合
     * @private
     */
    public _DescartesListAse(columns: Array<any>, keyname: string, valuename: string): Array<{ [x: string]: any }> {
        if (!Array.isArray(columns) || (Array.isArray(columns) && columns.length < 1)) {
            return []
        }
        let rownum = 1
        /**
         * [0,0,0]
         */
        const table: Array<number> = []
        columns.forEach((k, i, a) => {
            if (k.value.length > 0) {
                rownum = rownum * k.value.length
                table[i] = 0
            }
        })
        const tableGroup: Array<any> = []
        //i为总共的组合
        for (let i = 0; i < rownum; i++) {
            //ii为数组index
            for (let ii = 0; ii < table.length; ii++) {
                if (table[ii] !== undefined) {
                    if (tableGroup[i] === undefined) {
                        tableGroup[i] = []
                    }
                    const value: Array<string> = columns[ii][valuename]
                    const key: string = columns[ii][keyname]
                    const id: string = columns[ii].id
                    if (table[ii] >= value.length) {
                        table[ii] = 0
                        const getnexttable = (index: any) => {
                            if (index <= table.length) {
                                if (table[index + 1] !== undefined) {
                                    table[index + 1] = table[index + 1] + 1
                                } else {
                                    getnexttable(index + 1)
                                }
                            }
                        }
                        getnexttable(ii)
                    }
                    const add = {}
                    add[id] = {
                        name: key,
                        val: value[table[ii]]
                    };
                    tableGroup[i] = {
                        ...tableGroup[i],
                        ...add
                    }
                    //
                }
            }
            table[0] = table[0] + 1
        }
        return tableGroup;
    }


    public render() {
        const {data} = this.state
        const {onChange} = this.props
        return (
            <Grid style={{padding: 10, paddingBottom: 0}} fluid={true}>
                <Button onClick={() => {
                    const descartesListDesc1 = this._DescartesListDesc(data, 'name', 'value');
                    onChange?.(descartesListDesc1);
                }}>构建1</Button>
                <Button onClick={() => {
                    const descartesListDesc2 = this._DescartesListAse(data, 'name', 'value');
                    onChange?.(descartesListDesc2);
                }}>构建2</Button>
                <Table
                    loading={false}
                    wordWrap={true}
                    /*height={250}*/
                    rowHeight={95}
                    headerHeight={65}
                    autoHeight={true}
                    bordered={true}
                    cellBordered={false}
                    data={data}
                >
                    {
                        this.Columns.map((k: any, i, a) => (
                            <Column align={k.align} width={k.width} flexGrow={k.flexGrow}
                                    colSpan={k.colSpan}
                                    verticalAlign={'middle'} fixed={k.fixed} resizable={k.resizable}>
                                {k.HeaderCell}
                                {k.Cell}
                            </Column>
                        ))
                    }
                </Table>
            </Grid>
        )
    }


}



