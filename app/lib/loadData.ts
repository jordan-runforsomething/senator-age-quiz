/**
 * Helper method used to extract JSON data from data.csv. Used for static content
 * Leverages convert-csv-to-json: https://www.npmjs.com/package/convert-csv-to-json
 */

import csvToJson from "convert-csv-to-json"
const FILENAME = "app/lib/data.csv"

const json = csvToJson.getJsonFromCsv(FILENAME)
export default json
