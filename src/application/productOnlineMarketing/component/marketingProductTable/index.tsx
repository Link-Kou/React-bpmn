import * as React from 'react';
import {Button, ButtonToolbar, Dropdown, Table} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {CellIndex} from '@component/table';
import TextSpan from '@component/textSpan';
import HeadPanel from '@component/headPanel';
import './index.scss'

const {Column, HeaderCell, Cell} = Table;


export default class MarketingProductTable extends React.Component {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: <CellIndex dataKey="index"/>,
            width: 65,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>图片<br/>960x520</HeaderCell>,
            Cell: <Cell dataKey="image">
                {(rowData: any) => (
                    <img style={{objectFit: 'contain'}} height={'100%'} width={'100%'}
                         src={'https://via.placeholder.com/960x520.png/0000FF/808080?text=Image'} alt={''}/>
                )}
            </Cell>,
            flexGrow: 1,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>名称组合<br/>商品名称(辅助名称)用料名称</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        限时优惠大礼相送,及时XXXXXX
                    </TextSpan>
                )}
            </Cell>,
            width: 300,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>楞型</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        BE
                    </TextSpan>
                )}
            </Cell>,
            width: 50,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>印刷参数</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <table className={'app-cardboardListTable-table'}>
                        <tr>
                            <td>
                                版面设定
                            </td>
                            <td>
                                AA
                            </td>
                            <td>
                                面纸类型
                            </td>
                            <td>
                                牛皮纸
                            </td>
                        </tr>
                        <tr>
                            <td>
                                开槽模切
                            </td>
                            <td>
                                120
                            </td>
                            <td>
                                印刷面积
                            </td>
                            <td>
                                120
                            </td>
                        </tr>
                        <tr>
                            <td>
                                数码表处理
                            </td>
                            <td>
                                120
                            </td>
                        </tr>
                    </table>
                )}
            </Cell>,
            width: 300,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>成本价</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        10<sup style={{color: '#008eff'}}>(+3)</sup>
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>管理</HeaderCell>,
            Cell: <Cell dataKey="url">
                {(rowData: any) => (
                    <ButtonToolbar>
                        <Button appearance="ghost">上架</Button>
                        <Button appearance="ghost">下架</Button>
                    </ButtonToolbar>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        }
    ]

    public render() {
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'产品列表'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'产品管理'} trigger="click" onSelect={(e) => {

                        }}>
                            <Dropdown.Item>新增产品</Dropdown.Item>
                            <Dropdown.Item>分类排序</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <FlexCalcBox subHeight={125} Body={(e) => (
                    <Table
                        loading={false}
                        height={e}
                        rowHeight={155}
                        headerHeight={65}
                        autoHeight={false}
                        bordered={true}
                        cellBordered={true}
                        data={[
                            {
                                index: '1'
                            }, {
                                index: '2'
                            }
                        ]}
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
                )}/>
            </>
        )
    }
}
