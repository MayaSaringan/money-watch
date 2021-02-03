const port = "8000";
const baseEndpoint = `http://localhost:${port}`
const  debugVars = {
  endpoint: baseEndpoint,
  itemsEndpoint: `${baseEndpoint}/items/`,
  addItemsEndpoint: `${baseEndpoint}/items/add/`,
}
export default debugVars;