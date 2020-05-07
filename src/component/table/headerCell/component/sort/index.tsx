import * as React from 'react';
import {Icon, IconButton} from 'rsuite';

/**
 * 排序头
 * @param props
 * @constructor
 */
export const SortHeaderCell = (props: { children?: any, onSort?(e: boolean): void }) => {
    const [sortTime, setSortTime] = React.useState(false);
    return (
        <>
            {props.children}
            <IconButton appearance="link" onClick={() => {
                props.onSort?.(!sortTime)
                setSortTime(!sortTime)
            }} icon={sortTime ? <Icon icon={'angle-down'}/> : <Icon icon={'angle-up'}/>}/>
        </>
    )
}

