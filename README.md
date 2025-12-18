# lgtm-cat-github-app

A GitHub App that automatically posts a cat LGTM image when a pull request is approved.

## Features

- Listens for PR approval events
- Automatically posts a random cat LGTM image from [lgtmeow.com](https://lgtmeow.com/)

## Local Development Setup

### Prerequisites

- Node.js >= 22
- npm
- GitHub account

### 1. Install dependencies

```bash
npm install
```

### 2. Set up smee.io

1. Go to [https://smee.io](https://smee.io)
2. Click "Start a new channel"
3. Copy the generated URL

### 3. Create a GitHub App

1. Go to GitHub Settings > Developer settings > GitHub Apps
2. Click "New GitHub App"
3. Configure:
   - **App name**: `lgtm-cat-local-dev` (or any unique name)
   - **Homepage URL**: `https://github.com/nekochans/lgtm-cat-github-app`
   - **Webhook URL**: Your smee.io URL
   - **Webhook secret**: `development`
   - **Permissions**:
     - Pull requests: Read & write
   - **Subscribe to events**:
     - Pull request review
4. After creation:
   - Note the **App ID**
   - Generate and download a **Private Key**
5. Install the app on a test repository

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
APP_ID=<your-app-id>
PRIVATE_KEY_PATH=./private-key.pem
WEBHOOK_SECRET=development
WEBHOOK_PROXY_URL=<your-smee-url>
LGTMEOW_BASE_URL=https://api.lgtmeow.com
```

Place the downloaded private key file as `private-key.pem` in the project root.

### 5. Build and run

```bash
npm run build
npm start
```

### 6. Test

1. Create a PR in the repository where the app is installed
2. Approve the PR
3. Check the terminal logs for the `pull_request_review.submitted` event

## Scripts

- `npm run build` - Compile TypeScript
- `npm start` - Start the app
- `npm run dev` - Build and start
- `npm run lint` - Run linter
- `npm run fix` - Auto-fix lint and format issues

## Code Quality

This project uses [ultracite](https://www.ultracite.ai/) for linting and formatting.

```bash
# Check for lint issues
npm run lint

# Auto-fix issues
npm run fix
```

## Production Deployment (Fly.io)

### Prerequisites

- [Fly.io CLI](https://fly.io/docs/flyctl/install/)
- Fly.io account

### 1. Login to Fly.io

```bash
fly auth login
```

### 2. Create the app

```bash
fly apps create lgtm-cat-bot
```

### 3. Set secrets

```bash
fly secrets set APP_ID="your-github-app-id"
fly secrets set PRIVATE_KEY="$(cat ./private-key.pem)"
fly secrets set WEBHOOK_SECRET="your-webhook-secret"
```

### 4. Deploy

```bash
fly deploy
```

### 5. Update GitHub App Webhook URL

Update your GitHub App settings:
- Webhook URL: `https://lgtm-cat-bot.fly.dev/api/github/webhooks`

### Useful commands

```bash
# Check app status
fly status

# View logs
fly logs

# SSH into the machine
fly ssh console
```
