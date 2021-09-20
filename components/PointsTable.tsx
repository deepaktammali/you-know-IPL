import React, { useMemo } from 'react'

function PointsTable() {
    const points = useMemo(() =>{
        const tempPointsArr = [];
        for (let i=0;i<15;i++){
            tempPointsArr.push(i+1);
        }    
        return tempPointsArr;
    }, []);
    return (
        <div>
            
        </div>
    )
}

export default PointsTable
