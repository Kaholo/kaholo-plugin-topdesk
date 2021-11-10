const { fetch, removeUndefined } = require("./helpers");
const parsers = require("./parsers");

const listFuncs = {
    listEntryTypes: "incidents/entry_types",
    listCallTypes: "incidents/call_types",
    listCategories: "incidents/categories",
    listSubcategoriesNoFilter: "incidents/subcategories",
    listImpacts: "incidents/impacts",
    listUrgencies: "incidents/urgencies",
    listPriorities: "incidents/priorities",
    listProcessingStatuses: "incidents/statuses"
}

module.exports = class Topdesk{
    constructor({url, username, appPassword}){
        if (!url || !username || !appPassword) throw "One of the required parameters was not provided"; 
        this.url = url + (url.endsWith("/") ? "" : "/");
        this.token = Buffer.from(`${username}:${appPassword}`).toString('base64');
        
        // create list functions
        for (var [func, path] of Object.entries(listFuncs)) {
            this[func] = ((resourcePath) => async () =>
                this.sendTopDeskRequest({path: resourcePath, httpMethod: "GET"})
            )(path);
        }
    }

    static from(params, settings){
        return new Topdesk({
            url: parsers.string(params.url || settings.url),
            username: parsers.string(params.username || settings.username),
            appPassword: params.appPassword || settings.appPassword
        });
    }

    async sendTopDeskRequest({path, httpMethod, payload, query}){
        const response = await fetch({
            basicAuth:this.token, 
            url: `${this.url}tas/api/${path}`, 
            method: httpMethod, 
            payload, query
        });
        if (response.ok) return response.json();
        if (response.status === 400) {
            throw `Problem with one or more of the provided parameters: ${await response.text() || ""}`;
        }
        if (response.status === 403){
            throw `Forbidden: You don't have the permissions to the resource: ${path}`;
        }
        if (response.status === 404){
            throw `Resource not found: ${path}`;
        }
        throw `Internal Server Error: ${response.statusText}`;
    }
    
    async getIncident(incidentId){
        if (!incidentId) throw "Must provide incident ID!";
        return this.sendTopDeskRequest({path: `incidents/id/${incidentId}`, httpMethod: "GET"});
    }
    
    async createIncident(incidentObj){
        return this.sendTopDeskRequest({path: 'incidents', httpMethod: "POST", payload: incidentObj});
    }
    
    async updateIncident(incidentId, incidentObj){
        if (!incidentId) throw "Must provide incident ID!";
        return this.sendTopDeskRequest({path: `incidents/id/${incidentId}`, httpMethod: "PUT", payload: incidentObj});
    }
    
    async listIncidents({fields, sort, pageStart, pageSize, returnPartialsAndArchived, fiqlQuery}){
        const query = removeUndefined({
            fields: fields.length > 0 ? fields.join(",").replace(/,\s?,/g, ",") : undefined,
            sort: sort.length > 0 ? fields.map(field => 
                field.startsWith("DESC ") ? 
                    `${field.slice(5)}:desc` : 
                    `${field}:asc`
                ).join(",") : undefined,
            all: returnPartialsAndArchived,
            query: fiqlQuery,
            pageStart, pageSize
        });
        return this.sendTopDeskRequest({path: "incidents", httpMethod: "GET", query});
    }
    
    async listSubcategories({category}){
        const subcategories = await this.listSubcategoriesNoFilter();
        return subcategories.filter(subcategory => subcategory.category.id === category);
    }
}