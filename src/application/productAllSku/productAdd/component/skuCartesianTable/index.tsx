import * as React from 'react';
import {Grid, Panel, Table} from 'rsuite';
import {CellAddReduce, CellIndex} from '@component/table';
import {ImageUploaderLibraryGroup} from '@common/imageUploader';
import {HookCellInputNumber} from './compone/hookCellInputNumber';
import {utilsCrypto, utilsNumber} from '@utils/index';

const {Column, HeaderCell, Cell} = Table;

interface IProps {
    cellData: Array<{ [x: string]: { name: string, image?: boolean, value: { id: string, name: string, image: string | undefined } } }>
}

interface IState {
    dataTable: Array<{
        id?: string
        disable?: boolean | string,
        mainImage?: string,
        numberStarts?: number | string,
        numberStock?: number | string,
        marketPrice?: number | string,
        costPrice?: number | string
    }>
}

/**
 * 规格列表名称
 * @param props
 * @constructor
 */
export default class ProductSkuParts extends React.Component<IProps> {


    public Columns = [
        {
            HeaderCell: <HeaderCell>编辑</HeaderCell>,
            Cell: <CellAddReduce dataKey="disable" hide={'add'} delRow={this._onDelRow.bind(this)}/>,
            width: 65,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>禁用</HeaderCell>,
            Cell: <CellIndex dataKey="disable"/>,
            width: 95,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>主图</HeaderCell>,
            Cell: <Cell dataKey="mainImage">
                {(rowData: any) => (
                    <ImageUploaderLibraryGroup maxSize={1}
                                               isDragDisabled={true}
                                               fileUrl={rowData.mainImage ? [rowData.mainImage] : []}/>
                )}
            </Cell>,
            width: 150,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>起卖数量</HeaderCell>,
            Cell: <HookCellInputNumber dataKey="numberStarts" max={999999999} min={0} isInt={true}
                                       onSelectChange={this._onSelectChange.bind(this)}/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>库存量</HeaderCell>,
            Cell: <HookCellInputNumber dataKey="numberStock" max={999999999} min={0} isInt={true}
                                       onSelectChange={this._onSelectChange.bind(this)}/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>市场价</HeaderCell>,
            Cell: <HookCellInputNumber dataKey="marketPrice" max={999999999} min={0} step={0.5} isInt={true}
                                       onSelectChange={this._onSelectChange.bind(this)}/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>成本价</HeaderCell>,
            Cell: <HookCellInputNumber dataKey="costPrice" max={999999999} min={0} step={0.5} isInt={true}
                                       onSelectChange={this._onSelectChange.bind(this)}/>,
            width: 120,
            fixed: false,
            resizable: false
        }
    ]

    public state: IState = {
        dataTable: [
            /* {
                 disable: '',
                 mainImage: '',
                 numberStarts: '',
                 numberStock: '',
                 marketPrice: '',
                 costPrice: ''
             }*/
        ]
    }

    public componentDidMount(): void {

    }

    public _onSelectChange(rowIndex?: number, rowData?: any) {
        const {dataTable} = this.state
        if (utilsNumber.isNumber(rowIndex)) {
            dataTable[rowIndex as number] = rowData
        }
        this.setState({
            dataTable
        })
    }

    private _onDelRow(rowData: any, rowIndex: number) {
        const {dataTable} = this.state
        dataTable.splice(rowIndex, 1)
        this.setState({
            dataTable
        })
    }

    /**
     * 构建列
     * @private
     */
    private _buildColumns() {
        const {cellData} = this.props
        if (Array.isArray(cellData)) {
            const keys: Array<string> = Object.keys(cellData[0] ?? {});
            const map: any = keys?.map((k, i, a) => {
                return (
                    {
                        HeaderCell: <HeaderCell>{cellData[0]?.[k]?.name}</HeaderCell>,
                        Cell: <Cell dataKey={k}/>,
                        width: 120,
                        fixed: false,
                        resizable: true
                    }
                )
            });
            const newColumns = [...this.Columns]
            newColumns.splice(3, 0, ...map);
            return newColumns;
        }
        return []
    }

    /**
     * 构建行数据
     * @private
     */
    private _buildRow() {
        const {cellData} = this.props
        const {dataTable} = this.state
        const rowdata: Array<any> = []
        if (Array.isArray(cellData)) {
            cellData.forEach((k, i, a) => {
                const keys: Array<string> = Object.keys(k);
                const newdata = {}
                const newdata2 = {
                    mainImage: '',
                    id: ''
                }
                const id: Array<string> = []
                //kk 是列id
                keys.forEach((kk, ki, ka) => {
                    newdata[kk] = k[kk].value.name;
                    id.push(k[kk].value.id)
                    if (k[kk].image) {
                        newdata2.mainImage = k[kk].value.image ?? ''
                    }
                });
                newdata2.id = utilsCrypto.MD5(id.sort().join(''))
                const medata = {
                    id: '',
                    disable: '',
                    mainImage: '',
                    numberStarts: '',
                    numberStock: '',
                    marketPrice: '',
                    costPrice: '',
                    ...newdata,
                    ...newdata2
                }
                rowdata.push(medata)
            });
        }
        const newTableMap = rowdata?.map((k, i, a) => {
            const index = dataTable.findIndex((dk, di, da) => k.id === dk?.id);
            if (index > -1) {
                const dataTableElement = dataTable[index];
                if (dataTableElement) {
                    return (
                        {
                            ...k,
                            ...dataTableElement
                        }
                    )
                }
            } else {
                return k
            }
        }) ?? [];
        //合并行
        /*dataTable.map((k, i, a) => {
            rowdata[i] = {
                ...rowdata[i],
                ...k
            }
        })*/
        return newTableMap
    }

    public render() {
        const columns = this._buildColumns()
        const rowdata = this._buildRow()
        return (
            <Panel header={''} bordered={false} bodyFill={true}>
                <Grid style={{padding: 10}} fluid={true}>
                    <Table
                        loading={false}
                        affixHeader={true}
                        affixHorizontalScrollbar={true}
                        height={350}
                        //width={750}
                        rowHeight={150}
                        headerHeight={65}
                        autoHeight={true}
                        bordered={true}
                        cellBordered={true}
                        data={rowdata}>
                        {
                            columns.map((k: any, i: any, a: any) => (
                                <Column width={k.width} align="center" flexGrow={k.flexGrow} colSpan={k.colSpan}
                                        verticalAlign={'middle'} fixed={k.fixed} resizable={k.resizable}>
                                    {k.HeaderCell}
                                    {k.Cell}
                                </Column>
                            ))
                        }
                    </Table>
                </Grid>
            </Panel>

        )
    }
}
