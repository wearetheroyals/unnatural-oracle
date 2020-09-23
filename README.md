> WARNING
>
> Pushing to the master branch will trigger a deployment production.

# Important Info

|            |                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------- |
| Hosting    | Royals Netlify Account                                                                    |
| DNS        | Subdomain of theroyals.com.au, managed by Route 53 on The Royals AWS account.             |
| Content    | _Unnatural Oracle_ database on the Advance Party Airtable account                         |
| Deployment | Uses Netlify's github integration to deploy when pushing to the _master_ branch on Github |

_\* All account credentials can be found in Keeper._

# Development

## Dependancies

- Clone the repo to your dev machine
- cd into the project root
- run `npm i` from terminal to install node dependancies

## Adding/Editing/Removing Content

The content for all of the cards is stored in the **Unnatural Oracle** database on Advance Party's [airtable.com](https://www.airtable.com) account. Account login details can ve found on Keeper.

## Rebuild to see new content

All card content is embedded into the site during the build process.

If you change any of the content in Airtable, you will need to trigger a redeployment so that the new content can be compiled into the production website.

Redeployments can be triggered via the Netlify dashboard or pushing to the remote repo's master branch.

> It should be technically possible to connect a webhook from Airtable to Netlify and trigger redeployment automatically when content is changed. The challenge is that Airtable saves changes immedaitely and automatically when any cell is updated, so editing a bunch of cells in rapid succession could trigger dozens of rebuilds within a a couple of minutes and exceed Netlify's rate limits or monthly rebuild allowances.

## Environment vars

You need to setup local variables in your dev environment for the api key and database id, otherwise Gatsby won't be able to connect to Airtable and to fetch content when building locally.

- Rename `env.example` to `.env` in your project root and fill in the reqired Airtable credentials (which can be found in the Airtable account).

## Start A Local Dev server

`gatsby develop` has been mapped to the start script in package.json, so kick your local dev into gear with:

```shell
npm start
```
