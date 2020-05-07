import * as React from 'react';
import {Table} from 'rsuite';
import {IEnum, IPrintingnDigital, IPrintingnGlue, IPrintingnNone, IPrintingnWatermark} from '../../../../index.types';

const {Cell} = Table;

interface IHookPrinting {

    rowHeight?: number

    dataKey?: string

    [x: string]: any
}

/**
 *
 * @author lk
 * @date 2020/5/2 18:03
 * @version 1.0
 */
export const HookPrinting = (props: IHookPrinting) => {
    const {rowData, rowHeight, height} = props
    const printingType: number | undefined = rowData?.printingType
    const printingWay: IPrintingnNone | IPrintingnDigital | IPrintingnGlue | IPrintingnWatermark | undefined = rowData?.printingWay
    const newheight = rowHeight ?? height
    return (
        <Cell {...props} style={{padding: 0, height: newheight}}>
            <>
                印刷方式：{IEnum.PrintingType(printingType)}
                {PrintingWay(printingType, printingWay)}
            </>
        </Cell>
    )
}


function PrintingWay(printingType?: number, printingWay?: IPrintingnNone | IPrintingnDigital | IPrintingnGlue | IPrintingnWatermark) {

    const _RPrintingnNone = (printingWayitem?: IPrintingnNone) => {
        return (
            <table className={'app-cardboardListTable-table'}>
                <tr>
                    <td>
                        面纸类型:
                    </td>
                    <td>
                        {printingWayitem?.tissueType}
                    </td>
                    <td>
                        开槽模切:
                    </td>
                    <td>
                        {printingWayitem?.slottingCutting}
                    </td>
                </tr>
            </table>
        )
    }

    const _RPrintingnDigital = (printingWayitem?: IPrintingnDigital) => {
        return (
            <table className={'app-cardboardListTable-table'}>
                <tr>
                    <td>
                        版面:
                    </td>
                    <td>
                        {printingWayitem?.layoutType}
                    </td>
                    <td>
                        面纸类型:
                    </td>
                    <td>
                        {printingWayitem?.tissueType}
                    </td>
                </tr>
                <tr>
                    <td>
                        开槽模切:
                    </td>
                    <td>
                        {printingWayitem?.slottingCutting}
                    </td>
                    <td>
                        印刷面积:
                    </td>
                    <td>
                        {printingWayitem?.printingArea}
                    </td>
                </tr>
                <tr>
                    <td>
                        数码表处理:
                    </td>
                    <td>
                        {printingWayitem?.surfaceType}
                    </td>
                </tr>
            </table>
        )
    }

    const _RPrintingnWatermark = (printingWayitem?: IPrintingnWatermark) => {
        return (
            <table className={'app-cardboardListTable-table'}>
                <tr>
                    <td>
                        版面:
                    </td>
                    <td>
                        {printingWayitem?.layoutType}
                    </td>
                    <td>
                        开槽模切:
                    </td>
                    <td>
                        {printingWayitem?.slottingCutting}
                    </td>
                </tr>
                <tr>
                    <td>
                        印刷面积:
                    </td>
                    <td>
                        {printingWayitem?.printingArea}
                    </td>
                    <td>
                        色数:
                    </td>
                    <td>
                        {printingWayitem?.colorNumber}
                    </td>
                </tr>
                <tr>
                    <td>
                        水印表处:
                    </td>
                    <td>
                        {printingWayitem?.surfaceType}
                    </td>
                    <td>
                        橡皮版面积:
                    </td>
                    <td>
                        {printingWayitem?.rubberArea}
                    </td>
                </tr>
                <tr>
                    <td>
                        柔版面积:
                    </td>
                    <td>
                        {printingWayitem?.softArea}
                    </td>
                </tr>
            </table>
        )
    }

    const _RPrintingnGlue = (printingWayitem?: IPrintingnGlue) => {
        return (
            <table className={'app-cardboardListTable-table'}>
                <tr>
                    <td>
                        版面:
                    </td>
                    <td>
                        {printingWayitem?.layoutType}
                    </td>
                    <td>
                        开槽模切:
                    </td>
                    <td>
                        {printingWayitem?.slottingCutting}
                    </td>
                </tr>
                <tr>
                    <td>
                        裱胶处理:
                    </td>
                    <td>
                        {printingWayitem?.mountSurfaceType}
                    </td>
                    <td>
                        胶印处理:
                    </td>
                    <td>
                        {printingWayitem?.glueSurfaceType}
                    </td>
                </tr>
                <tr>
                    <td>
                        专色数:
                    </td>
                    <td>
                        {printingWayitem?.specialColorNumber}
                    </td>
                    <td>
                        普色数:
                    </td>
                    <td>
                        {printingWayitem?.normalColorNumber}
                    </td>
                </tr>
            </table>
        )
    }

    if (printingType) {
        const f = [undefined, _RPrintingnNone, _RPrintingnWatermark, _RPrintingnGlue, _RPrintingnDigital]
        return f[printingType]?.(printingWay)
    }
    return undefined
}
