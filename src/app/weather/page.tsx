import React from 'react'

export default function Weather() {
  return (
    <div className='bg-black text-white min-h-screen p-6'>
      {/* Header */}
      <div className='text-2xl font-bold mb-6'>Weather Dashboard</div>

      <div className='grid grid-cols-12 gap-6'>

        <div className='col-span-4 space-y-4'>
          <div className='bg-emerald-950 p-4 rounded'>
            <h2 className='text-lg font-semibold'>Current Forecast Per Track</h2>
          </div>
          {/* A loop to render the 6 weather tracks */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='bg-gray-800 p-4 rounded'>
              <h3>Track {i + 1}</h3>
              <p>Wind: km/h</p>
              <p>Temperature:#</p>
              <p>Humidity: #%</p>
            </div>
          ))}
        </div>
        <div className='col-span-8 space-y-4'>
          {/* Dropdown Menu */}
          <div className='flex justify-between items-center bg-emerald-950 p-4 rounded'>
            <h2 className='text-lg font-semibold'>Select a Track</h2>
            <select className='py-4 px-2 bg-gray-800 rounded fill-current'>
              <option value='1'>Track 1</option>
              <option value='2'>Track 2</option>
              <option value='3'>Track 3</option>
              <option value='4'>Track 4</option>
              <option value='5'>Track 5</option>
              <option value='6'>Track 6</option>
            </select>
          </div>

          <div className='grid grid-cols-12 grid-rows-3 gap-6'>
            {/* Wind DirectionGraph */}
            <div className='col-span-6 row-span-1 p-4 rounded'>
              <h2 className='text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl'>Wind Direction for Selected Track</h2>
              <div className='h-40 bg-gray-800 rounded mt-4'></div>
            </div>

            {/* Wind Speed Graph */}
            <div className='col-span-6 row-span-2 p-4 rounded grid-flow-col-dense'>
              <h2 className='text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl'>Map view for Selected Track</h2>
              <div className='h-5/6 row-span-2 bg-gray-800 rounded mt-4'></div>
            </div>

            <div className='col-span-6 row-span-1 0 p-4 rounded'>
              <h2 className='text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl'>Wind Direction for Selected Track</h2>
              <div className='h-40 bg-gray-800 rounded mt-4'></div>
            </div>

            <div className='col-span-6 w-full col-span-12  p-4 rounded'>
              <h2 className='text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl'>Wind Direction for Selected Track</h2>
              <div className='h-40 w-full col-span-12 bg-gray-800 rounded mt-4'></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
};
