import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import BasePaperConfigPanelList from './component/panelConfigList';
import BasePaperTable from './component/paperTable';
import {BackColorPanel} from '@component/panel';
import BasePaper from './BasePaper';
import QueueAnim from 'rc-queue-anim';

class index extends BasePaper {

    public render() {
        return (
            <div className={'app-panel'}>
                <Grid fluid={true}>
                    <Row>
                        <QueueAnim type={['left', 'right']}
                                   ease={['easeInOutQuad', 'easeInBack']}>
                            <div key='a'>
                                <Col xs={19} sm={19} md={19}>
                                    <BackColorPanel tableBordered={true}>
                                        <BasePaperTable valueKey={'id'}
                                                        labelKey={'title'}
                                                        onLoadTableData={this.handleILoadPagesPaperProductList}
                                                        onLoadSearchTableData={this.handlersLoadExpression}
                                                        onShowPaperAddEdit={this.handlersShowPaperAddEdit}
                                                        onPaperSynPriceProduct={this.handlersSynPaperPriceProduct}
                                                        onPaperEditSave={this.handlerPaperEditSave}
                                                        onPaperAddSave={this.handlerPaperAddSave}/>
                                    </BackColorPanel>
                                </Col>
                            </div>
                            <div key='b'>
                                <Col xs={5} sm={5} md={5} smHidden={true}>
                                    <BackColorPanel>
                                        <BasePaperConfigPanelList valueKey={'id'}
                                                                  labelKey={'title'}
                                                                  onLoad={this.handlersOnLoadConfigList}
                                                                  onDelItem={this.handlersDelConfigItem}
                                                                  onEditSave={this.handlersSaveConfigItemList}
                                                                  onLoadEditList={this.handlersLoadPaperConfigItemLis}
                                                                  onAddItem={this.handlersOnAddConfigItem}/>
                                    </BackColorPanel>

                                </Col>
                            </div>
                        </QueueAnim>
                    </Row>
                </Grid>
            </div>

        )
    }
}

export default index
