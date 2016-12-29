var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var userService = require('../../services/userService.js');
const router = require('express').Router();

/**
 * @api {get} /users/me Get current user
 * @apiName GetCurrentUser
 * @apiGroup Users
 *
 * @apiHeader Cookie <code>access_token</code>
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl",
 *       "username": "nikhil.ahuja@quovantis.com",
 *       "email": "nikhil.ahuja@quovantis.com",
 *       "givenName": "Nikhil",
 *       "middleName": null,
 *       "surname": "Ahuja",
 *       "fullName": "Nikhil Ahuja",
 *       "status": "ENABLED",
 *       "createdAt": "2016-12-28T05:43:11.694Z",
 *       "modifiedAt": "2016-12-29T07:04:41.319Z",
 *       "passwordModifiedAt": "2016-12-29T07:04:41.000Z",
 *       "emailVerificationStatus": "UNVERIFIED",
 *       "emailVerificationToken": null,
 *       "customData": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/customData"
 *       },
 *       "providerData": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/providerData"
 *       },
 *       "directory": {
 *           "href": "https://api.stormpath.com/v1/directories/6sOiDk10W1yrgQkgAG5a61"
 *       },
 *       "tenant": {
 *           "href": "https://api.stormpath.com/v1/tenants/6prBZaX6Rio8cfE7qVmMw9"
 *       },
 *       "groups": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/groups"
 *       },
 *       "applications": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/applications"
 *       },
 *       "groupMemberships": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/groupMemberships"
 *       },
 *       "apiKeys": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/apiKeys"
 *       },
 *       "accessTokens": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/accessTokens"
 *       },
 *      "refreshTokens": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/refreshTokens"
 *       },
 *       "linkedAccounts": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/linkedAccounts"
 *       },
 *       "accountLinks": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/accountLinks"
 *       },
 *       "phones": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/phones"
 *       },
 *       "factors": {
 *           "href": "https://api.stormpath.com/v1/accounts/42miCN3pDnmMahNWSW5fgl/factors"
 *       }
 *   }
 */
router.get('/me', stormpath.getUser, userService.getCurrentUser);

router.post('/me', bodyParser.json(), stormpath.loginRequired, userService.saveAccountDetails);

module.exports = router;