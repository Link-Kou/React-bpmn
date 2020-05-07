import {Panel} from 'rsuite';
import {ImageCardView} from '@component/imageManager';
import * as React from 'react';
import {IReturnCartonProduct} from '../../../../index.types';


export const HooKRowExpanded = (props: { w: number, rowData: IReturnCartonProduct }) => {
    const {w, rowData} = props
    return (
        <div style={{width: w - 60}}>
            <Panel header="详情图">
                <div style={{display: 'flex'}}>
                    {
                        rowData?.images?.filter((k, i, a) => k.type === 2).map((k, i, a) => (
                            <ImageCardView
                                fileUrl={k.url}/>
                        ))
                    }
                </div>
            </Panel>
        </div>
    )
}
