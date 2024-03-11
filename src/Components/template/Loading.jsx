import React from 'react';
import loader from "/Loading.gif";

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-zinc-950'>
      <img className="mix-blend-lighten " src={loader} alt="Loading..." />
    </div>
  )
}

export default Loading
