import * as React from 'react';
import {Button, Table} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {CellIndex} from '@component/table';
import TextSpan from '@component/textSpan';

const {Column, HeaderCell, Cell} = Table;


export default class BannerConfigTable extends React.Component {

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: <CellIndex dataKey="index"/>,
            width: 65,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>图片<br/>960x520</HeaderCell>,
            Cell: <Cell dataKey="image">
                {(rowData: any) => (
                    <img style={{objectFit: 'contain'}} height={'100%'} width={'100%'}
                         src={'https://via.placeholder.com/960x520.png/0000FF/808080?text=Image'} alt={''}/>
                )}
            </Cell>,
            flexGrow: 1,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>背景<br/>1920x700</HeaderCell>,
            Cell: <Cell dataKey="background">
                {(rowData: any) => (
                    <img style={{objectFit: 'contain'}} height={'100%'} width={'100%'}
                         src={'https://via.placeholder.com/1920x700.png/0000FF/808080?text=backgroundImage'} alt={''}/>
                )}
            </Cell>,
            flexGrow: 1,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>描述</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        限时优惠大礼相送,及时XXXXXX
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>链接</HeaderCell>,
            Cell: <Cell dataKey="url">
                {(rowData: any) => (
                    <a href={'erwerwe'} target={'_blank'} onClick={() => {
                    }}>
                        <TextSpan>
                            http://asdasd/asdasd/asdasd/asdasd/asdasd
                        </TextSpan>
                    </a>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>管理</HeaderCell>,
            Cell: <Cell dataKey="url">
                {(rowData: any) => (
                    <Button appearance="ghost">编辑</Button>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        }
    ]

    public render() {
        return (
            <FlexCalcBox subHeight={65} Body={(e) => (
                <Table
                    loading={false}
                    height={e}
                    rowHeight={155}
                    headerHeight={65}
                    autoHeight={false}
                    bordered={true}
                    cellBordered={true}
                    data={[
                        {
                            id: ''
                        }
                    ]}
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
            )}/>
        )
    }
}
