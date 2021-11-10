const parsers = require("./parsers");
const { parseIncident } = require("./helpers");
const TopdeskService = require('./topdesk.service');

async function getIncident(action, settings){
    const topdesk = TopdeskService.from(action.params, settings);
    return topdesk.getIncident(parsers.autocomplete(action.params.incident));
}

async function createIncident(action, settings){
    const topdesk = TopdeskService.from(action.params, settings);
    return topdesk.createIncident(parseIncident(action.params));
}

async function updateIncident(action, settings){
    const topdesk = TopdeskService.from(action.params, settings);
    return topdesk.updateIncident(parsers.autocomplete(action.params.incident), 
                                  parseIncident(action.params));
}

async function listIncidents(action, settings){
    const topdesk = TopdeskService.from(action.params, settings);
    return topdesk.listIncidents({
        fields: parsers.array(action.params.fields),
        sort: parsers.array(action.params.sort),
        pageStart: parsers.int(action.params.pageStart),
        pageSize: parsers.int(action.params.pageSize),
        returnPartialsAndArchived: parsers.boolean(action.params.returnPartialsAndArchived),
        fiqlQuery: parsers.string(action.params.fiqlQuery),
    });
} 

module.exports = {
    getIncident,
	createIncident,
	updateIncident,
	listIncidents,
// Autocomplete Functions
    ...require("./autocomplete")
}