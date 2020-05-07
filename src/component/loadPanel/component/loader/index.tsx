import * as React from 'react';
import './index.scss'
import Loader from 'react-loaders'

interface IProps {
    classPrefix?: string
}

export default class LoadPanelLoader extends React.Component<IProps> {
    public state = {
        show: true
    }

    public render() {
        const {classPrefix} = this.props
        const newclassName = classPrefix ? classPrefix + ' app-handle-img-loader-box' : 'app-handle-img-loader-box'
        return (
            <div className={newclassName}>
                {/*<div className={'app-handle-img-loader'}/>*/}
                <Loader type="ball-scale-multiple" active={true}/>
            </div>
        )
    }
}
