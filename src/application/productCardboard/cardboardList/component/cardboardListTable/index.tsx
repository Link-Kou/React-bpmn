import * as React from 'react';
import {Button, ButtonToolbar, Table} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {CellExpandedIndex, HeaderCellMulti} from '@component/table';
import TextSpan from '@component/textSpan';
import {RouterHistory} from '../../../../../router/routerBase';
import './index.scss'
import {IReturnCardboardProduct} from '../../../index.types';
import {HooKRowExpanded} from './compose/hookRowExpanded';
import {HooKCarousel} from './compose/hookCarousel';
import {HookCarousel} from './compose/hookListTable';

const {Column, HeaderCell, Cell, Pagination} = Table;

interface IProps {
    onLoadTableData(props: {
        activePage: number,
        displayLength: number
    }, callback: (data: Array<IReturnCardboardProduct>, total: number) => void): void
}

const rowHeight = 125

export default class CardboardListTable extends React.Component<IProps> {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: (props: any) => <CellExpandedIndex dataKey="id" {...props} onExpanded={this._onExpanded}
                                                     rowHeight={rowHeight}/>,
            width: 95,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>图片<br/>960x520</HeaderCell>,
            Cell: <HooKCarousel dataKey="images" rowHeight={rowHeight}/>,
            width: 350,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>名称组合<br/>商品名称(瓦楞名称)用料名称</HeaderCell>,
            Cell: <Cell dataKey="describe" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {rowData?.name}<b>{rowData?.corrugatedName}</b>{rowData?.materialsName}
                    </TextSpan>
                )}
            </Cell>,
            width: 185,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>楞型</HeaderCell>,
            Cell: <Cell dataKey="corrugatedName" style={{height: rowHeight}}/>,
            width: 80,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>层数</HeaderCell>,
            Cell: <Cell dataKey="layerNum" style={{height: rowHeight}}/>,
            width: 80,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>参数</HeaderCell>,
            Cell: <HookCarousel dataKey="describe" rowHeight={rowHeight}/>,
            width: 300,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell className="app-header-cell-group">
                <HeaderCellMulti head={{
                    title: '价格',
                    children: [['市场价', '成本/成本加价']]
                }}/>
            </HeaderCell>,
            Cell: <Cell dataKey="marketPrice" style={{height: rowHeight}}/>,
            colSpan: 2,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="costPriceMarkup" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {rowData?.costPrice}<sup style={{color: '#008eff'}}>(+{rowData?.costPriceMarkup})</sup>
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>创建时间</HeaderCell>,
            Cell: <Cell dataKey="createtime" style={{height: rowHeight}}/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>更新时间</HeaderCell>,
            Cell: <Cell dataKey="updatedtime" style={{height: rowHeight}}/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>管理</HeaderCell>,
            Cell: <Cell dataKey="control" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <>
                        <ButtonToolbar>
                            <Button appearance="ghost" onClick={() => RouterHistory.push({
                                pathname: '/index/cardboardAdd',
                                search: `id=${rowData?.id}`,
                                state: {
                                    id: rowData?.id
                                }
                            })}>编辑</Button>
                        </ButtonToolbar>
                    </>
                )}
            </Cell>,
            width: 155,
            fixed: 'right',
            resizable: false
        }
    ]

    public state = {
        data: [],
        total: 0,
        loading: true,
        pages: {
            activePage: 1,
            displayLength: 10
        },
        expandedRowKeys: []
    }

    componentDidMount(): void {
        this._onLoadTableData()
    }

    private _onLoadTableData = () => {
        const {onLoadTableData} = this.props
        const {pages} = this.state
        onLoadTableData?.({
            activePage: pages.activePage,
            displayLength: pages.displayLength
        }, (data: Array<IReturnCardboardProduct>, total: number) => {
            this.setState({
                data,
                total,
                loading: false
            })
        })
    }

    private _onExpanded = (rowData: any, dataKey: any) => {
        const {expandedRowKeys} = this.state;
        let open = false;
        const nextExpandedRowKeys = [];
        expandedRowKeys.forEach(key => {
            if (key === rowData[dataKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });
        if (!open) {
            nextExpandedRowKeys.push(rowData[dataKey]);
        }
        this.setState({
            expandedRowKeys: nextExpandedRowKeys
        });
    }

    private _onChangePage = (page: number) => {
        const {pages} = this.state
        this.setState({
            loading: true,
            pages: {
                ...pages,
                activePage: page
            }
        }, () => {
            this._onLoadTableData()
        })
    }

    private _onChangePageLength = (size: number) => {
        const {pages} = this.state
        this.setState({
            loading: true,
            pages: {
                ...pages,
                displayLength: size
            }
        }, () => {
            this._onLoadTableData()
        })
    }

    public render() {
        const {data, pages, total, expandedRowKeys, loading} = this.state
        return (
            <>
                <FlexCalcBox Body={(h, w) => (
                    <>
                        <Table
                            loading={loading}
                            height={h - 65}
                            rowHeight={rowHeight}
                            headerHeight={85}
                            autoHeight={false}
                            bordered={true}
                            cellBordered={true}
                            rowKey={'id'}
                            expandedRowKeys={expandedRowKeys}
                            rowExpandedHeight={350}
                            renderRowExpanded={(rowData: IReturnCardboardProduct) => <HooKRowExpanded w={w}
                                                                                                      rowData={rowData}/>}
                            data={data}
                        >
                            {
                                this.Columns.map((k: any, i, a) => (
                                    <Column width={k.width} align="center" flexGrow={k.flexGrow} colSpan={k.colSpan}
                                            verticalAlign={'middle'} fixed={k.fixed} resizable={k.resizable}>
                                        {k.HeaderCell}
                                        {typeof k.Cell === 'function' ? k.Cell({expandedRowKeys}) : k.Cell}
                                    </Column>
                                ))
                            }
                        </Table>
                        <Pagination
                            activePage={pages.activePage}
                            displayLength={pages.displayLength}
                            total={total}
                            onChangeLength={this._onChangePageLength}
                            onChangePage={this._onChangePage}
                            lengthMenu={[{value: 10, label: 10}, {value: 20, label: 20}]}
                        />
                    </>

                )}/>
            </>
        )
    }
}
