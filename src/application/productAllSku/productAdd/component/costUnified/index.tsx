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
    InputGroup,
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
                                    <ControlLabel>是否显示最低价</ControlLabel>
                                    <FormControl name="relatedPrice"
                                                 accepter={RadioGroup}>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel>支持销售模式</ControlLabel>
                                    <FormControl name="relatedPrice"
                                                 accepter={CheckboxGroup}>
                                        <Checkbox value={1}>零售</Checkbox>
                                        <Checkbox value={0}>批发</Checkbox>
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
                                                 max={999}
                                                 min={0}
                                                 postfix={'元/cm²'}
                                                 accepter={InputNumber}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>成本价</ControlLabel>
                                    <FormControl name="costPrice" autocomplete="off" type="number"
                                                 disabled={true}
                                                 max={999}
                                                 min={0}
                                                 accepter={(props) => (
                                                     <InputGroup>
                                                         <Input {...props}/>
                                                         <InputGroup.Addon>元/m²</InputGroup.Addon>
                                                     </InputGroup>
                                                 )}/>
                                    <HelpBlock tooltip={true}>
                                        由纸板每层基本价格相加得出
                                    </HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>成本加价</ControlLabel>
                                    <FormControl name="costPriceMarkup" autocomplete="off" type="number"
                                                 disabled={false}
                                                 max={999}
                                                 min={0}
                                                 postfix={'元/cm²'}
                                                 accepter={InputNumber}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }

}
