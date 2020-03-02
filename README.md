### Local Dev server

`gatsby develop` has been mapped to the start script in package.json, so kick your local dev into gear with:

```shell
npm start
```

# .env

- Rename `env.example` to `.env` in your project root and fill in the reqired Airtable credentials.

# Deployment

Hosted on the Advance Party account of Zeit's now.sh service.

Once all of the setup steps have been completed, you can deploy to staging or prod from the terminal.

### Setting up

- Download and install the [Now CLI](https://zeit.co/download) tool if you don't already have it.
- Run `now login` and log the CLI tool into the AdvanceParty account (or have your own Now account linked to this project on Zeit).
- In your terminal, cd into the project root
- type `now` and follow the prompts to connect your local dev to the Zeit project
  - Choose the Advance Party team
  - Connect to existing project
  - Choose project "sparky"

#### 1. Staging

- CD into the project root on your terminal
- type `now`

#### 2. Production

- CD into the project root on your terminal
- type `now --prod`
