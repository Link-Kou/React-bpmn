import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import {TypeConfigPanelItemGroupList, TypeConfigPanelList} from './component';
import typeConfig from './typeConfig';
import {BackColorPanel} from '@component/panel';

export default class TypeConfig extends typeConfig {

    public render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} style={{overflow: 'auto'}} xsHidden={true}
                         smHidden={true}>
                        <BackColorPanel>
                            <TypeConfigPanelList title={'所有分类'}
                                                 type={'All'}
                                                 id={''}
                                                 valueKey={'id'}
                                                 labelKey={'title'}
                                                 onMountLoad={this.handlersOnLoadTypeConfigTitleList}
                                                 onLoad={this.handlersOnLoadTypeConfigTitleList}
                                                 onLoadSortableList={this.handlersOnSortableList}
                                                 onSaveSortableList={this.handlersOnSaveSortableList}
                                                 onAddGroup={this.handlersOnAddGroup}
                                                 onAddItem={this.handlersOnAddItem}
                                                 onDel={this.handlersOnDelTitle}
                                                 hideDel={true}/>
                        </BackColorPanel>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                        <BackColorPanel>
                            <TypeConfigPanelItemGroupList valueKey={'id'}
                                                          labelKey={'title'}
                                                          onLoad={this.handlersOnLoadTypeConfigOtherList}
                                                          onSaveSortableList={this.handlersOnSaveSortableList}
                                                          onLoadSortableList={this.handlersOnSortableList}
                                                          onDelOtherTitle={this.handlersOnDelTitle}
                                                          onAddOtherItem={this.handlersOnAddItem}
                                                          onAddOtherGroup={this.handlersOnAddGroup}
                                                          onAddOtherTitle={this.handlersOnAddOtherTitle}/>
                        </BackColorPanel>
                    </Col>
                </Row>
            </Grid>
        )
    }
}



