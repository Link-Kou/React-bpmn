import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import {BackColorPanel} from '@component/panel';
import PriceListTable from './component/priceListTable';
import PriceElTree from './component/priceElTree';
import SplitterLayout from 'react-splitter-layout';


/**
 *
 * @author lk
 * @date 2020/5/6 22:34
 * @version 1.0
 */
export default class MarketPrice extends React.Component {

    public render() {
        return (
            <>
                <SplitterLayout primaryIndex={0}
                                percentage={true}
                                primaryMinSize={50}
                                secondaryMinSize={42}
                                secondaryInitialSize={42}>
                    <div style={{paddingRight: 5}}>
                        <BackColorPanel tableBordered={true}>
                            <PriceListTable/>
                        </BackColorPanel>
                    </div>
                    <div style={{paddingLeft: 5}}>
                        <BackColorPanel panelBodyPadding={true} tableBordered={true}>
                            <PriceElTree/>
                        </BackColorPanel>
                    </div>
                </SplitterLayout>
                <Grid fluid={true} style={{display: 'none'}}>
                    <Row>
                        <Col xs={14} sm={14} md={14} smHidden={true}>
                            <BackColorPanel tableBordered={true}>
                                <PriceListTable/>
                            </BackColorPanel>
                        </Col>
                        <Col xs={10} sm={10} md={10}>
                            <BackColorPanel panelBodyPadding={true} tableBordered={true}>
                                <PriceElTree/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}

