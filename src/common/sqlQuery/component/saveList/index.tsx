import * as React from 'react';
import {FlexboxGrid, Icon, List} from 'rsuite';
import './index.scss'

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '45px',
    padding: '5px'
};


/**
 *
 * @author lk
 * @date 2020/5/23 16:51
 * @version 1.0
 */
export default class index extends React.Component {

    render() {
        return (

            <List hover={true}>
                <List.Item key={''} index={0}>
                    <FlexboxGrid.Item
                        style={{
                            ...styleCenter,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            overflow: 'hidden'
                        }}
                    >
                        <div className={'app-script-name'}>默认</div>
                        <div className={'app-script-slimText'}>
                            <div><Icon icon="calendar" style={{marginRight: 5}}/>2019-10-13 00:00:00</div>
                        </div>
                    </FlexboxGrid.Item>
                </List.Item>
                <List.Item key={''} index={1} style={{backgroundColor: '#f2f9fe'}}>
                    <FlexboxGrid.Item
                        style={{
                            ...styleCenter,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            overflow: 'hidden'
                        }}
                    >
                        <div className={'app-script-name'}>默认</div>
                        <div className={'app-script-slimText'}>
                            <div><Icon icon="calendar" style={{marginRight: 5}}/>2019-10-13 00:00:00</div>
                        </div>
                    </FlexboxGrid.Item>
                </List.Item>
            </List>
        );
    }
}
