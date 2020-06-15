import * as React from 'react';
import {Col, ControlLabel, DateRangePicker, Form, FormControl, FormGroup, Grid, Input, Panel, Row} from 'rsuite';
import {FormTextArea} from '@component/formControl';

/**
 *
 * @author lk
 * @date 2020/6/15 13:38
 * @version 1.0
 */
export default class Info extends React.Component {

    public state = {
        formValue: {
            description: ''
        }
    }

    public render() {
        return (
            <Panel header={'基础信息'} bodyFill={false}>
                <Form fluid={true}
                      layout="vertical"
                      formValue={this.state.formValue}
                      onChange={(formValue) => {
                          this.setState({
                              formValue
                          })
                      }}>
                    <Grid fluid={true} className={'app-grid-from'}>
                        <Row>
                            <Col xs={5} sm={5} md={5}>
                                <FormGroup>
                                    <ControlLabel>名称</ControlLabel>
                                    <FormControl name="productName" autocomplete="off" accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={11} sm={11} md={11}>
                                <FormGroup>
                                    <ControlLabel>有效期限</ControlLabel>
                                    <FormControl name="effectiveDate"
                                                 placement="autoHorizontalStart"
                                                 accepter={DateRangePicker}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24}>
                                <FormGroup>
                                    <ControlLabel>描述</ControlLabel>
                                    <FormControl name="description"
                                                 autocomplete="off"
                                                 rows={2}
                                                 maxLenght={64}
                                                 accepter={FormTextArea}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }
}
