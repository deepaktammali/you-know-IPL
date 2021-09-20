import React, { useState } from 'react'

function LifeLineOption({children,lifelineType,handleLifelineClick}) {

    const [used,setUsed] = useState(false);

    const handleClick = ()=>{
        if(used){
            return ;
        }
        handleLifelineClick(lifelineType);
        setUsed(true);
    }

    return (
        <span onClick={handleClick} className={`flex items-center justify-center w-16 rounded-3xl py-2 px-2 text-sm ${used?'bg-gray-300':'cursor-pointer bg-blue-200 hover:bg-blue-500 hover:text-white'}`}>
            {children}
        </span>
    )
}

export default LifeLineOption
