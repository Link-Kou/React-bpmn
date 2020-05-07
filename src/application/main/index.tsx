import * as React from 'react';
import {connect} from 'react-redux';

import {Images} from '../../resource/image';

import './index.scss'

class Index extends React.Component {

    public render() {
        return (
            <div style={{
                background: `url(${Images.bg2})`,
                backgroundSize: 'cover',
                height: '100%'
            }}>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{position: 'absolute', left: 'calc(50% - 72px)', top: 'calc(50% - 120px)'}}>
                        <img src={Images.Logo2} alt=""/>
                        <div style={{fontSize: 34, marginTop: 47}}>
                            <p style={{float: 'left', marginLeft: -28}}>欢迎使用纸淘商城运营管理系统</p>
                        </div>
                    </div>
                </div>
                <p style={{fontSize: 18, position: 'absolute', bottom: 0, marginLeft: '50%', left: 25}}>
                    南京智渠云科技有限公司出品
                </p>
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

