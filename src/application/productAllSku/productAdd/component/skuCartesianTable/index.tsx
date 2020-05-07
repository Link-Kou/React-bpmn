import * as React from 'react';
import {Grid, Panel, Table} from 'rsuite';
import {CellAddReduce, CellIndex} from '@component/table';
import {ImageUploaderLibraryGroup} from '@common/imageUploader';

const {Column, HeaderCell, Cell} = Table;

interface IProps {
    data: Array<{ [x: string]: { name: string, val: string } }>
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
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>禁用</HeaderCell>,
            Cell: <CellIndex dataKey="disable"/>,
            width: 95,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>主图</HeaderCell>,
            Cell: <Cell dataKey="mainImage">
                {(rowData: any) => (
                    <ImageUploaderLibraryGroup maxSize={1}
                                               isDragDisabled={true}
                                               fileUrl={['https://www.isofts.org/wp-content/uploads/001-1099.jpg']}/>
                )}
            </Cell>,
            width: 150,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>规格编码</HeaderCell>,
            Cell: <Cell dataKey="specCode"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>起卖数量</HeaderCell>,
            Cell: <Cell dataKey="numberStarts"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>库存量</HeaderCell>,
            Cell: <Cell dataKey="numberStarts"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>市场价</HeaderCell>,
            Cell: <Cell dataKey="marketPrice"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>参考成本价</HeaderCell>,
            Cell: <Cell dataKey="costPrice"/>,
            width: 120,
            fixed: false,
            resizable: false
        }
    ]

    public state = {
        dataTable: [
            {
                disable: '',
                mainImage: '',
                specCode: '123',
                numberStarts: '',
                marketPrice: '',
                costPrice: ''
            }
        ]
    }

    public componentDidMount(): void {

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
        const {data} = this.props
        if (Array.isArray(data)) {
            const keys: Array<string> = Object.keys(data[0] ?? {});
            const map: any = keys?.map((k, i, a) => {
                return (
                    {
                        HeaderCell: <HeaderCell>{data[0]?.[k]?.name}</HeaderCell>,
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


    private _buildRow() {
        const {data} = this.props
        const {dataTable} = this.state
        const rowdata: Array<any> = []
        if (Array.isArray(data)) {
            data.forEach((k, i, a) => {
                const keys: Array<string> = Object.keys(k);
                const newdata = {}
                keys.forEach((kk, ki, ka) => {
                    newdata[kk] = k[kk].val
                });
                const medata = {
                    disable: '',
                    mainImage: '',
                    specCode: '',
                    numberStarts: '',
                    marketPrice: '',
                    costPrice: '',
                    ...newdata
                }
                rowdata.push(medata)
            });
        }
        dataTable.map((k, i, a) => {
            rowdata[i] = {
                ...rowdata[i],
                ...k
            }
        })
        return rowdata
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
