import * as React from 'react';
import {Button, Dropdown, Table} from 'rsuite';
import {CellExpandedIndex} from '@component/table';
import {HeadPanel} from '@component/panel';
import FlexCalcBox from '@component/flexCalcBox';
import UserAdminEditModel from './../userAdminEdit/model';

const {Column, HeaderCell, Cell, Pagination} = Table;


/**
 *
 * @author lk
 * @date 2020/5/26 16:26
 * @version 1.0
 */
export default class UserAdminTable extends React.Component {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: (props: any) => <CellExpandedIndex {...props}
                                                     dataKey="id"/>,
            width: 65,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>用户名</HeaderCell>,
            Cell: <Cell dataKey="images"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>手机号码</HeaderCell>,
            Cell: <Cell dataKey="createtime"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>电子邮箱</HeaderCell>,
            Cell: <Cell dataKey="createtime"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>备注标签</HeaderCell>,
            Cell: <Cell dataKey="createtime"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>创建时间</HeaderCell>,
            Cell: <Cell dataKey="createtime"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>管理</HeaderCell>,
            Cell: <Cell dataKey="url">
                {(rowData: any) => (
                    <Button appearance="ghost">编辑</Button>
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
        selectKey: '',
        pages: {
            activePage: 1,
            displayLength: 10
        }
    }

    componentDidMount() {

    }


    public render() {
        const {data, pages, total, loading, selectKey} = this.state
        return (
            <>
                <UserAdminEditModel show={selectKey === 'addUser'}/>
                <HeadPanel hideBorderBottom={true} title={'运营用户列表'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'用户管理'} trigger="click" onSelect={(e) => {
                            this.setState({
                                selectKey: e
                            })
                        }}>
                            <Dropdown.Item eventKey={'addUser'}>新增用户</Dropdown.Item>
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
                            data={data}
                        >
                            {
                                this.Columns.map((k: any, i, a) => (
                                    <Column width={k.width} align="center" flexGrow={k.flexGrow} colSpan={k.colSpan}
                                            verticalAlign={'middle'} fixed={k.fixed} resizable={k.resizable}>
                                        {k.HeaderCell}
                                        {typeof k.Cell === 'function' ? k.Cell() : k.Cell}
                                    </Column>
                                ))
                            }
                        </Table>
                        <Pagination
                            activePage={pages.activePage}
                            displayLength={pages.displayLength}
                            total={total}
                            onChangeLength={() => {
                            }}
                            onChangePage={() => {
                            }}
                            lengthMenu={[{value: 10, label: 10}, {value: 20, label: 20}]}
                        />
                    </>
                )}/>
            </>
        )
    }
}
