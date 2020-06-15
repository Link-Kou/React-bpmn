import * as React from 'react';
import {Calendar, Col, Dropdown, Grid, Panel, Row, Tag, TagGroup} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';

/**
 *
 * @author lk
 * @date 2020/6/14 13:51
 * @version 1.0
 */
export default class MarketBuyRest extends React.Component {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={6} sm={6} md={6} smHidden={true}/>
                        <Col xs={7} sm={7} md={7}>
                            <BackColorPanel tableBordered={true}>
                                <div style={{height: 750}}>
                                    <Calendar compact={false} bordered={true}/>
                                </div>
                            </BackColorPanel>
                        </Col>
                        <Col xs={5} sm={5} md={5}>
                            <BackColorPanel tableBordered={true} panelHeadPadding={true}>
                                <Panel style={{padding: 0}} header={
                                    <HeadPanel hideBorderBottom={true} title={'非营业时间'}>
                                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                            <Dropdown title={'产品管理'} trigger="click" onSelect={(e) => {

                                            }}>
                                                <Dropdown.Item>新增产品</Dropdown.Item>
                                                <Dropdown.Item>分类排序</Dropdown.Item>
                                            </Dropdown>
                                        </div>
                                    </HeadPanel>
                                }>
                                    <LoadPanel height={750 - 85} loadering={false}>
                                        <TagGroup style={{display: 'flex', flexDirection: 'column'}}>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                            <Tag closable={true}>2020-10-11</Tag>
                                        </TagGroup>
                                    </LoadPanel>
                                </Panel>
                            </BackColorPanel>
                        </Col>
                        <Col xs={6} sm={6} md={6} smHidden={true}/>
                    </Row>
                </Grid>
            </>
        )
    }
}
