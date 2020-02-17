### Local Dev server

You can use the Now CLI to start a local dev server and watch for changes to src files. The local server also includes support for testing the serverless functions in your /api directory without the need for deployment to Now.

```shell
now dev
```

NOTE: The React dev server will launch your browser to localhost:[some-port], but this won't be able to access Now's serverless app. You need to change the port on the localhost url to 3000.

`localhost:3000`

# Deployment

Hosted on the Advance Party account of Zeit's now.sh service.
The now.sh project is connected to Advance Party's GitHub account for continuous deployment.

## 1. Production

The app will be redeployed whenever you push to the master brach of the Github repo.

### 2. Dev

Pushing to a non-master branch on the repo will trigger a preview deployment.
