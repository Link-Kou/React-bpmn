import * as React from 'react';
import {Button} from 'rsuite';
import {connect} from 'react-redux';
import {Images} from '@resource/image';
import {RouterHistory, RouterPath} from '@router';

/**
 * 404页面
 */
class Unusual extends React.Component {

    public render() {
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={Images.Logo} alt=""/>
                    <div style={{fontSize: 34, marginTop: 47}}>
                        <p>404</p>
                    </div>
                    <Button onClick={() => {
                        RouterHistory.push(RouterPath.Main)
                    }}>返回</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: any) => ({
        param: state
    }),
    (dispatch: any) => ({})
)(Unusual)
