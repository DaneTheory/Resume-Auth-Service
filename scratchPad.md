# Zeit reqs





# Requirments

## Server Specs
Protocol: HTTPS
Subdomian: api
Host: zeit
tld: co
Origins: [bru1, hnd1, iad1, sfo1]


## Requests
Headers
* Required:
Content-Type: application/json
Authorization: Bearer <TOKEN>
  - Failed Auth requests return 403 error status
* Pass Down:
X-RateLimit-Limit => maximum number of requests that the consumer is permitted to make.
X-RateLimit-Remaining => The number of requests remaining in the current rate limit window.
X-RateLimit-Reset => time at which the current rate limit window resets in UTC epoch seconds.
Cache-Control: s-maxage=1, stale-while-revalidate
Connection: keep-alive
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Authorization, Accept, Content-Type
Strict-Transport-Security: max-age=31536000; includeSubDomains;
x-now-id: sfo1:6hvvv-1567048732729-f2790613f45f


## Endpoints
  - List Deployments: GET /v4/now/deployments
  * (Optional) Request Query Params:
    - projectId => Filter deployments from the given projectId
    - meta-[KEY] => Filter deployments by the given meta key value pairs. e.g., meta-githubDeployment=1
  * Response Params:
    - uid => A string with the unique deployment ID you can use to get more information or remove it.
    - name => A string with the deployment under which the deployment was created.
    - url => A string with the unique URL of the deployment. If it hasn't finished uploading (is incomplete), the value will be null.
    - created => A number containing the date when the deployment was created (in timestamp).
    - state => A string with the current deployment state, it could be one of the following INITIALIZING, ANALYZING, BUILDING, DEPLOYING, READY, or ERROR.
    - meta => A map containing all deployment metadata.

  - Get a Single Deployment: GET /v9/now/deployments/:id (Obtain deployment ID, list all deployments)
  * Response Params:
    - id => A string holding the unique ID of the deployment.
    - url => A string with the unique URL of the deployment. If it hasn't finished uploading (is incomplete), the value will be null.
    - name => The name of the deployment.
    - meta => An object containing the deployment's metadata. For example, { "foo": "bar" }.
    - public => A boolean representing if the deployment is public or not. By default this is false.
    - readyState => The state of the deployment depending on the process of deploying, or if it is ready or in an error state. Possible values are INITIALIZING, ANALYZING, BUILDING, DEPLOYING, READY, or ERROR.
    - createdAt => A number containing the date when the deployment was created in milliseconds.
    - env => The keys of the environment variables that were assigned during runtime.
    - build.env => The keys of the environment variables that were assigned during the build phase.
    - target => If defined, either staging if a staging alias in the format <project>.<team>.now.sh was assigned upon creation, or production if the aliases from alias were assigned.
    - alias => A list of all the aliases (default aliases, staging aliases and production aliases) that were assigned upon deployment creation.

  - Get deployment logs: GET /v2/now/deployments/:id/events
  * Response Params:
  - type => The type of log. The type could be request, response, command or stdout.
    - _These are the possible types of logs and what they mean._
    - request => The log is an HTTP request.
    - reponse => The log is an HTTP response.
    - command => The log is a terminal command, e.g. npm start.
    - stdout => The log is anything the application wrote to console.
  - created => The date when the log was created.
  - payload => An object containing information about the deployment including deploymentId, info, text, id, date, and serial.
      - _Log Payload Key_
      - deploymentId => The unique identifier of the deployment.
      - info => An object containing the type, name, and entrypoint of the deployment.
      - text => The log content as a string.
      - id => The unique identifier of the log.
      - date => The date when the log was created.


## Generic Errors
- Forbidden: You're not authorized to use the endpoint. This usually happens due to missing an user token.
```
{
  "error": {
    "code": "forbidden",
    "message": "Not authorized"
  }
}
```
- Rate Limited
```
{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded",
  }
}
```
-Bad Request
```
{
  "error": {
    "code": "bad_request",
    "message": "An english description of the error that just occurred",
  }
}
```
- Internal Server Error
```
{
  "error": {
    "code": "internal_server_error",
    "message": "An unexpected internal error occurred"
  }
}
```
- Resource Not Found
```
{
  "error": {
    "code": "method_unknown",
    "message": "This endpoint only responds to METHOD"
  }
}
```
- Method Unknown
```
{
  "error": {
    "code": "method_unknown",
    "message": "This endpoint only responds to METHOD"
  }
}
```

---



### NOTES
- Requests to any api.zeit.co endpoint, automatically resolved to closest Origin location Anycast
Origin nodes:[bru1, hnd1, iad1, sfo1]
Ex: api-sfo1.zeit.co
- Requests must encoded as JSON with Content-Type: application/json header.
If not Responses from the Now API, including errors, are encoded exclusively as JSON as well.
- Requests to the Now API must provide an API token through the Authorization header
- If authentication is unsuccessful for a request, the error status code 403 is returned.
- All API endpoints contain a code and message within the error responses. our message fields are designed to be neutral, not contain sensitive information, and can be safely passed down to user interfaces
Ex: {
  "error": {
    "code": "forbidden",
    "message": "Not authorized"
  }
}
- We limit the number of calls you can make over a certain period of time. Rate limits vary and are specified by the following header in all responses
- When the rate limit is exceeded, an error is returned with the status "429 Too Many Requests":
Ex: {
  "error": {
    "code": "too_many_requests",
    "message": "Rate limit exceeded",
  }
}
- Get Single Deployment Endpoint example
```
curl "https://api.zeit.co/v9/now/deployments/dpl_89qyp1cskzkLrVicDaZoDbjyHuDJ" \
  -H "Authorization: Bearer <TOKEN>"
```
```
{
  "id": "dpl_89qyp1cskzkLrVicDaZoDbjyHuDJ",
  "url": "my-instant-deployment-3ij3cxz9qr.now.sh",
  "name": "my-instant-deployment",
  "version": 2
  "meta": {},
  "plan": "unlimited",
  "public": false,
  "ownerId": "ZspSRT4ljIEEmMHgoDwKWDei",
  "readyState": "READY",
  "createdAt": 1540257589405,
  "createdIn": "sfo1",
  "regions": [
    "sfo1"
  ],
  "builds": [
    {
      "use": "@now/static",
      "src": "**"
    }
  ],
  "routes": null,
  "env": [],
  "build": {
    "env": []
  },
  "target": "production",
  "alias": [
    "mywebsite.com",
    "project.my-team.now.sh"
  ],
  "aliasError": null,
  "aliasAssigned": true
}
```
