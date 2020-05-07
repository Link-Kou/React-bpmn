import * as React from 'react';
import {Button, Dropdown, Panel, Table, Tag} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {CellIndex, CellTextSpan} from '@component/table/cell';
import TextSpan from '@component/textSpan';
import HeadPanel from '@component/headPanel';
import BaseCorrugatedAddEdit from '../corrugatedAddEdit';
import {IFormValue, IArrayDatas, EnumsMakeMode} from '../../index.types';
import {HeaderCellMulti} from '@component/table';


const {Column, HeaderCell, Cell, Pagination} = Table;

interface IProps {

    onShowCorrugatedAddEdit?(id?: string, callbackData?: (data: IFormValue, dataConfigList: Array<IArrayDatas>, paperProductList: Array<IArrayDatas>) => void): void

    onCorrugatedAddSave?(data: IFormValue, callbackCloseLoading: () => void, reload: () => void): void

    onCorrugatedEditSave?(id: string, data: IFormValue, callbackCloseLoading: () => void, reload: () => void): void

    onLoadTableData?(props: {
        activePage: number,
        displayLength: number
    }, callbackdata: (data: Array<IFormValue>, total: number) => void): void

}

export default class BaseCorrugatedTable extends React.Component<IProps> {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: <CellIndex dataKey="index"/>,
            width: 105,
            fixed: true,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>名称</HeaderCell>,
            Cell: <Cell dataKey="name"/>,
            width: 125,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell className={'app-header-cell-group'}>
                <HeaderCellMulti head={{
                    title: '供应商/原纸',
                    children: [['供应商', '原纸']]
                }}/>
            </HeaderCell>,
            Cell: <CellTextSpan dataKey="supplier"/>,
            colSpan: 2,
            width: 135,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="basePaperName"/>,
            width: 135,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell className="app-header-cell-group">
                <HeaderCellMulti head={{
                    title: '成本价(元/平方米)'
                }}/>
            </HeaderCell>,
            Cell: <Cell dataKey="costPrice"/>,
            colSpan: 2,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell/>,
            Cell: <Cell dataKey="costPriceMarkup">
                {(rowData: any) => (
                    <TextSpan>
                        {rowData?.squarePrice}<sup style={{color: '#008eff'}}>(+{rowData?.costPriceMarkup})</sup>
                    </TextSpan>
                )}
            </Cell>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>瓦楞类型</HeaderCell>,
            Cell: <Cell dataKey="type"/>,
            width: 85,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>外协/内置</HeaderCell>,
            Cell: <Cell dataKey="makeMode">
                {(rowData: any) => (
                    <TextSpan accepter={Tag} props={{color: 'orange'}}>
                        {EnumsMakeMode(rowData?.makeMode)}
                    </TextSpan>
                )}
            </Cell>,
            width: 95,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>瓦楞系数</HeaderCell>,
            Cell: <Cell dataKey="coefficient"/>,
            width: 85,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>楞高</HeaderCell>,
            Cell: <Cell dataKey="height"/>,
            width: 85,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>楞数</HeaderCell>,
            Cell: <Cell dataKey="flute"/>,
            width: 85,
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
            width: 105,
            fixed: 'right',
            resizable: false
        }
    ]

    public state = {
        data: [],
        showModel: '',
        id: undefined,
        total: 0,
        loading: true,
        pages: {
            activePage: 1,
            displayLength: 10
        }
    }

    public componentDidMount(): void {
        this._onLoadTableData()
    }

    private _onModel = (eventKey: string = '') => {
        this.setState({
            showModel: eventKey,
            id: undefined
        })
    }

    private _onLoadTableData = () => {
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

    private _onSetId = (id: any) => {
        this.setState({
            id,
            showModel: 'add'
        })
    }

    /**
     * 添加
     * @param data
     * @param callbackCloseLoading
     * @private
     */
    private _onAdd = (data: IFormValue, callbackCloseLoading: () => void) => {
        const {onCorrugatedAddSave} = this.props
        onCorrugatedAddSave?.(data, callbackCloseLoading, () => {
            this._onLoadTableData()
        })
    }

    /**
     * 编辑
     * @param id
     * @param data
     * @param callbackCloseLoading
     * @private
     */
    private _onEdit = (id: string, data: IFormValue, callbackCloseLoading: () => void) => {
        const {onCorrugatedEditSave} = this.props
        onCorrugatedEditSave?.(id, data, callbackCloseLoading, () => {
            this._onLoadTableData()
        })
    }

    private _onShow = (id?: string, callbackData?: (data: IFormValue, dataConfigList: Array<IArrayDatas>, paperProductList: Array<IArrayDatas>) => void) => {
        const {onShowCorrugatedAddEdit} = this.props
        onShowCorrugatedAddEdit?.(id, callbackData)
    }

    public render() {
        const {showModel, total, pages, data, loading, id} = this.state
        return (
            <>
                <BaseCorrugatedAddEdit show={showModel === 'add'}
                                       id={id}
                                       onShow={this._onShow}
                                       onAdd={this._onAdd}
                                       onEdit={this._onEdit}
                                       onClose={this._onModel}/>
                <Panel shaded={false} bodyFill={true} bordered={false}>
                    <HeadPanel hideBorderBottom={true} title={'瓦楞产品列表'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <Dropdown title={'瓦楞管理'} trigger="click" onSelect={this._onModel}>
                                <Dropdown.Item eventKey={'add'}>新增瓦楞</Dropdown.Item>
                                <Dropdown.Item eventKey={'del'}>删除瓦楞</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </HeadPanel>
                    <FlexCalcBox Body={(e) => (
                        <>
                            <Table
                                loading={loading}
                                height={e - 65}
                                rowHeight={155}
                                headerHeight={95}
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
