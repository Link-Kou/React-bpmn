import * as React from 'react';

import NavMenu from './component/navMenu'
import NavHead from './component/navHead'
import NavBody from './component/navBody'
import NavLogo from './component/navLogo'
import BaseTool from '../../application/baseTool'
import './index.scss'

export default class BaseView extends React.Component {

    public state = {
        splitPane: false,
        collapsed: true,
        size: 350
    }

    public render() {

        return (
            <div className='app-base'>
                <div className='app-left'>
                    <NavLogo/>
                    <NavMenu/>
                </div>
                <div className='app-right'>
                    <NavHead showTabs={true}>
                        <BaseTool/>
                    </NavHead>
                    <NavBody/>
                </div>
            </div>
        )
    }
}

