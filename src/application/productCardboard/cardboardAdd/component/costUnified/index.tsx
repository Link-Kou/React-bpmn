import * as React from 'react';
import {
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
import {IFormValue} from '../../../index.types';

interface IProps {
    formValue: IFormValue

    onChange?(data: IFormValue): void
}

export default class CardboardAddCostUnified extends React.PureComponent<IProps> {

    public state = {}

    private _onFormValueChange = (formValue: any) => {
        const {onChange} = this.props
        onChange?.(formValue)
    }


    public render() {
        const {formValue} = this.props
        return (
            <Panel header={'成本信息'}>
                <Form fluid={true}
                      formValue={formValue}
                      layout="inline"
                      onChange={this._onFormValueChange}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={24} sm={24} md={24}>
                                <FormGroup>
                                    <ControlLabel>是否强制关联价格</ControlLabel>
                                    <FormControl name="relatedPrice"
                                                 accepter={RadioGroup}>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </FormControl>
                                </FormGroup>

                            </Col>
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
