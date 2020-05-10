import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, Input, Panel, Row, Schema} from 'rsuite'
import TextRequired from '@component/textRequired';
import {FormImageUploader} from '@component/formControl';
import {IFormValue} from '../../../index.types';

interface IProps {
    formValue?: IFormValue

    onChange?(data: IFormValue): void
}

export default class ProductInfoUnified extends React.Component<IProps> {

    private model = Schema.Model({
        name: Schema.Types.StringType()
            .minLength(1, '不能少于一个字')
            .maxLength(30, '最大支持30个字')
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
            <Panel header={''}>
                <Form fluid={true}
                      layout="vertical"
                      className={'app-form-group-vertical'}
                      formValue={_formValue}
                      model={this.model}
                      formError={_formError}
                      onCheck={(formError) => {
                          this.setState({
                              formError
                          })
                      }}
                      onChange={this._onFormValueChange}>
                    <Grid style={{padding: 10}} fluid={true}>
                        <Row>
                            <Col xs={5} sm={24} md={10}>
                                <FormGroup>
                                    <TextRequired accepter={ControlLabel}>商品标题</TextRequired>
                                    <FormControl name="name"
                                                 autocomplete={'off'}
                                                 placeholder="限30字，必填"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={5} sm={24} md={10} xsHidden={true}>
                                <FormGroup>
                                    <TextRequired accepter={ControlLabel}>商品描述</TextRequired>
                                    <FormControl name="subname"
                                                 autocomplete={'off'}
                                                 placeholder="限30字，非必填"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                <FormGroup>
                                    <ControlLabel>商品品牌</ControlLabel>
                                    <FormControl name="brandName"
                                                 autocomplete={'off'}
                                                 placeholder="请输入商品品牌"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={7}>
                                <FormGroup>
                                    <TextRequired accepter={ControlLabel}>商品单位</TextRequired>
                                    <FormControl name="productUnit"
                                                 autocomplete={'off'}
                                                 placeholder="请输入商品单位，必填"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <TextRequired accepter={ControlLabel}>商品编码</TextRequired>
                                    <FormControl name="productCode"
                                                 autocomplete={'off'}
                                                 placeholder="请输入商品编码(可重复)，必填"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <FormGroup>
                                    <ControlLabel>商品主图</ControlLabel>
                                    <FormControl name="images"
                                                 callbackFileUrl={(value: any) => {
                                                     return value?.main ? [value?.main] : []
                                                 }}
                                                 callbackChange={(value: any, fileUrl: Array<any>, callbackForm: () => void) => {
                                                     value.main = fileUrl[0]
                                                     callbackForm();
                                                 }}
                                                 accepter={FormImageUploader}/>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup>
                                    <ControlLabel>品牌LOGO</ControlLabel>
                                    <FormControl name="images"
                                                 callbackFileUrl={(value: any) => {
                                                     return value?.logo ? [value?.logo] : []
                                                 }}
                                                 callbackChange={(value: any, fileUrl: Array<any>, callbackForm: () => void) => {
                                                     value.logo = fileUrl[0]
                                                     callbackForm();
                                                 }}
                                                 accepter={FormImageUploader}/>
                                </FormGroup>
                            </Col>
                            <Col xs={7}>
                                <Row>
                                    <Col xs={24}>
                                        <FormGroup>
                                            <ControlLabel>商品产地</ControlLabel>
                                            <FormControl name="productOrigin"
                                                         autocomplete={'off'}
                                                         placeholder="请输入商品产地，选填"
                                                         accepter={Input}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24}>
                                        <FormGroup>
                                            <ControlLabel>商品型号</ControlLabel>
                                            <FormControl name="productModel"
                                                         autocomplete={'off'}
                                                         placeholder="请输入商品型号，选填"
                                                         accepter={Input}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24}>
                                        <FormGroup>
                                            <ControlLabel>商品类型</ControlLabel>
                                            <FormControl name="productType"
                                                         autocomplete={'off'}
                                                         placeholder="请输入商品类型，选填"
                                                         accepter={Input}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                <FormGroup>
                                    <ControlLabel>商品重量</ControlLabel>
                                    <FormControl name="productWeight"
                                                 autocomplete={'off'}
                                                 placeholder="请输入商品重量，选填"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={7}>
                                <FormGroup>
                                    <ControlLabel>商品长宽</ControlLabel>
                                    <FormControl name="productLength"
                                                 autocomplete={'off'}
                                                 placeholder="请输入商品长宽，选填"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <ControlLabel>商品体积</ControlLabel>
                                    <FormControl name="productVolume"
                                                 autocomplete={'off'}
                                                 placeholder="请输入商品体积，选填"
                                                 accepter={Input}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }

}
