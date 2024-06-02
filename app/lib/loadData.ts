/**
 * Helper method used to extract JSON data from data.csv. Used for static content
 * Leverages convert-csv-to-json: https://www.npmjs.com/package/convert-csv-to-json
 */
import csvtojson from "csvtojson"
import _ from "lodash"

const FILENAME = "app/lib/data.csv"

const GetData = async function () {
  const data: SenatorData[] = await csvtojson().fromFile(FILENAME)
  // We randomly choose an image for each senator
  const result: SenatorData[] = _.map(data, (val: SenatorData) => {
    let idx = _.random(1, val.image_count).toString()
    if (idx === "1") idx = ""
    const imageName = `/images/${val.image_slug}${idx}.${val.image_format}`
    return { ...val, image_url: imageName }
  })
  return result
}
export default GetData

export type SenatorData = {
  song_link: string
  title: string
  artist: string
  birthday: string
  last_name: string
  first_name: string
  image_slug: string
  image_format: string
  image_count: number
  image_url: string
  state: string
}
