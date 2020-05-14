import * as React from 'react';

/**
 * 自定义Ref
 * @param children
 * @constructor
 */
export const IndexRefPanel = ({children}: { children: React.ReactChildren | any }) => {
    const containerRef: any = React.createRef<HTMLDivElement>();
    return (
        <div ref={containerRef} style={{position: 'relative'}}>
            {
                (children as any)(() => containerRef.current)
            }
        </div>
    );
}
