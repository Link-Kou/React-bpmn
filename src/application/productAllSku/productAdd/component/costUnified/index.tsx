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
    InputNumber,
    Panel,
    Radio,
    RadioGroup,
    Row
} from 'rsuite'

interface IProps {
    onChangeFormValue?(data: any): void
}

export default class ProductCostUnified extends React.PureComponent<IProps> {

    public state = {}

    public render() {
        return (
            <Panel header={'成本信息'}>
                <Form fluid={true}
                      formValue={{}}
                      layout="inline"
                      onChange={() => {
                      }}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel>价格显示方式</ControlLabel>
                                    <FormControl name="relatedPrice"
                                                 accepter={RadioGroup}>
                                        <Radio value={0}>最低价</Radio>
                                        <Radio value={1}>对比价</Radio>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel>支持销售模式</ControlLabel>
                                    <FormControl name="relatedPrice"
                                                 accepter={CheckboxGroup}>
                                        <Checkbox value={0}>零售</Checkbox>
                                        <Checkbox value={1}>批发</Checkbox>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>市场价</ControlLabel>
                                    <FormControl name="marketPrice" autocomplete="off" type="number"
                                                 disabled={false}
                                                 max={999999}
                                                 min={0}
                                                 postfix={'元'}
                                                 accepter={InputNumber}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>优惠价</ControlLabel>
                                    <FormControl name="costPrice" autocomplete="off" type="number"
                                                 max={999999}
                                                 min={0}
                                                 postfix={'元'}
                                                 accepter={InputNumber}/>
                                    <HelpBlock tooltip={true}>
                                        价格展示显示
                                    </HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }

}
