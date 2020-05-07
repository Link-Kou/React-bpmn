import * as React from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Input, InputPicker, Row, Table} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {CellIndex} from '@component/table/cell';
import TextSpan from '@component/textSpan';
import HeadPanel from '@component/headPanel';
import {HeaderCellSort} from '@component/table/headerCell';

const {Column, HeaderCell, Cell, Pagination} = Table;

export default class UserTable extends React.Component {

    public state = {
        sortTime: false
    }

    public Columns = [
        {
            HeaderCell: <HeaderCell>编号</HeaderCell>,
            Cell: <CellIndex dataKey="index"/>,
            width: 65,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>手机号码</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        158*****122
                    </TextSpan>
                )}
            </Cell>,
            width: 300,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>用户名称</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        XXXXXX
                    </TextSpan>
                )}
            </Cell>,
            width: 300,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>认证用户</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        限时优惠大礼相送,及时XXXXXX
                    </TextSpan>
                )}
            </Cell>,
            width: 300,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>认证状态</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        BE
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>账户状态</HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        BE
                    </TextSpan>
                )}
            </Cell>,
            width: 155,
            fixed: false,
            resizable: false
        }, {
            HeaderCell: <HeaderCell><HeaderCellSort>创建时间</HeaderCellSort></HeaderCell>,
            Cell: <Cell dataKey="describe">
                {(rowData: any) => (
                    <TextSpan>
                        2019-19-19
                    </TextSpan>
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
                    <Button appearance="ghost">详情</Button>
                )}
            </Cell>,
            flexGrow: true,
            fixed: false,
            resizable: false
        }
    ]


    public render() {
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'用户列表'}>
                    <Form fluid={true}
                          layout="inline"
                          onChange={(formValue) => {

                          }}>
                        <Grid fluid={true} className={'app-grid-inline-from'}>
                            <Row>
                                <Col xs={7} sm={7} md={7}/>
                                <Col xs={5} sm={5} md={5}>
                                    <FormGroup>
                                        <ControlLabel><span style={{color: 'red'}}>*</span>手机号码</ControlLabel>
                                        <FormControl name="productName" data={[]} placeholder="限30字，必填" type="text"
                                                     accepter={Input}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={5} sm={5} md={5}>
                                    <FormGroup>
                                        <ControlLabel><span style={{color: 'red'}}>*</span>用户名</ControlLabel>
                                        <FormControl name="productName" data={[]} placeholder="限30字，必填" type="text"
                                                     accepter={Input}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={5} sm={5} md={5}>
                                    <FormGroup>
                                        <ControlLabel><span style={{color: 'red'}}>*</span>认证类型</ControlLabel>
                                        <FormControl style={{width: 155}} name="productName" data={[]}
                                                     placeholder="限30字，必填" type="text"
                                                     accepter={InputPicker}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={2} sm={2} md={2}>
                                    <FormGroup>
                                        <Button onClick={() => {
                                        }}>搜索</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Grid>
                    </Form>
                </HeadPanel>
                <FlexCalcBox subHeight={185} Body={(e) => (
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
                                index: '1'
                            }, {
                                index: '2'
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
                    activePage={1}
                    displayLength={10}
                    total={20}/>
            </>
        )
    }
}
