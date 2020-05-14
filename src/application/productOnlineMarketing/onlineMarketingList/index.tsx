import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import QueueAnim from 'rc-queue-anim';
import {BackColorPanel} from '@component/panel';
import OnlineMarketingList from './onlineMarketingList';
import MarketingProductTable from './component/marketingProductTable';
import MarketingProgramList from './component/marketingProgramList';

/**
 *
 * @author lk
 * @date 2020/5/6 22:34
 * @version 1.0
 */
export default class Index extends OnlineMarketingList {
    public render() {
        return (
            <div className={'app-panel'}>
                <Grid fluid={true}>
                    <Row>
                        <QueueAnim type={['left', 'right']}
                                   ease={['easeInOutQuad', 'easeInBack']}>
                            <div key='a'>
                                <Col xs={10} sm={8} md={8} smHidden={true}>
                                    <BackColorPanel>
                                        <MarketingProgramList/>
                                    </BackColorPanel>
                                </Col>
                            </div>
                            <div key='b'>
                                <Col xs={14} sm={24} md={16}>
                                    <BackColorPanel tableBordered={true}>
                                        <MarketingProductTable/>
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

