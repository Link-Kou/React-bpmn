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
    Row,
    Steps
} from 'rsuite'
import FlexCalcBox from '@component/flexCalcBox';

interface IProps {

}

export default class OrderCardboardInfoUnified extends React.Component<IProps> {

    public state = {}

    public render() {
        return (
            <>
                <FlexCalcBox subHeight={68} overflow={'auto'} Body={() => (
                    <>
                        <Panel header={'基础信息'}>
                            <Form fluid={true}
                                  layout="vertical"
                                  onChange={(formValue) => {

                                  }}>
                                <Grid style={{padding: 10}} fluid={true} className={'app-grid-from'}>
                                    <Row>
                                        <Col xs={8} sm={8} md={8}>
                                            <Steps current={3} vertical={true} small={true}>
                                                <Steps.Item title="待付款"/>
                                                <Steps.Item title="待排产"/>
                                                <Steps.Item title="待生产"/>
                                                <Steps.Item title="待发货"/>
                                            </Steps>
                                        </Col>
                                        <Col xs={16} sm={16} md={16}>
                                            <FormGroup>
                                                <ControlLabel><span style={{color: 'red'}}>*</span>商品名称</ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={16} sm={16} md={16}>
                                            <FormGroup>
                                                <ControlLabel>订单备注
                                                    <HelpBlock tooltip={true}><b>例:</b>商品名称(辅助名称)</HelpBlock>
                                                </ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，非必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Form>
                        </Panel>
                        <Panel header={'用户信息'}>
                            <Form fluid={true}
                                  layout="vertical"
                                  onChange={(formValue) => {

                                  }}>
                                <Grid style={{padding: 10}} fluid={true} className={'app-grid-from'}>
                                    <Row>
                                        <Col xs={24} sm={24} md={24}>
                                            <FormGroup>
                                                <ControlLabel><span style={{color: 'red'}}>*</span>手机号码</ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={12} md={12}>
                                            <FormGroup>
                                                <ControlLabel><span style={{color: 'red'}}>*</span>用户名</ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={24} sm={12} md={12}>
                                            <FormGroup>
                                                <ControlLabel>认证名 <HelpBlock
                                                    tooltip={true}><b>例:</b>商品名称(辅助名称)</HelpBlock></ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，非必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={12} md={12}>
                                            <FormGroup>
                                                <ControlLabel>认证类型</ControlLabel>
                                                <FormControl name="checkboxList" placeholder="每个限6字，用空格隔开" type="text"
                                                             autocomplete="off"
                                                             inline={true}
                                                             accepter={CheckboxGroup}>
                                                    <Checkbox value="A">个人</Checkbox>
                                                    <Checkbox value="B">企业</Checkbox>
                                                </FormControl>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} sm={12} md={12}>
                                            <FormGroup>
                                                <ControlLabel>账户状态</ControlLabel>
                                                <FormControl name="checkboxList" placeholder="每个限6字，用空格隔开" type="text"
                                                             autocomplete="off"
                                                             inline={true}
                                                             accepter={CheckboxGroup}>
                                                    <Checkbox value="A">禁用</Checkbox>
                                                    <Checkbox value="B">启用</Checkbox>
                                                </FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Form>
                        </Panel>
                        <Panel header={'营销信息'}>
                            <Form fluid={true}
                                  layout="vertical"
                                  onChange={(formValue) => {

                                  }}>
                                <Grid style={{padding: 10}} fluid={true} className={'app-grid-from'}>
                                    <Row>
                                        <Col xs={24} sm={24} md={24}>
                                            <FormGroup>
                                                <ControlLabel><span style={{color: 'red'}}>*</span>营销方案名称</ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={8} sm={8} md={8}>
                                            <FormGroup>
                                                <ControlLabel><span style={{color: 'red'}}>*</span>应付金额</ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={8} sm={8} md={8}>
                                            <FormGroup>
                                                <ControlLabel>实付金额</ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，非必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={8} sm={8} md={8}>
                                            <FormGroup>
                                                <ControlLabel>优惠金额</ControlLabel>
                                                <FormControl name="productName" placeholder="限30字，非必填" type="text"
                                                             autocomplete="off"
                                                             accepter={Input}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Form>
                        </Panel>
                    </>
                )}/>
            </>

        )
    }

}
