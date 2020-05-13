import * as React from 'react';
import {Grid, Panel, Table} from 'rsuite';
import {CellIndex} from '@component/table';
import {ImageUploaderLibraryGroup} from '@common/imageUploader';
import {HookCellInputNumber} from './compone/hookCellInputNumber';
import {utilsCrypto, utilsNumber} from '@utils/index';
import {IFormValue, ISkuTable} from '../../../index.types';
import {ImageCardView} from '@component/imageManager';

const {Column, HeaderCell, Cell} = Table;

interface IProps {
    formValue: IFormValue

    cellData?: Array<{ [x: string]: { name: string, image?: boolean, value: { id: string, name: string, image: string | undefined } } }>

    onChange?(data: IFormValue): void

    /**
     * 规格多图
     */
    specImage?: boolean
}


/**
 * 规格列表名称
 * @param props
 * @constructor
 */
export default class ProductSkuParts extends React.Component<IProps> {


    public Columns = [
        {
            HeaderCell: <HeaderCell>禁用</HeaderCell>,
            Cell: <CellIndex dataKey="disable" onSelectChange={this._onSelectChange.bind(this)}/>,
            width: 95,
            fixed: 'left',
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>主图</HeaderCell>,
            Cell: <Cell dataKey="mainImage">
                {(rowData: any, rowIndex: any) => (
                    this._getSpecImage() ?
                        (
                            <ImageUploaderLibraryGroup maxSize={1}
                                                       isDragDisabled={true}
                                                       onChange={(fileUrl) => {
                                                           rowData.mainImage = fileUrl[0]
                                                           this._onSelectChange(rowIndex, rowData)
                                                       }}
                                                       fileUrl={[rowData.mainImage]}/>
                        ) :
                        (
                            <ImageCardView fileUrl={rowData.mainImage}/>
                        )
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
            Cell: <HookCellInputNumber dataKey="marketPrice" max={999999999} min={0} step={0.5}
                                       onSelectChange={this._onSelectChange.bind(this)}/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>成本价</HeaderCell>,
            Cell: <HookCellInputNumber dataKey="costPrice" max={999999999} min={0} step={0.5}
                                       onSelectChange={this._onSelectChange.bind(this)}/>,
            width: 120,
            fixed: false,
            resizable: false
        }
    ]

    public DataTable: Array<ISkuTable> = [
        /* {
             disable: '',
             mainImage: '',
             numberStarts: '',
             numberStock: '',
             marketPrice: '',
             costPrice: ''
         }*/
    ]

    public componentDidMount(): void {

    }

    public _getSpecImage(): boolean | undefined {
        return this.props.specImage
    }

    /**
     * 列数据改变
     * @param rowIndex
     * @param rowData
     * @private
     */
    public _onSelectChange(rowIndex?: number, rowData?: any) {
        const {onChange, formValue} = this.props
        const dataTable = this.DataTable
        if (utilsNumber.isNumber(rowIndex)) {
            dataTable[rowIndex as number] = rowData
        }
        formValue.skuTable = dataTable
        onChange?.(formValue);
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
            newColumns.splice(2, 0, ...map);
            return newColumns;
        }
        return []
    }

    /**
     * 构建行数据
     * @private
     */
    private _buildRow() {
        const {cellData, formValue, specImage} = this.props
        const dataTable = formValue?.skuTable
        if (!dataTable) {
            return []
        }
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
                //特别重要：通过默认排序方式来进行MD5计算获取到ID,这样子就可以进行SKU的快速定位
                newdata2.id = utilsCrypto.MD5(id.sort().join(''))
                const medata = {
                    id: '',
                    disable: false,
                    mainImage: '',
                    numberStarts: '',
                    numberStock: '',
                    marketPrice: '',
                    costPrice: '',
                    tableColumn: newdata,
                    ...newdata,
                    ...newdata2
                }
                rowdata.push(medata)
            });
        }
        //合并数据
        const newTableMap = rowdata?.map((k, i, a) => {
            const index = dataTable?.findIndex((dk, di, da) => k.id === dk?.id);
            if (index > -1) {
                const dataTableElement = dataTable?.[index];
                if (dataTableElement) {
                    const merge = {
                        ...k,
                        ...dataTableElement
                    }
                    //规格可以有多图,默认如果规格非多图。采用mainImage图
                    if (!specImage) {
                        merge.mainImage = k.mainImage
                    }
                    return merge
                }
            } else {
                return k
            }
        }) ?? [];
        //实时同步数据但是不触发通知
        //formValue.skuTable = newTableMap
        //用于组件内处理方便
        this.DataTable = newTableMap
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
