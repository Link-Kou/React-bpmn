import * as React from 'react';
import {ButtonToolbar, Table, IconButton, Icon, Whisper, Tooltip} from 'rsuite';
import FlexCalcBox from '../../../../../component/flexCalcBox';
import {CellExpandedIndex} from '@component/table';
import {HooKRowExpanded} from './compose/hookRowExpanded';
import {IReturnMaterialProductList} from '../../../index.types';
import {ImageCardView} from '@component/imageManager';
import {RouterHistory} from '../../../../../router/routerBase';

interface IProps {
    onLoadTableData(props: {
        activePage: number,
        displayLength: number
    }, callback: (data: Array<IReturnMaterialProductList>, total: number) => void): void
}

const {Column, HeaderCell, Cell, Pagination} = Table;

const rowHeight = 125

export default class Index extends React.Component<IProps> {


    public Columns = [
        {
            HeaderCell: <HeaderCell>序号</HeaderCell>,
            Cell: (props: any) => <CellExpandedIndex dataKey="id" {...props} onExpanded={this._onExpanded}
                                                     rowHeight={rowHeight}/>,
            width: 95,
            fixed: 'left',
            resizable: true
        },
        {
            HeaderCell: <HeaderCell>SKU</HeaderCell>,
            Cell: <Cell dataKey="control" style={{height: rowHeight}}>
                {(rowData: any) => (
                    <>
                        <ButtonToolbar>
                            <IconButton icon={<Icon icon="braille"/>} color="blue" circle={true}/>
                        </ButtonToolbar>
                    </>
                )}
            </Cell>,
            width: 155,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>商品图片</HeaderCell>,
            Cell: <Cell dataKey="images" style={{height: rowHeight}}>
                {(rowData: any) => (
                    rowData?.images?.filter((k: any, i: any, a: any) => k.type === 1).map((k: any, i: any, a: any) => (
                        <ImageCardView
                            fileUrl={k.url}/>
                    ))
                )}
            </Cell>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>商品标题</HeaderCell>,
            Cell: <Cell dataKey="name" style={{height: rowHeight}}/>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>商品描述</HeaderCell>,
            Cell: <Cell dataKey="subname" style={{height: rowHeight}}/>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>商品单位</HeaderCell>,
            Cell: <Cell dataKey="productUnit" style={{height: rowHeight}}/>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>商品编码</HeaderCell>,
            Cell: <Cell dataKey="productCode" style={{height: rowHeight}}/>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>价格显示方式</HeaderCell>,
            Cell: <Cell dataKey="priceMode" style={{height: rowHeight}}/>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>销售模式</HeaderCell>,
            Cell: <Cell dataKey="salesModel" style={{height: rowHeight}}/>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>市场价</HeaderCell>,
            Cell: <Cell dataKey="marketPrice" style={{height: rowHeight}}/>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>优惠价</HeaderCell>,
            Cell: <Cell dataKey="marketPrice" style={{height: rowHeight}}/>,
            width: 150,
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
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>编辑</Tooltip>}>
                                <IconButton icon={<Icon icon="edit"/>} color="cyan" circle={true}
                                            onClick={() => RouterHistory.push({
                                                pathname: '/index/productAllSkuAdd',
                                                search: `id=${rowData?.id}`,
                                                state: {
                                                    id: rowData?.id
                                                }
                                            })}/>
                            </Whisper>
                            <IconButton icon={<Icon icon="trash-o"/>} color="cyan" circle={true}/>
                            <IconButton icon={<Icon icon="copy"/>} color="cyan" circle={true}/>
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
        loading: true,
        data: [{
            id: 'xxx',
            url: 'sdad'
        }],
        expandedRowKeys: []
    }

    public componentDidMount(): void {
        const {onLoadTableData} = this.props
        onLoadTableData?.({
            activePage: 1,
            displayLength: 10
        }, (data, total) => {
            this.setState({
                data,
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

    public render() {
        const {expandedRowKeys, data, loading} = this.state
        return (
            <FlexCalcBox Body={(h, w) => (
                <>
                    <Table
                        loading={loading}
                        height={h - 65}
                        headerHeight={85}
                        autoHeight={false}
                        rowHeight={rowHeight}
                        bordered={true}
                        cellBordered={true}
                        rowKey={'id'}
                        expandedRowKeys={expandedRowKeys}
                        rowExpandedHeight={700}
                        renderRowExpanded={(rowData: IReturnMaterialProductList) => <HooKRowExpanded w={w}
                                                                                                     rowData={rowData}/>}
                        data={data}
                    >
                        {
                            this.Columns.map((k: any, i, a) => (
                                <Column width={k.width} align="center" verticalAlign={'middle'} fixed={k.fixed}
                                        resizable={k.resizable}>
                                    {k.HeaderCell}
                                    {typeof k.Cell === 'function' ? k.Cell({expandedRowKeys}) : k.Cell}
                                </Column>
                            ))
                        }
                    </Table>
                    <Pagination
                        lengthMenu={[
                            {
                                value: 10,
                                label: 10
                            },
                            {
                                value: 20,
                                label: 20
                            }
                        ]}
                    />
                </>
            )}/>
        )
    }
}
