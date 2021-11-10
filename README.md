# kaholo-trigger-TopDesk
Kaholo plugin for integration with TopDesk API.

##  Settings
1. TopDesk URL (String) **Required if not in action** - The URL to connect to TopDesk with on default.
2. Username (String) **Required if not in action** - The username of the default user to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
3. Application Password (Vault) **Required if not in action** - The application password to authenticate to TopDesk with on default.
[Learn More](https://developers.topdesk.com/tutorial.html)

## Method: Get Incident
Get information about the specified incident.

## Parameters
1. TopDesk URL (String) **Required if not in settings** - The URL to connect to TopDesk with on default.
2. Username (String) **Required if not in settings** - The username of the user to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
3. Application Password (Vault) **Required if not in settings** - The application password to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
4. Incident (Autocomplete) **Required** - The incident to return information about.

## Method: Create Incident
Create a new incident.

## Parameters
1. TopDesk URL (String) **Required if not in settings** - The URL to connect to TopDesk with on default.
2. Username (String) **Required if not in settings** - The username of the user to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
3. Application Password (Vault) **Required if not in settings** - The application password to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
4. Incident Type (Options) **Required** - Type of the incident. Called 'status' field in the API.Possible values: **First Line | Second Line**
5. Request (Text) **Optional** - The request details for the incident.
6. Action (Text) **Optional** - Describe the actions done to fix this incident. 
7. Action Invisible For Caller (Boolean) **Optional** - Whether the action field is invisible for callers.
8. Caller Lookup (String) **Optional** - The ID/name/Email of the caller of the incident. Associate the incident with the caller with the specified field. Names should be in the format of 'LastName, FirstName'.
9. Brief Description (String) **Optional** - Brief description of the incident.
10. Entry Type (Autocomplete) **Optional** - The entry type of the incident.
11. Call Type (Autocomplete) **Optional** - The call type of the incident.
12. Category (Autocomplete) **Optional** - The category of the incident.
13. Subcategory (Autocomplete) **Optional** - The subcategory of the incident.
14. External Number (String) **Optional** - External number of the incident.
15. Location Branch ID (String) **Optional** - The ID of the branch of the location associated with the incident.
16. Location ID (String) **Optional** - The ID of the location associated with the incident.
17. Impact (Autocomplete) **Optional** - The impact of the incident.
18. Urgency (Autocomplete) **Optional** - The urgency of the incident.
19. Priority (Autocomplete) **Optional** - The priority of the incident.
20. Operator ID (String) **Optional** - The ID of the operator of the incident.
21. Processing Status (Autocomplete) **Optional** - The processing status of the incident.
22. Costs (String) **Optional** - Total costs of the incident.

## Method: Update Incident
Update the specified incident with the provided parameters.

## Parameters
1. TopDesk URL (String) **Required if not in settings** - The URL to connect to TopDesk with on default.
2. Username (String) **Required if not in settings** - The username of the user to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
3. Application Password (Vault) **Required if not in settings** - The application password to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
4. Incident (Autocomplete) **Required** - The incident to return information about.
5. TopDesk URL (String) **Optional** - The URL to connect to TopDesk with on default.
6. Username (String) **Optional** - The username of the user to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
7. Application Password (Vault) **Optional** - The application password to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
8. Incident Type (Options) **Optional** - Type of the incident. Called 'status' field in the API.Possible values: **First Line | Second Line**
9. Request (Text) **Optional** - The request details for the incident.
10. Action (Text) **Optional** - Describe the actions done to fix this incident. 
11. Action Invisible For Caller (Boolean) **Optional** - Whether the action field is invisible for callers.
12. Caller Lookup (String) **Optional** - The ID/name/Email of the caller of the incident. Associate the incident with the caller with the specified field. Names should be in the format of 'LastName, FirstName'.
13. Brief Description (String) **Optional** - Brief description of the incident.
14. Entry Type (Autocomplete) **Optional** - The entry type of the incident.
15. Call Type (Autocomplete) **Optional** - The call type of the incident.
16. Category (Autocomplete) **Optional** - The category of the incident.
17. Subcategory (Autocomplete) **Optional** - The subcategory of the incident.
18. External Number (String) **Optional** - External number of the incident.
19. Location Branch ID (String) **Optional** - The ID of the branch of the location associated with the incident.
20. Location ID (String) **Optional** - The ID of the location associated with the incident.
21. Impact (Autocomplete) **Optional** - The impact of the incident.
22. Urgency (Autocomplete) **Optional** - The urgency of the incident.
23. Priority (Autocomplete) **Optional** - The priority of the incident.
24. Operator ID (String) **Optional** - The ID of the operator of the incident.
25. Processing Status (Autocomplete) **Optional** - The processing status of the incident.
26. Costs (String) **Optional** - Total costs of the incident.

## Method: List Incidents
List incidents matching the specified criteria.

## Parameters
1. TopDesk URL (String) **Required if not in settings** - The URL to connect to TopDesk with on default.
2. Username (String) **Required if not in settings** - The username of the user to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
3. Application Password (Vault) **Required if not in settings** - The application password to authenticate to TopDesk with.
[Learn More](https://developers.topdesk.com/tutorial.html)
4. Return Fields (Text) **Optional** - If specified, return only the specified fields about the incidents. You can enter multiple values by seperating each with a new line or comma.
5. Sort By (Text) **Optional** - If specified, the incidents in order by the specified fields. You can enter multiple values by seperating each with a new line or comma. By default all fields will be in ascending order. You can change the order of a field to descending by prefixing the name of the field with 'DESC '.
6. Page Start (String) **Optional** - For Paging. Return results starting from the index specified. 0 by default.
7. pageSize (String) **Optional** - For Paging. Maximum number of incidents to return. 10 by default. Possible values are 1-10000.
[Learn More](https://developers.topdesk.com/tutorial.html)
8. Return Partials And Archived (Boolean) **Optional** - Also return partial and archived incidents.
9. FIQL Query (String) **Optional** - If specified, select which incidents should be returned by using the provided FIQL query.
[Learn More](https://developers.topdesk.com/tutorial.html#query)

