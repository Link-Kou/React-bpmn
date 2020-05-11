import * as React from 'react';
import {Grid, Input, Panel, Table} from 'rsuite';
import ProductSpecificationItem from './item';
import {CellAddReduce, CellSortUpDown} from '@component/table';
import {utilsObject} from '@utils/index';
import nanoid from 'nanoid';
import {IProductSpecification} from '../../../../index.types';

const {Column, HeaderCell, Cell} = Table;


interface IProps {

    rowdatas?: Array<IProductSpecification>,

    onChange?(value?: Array<IProductSpecification>): void

}

interface IState {
    height: number
}


/**
 * 商品规格
 */
export default class ProductSpecificationGroup extends React.Component<IProps> {


    public Columns = [
        {
            HeaderCell: <HeaderCell className="app-header-cell-group">
                <div className="app-header-cell-group-title">
                    <span>规格名称</span>
                </div>
            </HeaderCell>,
            Cell: <CellAddReduce dataKey="id" style={{backgroundColor: 'rgba(251,251,251,0.83)'}}
                                 addrow={this._addRow.bind(this)} delRow={this._delRow.bind(this)}/>,
            colSpan: 2,
            width: 65,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="key" style={{backgroundColor: 'rgba(251,251,251,0.83)'}}>
                {(rowData: any) => (
                    <Input value={rowData.key}
                           style={{width: '100%'}}
                           onChange={(e) => {
                               rowData.key = e
                               this._buildData()
                           }}/>
                )}
            </Cell>,
            width: 125,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>规格值</HeaderCell>,
            Cell: <Cell dataKey="value" style={{backgroundColor: 'rgba(251,251,251,0.83)'}}>
                {(rowData: any, rowIndex: number) => (
                    <ProductSpecificationItem
                        rowdatas={rowData.value}
                        rowindexs={rowIndex}
                        onChange={this._onProductSpecifiChange.bind(this)}
                    />
                )}
            </Cell>,
            flexGrow: 1,
            width: 350,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>顺序</HeaderCell>,
            Cell: <CellSortUpDown dataKey="order" maxRow={this._getMax.bind(this)} sortRow={this._sortRow.bind(this)}/>,
            width: 75,
            fixed: false,
            resizable: false
        }
    ]

    public state: IState = {
        height: 0
    }

    private _Height = 0


    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.state.height !== this._Height) {
            this.setState({
                height: this._Height
            }, () => {
                this._Height = 0
            })
        }
    }

    private _buildData() {
        const {rowdatas, onChange} = this.props
        onChange?.(rowdatas)
    }

    private _onProductSpecifiChange(rowindexs: number, value: Array<{ id: string, key: string, value: string, order: number }>) {
        const {rowdatas, onChange} = this.props
        if (rowdatas) {
            rowdatas[rowindexs].value = value
            onChange?.(rowdatas)
        }
    }

    private _getMax() {
        return this.props?.rowdatas?.length ?? 0
    }

    /**
     * 添加行
     * @private
     */
    public _addRow(rowData: any, rowIndex: number) {
        const {rowdatas, onChange} = this.props
        rowdatas?.splice(rowIndex + 1, 0, {
            id: nanoid(),
            key: '',
            value: [{
                id: nanoid()
            }],
            order: rowIndex + 1
        })
        onChange?.(rowdatas)
    }

    /**
     * 删除行
     * @private
     */
    public _delRow(rowData: any, rowIndex: number) {
        const {rowdatas, onChange} = this.props
        rowdatas?.splice(rowIndex, 1)
        onChange?.(rowdatas)
    }

    /**
     * 排序
     * @private
     */
    public _sortRow(rowIndex: number, upOrDown: number) {
        const {rowdatas, onChange} = this.props
        const datum1 = rowdatas?.[rowIndex];
        const datum2 = rowdatas?.[rowIndex + upOrDown];
        if (datum1 && datum2) {
            if (upOrDown < 0) {
                rowdatas?.splice(rowIndex - 1, 2, datum1, datum2)
            } else {
                rowdatas?.splice(rowIndex, 2, datum2, datum1)
            }
            onChange?.(rowdatas)
        }
    }

    public render() {
        const {height} = this.state
        const {rowdatas} = this.props
        return (
            <Panel header={'规格与包装'} bordered={false} bodyFill={false}>
                <Grid style={{padding: 10}} fluid={true}>
                    <div style={{height: height, overflow: 'hidden'}}>
                        <Table
                            loading={false}
                            headerHeight={65}
                            wordWrap={false}
                            //height={650}
                            autoHeight={true}
                            hover={false}
                            bordered={true}
                            cellBordered={false}
                            data={rowdatas}
                            rowHeight={(rowData: any) => {
                                if (utilsObject.isNotEmpty(rowData)) {
                                    const length = rowData?.value?.length ?? 0
                                    const heightitem = 65 + 65 + length * 85 + 20
                                    this._Height += heightitem
                                    return heightitem
                                }
                                this._Height += 75
                                return 75
                            }}
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
                    </div>
                </Grid>
            </Panel>
        )
    }

}
