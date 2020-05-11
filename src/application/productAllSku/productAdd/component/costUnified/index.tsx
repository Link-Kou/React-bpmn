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
    Row,
    Schema
} from 'rsuite'
import {IFormValue} from '../../../index.types';
import TextRequired from '@component/textRequired';

interface IProps {
    formValue?: IFormValue

    onChange?(data: IFormValue): void
}

export default class ProductCostUnified extends React.PureComponent<IProps> {

    private model = Schema.Model({
        priceMode: Schema.Types.NumberType('必须选择一种模式')
            .isInteger('必须选择一种模式')
            .isRequired('不能为空')
    });

    public state = {
        formError: {}
    }

    private _onFormValueChange = (formValue: any) => {
        const {onChange} = this.props
        onChange?.(formValue)
    }

    public render() {
        const {formValue: _formValue} = this.props
        const {formError: _formError} = this.state
        return (
            <Panel header={'成本信息'}>
                <Form fluid={true}
                      layout="inline"
                      formValue={_formValue}
                      model={this.model}
                      formError={_formError}
                      onCheck={(formError) => {
                          this.setState({
                              formError
                          })
                      }}
                      onChange={this._onFormValueChange}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel>价格显示方式</ControlLabel>
                                    <FormControl name="priceMode"
                                                 accepter={RadioGroup}>
                                        <Radio value={1}>优惠价</Radio>
                                        <Radio value={2}>对比价</Radio>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col xs={7} sm={7} md={7}>
                                <FormGroup>
                                    <ControlLabel>支持销售模式</ControlLabel>
                                    <FormControl name="salesModel"
                                                 accepter={RadioGroup}>
                                        <Radio value={1}>零售</Radio>
                                        <Radio value={2}>批发</Radio>
                                        <Radio value={3}>零售/批发</Radio>
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
