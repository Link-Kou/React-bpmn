import * as React from 'react';
import {Button, Dropdown, Panel, Table, Tag} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {CellIndex, CellTextSpan} from '@component/table';
import {PaperAddEditModel} from '../index';
import {IArrayDatas, IFormValue} from '../../index.types';
import TextSpan from '@component/textSpan';
import {HeadPanel} from '@component/panel';

const {Column, HeaderCell, Cell, Pagination} = Table;

interface IPorps {
    valueKey?: string

    labelKey?: string

    onShowPaperAddEdit?(id?: string, callbackData?: (data: IFormValue, dataConfigList: Array<IArrayDatas>) => void): void

    onPaperAddSave?(data: IFormValue, callbackCloseLoading: () => void, reload: () => void): void

    onPaperEditSave?(id: string, data: IFormValue, callbackCloseLoading: () => void, reload: () => void): void

    onLoadTableData?(props: {
        activePage: number,
        displayLength: number
    }, callbackdata: (data: Array<IFormValue>, total: number) => void): void
}

export default class BasePaperTable extends React.Component<IPorps> {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: <CellIndex dataKey="index" disPlayNumber={true} onSelectChange={this._onSelectIndex.bind(this)}/>,
            width: 65,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>供应商</HeaderCell>,
            Cell: <CellTextSpan dataKey="supplier"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>原纸名称</HeaderCell>,
            Cell: <CellTextSpan dataKey="paperName"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>卷轴幅宽</HeaderCell>,
            Cell: <Cell dataKey="reelWidth"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>纸张等级</HeaderCell>,
            Cell: <Cell dataKey="level">
                {(rowData: any) => (
                    <TextSpan accepter={Tag} props={{color: 'green'}}>
                        {rowData?.level}
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>原纸类型</HeaderCell>,
            Cell: <Cell dataKey="type">
                {(rowData: any) => (
                    <TextSpan accepter={Tag} props={{color: 'green'}}>
                        {rowData?.type}
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>进价</HeaderCell>,
            Cell: <Cell dataKey="buyPrice"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>克重(定量)</HeaderCell>,
            Cell: <Cell dataKey="weight"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>平方价</HeaderCell>,
            Cell: <Cell dataKey="squarePrice"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>厚度</HeaderCell>,
            Cell: <Cell dataKey="thickness"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>紧度</HeaderCell>,
            Cell: <Cell dataKey="density"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>横向环压强度</HeaderCell>,
            Cell: <Cell dataKey="horizontalPower"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>纵向裂断长</HeaderCell>,
            Cell: <Cell dataKey="verticalPower"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>创建时间</HeaderCell>,
            Cell: <CellTextSpan dataKey="createtime"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>修改时间</HeaderCell>,
            Cell: <CellTextSpan dataKey="updatedtime"/>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>管理</HeaderCell>,
            Cell: <Cell dataKey="url">
                {(rowData: any) => (
                    <Button appearance="ghost" onClick={() => this._onSetId(rowData.id)}>编辑</Button>
                )}
            </Cell>,
            width: 155,
            fixed: 'right',
            resizable: false
        }
    ]

    public state = {
        showModel: '',
        loading: true,
        /**
         * 编辑的id
         */
        id: undefined,
        data: [],
        total: 0,
        pages: {
            activePage: 1,
            displayLength: 10
        }
    }

    public componentDidMount(): void {
        this._onLoadTableData()
    }

    /**
     * 模态窗
     * @param eventKey
     * @private
     */
    private _onModel = (eventKey: string = '') => {
        this.setState({
            showModel: eventKey,
            id: undefined
        })
    }

    /**
     * index 选择
     * @param rowIndex
     * @param rowData
     * @private
     */
    private _onSelectIndex(rowIndex: number, rowData: any) {
        const {data}: { data: Array<any> } = this.state
        data[rowIndex] = rowData;
        this.setState({
            data
        })
    }

    private _onSetId = (id: any) => {
        this.setState({
            id,
            showModel: 'add'
        })
    }

    private _onLoadTableData() {
        const {onLoadTableData} = this.props
        const {pages} = this.state
        const {activePage, displayLength} = pages
        this.setState({
            data: [],
            loading: true
        }, () => {
            onLoadTableData?.({
                activePage,
                displayLength
            }, (data, total) => {
                this.setState({
                    data,
                    total,
                    loading: false
                })
            })
        })
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

    private _onPaperEditSave = (id: string, data: IFormValue, callbackCloseLoading: () => void) => {
        const {onPaperEditSave} = this.props
        onPaperEditSave?.(id, data, callbackCloseLoading, () => {
            this._onLoadTableData()
        })
    }

    private _onPaperAddSave = (data: IFormValue, callbackCloseLoading: () => void) => {
        const {onPaperAddSave} = this.props
        onPaperAddSave?.(data, callbackCloseLoading, () => {
            this._onLoadTableData()
        })
    }


    public render() {
        const {showModel, id, loading, data, total, pages} = this.state
        const {onShowPaperAddEdit} = this.props
        return (
            <>
                <PaperAddEditModel {...this.props}
                                   id={id}
                                   show={showModel === 'add'}
                                   onShow={onShowPaperAddEdit}
                                   onEdit={this._onPaperEditSave}
                                   onAdd={this._onPaperAddSave}
                                   onClose={this._onModel}/>
                <Panel shaded={false} bodyFill={true} bordered={false}>
                    <HeadPanel hideBorderBottom={true} title={'原纸产品列表'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <Dropdown title={'原纸管理'} trigger="click" onSelect={this._onModel}>
                                <Dropdown.Item eventKey={'add'}>新增原纸</Dropdown.Item>
                                <Dropdown.Item eventKey={'del'}>删除原纸</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </HeadPanel>
                    <FlexCalcBox Body={(e) => (
                        <>
                            <Table
                                loading={loading}
                                height={e - 65}
                                rowHeight={155}
                                headerHeight={65}
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
                                            {k.Cell}
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

                </Panel>
            </>
        )
    }
}
