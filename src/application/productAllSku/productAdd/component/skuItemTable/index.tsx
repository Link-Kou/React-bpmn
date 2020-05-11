import * as React from 'react';
import {Grid, Icon, IconButton, Table} from 'rsuite';
import {HeaderCellMulti, CellAddReduce, CellSortUpDown, CellIndex} from '@component/table';
import nanoid from 'nanoid';
import {HookCellButtonToolbar} from './compone/hookCellButtonToolbar';
import {HookCellInputPicker} from './compone/hookCellInputPicker';
import {HookCellTagPicker} from './compone/hookCellTagPicker';
import {IFormValue, ISku} from '../../../index.types';

const {Column, HeaderCell} = Table;


interface IProps {

    formValue: IFormValue

    onChange?(data: Array<ISku>, skuData: Array<{ [x: string]: any }>): void
}


interface IState {
    data: Array<ISku>,
    /**
     * 显示方式
     */
    descartes?: 'asc' | 'desc'
    /**
     * 规格重复
     */
    specRepeat?: boolean
}

/**
 * 商品规格
 */
export default class ProductSku extends React.Component<IProps> {


    public state: IState = {
        data: [...this.props.formValue.sku],
        descartes: 'asc',
        specRepeat: true
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
            width: 85,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <HookCellInputPicker onDatas={this._getDatas.bind(this)}
                                       onSpecRepeat={this._getSpecRepeat.bind(this)}
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
            HeaderCell: <HeaderCell style={{textAlign: 'center'}}>规格值 (可使用键盘"回车键"快速添加规格值）</HeaderCell>,
            Cell: <HookCellTagPicker valueKey={'value'}
                                     dataKey={'value'}
                                     imageKey={'image'}
                                     onSpecRepeat={this._getSpecRepeat.bind(this)}
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
            Cell: <CellIndex dataKey="image" onSelectChange={this._onImageSelectChange.bind(this)}/>,
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

    private _getDatas() {
        return this.state.data
    }

    private _getSpecRepeat(): boolean {
        return this.state.specRepeat ?? true
    }

    private _onImageSelectChange(rowIndex: number, checked: boolean) {
        const {data} = this.state
        const map = data.map((k, i, a) => {
            if (i === rowIndex) {
                k.image = checked
            } else {
                k.image = false
            }
            return k
        });
        this.setState({
            data: map
        }, () => {
            this._onBuild()
        })
    }

    private _onAddRow(rowData: any, rowIndex: number) {
        const {data} = this.state
        data.splice(rowIndex + 1, 0, {
            id: nanoid(),
            name: '',
            image: false,
            value: []
        })
        this.setState({
            data
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
        const {data, descartes} = this.state
        const {onChange} = this.props
        const _Descartes = {
            asc: this._DescartesListAse(data, 'name', 'value'),
            desc: this._DescartesListDesc(data, 'name', 'value')
        }
        const descartesListDesc = _Descartes[descartes ?? 'asc'];
        onChange?.(data, descartesListDesc);
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
                    const image: string = columns[ii].image
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
                        image: image,
                        value: value[table[ii]]
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
        console.log(JSON.stringify(tableGroup, null, 2))
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
                    const image: string = columns[ii].image
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
                        image: image,
                        value: value[table[ii]]
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
        return (
            <Grid style={{padding: 10, paddingBottom: 0}} fluid={true}>
                <HookCellButtonToolbar
                    onChangeSpecRepeat={(value) => {
                        this.setState({
                            specRepeat: value
                        })
                    }}
                    onChangeDisplay={(value) => {
                        this.setState({
                            descartes: value
                        }, () => this._onBuild())
                    }}/>
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
                    renderEmpty={(info) => (
                        <div className={'rs-table-body-info'}>
                            <IconButton onClick={() => this._onAddRow(null, -1)} icon={<Icon icon="plus-square"/>}
                                        size="xs" appearance={'link'}>新增列表</IconButton>
                        </div>
                    )}
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



