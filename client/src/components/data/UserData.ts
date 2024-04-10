/* eslint-disable @typescript-eslint/no-explicit-any */

export const listened = (albums: any) => {
  return albums.length
}

export const followers = () => {
  //TODO
  return 0
}

export const albumRatingStats = (albums: any[]) => {
  const ratingDict: { [key: number]: number } = {}
  
  for (let i = 1; i <= 10; i++) {
    ratingDict[i] = 0
  }
  
  albums.forEach((album) => {
    if (album.attributes.rating && ratingDict[album.attributes.rating] !== undefined) { 
      ratingDict[album.attributes.rating] += 1
    }
  })

  return ratingDict
}