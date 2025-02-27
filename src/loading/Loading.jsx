import React from 'react';
import './loading.css'

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full h-[100vh]">
          <svg className="width spinner">
            <text x="50%" y="50%" dy=".35em" >
              Mobi-Cash
            </text>
          </svg>
        </div>
    );
};

export default Loading;