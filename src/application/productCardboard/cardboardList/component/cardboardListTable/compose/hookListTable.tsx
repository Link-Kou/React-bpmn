import {Table} from 'rsuite';
import * as React from 'react';

const {Cell} = Table;


interface IHooKCarousel {

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
export const HookCarousel = (props: IHooKCarousel) => {
    const {rowData, rowHeight} = props
    return (
        <Cell {...props} style={{padding: 0, height: rowHeight}}>
            <table className={'app-cardboardListTable-table'}>
                <tr>
                    <td>
                        最大接单长:
                    </td>
                    <td>
                        {rowData?.maxLength}
                    </td>
                    <td>
                        最大接单宽:
                    </td>
                    <td>
                        {rowData?.maxWidth}
                    </td>
                </tr>
                <tr>
                    <td>
                        最小接单长:
                    </td>
                    <td>
                        {rowData?.minLength}
                    </td>
                    <td>
                        最小接单宽:
                    </td>
                    <td>
                        {rowData?.minWidth}
                    </td>
                </tr>
                <tr>
                    <td>
                        落料长加:
                    </td>
                    <td>
                        {rowData?.blankingLengthAdd}
                    </td>
                    <td>
                        落料宽加:
                    </td>
                    <td>
                        {rowData?.blankingWidthAdd}
                    </td>
                </tr>
                <tr>
                    <td>
                        厚度:
                    </td>
                    <td>
                        {rowData?.thickness}
                    </td>
                    <td>
                        耐破:
                    </td>
                    <td>
                        {rowData?.burst}
                    </td>
                </tr>
                <tr>
                    <td>
                        边压:
                    </td>
                    <td>
                        {rowData?.edgePressure}
                    </td>
                    <td>
                        戳穿:
                    </td>
                    <td>
                        {rowData?.puncture}
                    </td>
                </tr>
                <tr>
                    <td>
                        粘合:
                    </td>
                    <td>
                        {rowData?.glue}
                    </td>
                    <td>
                        抗压:
                    </td>
                    <td>
                        {rowData?.compressive}
                    </td>
                </tr>
            </table>
        </Cell>
    )
}
