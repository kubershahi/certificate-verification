# Deployment Guide

This guide covers hosting aCERT for a portfolio demo and setting up a CI/CD pipeline. The app has three deployable pieces:

| Piece | Service | Notes |
|-------|---------|-------|
| Frontend | **Vercel** (recommended) | React static build |
| Backend | **Render** or **Railway** | Express API |
| Database | **MongoDB Atlas** | M0 free tier is enough |
| Blockchain | **Sepolia testnet** | Already deployed; users connect via MetaMask |

The smart contract does **not** need a server. The frontend reads the contract address from `client/src/artifacts/Certificate.json`.

```
Browser + MetaMask
       │
       ├──► Vercel (React) ──REACT_APP_API_URL──► Render (Express) ──► MongoDB Atlas
       │
       └──► Sepolia (Certificate contract)
```

---

## Deployed contracts (Sepolia)

For reference and Etherscan links. The app reads the Certificate address from `client/src/artifacts/Certificate.json`; this section is documentation only.

| Contract | Network | Address | Transaction |
|----------|---------|---------|-------------|
| Certificate | Sepolia (11155111) | `0x3da3AA0f22F8c341472B82121662D5c4f81cDa0e` | [0x9db47c41...](https://sepolia.etherscan.io/tx/0x9db47c41e50fced4d00c2289cbb261410f58963d1a90173386b9a6f4d232cfde) |

- **Certificate on Sepolia:** https://sepolia.etherscan.io/address/0x3da3AA0f22F8c341472B82121662D5c4f81cDa0e

You only need to redeploy the contract if you change the Solidity code. See [Redeploying the contract](#redeploying-the-contract) below.

---

## Prerequisites

1. Code pushed to a **GitHub** repository.
2. **MongoDB Atlas** cluster with a database user and connection string (`DATABASE_URI`).
3. Contract already deployed to Sepolia (see table above), or deploy it yourself before going live.
4. Secrets kept out of git: `backend/.env`, project root `.env` (contains `MNEMONIC`), and Atlas credentials.

---

## Step 1: MongoDB Atlas

If you already have a cluster (e.g. from local dev), you can reuse it.

1. In [MongoDB Atlas](https://cloud.mongodb.com/), confirm **Database Access** has a user with read/write access.
2. Under **Network Access**, allow your backend host to connect:
   - For Render/Railway: allow their outbound IPs, or `0.0.0.0/0` for a portfolio demo.
3. Copy your connection string. It looks like:

   ```
   mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?appName=<label>
   ```

   - `<user>` / `<password>` = Atlas **database user** (not your Atlas login email).
   - `<database>` = database name used by the app (e.g. `uploaded-records`).
   - Org/project names in the Atlas UI are **not** in the URI; the hostname identifies the cluster.

4. Rotate the DB password if it was ever committed or shared.

---

## Step 2: Backend on Render

1. Create a new **Web Service** and connect your GitHub repo.
2. Configure the service:

   | Setting | Value |
   |---------|-------|
   | Root directory | `backend` |
   | Build command | `npm install` |
   | Start command | `node index.js` |

   Use `node index.js` in production, not `nodemon` (dev only).

3. Set **environment variables**:

   ```bash
   DATABASE_URI=mongodb+srv://...          # your Atlas URI
   CORS_ORIGIN=https://your-app.vercel.app # set after frontend deploy (Step 3)
   ```

   Render sets `PORT` automatically; the app uses `process.env.PORT || 4000`.

4. Deploy and note the public URL, e.g. `https://acert-api.onrender.com`.

**Railway alternative:** same settings — root `backend/`, start `node index.js`, same env vars.

---

## Step 3: Frontend on Vercel

1. Import the repo in [Vercel](https://vercel.com/).
2. Configure the project:

   | Setting | Value |
   |---------|-------|
   | Root directory | `client` |
   | Build command | `npm run build` |
   | Output directory | `build` |

3. Set a **build-time** environment variable:

   ```bash
   REACT_APP_API_URL=https://acert-api.onrender.com
   ```

   No trailing slash. React bakes this into the build at compile time.

4. Deploy and copy your live URL, e.g. `https://acert.vercel.app`.

---

## Step 4: Wire frontend and backend together

1. In Render, set **`CORS_ORIGIN`** to your exact Vercel URL (e.g. `https://acert.vercel.app`).
2. Redeploy the backend so CORS picks up the new origin.
3. If you change `REACT_APP_API_URL`, redeploy the **frontend** (env vars are build-time only).

---

## Step 5: Verify end-to-end

1. Open the Vercel URL in the browser.
2. Switch MetaMask to the **Sepolia** network (chain ID `11155111`).
3. Test upload and verify flows; confirm API calls hit your Render URL (browser DevTools → Network).
4. Optional: add a custom domain in Vercel for a polished portfolio link.

---

## Redeploying the contract

Only needed if you change Solidity under `contracts/`.

1. In the **project root** (same folder as `truffle-config.js`), create a `.env` file (do not commit):

   ```bash
   MNEMONIC="your twelve word MetaMask recovery phrase"
   ```

2. Deploy:

   ```bash
   npm run migrate:sepolia
   ```

   Truffle updates `client/src/artifacts/` with the new contract address.

3. If you see `ESOCKETTIMEDOUT` or `PollingBlockTracker` errors, add a reliable RPC to root `.env`:

   ```bash
   SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
   ```

   Then run `npm run migrate:sepolia` again.

4. Redeploy the **frontend** so the new artifact is served.

**MetaMask setup for visitors:**

- Network: Sepolia, chain ID `11155111`, RPC `https://rpc.sepolia.org`
- Free test ETH: [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia), [SepoliaFaucet.com](https://sepoliafaucet.com/), [QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia)

---

## CI/CD pipeline

There is no GitHub Actions workflow in the repo yet. A practical portfolio setup:

- **CI** on every push/PR — verify the client builds and the backend installs cleanly.
- **CD** on `main` — auto-deploy via Vercel and Render GitHub integrations.

### Phase 1: CI workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  client:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: client
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: npm
          cache-dependency-path: client/package-lock.json
      - run: npm ci
      - run: npm run build
        env:
          REACT_APP_API_URL: https://example.com

  backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: npm
          cache-dependency-path: backend/package-lock.json
      - run: npm ci
      - run: node -c index.js
```

The dummy `REACT_APP_API_URL` is only needed so the client build succeeds in CI.

### Phase 2: CD (auto-deploy)

**Recommended:** connect the repo to Vercel and Render. Both deploy automatically on every push to `main`. GitHub Actions acts as the quality gate; enable branch protection so CI must pass before merge.

**GitHub → Settings → Branches → main:**

- Require a pull request before merging
- Require the **CI** status check to pass

**Optional (more explicit CD):** add a deploy job on `main` that calls Render/Vercel deploy hooks after CI passes, or use GitHub Environments with approval gates for staging/production.

### What to skip for a portfolio

- Kubernetes, Docker, multi-region
- Staging environment (optional)
- Contract deploy in CI (manual is fine unless the contract changes often)

---

## Production tweaks

These small changes improve reliability on hosted platforms:

1. **Prod start script** — in `backend/package.json`, add `"start:prod": "node index.js"` and use it as the Render start command.
2. **Health check** — add `GET /health` returning `{ ok: true }` so Render and CI can verify the API is up.
3. **Pin Node** — add `.nvmrc` with `18` (or `20`) so local, CI, and hosts use the same version.
4. **README** — add your live demo URL, Sepolia Etherscan link, and a note to connect MetaMask to Sepolia.

---

## Environment variables reference

### Backend (`backend/`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URI` | Yes | MongoDB Atlas connection string |
| `CORS_ORIGIN` | Yes (prod) | Frontend URL, e.g. `https://acert.vercel.app` |
| `PORT` | No | Set by Render; defaults to `4000` locally |

### Frontend (`client/`)

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_API_URL` | Yes (prod) | Backend URL, e.g. `https://acert-api.onrender.com`. No trailing slash. |

Local dev: when `REACT_APP_API_URL` is unset, the client proxy in `client/package.json` targets `http://localhost:4000`.

### Contract deploy (project root only)

| Variable | Required | Description |
|----------|----------|-------------|
| `MNEMONIC` | Yes | MetaMask recovery phrase for signing deploy txs |
| `SEPOLIA_RPC` | No | Custom RPC if the public Sepolia endpoint times out |

Never put `MNEMONIC` or `DATABASE_URI` in Vercel/Render frontend env or commit them to git.

---

## Local development

Unchanged from production hosting:

```bash
# Terminal 1 — backend
cd backend
npm install
npm start          # nodemon on PORT 4000

# Terminal 2 — frontend
cd client
npm install
npm start          # http://localhost:3000
```

Ensure `backend/.env` contains `DATABASE_URI`. MetaMask should be on Sepolia for blockchain features.
