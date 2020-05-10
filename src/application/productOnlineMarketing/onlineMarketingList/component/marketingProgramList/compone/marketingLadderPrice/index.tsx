import * as React from 'react';
import {
    Button,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Grid,
    HelpBlock,
    Icon,
    Input,
    InputGroup,
    InputNumber,
    Modal,
    Radio,
    RadioGroup,
    Row
} from 'rsuite';

interface IProps {
    show?: boolean
}


export default class MarketingLadderPrice extends React.Component<IProps> {

    public state = {}

    public render() {
        const {show} = this.props
        return (
            <Modal
                size={'xs'}
                show={show}
                onHide={() => {
                    this.setState({
                        show: false
                    })
                }}
            >
                <Modal.Header>
                    <Modal.Title>一口价</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Grid fluid={true} className={'app-grid-from'}>
                            <Row>
                                <Col xs={24} sm={24} md={24}>
                                    <FormGroup>
                                        <ControlLabel>营销名称</ControlLabel>
                                        <FormControl name="name" accepter={(props) => (
                                            <InputGroup inside={true}>
                                                <InputGroup.Addon>
                                                    <Icon icon="dot-circle-o"/>
                                                </InputGroup.Addon>
                                                <Input {...props} autocomplete="off"/>
                                            </InputGroup>
                                        )}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24}>
                                    <FormGroup>
                                        <ControlLabel>单位</ControlLabel>
                                        <FormControl name="checkboxList" placeholder="每个限6字，用空格隔开" type="text"
                                                     inline={true}
                                                     accepter={RadioGroup}>
                                            <Radio value="1">元/个</Radio>
                                            <Radio value="2">元/m²</Radio>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12}>
                                    <FormGroup>
                                        <ControlLabel>第一阶梯</ControlLabel>
                                        <FormControl name="name" accepter={(props) => (
                                            <InputGroup>
                                                <InputNumber placeholder={'请输入数值'} {...props}/>
                                                <InputGroup.Addon>量</InputGroup.Addon>
                                            </InputGroup>
                                        )}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={12} md={12}>
                                    <FormGroup>
                                        <ControlLabel>成本加价
                                            <HelpBlock tooltip={true}>
                                                产品成本基础上加价比<br/>
                                                列 1000 + (1000 * 1.2 / 100) = 1012（元/平方米）
                                            </HelpBlock>
                                        </ControlLabel>
                                        <FormControl name="name" accepter={(props) => (
                                            <InputGroup>
                                                <InputNumber placeholder={'请输入数值'} {...props}/>
                                                <InputGroup.Addon>%</InputGroup.Addon>
                                            </InputGroup>
                                        )}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12}>
                                    <FormGroup>
                                        <ControlLabel>第二阶梯</ControlLabel>
                                        <FormControl name="name" accepter={(props) => (
                                            <InputGroup>
                                                <InputNumber placeholder={'请输入数值'} {...props}/>
                                                <InputGroup.Addon>量</InputGroup.Addon>
                                            </InputGroup>
                                        )}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={12} md={12}>
                                    <FormGroup>
                                        <ControlLabel>成本加价
                                            <HelpBlock tooltip={true}>
                                                产品成本基础上加价比<br/>
                                                列 1000 + (1000 * 1.2 / 100) = 1012（元/平方米）
                                            </HelpBlock>
                                        </ControlLabel>
                                        <FormControl name="name" accepter={(props) => (
                                            <InputGroup>
                                                <InputNumber placeholder={'请输入数值'} {...props}/>
                                                <InputGroup.Addon>%</InputGroup.Addon>
                                            </InputGroup>
                                        )}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12}>
                                    <FormGroup>
                                        <ControlLabel>第三阶梯</ControlLabel>
                                        <FormControl name="name" accepter={(props) => (
                                            <InputGroup>
                                                <InputNumber placeholder={'请输入数值'} {...props}/>
                                                <InputGroup.Addon>量</InputGroup.Addon>
                                            </InputGroup>
                                        )}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={12} md={12}>
                                    <FormGroup>
                                        <ControlLabel>成本加价
                                            <HelpBlock tooltip={true}>
                                                产品成本基础上加价比<br/>
                                                列 1000 + (1000 * 1.2 / 100) = 1012（元/平方米）
                                            </HelpBlock>
                                        </ControlLabel>
                                        <FormControl name="name" accepter={(props) => (
                                            <InputGroup>
                                                <InputNumber placeholder={'请输入数值'} {...props}/>
                                                <InputGroup.Addon>%</InputGroup.Addon>
                                            </InputGroup>
                                        )}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Grid>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={() => {
                    }}>保存产品</Button>
                    <Button appearance="subtle" onClick={() => {
                    }}>关闭窗口</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
