import * as React from 'react';
import {Button, Dropdown, Table, Tag, TagGroup} from 'rsuite';
import {CellIndex} from '@component/table';
import {HeadPanel} from '@component/panel';
import FlexCalcBox from '@component/flexCalcBox';
import {IAdmin} from '../../index.types';

const {Column, HeaderCell, Cell, Pagination} = Table;

interface IProps {

    onRowClick?(rowData: IAdmin): void

    onToolSelect?(selectKey?: any): void

    onLoad?(pages?: { page: number, itemsPerPage: number }, callback?: (total: number, list: Array<IAdmin>) => void): void
}

/**
 *
 * @author lk
 * @date 2020/5/26 16:26
 * @version 1.0
 */
export default class UserAdminTable extends React.Component<IProps> {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: <CellIndex dataKey="index" disPlayNumber={true}/>,
            width: 65,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>用户名</HeaderCell>,
            Cell: <Cell dataKey="name"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>手机号码</HeaderCell>,
            Cell: <Cell dataKey="phone"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>电子邮箱</HeaderCell>,
            Cell: <Cell dataKey="email"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>备注</HeaderCell>,
            Cell: <Cell dataKey="remarks">
                {(rowData: any) => (
                    <TagGroup>
                        {
                            rowData['remarks']?.map((k: any, i: any, a: any) => <Tag color="blue">{k}</Tag>)
                        }
                    </TagGroup>
                )}
            </Cell>,
            width: 200,
            flexGrow: 1,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>角色</HeaderCell>,
            Cell: <Cell dataKey="roles">
                {(rowData: any) => (
                    <TagGroup>
                        {
                            rowData['roles']?.map((k: any, i: any, a: any) => <Tag color="cyan">{k}</Tag>)
                        }
                    </TagGroup>
                )}
            </Cell>,
            width: 200,
            flexGrow: 1,
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
                    <Button appearance="link">详情</Button>
                )}
            </Cell>,
            width: 90,
            fixed: false,
            resizable: false
        }
    ]

    public state = {
        total: 0,
        data: [],
        loading: true,
        selectKey: '',
        pages: {
            activePage: 1,
            displayLength: 10
        }
    }

    componentDidMount() {
        this._onLoad()
    }

    private _onModelSelect = (selectKey?: any) => {
        const {onToolSelect} = this.props
        onToolSelect?.(selectKey);
    }

    /**
     * 加载列表
     * @param pages
     * @private
     */
    private _onLoad = (pages?: { page: number, itemsPerPage: number }) => {
        const {onLoad} = this.props
        onLoad?.(pages, (total: number, list: Array<IAdmin>) => {
            this.setState({
                loading: false,
                data: list
            })
        })
    }

    public render() {
        const {data, pages, total, loading} = this.state
        const {onRowClick} = this.props
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'运营用户列表'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'用户管理'} trigger="click" onSelect={this._onModelSelect}>
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
                            onRowClick={onRowClick}
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
