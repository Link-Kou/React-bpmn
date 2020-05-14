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
    Input,
    InputGroup,
    InputNumber,
    Modal,
    Radio,
    RadioGroup,
    Row,
    Schema
} from 'rsuite';
import {HookRenderMakeModeForm} from './compose/hookBuiltInOutGroup';
import {HookDataConfigList} from './compose/hookDataConfigList';
import {IArrayDatas, IBasePaper, IFormValue, IStateFormValue} from '../../index.types';
import {LoadPanel} from '@component/panel';
import TextRequired from '@component/textRequired';
import {BigDecimal} from 'bigdecimal';
import numeral from 'numeral'

interface IProps {

    show: boolean

    id: string | number | undefined

    /**
     * 窗口显示事件
     * @param id
     * @param callbackData
     */
    onShow?(id: string | number | undefined, callbackData?: (data: IFormValue, dataConfigList: Array<IArrayDatas>, paperProductList: Array<IArrayDatas>) => void): void

    /**
     * 编辑时间
     * @param id
     * @param data
     * @param callbackCloseLoading
     */
    onEdit?(id: string | number | undefined, data: IFormValue, callbackCloseLoading: () => void): void

    /**
     * 添加时间
     * @param data
     * @param callbackCloseLoading
     */
    onAdd?(data: IFormValue, callbackCloseLoading: () => void): void

    /**
     * 窗口关闭时间
     */
    onClose?(): void
}

interface IState {
    loading: boolean
    disabled: boolean
    hideLoader: boolean
    formValue: IFormValue
    dataConfigList: Array<IArrayDatas>
    paperProductList: Array<IArrayDatas>
    formError?: {}
}

export default class BaseCorrugatedAddEdit extends React.Component<IProps> {

    private _Forms: any;

    private model = Schema.Model({});

    public state: IState = {
        loading: false,
        hideLoader: false,
        disabled: true,
        dataConfigList: [],
        paperProductList: [],
        formValue: IStateFormValue
    }


    private _reset = () => {
        this.setState({
            loading: false,
            hideLoader: false,
            disabled: true,
            formValue: {},
            formError: {}
        })
    }

    private _onHide = () => {
        const {loading} = this.state;
        const {onClose} = this.props;
        if (!loading) {
            onClose?.()
            this._reset()
        }
    }

    /**
     * 保存
     * @private
     */
    private _onSave = () => {
        const {id, onAdd, onEdit} = this.props;
        const {loading, formValue} = this.state
        const hide = () => {
            this.setState({
                loading: false
            }, () => {
                this._onHide()
            })
        }
        if (!loading) {
            if (this._Forms?.check()) {
                this.setState({
                    loading: true
                }, () => {
                    if (id) {
                        onEdit?.(id, formValue, () => {
                            hide()
                        })
                    } else {
                        onAdd?.(formValue, () => {
                            hide()
                        })
                    }
                })
            }
        }
    }

    /**
     * 窗口显示加载
     * @private
     */
    public _onShow = () => {
        const {onShow, id} = this.props;
        onShow?.(id, (data, dataConfigList, paperProductList) => {
            this.setState({
                disabled: false,
                hideLoader: true,
                formValue: data,
                dataConfigList,
                paperProductList
            })
        })
    }

    private _onChangeFormValues = (formValue: any, event: any) => {
        const {makeMode, squarePrice, costPriceMarkup} = formValue as IFormValue
        /**
         * 计算成本价
         * 成本价=平方价+成本价加价
         * @private
         */
        const _CalculaCostPrice = (): string | number => {
            //（buyPrice/1000）×（weight/1000）=1.68（元/m2）
            try {
                const v = {
                    squarePrice: new BigDecimal(String(squarePrice)),
                    costPriceMarkup: new BigDecimal(String(costPriceMarkup))
                }
                const v1 = {
                    costPrice: v.squarePrice.add(v.costPriceMarkup)
                }
                return numeral(v1.costPrice.toString()).format('0.00')
            } catch (e) {
                return 0
            }
        }

        const _ReastMakeMode = () => {
            const MakeModes = {
                //内制
                1: () => {
                    formValue.supplier = ''
                },
                //外协
                2: () => {
                    formValue.basePaperName = ''
                    formValue.basePaperId = ''
                }
            }
            MakeModes[makeMode]()
        }

        _ReastMakeMode()
        formValue.costPrice = _CalculaCostPrice()

        this.setState({
            formValue
        })
    }

    private _onBasePaperChange = (value: any, data: any, callbackForm: () => void) => {
        const {formValue} = this.state
        const newdata = data as Array<IBasePaper>
        const find: IBasePaper | undefined = newdata.find(x => x.id === value);
        this.setState({
            formValue: {
                ...formValue,
                basePaperName: find?.paperName,
                squarePrice: find?.squarePrice
            }
        }, () => {
            callbackForm()
        })
    }

    public render() {
        const {show} = this.props
        const {formValue, formError, disabled, loading, dataConfigList, paperProductList, hideLoader} = this.state
        return (
            <Modal
                size={'sm'}
                backdrop={'static'}
                show={show}
                onShow={this._onShow}
                onHide={this._onHide}
                onExited={this._reset}
            >
                <Modal.Header>
                    <Modal.Title>楞型管理窗口</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoadPanel height={350} hideLoader={hideLoader} outrender={true}>
                        <Form ref={(ref: any) => this._Forms = ref}
                              formValue={formValue}
                              formError={formError}
                              fluid={true}
                              model={this.model}
                              onCheck={(formErrors: any) => {
                                  this.setState({formError: formErrors});
                              }}
                              onChange={this._onChangeFormValues}
                        >
                            <Grid fluid={true} className={'app-grid-from'}>
                                <Row>
                                    <Col xs={24} sm={24} md={24}>
                                        <HookDataConfigList valueKey={'id'}
                                                            labelKey={'title'}
                                                            dataConfigList={dataConfigList}
                                                            name={'type'}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={8} sm={8} md={8}>
                                        <FormGroup>
                                            <ControlLabel>楞型名称</ControlLabel>
                                            <FormControl
                                                name="name"
                                                autocomplete={'off'}
                                                accepter={Input}
                                                inline={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={8} sm={8} md={8}>
                                        <FormGroup>
                                            <ControlLabel>成本价
                                                <HelpBlock tooltip={true}>
                                                    成本价=平方价+成本价加价
                                                </HelpBlock>
                                            </ControlLabel>
                                            <FormControl name="costPrice"
                                                         disabled={true}
                                                         accepter={(props) => (
                                                             <InputGroup>
                                                                 <Input {...props}/>
                                                                 <InputGroup.Addon>元/m²</InputGroup.Addon>
                                                             </InputGroup>
                                                         )}>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={8} sm={8} md={8}>
                                        <FormGroup>
                                            <TextRequired>成本价加价</TextRequired>
                                            <InputGroup>
                                                <FormControl name="costPriceMarkup"
                                                             style={{width: '100%', height: '100%'}}
                                                             postfix={'元/m²'}
                                                             accepter={InputNumber}/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12}>
                                        <FormGroup>
                                            <ControlLabel>制造方式</ControlLabel>
                                            <FormControl
                                                name="makeMode"
                                                accepter={RadioGroup}
                                                inline={true}
                                            >
                                                <Radio value={1}>内制</Radio>
                                                <Radio value={2}>外协</Radio>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <HookRenderMakeModeForm
                                        configValueKey={'id'}
                                        configLabelKey={'title'}
                                        paperLabelKey={'paperName'}
                                        paperValueKey={'id'}
                                        OutsourcingName={'supplier'}
                                        dataConfigList={dataConfigList}
                                        paperProductList={paperProductList}
                                        callbackBasePaperChange={this._onBasePaperChange}
                                        formValue={formValue}/>
                                </Row>
                                <Row>
                                    <Col xs={8} sm={8} md={8}>
                                        <FormGroup>
                                            <ControlLabel>瓦楞系数<HelpBlock
                                                tooltip={true}>即1.59米的瓦楞纸压瓦楞后为1米长</HelpBlock></ControlLabel>
                                            <FormControl name="coefficient"
                                                         accepter={InputNumber}/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={8} sm={8} md={8}>
                                        <FormGroup>
                                            <ControlLabel>高度(楞高)</ControlLabel>
                                            <InputGroup>
                                                <FormControl name="height"
                                                             style={{width: '100%', height: '100%'}}
                                                             postfix={'mm'}
                                                             accepter={InputNumber}/>
                                            </InputGroup>

                                        </FormGroup>
                                    </Col>
                                    <Col xs={8} sm={8} md={8}>
                                        <FormGroup>
                                            <ControlLabel>楞数</ControlLabel>
                                            <InputGroup>
                                                <FormControl name="flute"
                                                             style={{width: '100%', height: '100%'}}
                                                             postfix={'个/m²'}
                                                             accepter={InputNumber}/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Grid>
                        </Form>
                    </LoadPanel>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary"
                            disabled={disabled}
                            loading={loading}
                            onClick={this._onSave}>保存产品</Button>
                    <Button appearance="subtle" onClick={this._onHide}>关闭窗口</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}
