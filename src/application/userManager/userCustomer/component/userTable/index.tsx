import * as React from 'react';
import {Button, Dropdown, Icon, IconButton, Table} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {CellIndex, HeaderCellSort} from '@component/table';
import TextSpan from '@component/textSpan';
import {HeadPanel} from '@component/panel';

const {Column, HeaderCell, Cell, Pagination} = Table;

export default class UserTable extends React.Component {

    public state = {
        sortTime: false
    }

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: <CellIndex dataKey="index"/>,
            width: 65,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>手机号码</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        158*****122
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>用户名称</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        XXXXXX
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>认证用户</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        XXXXXX
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>认证状态</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        BE
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>账户状态</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        BE
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell><HeaderCellSort>创建时间</HeaderCellSort></HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        2019-19-19
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell><HeaderCellSort>修改时间</HeaderCellSort></HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        2019-19-19
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
                    <Button appearance="ghost">详情</Button>
                )}
            </Cell>,
            width: 85,
            flexGrow: false,
            fixed: 'right',
            resizable: false
        }
    ]


    public render() {
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'商城会员管理'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'用户管理'} trigger="click">
                            <Dropdown.Item eventKey={'addUser'}>新增用户</Dropdown.Item>
                        </Dropdown>
                        <Dropdown
                            placement="bottomEnd"
                            renderTitle={() => {
                                return <IconButton appearance={'subtle'}
                                                   icon={<Icon icon="refresh"/>}/>;
                            }}/>
                    </div>
                </HeadPanel>
                <FlexCalcBox Body={(h, w) => (
                    <>
                        <Table
                            loading={false}
                            height={h - 65}
                            rowHeight={70}
                            headerHeight={85}
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
                            activePage={1}
                            displayLength={10}
                            total={20}/>
                    </>
                )}/>

            </>
        )
    }
}
