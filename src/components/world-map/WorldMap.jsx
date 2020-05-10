import React, { useState } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import worldData from './world.json'

const WorldMap = ({data}) => {
  console.log({data});
  const [isDesktop] = useState(window.innerWidth > 1440);
  const [worlddata] = useState(feature(worldData, worldData.objects.countries).features);
  const [placesLived] = useState(data.placesLived);
  const [placesVisited] = useState(data.placesVisited);
  const [placesTransited] = useState(data.placesTransited);

  const projection = () => {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }

  const handleCountryClick = (countryIndex) => {
    console.log("Clicked on country: ", worlddata[countryIndex])
  }

  const handleMarkerClick = (i) => {
    console.log("Marker: ", placesLived[i].name)
  }

  return (
    <div className="container">
      <div className="flex flex-wrap mx-32 lg:mx-36">
        {isDesktop ? (
        <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
          <g id="countries" className="countries">
            {
              worlddata.map((d,i) => (
                <path
                  id={d.id}
                  key={ `path-${ i }` }
                  d={ geoPath().projection(projection())(d) }
                  className="country"
                  fill={ `rgba(38,50,56,${ 1 / worlddata.length * i})` }
                  stroke="#000000"
                  strokeWidth={ 0.5 }
                  onClick={ () => handleCountryClick(i) }
                />
              ))
            }
          </g>
          <g id="placesLived" className="markers">
            {
              placesLived.map((city, i) => (
                <circle
                  key={ `marker-${i}` }
                  cx={ projection()(city.coordinates)[0] }
                  cy={ projection()(city.coordinates)[1] }
                  r="5"
                  fill="#d81b60"
                  stroke="#FFFFFF"
                  className="marker"
                  onClick={ () => handleMarkerClick(i) }
                />
              ))
            }
          </g>
          <g id="placesVisited" className="markers">
            {
              placesVisited.map((city, i) => (
                <circle
                  key={ `marker-${i}` }
                  cx={ projection()(city.coordinates)[0] }
                  cy={ projection()(city.coordinates)[1] }
                  r="5"
                  fill="#ffc107"
                  stroke="#FFFFFF"
                  className="marker"
                  onClick={ () => handleMarkerClick(i) }
                />
              ))
            }
          </g>
          <g id="placesTransited" className="markers">
            {
              placesTransited.map((city, i) => (
                <circle
                  key={ `marker-${i}` }
                  cx={ projection()(city.coordinates)[0] }
                  cy={ projection()(city.coordinates)[1] }
                  r="5"
                  fill="#ff5722"
                  stroke="#FFFFFF"
                  className="marker"
                  onClick={ () => handleMarkerClick(i) }
                />
              ))
            }
          </g>
        </svg>
        ) : (<div></div>)}
      </div>
    </div>
  )
}

export default WorldMap
