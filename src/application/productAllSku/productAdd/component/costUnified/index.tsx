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
import {IFormValue} from '../../../index.types';
import TextRequired from '@component/textRequired';

interface IProps {
    formValue?: IFormValue

    onChangeFormValue?(data: any): void
}

export default class ProductCostUnified extends React.PureComponent<IProps> {

    public state = {}

    public render() {
        const {formValue: _formValue} = this.props
        return (
            <Panel header={'成本信息'}>
                <Form fluid={true}
                      formValue={_formValue}
                      layout="inline"
                      onChange={() => {
                      }}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel>价格显示方式</ControlLabel>
                                    <FormControl name="priceMode"
                                                 accepter={RadioGroup}>
                                        <Radio value={0}>优惠价</Radio>
                                        <Radio value={1}>对比价</Radio>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel>支持销售模式</ControlLabel>
                                    <FormControl name="salesModel"
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
                                    <TextRequired accepter={ControlLabel}>市场价</TextRequired>
                                    <FormControl name="marketPrice"
                                                 disabled={false}
                                                 max={999999}
                                                 min={0}
                                                 postfix={'元'}
                                                 accepter={InputNumber}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <TextRequired accepter={ControlLabel}>优惠价</TextRequired>
                                    <FormControl name="preferentialPrice"
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
