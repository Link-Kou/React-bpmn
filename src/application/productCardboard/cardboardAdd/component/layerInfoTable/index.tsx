import * as React from 'react';
import {Panel, Table} from 'rsuite';
import {CellAlash} from '@component/table';
import {SelectLayerCell} from './compone/hookCell';
import {IBaseCorrugated, IBasePaper, IFormValue} from '../../../index.types';
import {RefPanel} from '@component/panel';

const {Column, HeaderCell} = Table;

interface IProps {

    formValue: IFormValue
    basePaper: Array<IBasePaper>
    corrugated: Array<IBaseCorrugated>

    onChangeTableData?(formValue: IFormValue): void

}

export default class CardboardLayerInfoTable extends React.Component<IProps> {


    public Columns = [
        {
            HeaderCell: <HeaderCell>描述</HeaderCell>,
            Cell: <CellAlash dataKey="describe"/>,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第一层(面子)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="oneLayer"
                                 paperType={1}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'paperName'}
                                 data={basePaper}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第二层(瓦楞)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="twoLayer"
                                 paperType={2}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'name'}
                                 data={corrugated}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第三层(里纸)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="threeLayer"
                                 paperType={1}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'paperName'}
                                 data={basePaper}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第四层(瓦楞)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="fourLayer"
                                 paperType={2}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'name'}
                                 data={corrugated}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第五层(里纸)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="fiveLayer"
                                 paperType={1}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'paperName'}
                                 data={basePaper}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第六层(瓦楞)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="sixLayer"
                                 paperType={2}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'name'}
                                 data={corrugated}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第七层(里纸)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="sevenLayer"
                                 paperType={1}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'paperName'}
                                 data={basePaper}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: 1,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第八层(瓦楞)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="eightLayer"
                                 paperType={2}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'name'}
                                 data={corrugated}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>第九层(里纸)</HeaderCell>,
            Cell: (container: any, basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => (
                <SelectLayerCell dataKey="nineLayer"
                                 paperType={1}
                                 container={container}
                                 valueKey={'id'}
                                 labelKey={'paperName'}
                                 data={basePaper}
                                 onChangeValue={this._onChangeTableData}
                                 oneCellDataKey={'cost'}
                                 twoCellDataKey={'coefG'}/>
            ),
            flexGrow: true,
            fixed: false,
            resizable: false
        }
    ]

    componentDidMount(): void {

    }

    public state = {
        ref: undefined
    }

    private layerConstant = ['', 'oneLayer', 'twoLayer', 'threeLayer', 'fourLayer', 'fiveLayer', 'sixLayer', 'sevenLayer', 'eightLayer', 'nineLayer']
    /**
     * 处理数据
     * @private
     */
    private _transformData = () => {
        const {formValue} = this.props
        const tableData = [
            {
                describe: '原纸/瓦楞'
            },
            {
                describe: '成本价'
            },
            {
                describe: '克重/系数'
            }
        ]
        /**
         * 补齐层数
         */
        const complement = () => {
            if (formValue.layers.length <= 9) {
                const number = formValue.layers.length;
                for (let i = number + 1; i <= 9; i++) {
                    formValue.layers.push({
                        /**
                         * 纸id
                         */
                        paperId: '',
                        /**
                         * 纸名称
                         */
                        paperName: '',
                        /**
                         * 系数克重
                         */
                        coefG: '',
                        /**
                         * 纸类型
                         */
                        paperType: '',
                        /**
                         * 成本
                         */
                        cost: '',
                        /**
                         * 层数
                         */
                        layerNum: i
                    })
                }
            }
        }
        const layer = {}
        complement();
        formValue.layers.forEach((k, i, a) => {
            layer[this.layerConstant[k.layerNum]] = {
                paperId: k.paperId,
                paperName: k.paperName,
                coefG: k.coefG,
                cost: k.cost,
                paperType: k.paperType,
                layerNum: k.layerNum
            }
        })
        const map = tableData.map((k, i, a) => {
            return {
                ...k,
                ...layer
            }
        });
        return map
    }

    /**
     * 数据改变
     * @private
     */
    private _onChangeTableData = (dataKey: string, data: any) => {
        const {formValue, onChangeTableData} = this.props
        const {layers} = formValue
        const number = this.layerConstant.indexOf(dataKey);
        const layerdata = {
            paperId: data.id,
            paperName: data.name ?? data.paperName ?? '',
            coefG: data.coefficient ?? data.weight ?? '0',
            paperType: data.paperType,
            cost: data.costPrice ?? data.squarePrice ?? '0',
            layerNum: number
        }
        if (Array.isArray(layers)) {
            const index = layers.findIndex(x => x.layerNum === number);
            formValue.layers.splice(index, 1, layerdata)
            //formValue.layers.push(layerdata)
            onChangeTableData?.(formValue);
        }
    }

    public render() {
        const transformData = this._transformData();
        const {formValue, basePaper, corrugated} = this.props
        return (
            <>
                <Panel header={'纸板层'}>
                    <div style={{padding: 10}}>
                        <RefPanel>
                            {
                                (ref: any) => (
                                    <Table
                                        loading={false}
                                        //height={355}
                                        rowHeight={120}
                                        headerHeight={65}
                                        autoHeight={true}
                                        bordered={true}
                                        cellBordered={true}
                                        data={transformData}
                                    >
                                        {
                                            this.Columns.map((k: any, i, a) => (
                                                i <= formValue.layerNum ?
                                                    (
                                                        <Column width={k.width} align="center" flexGrow={k.flexGrow}
                                                                colSpan={k.colSpan}
                                                                verticalAlign={'middle'} fixed={k.fixed}
                                                                resizable={k.resizable}>
                                                            {k.HeaderCell}
                                                            {typeof k.Cell === 'function' ? k.Cell(ref, basePaper, corrugated) : k.Cell}
                                                        </Column>
                                                    ) : undefined
                                            ))
                                        }
                                    </Table>
                                )
                            }
                        </RefPanel>

                    </div>
                </Panel>
            </>
        )
    }
}
