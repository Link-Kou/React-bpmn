import {Carousel, Table} from 'rsuite';
import * as React from 'react';

const {Cell} = Table;


interface IHooKCarousel {

    rowHeight?: number

    dataKey?: string

    [x: string]: any
}

/**
 *
 * @author lk
 * @date 2020/5/2 18:03
 * @version 1.0
 */
export const HooKCarousel = (props: IHooKCarousel) => {
    const {rowData, rowHeight, height} = props
    const images: Array<any> | undefined = rowData?.images
    const newheight = rowHeight ?? height
    return (
        <Cell {...props} style={{padding: 0, height: newheight}}>
            <Carousel placement={'bottom'} shape={'dot'} style={{height: newheight, backgroundColor: '#fff'}}>
                {(
                    images?.filter((k, i, a) => k.type === 1).map((k: any, i: any, a: any) => {
                        return (
                            <img style={{objectFit: 'contain', backgroundColor: '#fff'}} height={'100%'}
                                 src={k.url}
                                 alt={''}/>
                        )
                    })
                )}
            </Carousel>
        </Cell>
    )
}
