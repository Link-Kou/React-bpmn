import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import BaseCorrugatedPanelList from './component/corrugatedList';
import BaseCorrugatedTable from './component/corrugatedTable';
import {BackColorPanel} from '@component/panel';
import BaseCorrugated from './baseCorrugated';

export default class index extends BaseCorrugated {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={19} sm={24} md={19}>
                            <BackColorPanel tableBordered={true}>
                                <BaseCorrugatedTable
                                    onShowCorrugatedAddEdit={this.onShowCorrugatedAddEdit}
                                    onLoadTableData={this.handlersLoadTableData}
                                    onCorrugatedAddSave={this.handlersCorrugatedAddSave}
                                    onCorrugatedEditSave={this.HandlersCorrugatedEditSave}
                                />
                            </BackColorPanel>
                        </Col>
                        <Col xs={5} sm={5} md={5} smHidden={true}>
                            <BackColorPanel>
                                <BaseCorrugatedPanelList
                                    labelKey={'title'}
                                    valueKey={'id'}
                                    onLoad={this.handlersLoadConfigAll}
                                    onAddItem={this.handlersAddConfigItem}
                                    onDelItem={this.handlersDelItem}
                                    onLoadEditList={this.handlersLoadEditList}
                                    onEditSave={this.handlersEditSave}
                                />
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
