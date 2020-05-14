import * as React from 'react';
import './body.scss'
import {RouterBaseItemPath} from '@router';

export default class Index extends React.Component {

    public state = {}

    public render() {
        return (
            <div className='app-body'>
                <div className='app-nav-Body'>
                    <RouterBaseItemPath/>
                </div>
            </div>

        )
    }
}
