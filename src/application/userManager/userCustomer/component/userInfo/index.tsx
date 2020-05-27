import * as React from 'react';
import {
    Checkbox,
    CheckboxGroup,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Grid,
    HelpBlock,
    Input,
    Panel,
    Row
} from 'rsuite'

interface IProps {

}

export default class UserInfo extends React.Component<IProps> {

    public state = {}

    public render() {
        return (
            <Panel header={'基础信息'}>
                <Form fluid={true}
                      layout="inline"
                      onChange={(formValue) => {

                      }}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={24} sm={24} md={24}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>用户名称</ControlLabel>
                                    <FormControl name="productName" placeholder="限30字，必填" type="text" accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                                <FormGroup>
                                    <ControlLabel>认证名称</ControlLabel>
                                    <FormControl name="productName" placeholder="限30字，非必填" type="text"
                                                 accepter={Input}/>
                                    <HelpBlock tooltip={true}><b>例:</b>商品名称(辅助名称)</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24}>
                                <FormGroup>
                                    <ControlLabel>手机号码</ControlLabel>
                                    <FormControl name="productType" placeholder="请选择" data={[]} accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24}>
                                <FormGroup className={'app-form-group-inline'}>
                                    <ControlLabel>认证类型</ControlLabel>
                                    <FormControl name="checkboxList" placeholder="每个限6字，用空格隔开" type="text" inline={true}
                                                 accepter={CheckboxGroup}>
                                        <Checkbox value="A">个人</Checkbox>
                                        <Checkbox value="B">企业</Checkbox>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }

}
