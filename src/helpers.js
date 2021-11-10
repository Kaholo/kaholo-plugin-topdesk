const nodeFetch = require('node-fetch');
const parsers = require("./parsers");

async function fetch({basicAuth, url, method, payload, query}){
    var url = new URL(url);
    if (query){
        url.searchParams = new URLSearchParams(query);
    }
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${basicAuth}`
        }

    }
    if (method && method.toLowerCase() !== 'get' && payload){
        options.headers['Content-Type'] = 'application/json',
        options.body = JSON.stringify(payload);
    }
    return nodeFetch(url, options);
}

async function parseIncident(params){
    if (!params.incidentType) throw "Must provide incident type";

    const callerLookup = parsers.string(params.callerLookup);
    
    return removeUndefined({
        callerLookup:   /^([0-9a-f]{8,8}-)([0-9a-f]{4,4}-){3,3}([0-9a-f]{12,12})$/.test(callerLookup) ? {id: callerLookup} : 
                        /^.+@.+\..+$/.test(callerLookup) ? {email: callerLookup} : 
                        callerLookup ? {name: callerLookup} : undefined,
        status: params.incidentType,
        request: parsers.string(params.request),
        action: parsers.string(params.action),
        actionInvisibleForCaller: parsers.boolean(params.actionInvisibleForCaller),
        briefDescription: parsers.string(params.description),
        entryType: {id: parsers.autocomplete(params.entryType)},
        callType: {id: parsers.autocomplete(params.callType)},
        category: {id: parsers.autocomplete(params.category)},
        subcategory: {id: parsers.autocomplete(params.subcategory)},
        externalNumber: parsers.string(params.externalNumber),
        branch: {id: parsers.autocomplete(params.locationBranch)},
        location: {id: parsers.autocomplete(params.location)},
        impact: {id: parsers.autocomplete(params.impact)},
        urgency: {id: parsers.autocomplete(params.urgency)},
        priority: {id: parsers.autocomplete(params.priority)},
        operator: {id: parsers.string(params.operator)},
        processingStatus: {id: parsers.autocomplete(params.processingStatus)},
        costs: parsers.float(params.costs)
    });
}

function removeUndefined(obj){
    for (var key in obj){
        if (obj.hasOwnProperty(key)){
            if (typeof obj[key] === "object"){
                removeUndefined(obj[key]);
                if (JSON.stringify(obj[key]) === "{}") delete obj[key];
            }
            if (obj[key] === undefined) delete obj[key];
        }
    }
    return obj;
}

module.exports = {
    fetch,
    parseIncident,
    removeUndefined
}