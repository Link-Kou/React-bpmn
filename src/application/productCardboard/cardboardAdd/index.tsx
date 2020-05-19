import * as React from 'react';
import {Alert, Button, ButtonToolbar, Container, Content, Footer, Header} from 'rsuite';
import CardboardAddInfoUnified from './component/infoUnified';
import CardboardLayerInfoTable from './component/layerInfoTable';
import CardboardAddCostUnified from './component/costUnified';
import CardboardAddImageUnified from './component/imageUnified';
import {IBaseCorrugated, IBasePaper, IFormValue, IStateFormValue} from '../index.types';
import CardboardAdd from './CardboardAdd';
import {BackColorPanel, LoadPanel, LongPanel, HeadPanel} from '@component/panel';
import {utilsString, utilsUrl} from '@utils/index';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';
import {RouterHistory, RouterPath} from '@router';

export default class Index extends CardboardAdd {

    public state = {
        formValue: JSON.parse(JSON.stringify(IStateFormValue)),
        id: undefined,
        basePaper: [],
        corrugated: [],
        hideLoader: false
    }

    componentDidMount(): void {
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
    private _onLoadEdit = (id: string = '') => {
        //TODO bug 编辑的时候没有调用 handlersLoadPaperAndCorrugated 接口
        this.handlersGetCardboard(id, (cardboard: IFormValue) => {
            this.setState({
                id,
                formValue: cardboard,
                hideLoader: true
            })
        })
    }

    /**
     * 显示加载
     * @private
     */
    private _onShowLoad = () => {
        this.handlersLoadPaperAndCorrugated((basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => {
            this.setState({
                basePaper,
                corrugated,
                hideLoader: true
            })
        });
    }

    /**
     * 参数改变
     * @param formValue
     * @private
     */
    private _onChange = async (formValue: IFormValue) => {
        this.setState({
            formValue
        })
    }

    /**
     * 添加和保存
     * @private
     */
    private _onAddOrEdit = async () => {
        const {formValue, id} = this.state
        const main = formValue?.images?.main?.filter((x: any) => utilsString.isNotEmpty(x));
        const details = formValue?.images?.details?.filter((x: any) => utilsString.isNotEmpty(x));
        const layers = formValue?.layers?.filter((x: { layerNum: number; }) => x.layerNum <= formValue.layerNum);
        if (main.length > 0 && details.length > 0) {
            if (layers.length === formValue.layerNum) {
                formValue.images.main = main
                formValue.images.details = details
                formValue.layers = layers
                await Dialog.SelectLoad({
                    title: IntlApi.SaveDelTitle,
                    boby: '',
                    callback: (e) => {
                        if (e.success) {
                            this.handlersAddOrEditCardboard(formValue, id, () => {
                                e.close()
                            })
                        }
                    }
                })
            } else {
                Alert.warning('请选择构建纸板产品的每一层属性')
            }
        } else {
            Alert.warning('主图过详情图必须有一张')
        }

    }


    public render() {
        const {formValue, basePaper, corrugated, hideLoader} = this.state
        return (
            <>
                <BackColorPanel style={{height: '100%'}}>
                    <HeadPanel title={'纸板新增编辑页'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <ButtonToolbar>
                                <Button color="blue" onClick={this._onAddOrEdit}>
                                    发布产品
                                </Button>
                                <Button color="red" onClick={() => {
                                    RouterHistory.push(RouterPath.CardboardList)
                                }}>
                                    取消
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </HeadPanel>
                    <LoadPanel loadering={hideLoader} outrender={true} queueAnim={false}>
                        <LongPanel style={{backgroundColor: '#fff'}}>
                            <Container>
                                <Header/>
                                <Content style={{overflow: 'auto'}}>
                                    <CardboardAddInfoUnified
                                        formValue={formValue}
                                        onChange={this._onChange}
                                    />
                                    <CardboardAddImageUnified
                                        formValue={formValue}
                                        onChange={this._onChange}/>
                                    <CardboardLayerInfoTable
                                        formValue={formValue}
                                        basePaper={basePaper}
                                        corrugated={corrugated}
                                        onChangeTableData={this._onChange}
                                    />
                                    <CardboardAddCostUnified
                                        formValue={formValue}
                                        onChange={this._onChange}
                                    />
                                </Content>
                                <Footer/>
                            </Container>
                        </LongPanel>
                    </LoadPanel>
                </BackColorPanel>
            </>
        )
    }

}
