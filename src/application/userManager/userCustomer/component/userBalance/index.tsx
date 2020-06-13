import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, Input, Panel, Row} from 'rsuite'

interface IProps {

}

export default class UserInfo extends React.Component<IProps> {

    public state = {}

    public render() {
        return (
            <Panel header={'余额信息'}>
                <Form fluid={true}
                      layout="inline"
                      onChange={(formValue) => {

                      }}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>充值余额</ControlLabel>
                                    <FormControl name="productName" disabled={true} accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>冻结余额</ControlLabel>
                                    <FormControl name="productName" disabled={true} accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }

}
