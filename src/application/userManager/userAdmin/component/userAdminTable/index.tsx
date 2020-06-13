import * as React from 'react';
import {Dropdown, Icon, IconButton, Table} from 'rsuite';
import {CellIndex} from '@component/table';
import {HeadPanel} from '@component/panel';
import FlexCalcBox from '@component/flexCalcBox';
import {IAdmin} from '../../index.types';
import WhisperTitle from '@common/whisper';

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
            flexGrow: 1,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>电子邮箱</HeaderCell>,
            Cell: <Cell dataKey="email"/>,
            width: 180,
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
            HeaderCell: <HeaderCell>修改时间</HeaderCell>,
            Cell: <Cell dataKey="updatedtime"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>管理</HeaderCell>,
            Cell: <Cell dataKey="url">
                {(rowData: any) => (
                    <>
                        <WhisperTitle title={'详情'}>
                            <IconButton appearance="link" icon={<Icon icon="ellipsis-h"/>}
                                        onClick={() => this._onDetails(rowData)}/>
                        </WhisperTitle>
                    </>
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
        this._onLoad({
            page: 1,
            itemsPerPage: 10
        })
    }

    public onReLoad() {
        this._onLoad({
            page: 1,
            itemsPerPage: 10
        })
    }


    private _onModelSelect = (selectKey?: any) => {
        const {onToolSelect} = this.props
        onToolSelect?.(selectKey);
    }

    private _onDetails = (rowData: any) => {
        const {onRowClick} = this.props
        onRowClick?.(rowData);
    }

    /**
     * 加载列表
     * @param pages
     * @private
     */
    private _onLoad = (pages: { page: number, itemsPerPage: number }) => {
        const {onLoad} = this.props
        this.setState({
            loading: true
        }, () => {
            onLoad?.(pages, (total: number, list: Array<IAdmin>) => {
                this.setState({
                    loading: false,
                    data: list
                })
            })
        })
    }

    public render() {
        const {data, pages, total, loading} = this.state
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'运营用户列表'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'用户管理'} trigger="click" onSelect={this._onModelSelect}>
                            <Dropdown.Item eventKey={'addUser'}>新增用户</Dropdown.Item>
                        </Dropdown>
                        <Dropdown
                            placement="bottomEnd"
                            renderTitle={() => {
                                return <IconButton appearance={'subtle'}
                                                   onClick={this.onReLoad.bind(this)}
                                                   icon={<Icon icon="refresh"/>}/>;
                            }}/>
                    </div>
                </HeadPanel>
                <FlexCalcBox Body={(h, w) => (
                    <>
                        <Table
                            loading={loading}
                            wordWrap={false}
                            height={h - 65}
                            rowHeight={70}
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
