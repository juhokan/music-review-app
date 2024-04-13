/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { albumRatingStats, listened } from "./UserData"

interface AlbumRatingDataProps {
  readonly albums: any[];
}

const AlbumRatingData: React.FC<AlbumRatingDataProps> = ({ albums }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [hoveredCount, setHoveredCount] = useState<number>(0)
  const allRatings = albums.length
  const ratingDict = albumRatingStats(albums)
  const MAX_HEIGHT = 62

  const highestRatingAmount = () => {
    let largestValue = 0
    for (const key in ratingDict) {
      if (ratingDict[key] > largestValue) {
        largestValue = ratingDict[key]
      }
    }
    return largestValue
  }

  const ratingBar = (rating: number, count: number) => {
    const multiplicationFactor = allRatings / (highestRatingAmount()^2 / count)
    const height = (count / allRatings) * MAX_HEIGHT * multiplicationFactor

    return (
      <div>
        <div className='rating-bar' style={{height: `${height + 2}px`}}
          onMouseEnter={() => { 
            setHoveredRating(rating) 
            setHoveredCount(count)
          }}
          onMouseLeave={() => {
            setHoveredRating(null) 
            setHoveredCount(0)
          }}>
        </div>

      </div>
    )
  }

  return (
    <div className='rating-bar-data-container'>
      {hoveredRating ? 
        <h3 style={{fontSize: '24px'}} className='rating-bar-data-header'>
          {hoveredCount} {hoveredRating}'s ({Math.floor((hoveredCount / allRatings) * 100)}%)</h3> 
        : 
        <h3 style={{fontSize: '24px'}} className='rating-bar-data-header'>Albums: {listened(albums)}</h3>}
      <div className='rating-bar-container'>
        <h3 className='rating-bar-number'>1</h3>
        {Object.entries(ratingDict).map(([rating, count]) => (
          <div key={rating}>
            {ratingBar(parseInt(rating), count)}
          </div>
        ))}
        <h3 className='rating-bar-number'>10</h3>
      </div>
    </div>
  )
}

export default AlbumRatingData