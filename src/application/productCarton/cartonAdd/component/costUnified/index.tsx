import * as React from 'react';
import {
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
import {FormCheckPicker} from '@component/formControl';

interface IProps {
    formValue: IFormValue

    container?: any

    data?: Array<any>

    onChange?(formValue: IFormValue): void

}

export default class CartonAddCostUnified extends React.Component<IProps> {

    public state = {
        formError: {}
    }


    private _onCallbackChange = (value: Array<any>, data: Array<any>, callbackForm: () => void) => {
        const {formValue, onChange} = this.props
        const filter: Array<any> = data.filter(x => value.indexOf(x.id) > -1);
        const map = filter?.map((k, i, a) => {
            return {
                /**
                 * 纸板id
                 */
                cardboardId: k.id,
                /**
                 * 成本
                 */
                cost: k.costPrice
            }
        });
        formValue.associatedCardboard = map
        onChange?.(formValue);
    }

    private _onCallbackValue = (value: Array<any>) => {
        return value.map((k, i, a) => (
            k.cardboardId
        ))
    }

    public render() {
        const {formValue: formValues, onChange: onChanges, container,data} = this.props
        const {formError: formErrors} = this.state
        return (
            <Panel header={'成本信息'}>
                <Form fluid={true}
                      layout="inline"
                      formValue={formValues}
                      formError={formErrors}
                      onCheck={(formError) => {
                          this.setState({
                              formError
                          })
                      }}
                      onChange={(formValue: any) => {
                          onChanges?.(formValue)
                      }}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup className={'app-form-group-inline'}>
                                    <ControlLabel>关联纸板</ControlLabel>
                                    <FormControl name="associatedCardboard"
                                                 placeholder="请选择"
                                                 valueKey={'id'}
                                                 labelKey={'name'}
                                                 callbackValue={this._onCallbackValue}
                                                 callbackChange={this._onCallbackChange}
                                                 data={data}
                                                 container={container}
                                                 accepter={FormCheckPicker}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>是否强制关联价格</ControlLabel>
                                    <FormControl name="relatedPrice"
                                                 accepter={RadioGroup}>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </FormControl>
                                </FormGroup>

                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>市场价</ControlLabel>
                                    <FormControl name="marketPrice"
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
                                    <FormControl name="costPrice"
                                                 disabled={false}
                                                 max={999}
                                                 min={0}
                                                 postfix={'元/cm²'}
                                                 accepter={InputNumber}/>
                                    <HelpBlock tooltip={true}>
                                        由纸板每层基本价格相加得出
                                    </HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>成本加价</ControlLabel>
                                    <FormControl name="costPriceMarkup"
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
