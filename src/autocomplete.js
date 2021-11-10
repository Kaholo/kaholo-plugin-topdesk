const parsers = require("./parsers");
const { helper } = require("./helpers");

const TopDeskService = require('./topdesk.service');
const MAX_RESULTS = 10;

// auto complete helper methods

function mapAutoParams(autoParams){
  const params = {};
  autoParams.forEach(param => {
    params[param.name] = parsers.autocomplete(param.value);
  });
  return params;
}

/***
 * @returns {[{id, value}]} filtered result items
 ***/
function handleResult(result, query, keyField, valField){
  if (!result || result.length == 0) return [];
  if (!keyField) {
    keyField = "id";
    valField = "name";
  }
  const items = result.map(item => getAutoResult(item[keyField], item[valField]));
  return filterItems(items, query);
}

/***
 * @returns {{id, value}} formatted autocomplete item
 ***/
function getAutoResult(id, value) {
  value = value.replace(/ ?\& ?/g, " and ");
  return {
    id: id || value,
    value: value || id
  };
}

function filterItems(items, query){
  if (query){
    // split by ./ /-/_ and make lower case
    const qWords = query.split(/[. \_\-]/g).map(word => word.toLowerCase().trim()).filter(item => item);
    // filter only items that contain all words from query
    items = items.filter(item => qWords.every(word => item.value.toLowerCase().includes(word)));
    // sort by index of the location of the first word from the query in the item's value
    items = items.sort((word1, word2) => word1.value.toLowerCase().indexOf(qWords[0]) - word2.value.toLowerCase().indexOf(qWords[0]));
  }
  return items.splice(0, MAX_RESULTS);
}

function listAuto(listFuncName) {
  return async (query, pluginSettings, triggerParameters) => {
    const settings = mapAutoParams(pluginSettings), params = mapAutoParams(triggerParameters);
    const client = TopDeskService.from(params, settings);
    const result = await client[listFuncName]({...params});
    const items = handleResult(result, query, "id", "name");
    return items;
  }
}

async function listIncidents(query, pluginSettings, triggerParameters){
  const settings = mapAutoParams(pluginSettings), params = mapAutoParams(triggerParameters);
  const client = TopDeskService.from(params, settings);
  const toAuto = (incident) => getAutoResult(incident.id, `${incident.number}${incident.category ? `(${incident.category})` : ""} ${incident.briefDescription || ""}`);
  var result = await client.listIncidents({
    fields: ["id", "number", "briefDescription", "category"],
    sort: ["DESC number"],
    pageSize: MAX_RESULTS,
    fiqlQuery: query ? `id=sw=${query},number=sw=${query},briefDescription=sw=${query},category.name=sw=${query}` : undefined
  }).map(toAuto);
  var pageStart=0;
  while (result.length === 0) {
    try {
      result = filterItems(await client.listIncidents({
        fields: ["id", "number", "briefDescription", "category"],
        sort: ["DESC number"],
        pageSize: 1000,
        pageStart
      }).map(toAuto), query);
      pageStart += 1000;
    }
    catch (err) {
      return [];
    }
  }
  return result;
}

module.exports = {
  listIncidentsAuto: listIncidents,
  listEntryTypesAuto: listAuto("listEntryTypes"),
  listCallTypesAuto: listAuto("listCallTypes"),
  listCategoriesAuto: listAuto("listCategories"),
  listSubcategoriesAuto: listAuto("listSubcategories"),
  listImpactsAuto: listAuto("listImpacts"),
  listUrgenciesAuto: listAuto("listUrgencies"),
  listPrioritiesAuto: listAuto("listPriorities"),
  listProcessingStatusesAuto: listAuto("listProcessingStatuses")
}
