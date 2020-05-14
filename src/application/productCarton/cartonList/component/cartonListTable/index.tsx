import * as React from 'react';
import {Button, Dropdown, Table} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import TextSpan from '@component/textSpan';
import './index.scss'
import {HeaderCellMulti,CellExpandedIndex} from '@component/table';
import {IEnum, IReturnCartonProduct} from '../../../index.types';
import {HooKCarousel} from './compose/hookCarousel';
import {HookPrinting} from './compose/hookPrinting';
import {HooKRowExpanded} from './compose/hookRowExpanded';
import { HeadPanel } from '@component/panel';
import {RouterHistory, RouterPath} from '@router';

const {Column, HeaderCell, Cell, Pagination} = Table;

interface IProps {
    onLoadTableData?(props: {
        activePage: number,
        displayLength: number
    }, callback: (data: Array<IReturnCartonProduct>, total: number) => void): void
}

const rowHeight = 125

export default class CartonListTable extends React.Component<IProps> {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: (props: any) => <CellExpandedIndex dataKey="id" {...props} onExpanded={this._onExpanded}
                                                     rowHeight={rowHeight}/>,
            width: 65,
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
            HeaderCell: <HeaderCell>名称组合<br/>商品名称(辅助名称)</HeaderCell>,
            Cell: <Cell dataKey="name" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {rowData?.name}<sup>{rowData?.subname}</sup>
                    </TextSpan>
                )}
            </Cell>,
            width: 300,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>箱型</HeaderCell>,
            Cell: <Cell dataKey="boxType" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {IEnum.BoxType(rowData?.boxType)}
                    </TextSpan>
                )}
            </Cell>,
            width: 75,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell className="app-header-cell-group">
                <HeaderCellMulti head={{
                    title: '尺寸信息/成型成箱',
                    children: [['尺寸类型', '长×宽×高', '成型方式', '成箱方式']]
                }}/>
            </HeaderCell>,
            Cell: <Cell dataKey="sizeType" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {IEnum.SizeType(rowData?.sizeType)}
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            colSpan: 4,
            fixed: false,
            resizable: false
        }, {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="length" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {`${rowData?.length}×${rowData?.width}×${rowData?.height}`}
                    </TextSpan>
                )}

            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="molding" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {IEnum.Molding(rowData?.molding)}
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        }, {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="moldBox" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <TextSpan>
                        {IEnum.Molding(rowData?.moldBox)}
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>印刷参数</HeaderCell>,
            Cell: <HookPrinting dataKey="printingType" rowHeight={rowHeight}/>,
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
            Cell: <Cell dataKey="costPrice" style={{height: rowHeight}}>
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
            Cell: <Cell dataKey="url" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <Button appearance="ghost" onClick={() => RouterHistory.push({
                        pathname: RouterPath.CartonAdd,
                        search: `id=${rowData?.id}`,
                        state: {
                            id: rowData?.id
                        }
                    })}>编辑</Button>
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

    componentDidMount() {
        this._onLoadTableData()
    }

    /**
     * 加载表格数据
     * @private
     */
    private _onLoadTableData = () => {
        const {onLoadTableData} = this.props
        const {pages} = this.state
        onLoadTableData?.({
            activePage: pages.activePage,
            displayLength: pages.displayLength
        }, (data: Array<IReturnCartonProduct>, total: number) => {
            this.setState({
                data,
                total,
                loading: false
            })
        });
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
            //this._onLoadTableData()
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
            //this._onLoadTableData()
        })
    }


    public render() {
        const {data, pages, total, loading, expandedRowKeys} = this.state
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'纸箱产品列表'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'产品管理'} trigger="click" onSelect={(e) => {
                            RouterHistory.push(RouterPath.CartonAdd)
                        }}>
                            <Dropdown.Item>新增产品</Dropdown.Item>
                            <Dropdown.Item>分类排序</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <FlexCalcBox Body={(h, w) => (
                    <>
                        <Table
                            loading={loading}
                            height={h - 65}
                            rowHeight={125}
                            headerHeight={85}
                            autoHeight={false}
                            bordered={true}
                            cellBordered={true}
                            rowKey={'id'}
                            expandedRowKeys={expandedRowKeys}
                            rowExpandedHeight={200}
                            renderRowExpanded={(rowData: IReturnCartonProduct) => <HooKRowExpanded w={w}
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
