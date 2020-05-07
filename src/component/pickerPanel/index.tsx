import React from 'react';

/**
 * 自定义Picker的容器,防止boolean
 */
export default class PickerPanel extends React.Component {

    public container: any

    render() {
        const {children} = this.props;
        const childrens: any = children
        return (
            <div ref={ref => {
                this.container = ref;
            }} style={{overflow: 'auto', position: 'relative'}}>
                <div>
                    {
                        childrens(() => {
                            return this.container;
                        })
                    }
                </div>
            </div>
        );
    }
}
