import React from 'react';
import notFound from "/404.gif";

const NotFound = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-zinc-950'>
      <img className="mix-blend-lighten " src={notFound} alt="Loading..." />
    </div>
  )
}

export default NotFound
