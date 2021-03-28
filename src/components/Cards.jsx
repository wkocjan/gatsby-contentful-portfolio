import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Card from "./Card"

const Cards = ({ heading, items, hideLastItemOnMobile = false }) => {
  return (
    <div className="container">
      {heading && (
        <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {heading}
        </h2>
      )}
      <div className="flex flex-wrap -mx-3 lg:-mx-6">
        {items.map(item => (
          <div
            className={classNames("w-full sm:w-1/2 lg:w-1/3 p-3 md:p-6", {
              "last:hidden lg:last:block": hideLastItemOnMobile,
            })}
            key={item.id}
          >
            <Card {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

Cards.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Cards
