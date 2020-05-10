import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import worldData from './world.json'
import authorData from './author'

class WorldMap extends Component {
  constructor(props) {
    super()
    this.state = {
      isDesktop: false,
      worlddata: [],
      placesLived: [],
      placesVisited: [],
      placesTransited: []
    }
    this.handleCountryClick = this.handleCountryClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }

  handleCountryClick(countryIndex) {
    console.log("Clicked on country: ", this.state.worlddata[countryIndex])
  }

  handleMarkerClick(i) {
    console.log("Marker: ", this.state.placesLived[i].name)
  }

  componentDidMount() {
    this.setState({
      isDesktop: window.innerWidth > 1440,
      worlddata: feature(worldData, worldData.objects.countries).features,
      placesLived: authorData.placesLived,
      placesVisited: authorData.placesVisited,
      placesTransited: authorData.placesTransited
    })
  }

  render() {
    return (
      <div className="container">
        <div className="flex flex-wrap mx-32 lg:mx-36">
          {this.state.isDesktop ? (
          <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
            <g id="countries" className="countries">
              {
                this.state.worlddata.map((d,i) => (
                  <path
                    id={d.id}
                    key={ `path-${ i }` }
                    d={ geoPath().projection(this.projection())(d) }
                    className="country"
                    fill={ `rgba(38,50,56,${ 1 / this.state.worlddata.length * i})` }
                    stroke="#000000"
                    strokeWidth={ 0.5 }
                    onClick={ () => this.handleCountryClick(i) }
                  />
                ))
              }
            </g>
            <g id="placesLived" className="markers">
              {
                this.state.placesLived.map((city, i) => (
                  <circle
                    key={ `marker-${i}` }
                    cx={ this.projection()(city.coordinates)[0] }
                    cy={ this.projection()(city.coordinates)[1] }
                    r="5"
                    fill="#d81b60"
                    stroke="#FFFFFF"
                    className="marker"
                    onClick={ () => this.handleMarkerClick(i) }
                  />
                ))
              }
            </g>
            <g id="placesVisited" className="markers">
              {
                this.state.placesVisited.map((city, i) => (
                  <circle
                    key={ `marker-${i}` }
                    cx={ this.projection()(city.coordinates)[0] }
                    cy={ this.projection()(city.coordinates)[1] }
                    r="5"
                    fill="#ffc107"
                    stroke="#FFFFFF"
                    className="marker"
                    onClick={ () => this.handleMarkerClick(i) }
                  />
                ))
              }
            </g>
            <g id="placesTransited" className="markers">
              {
                this.state.placesTransited.map((city, i) => (
                  <circle
                    key={ `marker-${i}` }
                    cx={ this.projection()(city.coordinates)[0] }
                    cy={ this.projection()(city.coordinates)[1] }
                    r="5"
                    fill="#ff5722"
                    stroke="#FFFFFF"
                    className="marker"
                    onClick={ () => this.handleMarkerClick(i) }
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
}

export default WorldMap

export const query = graphql`
  query WorldMapQuery {
    portfolio: allContentfulPortfolio {
      nodes {
        slug
      }
    }
  }
`
