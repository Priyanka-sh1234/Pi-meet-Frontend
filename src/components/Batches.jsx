import React from 'react';

const Batches = () => {
  const batch = [
    { name: "Mern Stack", time: "9Am - 11Am", process: "Done" },
    { name: "Mern Stack", time: "11Am - 1Pm", process: "ongoing" },
    { name: "Mern Stack", time: "2Pm - 4Pm", process: "schedule" },
    { name: "Mern Stack", time: "4Pm - 6Pm", process: "schedule" },
  ];

  return (
    <div className="mt-10">
      <h1 className="text-lg font-bold text-neutral-600  mb-2">
        Current Schedule Batches
      </h1>

      {/* Scrollable container */}
      <div
        className="max-h-70 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 space-y-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {batch.map((item, index) => {
          let processTextColor = '';
          let processBgColor = '';

          if (item.process.toLowerCase() === 'done') {
            processTextColor = 'text-green-600';
            processBgColor = 'bg-green-50';
          } else if (item.process.toLowerCase() === 'ongoing') {
            processTextColor = 'text-orange-200';
            processBgColor = 'bg-blue-900';
          } else {
            processTextColor = 'text-blue-600';
            processBgColor = 'bg-blue-100';
          }

          return (
            <div
              key={index}
              className={`
                w-120 p-2 m-5 rounded-xl shadow-md 
                ${processBgColor} text-gray-900
                transition duration-200 transform hover:scale-102 hover:shadow-lg cursor-pointer
              `}
            >
              <div className={`text-sm font-semibold mb-2 capitalize ${processTextColor}`}>
                {item.process}
              </div>

              <div className="flex justify-between items-center text-md">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-900">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button as link to open in new tab */}
      <div className="flex justify-center pr-5">
        <a
          href="http://localhost:5174/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
          
        >
         <button
  className="w-10 h-10 flex items-center pb-1 justify-center font-semibold text-2xl text-white bg-gradient-to-tr from-gray-800 to-gray-600 rounded-full shadow-md mt-2 hover:scale-110 hover:shadow-lg hover:from-gray-700 hover:to-gray-500 transition-all duration-200"
  aria-label="Add"
>
  +
</button>


          
        </a>
      </div>
    </div>
  );
};

export default Batches;
