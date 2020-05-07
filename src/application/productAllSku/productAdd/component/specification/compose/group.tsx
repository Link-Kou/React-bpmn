import * as React from 'react';
import {Grid, Input, Panel, Table} from 'rsuite';
import ProductSpecificationItem from './item';
import {CellAddReduce, CellSortUpDown} from '@component/table';
import {utilsObject} from '@utils/index';

const {Column, HeaderCell, Cell} = Table;


interface IProps {
    dataKeyList?: Array<any>
}

interface IState {
    tabledata: Array<{
        id: string
        key: string
        value: Array<{
            id: string,
            key: string,
            value: string,
            order: number
        }>
    }>
}

/**
 * 商品规格
 */
export default class ProductSpecificationGroup extends React.Component<IProps> {


    public state: IState = {
        tabledata: [
            {
                id: '1',
                key: '1',
                value: [{
                    id: '',
                    key: '',
                    value: '',
                    order: 0
                }, {
                    id: '',
                    key: '',
                    value: '',
                    order: 0
                }, {
                    id: '',
                    key: '',
                    value: '',
                    order: 0
                }, {
                    id: '',
                    key: '',
                    value: '',
                    order: 0
                }]
            },
            {
                id: '2',
                key: '2',
                value: [{
                    id: '',
                    key: '',
                    value: '',
                    order: 0
                }]
            }
        ]
    }

    public Columns = [
        {
            HeaderCell: <HeaderCell className="app-header-cell-group">
                <div className="app-header-cell-group-title">
                    <span>规格名称</span>
                </div>
            </HeaderCell>,
            Cell: <CellAddReduce dataKey="id" style={{backgroundColor: 'rgba(251,251,251,0.83)'}}/>,
            colSpan: 2,
            width: 65,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="key" style={{backgroundColor: 'rgba(251,251,251,0.83)'}}>
                {(rowData: any) => (
                    <Input defaultValue={rowData.key}
                           style={{width: '100%'}}
                           onChange={(e) => {
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
        /*{
            HeaderCell: <HeaderCell>规格值</HeaderCell>,
            Cell: <Cell dataKey="valuess" style={{backgroundColor: 'rgba(251,251,251,0.83)'}}>
                {(rowData: any, rowIndex: number) => (
                    <div style={{height: 400, backgroundColor: 'red'}}>

                    </div>
                )}
            </Cell>,
            flexGrow: 1,
            width: 350,
            fixed: false,
            resizable: false
        },*/
        {
            HeaderCell: <HeaderCell>顺序</HeaderCell>,
            Cell: <CellSortUpDown dataKey="id" maxRow={() => 10}
                                  style={{padding: 0, backgroundColor: 'rgba(251,251,251,0.83)'}}/>,
            width: 65,
            fixed: false,
            resizable: false
        }
    ]


    private _onProductSpecifiChange(rowindexs: number, value: Array<{ id: string, key: string, value: string, order: number }>) {
        const {tabledata} = this.state
        tabledata[rowindexs].value = value
        this.setState({
            tabledata
        })
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        //TODO Table row 有计算BUG
    }

    public render() {
        return (
            <Panel header={'规格与包装'} bordered={false} bodyFill={false}>
                <Grid style={{padding: 10}} fluid={true}>
                    <Table
                        loading={false}
                        headerHeight={65}
                        wordWrap={false}
                        //height={650}
                        autoHeight={true}
                        hover={false}
                        bordered={true}
                        cellBordered={false}
                        data={this.state.tabledata}
                        rowHeight={(rowData: any) => {
                            if (utilsObject.isNotEmpty(rowData)) {
                                const length = rowData?.value?.length ?? 0
                                return 155 + length * 65
                            }
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
                </Grid>
            </Panel>
        )
    }

}
