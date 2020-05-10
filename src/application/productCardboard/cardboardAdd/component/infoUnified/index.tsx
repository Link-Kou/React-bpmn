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
    InputNumber,
    Panel,
    Radio,
    RadioGroup,
    Row, Schema
} from 'rsuite'
import TextRequired from '@component/textRequired';
import {IFormValue} from '../../../index.types';

interface IProps {

    formValue: IFormValue


    onChange?(data: IFormValue): void
}

export default class CardboardAddInfoUnified extends React.PureComponent<IProps> {

    private model = Schema.Model({
        name: Schema.Types.StringType()
            .minLength(1, '不能少于一个字')
            .maxLength(30, '最大支持30个字')
            .isRequired('不能为空')
    });

    public state = {
        formError: {}
    }

    componentDidMount(): void {

    }

    private _onFormValueChange = (formValue: any) => {
        const {onChange} = this.props
        onChange?.(formValue)
    }

    public render() {
        const {formValue} = this.props
        const {formError: _formError} = this.state
        return (
            <>
                <Form fluid={true}
                      formValue={formValue}
                      layout="inline"
                      model={this.model}
                      formError={_formError}
                      onCheck={(formError) => {
                          this.setState({
                              formError
                          })
                      }}
                      onChange={this._onFormValueChange}>
                    <Panel header={'生产信息'} style={{marginBottom: 0}}>
                        <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                            <Row>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>商品名称</TextRequired>
                                        <FormControl name="name"
                                                     autocomplete={'off'}
                                                     placeholder="限30字，必填"
                                                     type="text"
                                                     accepter={Input}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>楞型名称</TextRequired>
                                        <FormControl name="corrugatedName"
                                                     autocomplete={'off'}
                                                     placeholder="限30字，必填"
                                                     accepter={Input}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>用料名称</TextRequired>
                                        <FormControl name="materialsName"
                                                     autocomplete={'off'}
                                                     placeholder="限30字，必填"
                                                     type="text"
                                                     accepter={Input}/>
                                        <HelpBlock tooltip={true}><b>例:</b>商品名称(辅助名称)用料名称</HelpBlock>
                                    </FormGroup>

                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <FormGroup className={'app-form-group-inline'}>
                                        <TextRequired accepter={ControlLabel}>纸板层数</TextRequired>
                                        <FormControl name="layerNum"
                                                     inline={true}
                                                     accepter={RadioGroup}>
                                            <Radio value={3}>三层</Radio>
                                            <Radio value={5}>五层</Radio>
                                            <Radio value={7}>七层</Radio>
                                            <Radio value={9}>九层</Radio>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>最大接单长</TextRequired>
                                        <FormControl name="maxLength" autocomplete="off" type="number"
                                                     disabled={false}
                                                     max={999}
                                                     min={0}
                                                     postfix={'cm'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>最小接单长</TextRequired>
                                        <FormControl name="minLength" autocomplete="off" type="number"
                                                     disabled={false}
                                                     max={999}
                                                     min={0}
                                                     postfix={'cm'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>落料长加</TextRequired>
                                        <FormControl name="blankingLengthAdd" autocomplete="off" type="number"
                                                     disabled={false}
                                                     max={999}
                                                     min={0}
                                                     postfix={'cm'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>最大接单宽</TextRequired>
                                        <FormControl name="maxWidth" autocomplete="off" type="number"
                                                     disabled={false}
                                                     max={999}
                                                     min={0}
                                                     postfix={'cm'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>最小接单宽</TextRequired>
                                        <FormControl name="minWidth" autocomplete="off" type="number"
                                                     disabled={false}
                                                     max={999}
                                                     min={0}
                                                     postfix={'cm'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={8} sm={8} md={8}>
                                    <FormGroup>
                                        <TextRequired accepter={ControlLabel}>落料宽加</TextRequired>
                                        <FormControl name="blankingWidthAdd" autocomplete="off" type="number"
                                                     disabled={false}
                                                     max={999}
                                                     min={0}
                                                     postfix={'cm'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Panel header={'物理信息'} style={{marginBottom: 0}}>
                        <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                            <Row>
                                <Col xs={6} sm={6} md={6}>
                                    <FormGroup className={'app-form-group-inline'}>
                                        <ControlLabel>厚度(高度)</ControlLabel>
                                        <FormControl name="thickness"
                                                     placeholder="请选择"
                                                     postfix={'cm'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <FormGroup className={'app-form-group-inline'}>
                                        <ControlLabel>耐破强度</ControlLabel>
                                        <FormControl name="burst"
                                                     placeholder="请选择"
                                                     postfix={'kpa'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <FormGroup className={'app-form-group-inline'}>
                                        <ControlLabel>边压强度</ControlLabel>
                                        <FormControl name="edgePressure" placeholder="请选择" postfix={'N/m'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <FormGroup className={'app-form-group-inline'}>
                                        <ControlLabel>戳穿强度</ControlLabel>
                                        <FormControl name="puncture" placeholder="请选择"
                                                     postfix={'J'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <FormGroup className={'app-form-group-inline'}>
                                        <ControlLabel>粘合强度</ControlLabel>
                                        <FormControl name="glue" placeholder="请选择"
                                                     postfix={'N/m'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <FormGroup className={'app-form-group-inline'}>
                                        <ControlLabel>抗压强度</ControlLabel>
                                        <FormControl name="compressive" placeholder="请选择"
                                                     postfix={'N'}
                                                     accepter={InputNumber}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                </Form>
            </>
        )
    }

}
