import * as React from 'react';
import {Button, Col, Grid, Row, Table} from 'rsuite';
import FlexCalcBox from '../../../../../component/flexCalcBox';


const {Column, HeaderCell, Cell, Pagination} = Table;

/**
 * 操作列
 * @param props
 * @constructor no-unused-expressions
 */
const ControlCell = (props: any) => {
    //const {rowData}: { rowData: { rowIndex: number, rowData: any } } = props;
    return (
        <Cell {...props} style={{padding: 0}}>
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col xs={6} sm={6} md={6}>
                        <Button appearance="primary" color="green" block={true} onClick={() => {
                        }}
                        >登录访问</Button>
                    </Col>
                    <Col xs={6} sm={6} md={6}>
                        <Button appearance="primary" color="green" block={true}
                                onClick={() => {
                                }}
                        >权限访问</Button>
                    </Col>
                    <Col xs={6} sm={6} md={6}>
                        <Button appearance="primary" color="green" block={true}
                                onClick={() => {
                                }}
                        >内网访问</Button>
                    </Col>
                    <Col xs={6} sm={6} md={6}>
                        <Button appearance="primary" color="green" block={true}
                                onClick={() => {
                                }}
                        >暂停访问</Button>
                    </Col>
                </Row>
            </Grid>
        </Cell>
    )
}

export default class Index extends React.Component {

    public state = {
        show: false,
        loading: false,
        data: []
    }

    public Columns = [
        {
            HeaderCell: <HeaderCell>序号</HeaderCell>,
            Cell: <Cell dataKey="index"/>,
            width: 80,
            fixed: 'left',
            resizable: true
        },
        {
            HeaderCell: <HeaderCell>路由</HeaderCell>,
            Cell: <Cell dataKey="url"/>,
            width: 350,
            fixed: false,
            resizable: true
        },
        {
            HeaderCell: <HeaderCell>名称</HeaderCell>,
            Cell: <Cell dataKey="name"/>,
            width: 150,
            fixed: false,
            resizable: true
        },
        {
            HeaderCell: <HeaderCell>标签</HeaderCell>,
            Cell: <Cell dataKey="label"/>,
            width: 150,
            fixed: false,
            resizable: true
        },
        {
            HeaderCell: <HeaderCell>操作</HeaderCell>,
            Cell: <ControlCell dataKey="operatorName"/>,
            //minWidth: 350,
            width: 420,
            fixed: 'right',
            resizable: false
        }
    ]


    public componentDidMount(): void {

    }

    public render() {
        return (
            <FlexCalcBox Body={(e: number) => (
                <>
                    <Table
                        loading={this.state.loading}
                        height={e - 65}
                        rowHeight={55}
                        autoHeight={false}
                        bordered={true}
                        cellBordered={true}
                        data={this.state.data}
                    >
                        {
                            this.Columns.map((k: any, i, a) => (
                                <Column width={k.width} align="center" verticalAlign={'middle'} fixed={k.fixed}
                                        resizable={k.resizable}>
                                    {k.HeaderCell}
                                    {k.Cell}
                                </Column>
                            ))
                        }
                    </Table>
                    <Pagination
                        lengthMenu={[
                            {
                                value: 10,
                                label: 10
                            },
                            {
                                value: 20,
                                label: 20
                            }
                        ]}
                    />
                </>
            )}/>
        )
    }
}
