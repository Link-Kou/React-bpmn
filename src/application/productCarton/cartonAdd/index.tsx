import * as React from 'react';
import {Alert, Button, ButtonToolbar, Container, Content, Footer, Header} from 'rsuite';
import CartonAddInfoUnified from './component/infoUnified';
import CartonAddnPrintingUnified from './component/printingUnified';
import CartonAddCostUnified from './component/costUnified';
import CartonAddImageUnified from './component/imageUnified';
import {BackColorPanel, LoadPanel, RefPanel, LongPanel, HeadPanel} from '@component/panel';
import CartonAdd from './cartonAdd';
import {ICardboardProductCost, IFormValue, IStateFormValue} from '../index.types';
import {utilsString, utilsUrl} from '@utils/index';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';
import {RouterHistory, RouterPath} from '@router';


export default class Index extends CartonAdd {

    public state = {
        id: undefined,
        formValue: JSON.parse(JSON.stringify(IStateFormValue)),
        costUnifiedData: [],
        loader: true
    }

    componentDidMount() {
        const {location} = this.props
        const search = utilsUrl.getSearch(location?.search);
        if (search) {
            const id = search.get('id');
            this._onLoadEdit(id)
        } else {
            this._onShowLoad()
        }
    }

    /**
     * 加载编辑
     * @private
     */
    private _onLoadEdit = async (id: string = '') => {
        this.handlersGetCarton(id, (Carton: IFormValue, Cardboard: Array<ICardboardProductCost>) => {
            this.setState({
                id,
                formValue: Carton,
                costUnifiedData: Cardboard,
                loader: false
            })
        })
    }

    private _onShowLoad = async () => {
        this.handlersLoadCardboardProductListCost((data: Array<ICardboardProductCost>) => {
            this.setState({
                costUnifiedData: data,
                loader: false
            })
        })
    }

    private _onAddOrEdit = async () => {
        const {formValue, id} = this.state
        const main = formValue?.images?.main?.filter((x: any) => utilsString.isNotEmpty(x));
        const details = formValue?.images?.details?.filter((x: any) => utilsString.isNotEmpty(x));
        if (main.length > 0 && details.length > 0) {
            formValue.images.main = main
            formValue.images.details = details
            await Dialog.SelectLoad({
                title: IntlApi.SaveTitle,
                boby: '',
                callback: (e) => {
                    if (e.success) {
                        this.handlersAddOrEditCarton(formValue, id, () => {
                            e.close()
                        })
                    }
                }
            })
        } else {
            Alert.warning('主图过详情图必须有一张')
        }
        //console.log(JSON.stringify(this.state.formValue, null, 2));
    }

    private _onChange = async (formValue: IFormValue) => {
        this.setState({
            formValue
        })
    }

    public render() {
        const {formValue, costUnifiedData, loader} = this.state
        return (
            <>
                <BackColorPanel style={{height: '100%'}}>
                    <HeadPanel title={'纸箱新增编辑页'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <ButtonToolbar>
                                <Button color="blue" onClick={this._onAddOrEdit}>
                                    发布产品
                                </Button>
                                <Button color="red" onClick={() => {
                                    RouterHistory.push(RouterPath.CartonList)
                                }}>
                                    取消
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </HeadPanel>
                    <LoadPanel loadering={loader} outrender={true} queueAnim={false}>
                        <LongPanel>
                            <RefPanel>
                                {
                                    (ref: any) => (
                                        <Container>
                                            <Header/>
                                            <Content style={{overflow: 'auto'}}>
                                                <CartonAddInfoUnified formValue={formValue}
                                                                      onChange={this._onChange}/>
                                                <CartonAddnPrintingUnified formValue={formValue}
                                                                           onChange={this._onChange}/>
                                                <CartonAddCostUnified formValue={formValue}
                                                                      container={ref}
                                                                      data={costUnifiedData}
                                                                      onChange={this._onChange}/>
                                                <CartonAddImageUnified formValue={formValue}
                                                                       onChange={this._onChange}/>
                                                <hr/>
                                            </Content>
                                            <Footer/>
                                        </Container>
                                    )
                                }
                            </RefPanel>
                        </LongPanel>
                    </LoadPanel>
                </BackColorPanel>
            </>
        )
    }

}
