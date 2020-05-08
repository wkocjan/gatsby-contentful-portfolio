import React from 'react'

const Quotes = ({ data }) => {
  return (
    <div>
      {data && data.map(item =>
        <div key={item.id} className="bg-gray-200 border-l-4 border-green-500 text-green-500 p-2 mb-2" role="alert">
          <p className="font-bold">{item.quote}</p>
        </div>
      )}
    </div>
  )
}

export default Quotes
