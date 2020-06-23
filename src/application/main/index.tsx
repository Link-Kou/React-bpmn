import * as React from 'react';
import {connect} from 'react-redux';

import {Images} from '../../resource/image';

import './index.scss'

class Index extends React.Component {

    public render() {
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={Images.Logo} alt=""/>
                    <div style={{fontSize: 34, marginTop: 47}}>
                        <p style={{float: 'left', marginLeft: -28}}>欢迎使用</p>
                    </div>
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
)(Index)

