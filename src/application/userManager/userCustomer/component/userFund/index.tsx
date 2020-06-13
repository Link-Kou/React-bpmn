import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, Input, Panel, Row} from 'rsuite'

interface IProps {

}

export default class UserInfo extends React.Component<IProps> {

    public state = {}

    public render() {
        return (
            <Panel header={'账期信息'}>
                <Form fluid={true}
                      layout="inline"
                      onChange={(formValue) => {

                      }}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>账期欠款</ControlLabel>
                                    <FormControl name="productName" disabled={true} accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>账期余额</ControlLabel>
                                    <FormControl name="productName" disabled={true} accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>账期额度</ControlLabel>
                                    <FormControl name="productType"
                                                 disabled={true}
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>剩余额度</ControlLabel>
                                    <FormControl name="productType"
                                                 disabled={true}
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>账期周期</ControlLabel>
                                    <FormControl name="productType"
                                                 disabled={true}
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>还款日期</ControlLabel>
                                    <FormControl name="productType"
                                                 disabled={true}
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>临时额度</ControlLabel>
                                    <FormControl name="productType"
                                                 disabled={true}
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>有效期限</ControlLabel>
                                    <FormControl name="productType"
                                                 disabled={true}
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }

}
