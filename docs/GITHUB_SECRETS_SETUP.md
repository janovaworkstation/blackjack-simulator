# GitHub Secrets Setup Guide

## Overview
This document explains how to configure GitHub Secrets for secure deployment of environment-specific API keys and configuration values.

## Required Secrets

### 1. Bugsnag API Keys
These secrets store the Bugsnag API keys for different environments:

```
VITE_BUGSNAG_API_KEY_DEVELOPMENT
VITE_BUGSNAG_API_KEY_STAGING  
VITE_BUGSNAG_API_KEY_PRODUCTION
```

**How to obtain:**
1. Go to your Bugsnag dashboard
2. Navigate to Settings → API Access
3. Copy your Project API Key
4. You can use the same key for all environments or create separate Bugsnag projects

### 2. Netlify Deployment Secrets
These are already configured but listed here for completeness:

```
NETLIFY_AUTH_TOKEN          # Your Netlify personal access token
NETLIFY_STAGING_SITE_ID     # Site ID for staging deployment
NETLIFY_PRODUCTION_SITE_ID  # Site ID for production deployment
```

### 3. Optional Notification Secrets
For deployment notifications:

```
SLACK_WEBHOOK_URL           # Slack webhook for deployment notifications
```

## Setup Instructions

### Step 1: Access GitHub Secrets
1. Go to your GitHub repository
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Each Secret
For each secret listed above:

1. Click **New repository secret**
2. Enter the **Name** (exactly as shown above)
3. Enter the **Secret value**
4. Click **Add secret**

### Step 3: Verify Workflow Configuration
The following workflows are configured to use these secrets:

- **CI Pipeline** (`ci.yml`) - Uses development Bugsnag key
- **Deploy to Staging** (`deploy-staging.yml`) - Uses staging Bugsnag key
- **Deploy to Production** (`deploy-production.yml`) - Uses production Bugsnag key

## Environment Variable Mapping

### Development (CI builds)
```bash
VITE_APP_ENV=development
VITE_BUGSNAG_API_KEY=${{ secrets.VITE_BUGSNAG_API_KEY_DEVELOPMENT }}
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

### Staging (develop branch)
```bash
VITE_APP_ENV=staging
VITE_BUGSNAG_API_KEY=${{ secrets.VITE_BUGSNAG_API_KEY_STAGING }}
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

### Production (main branch)
```bash
VITE_APP_ENV=production
VITE_BUGSNAG_API_KEY=${{ secrets.VITE_BUGSNAG_API_KEY_PRODUCTION }}
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_ENABLE_ANALYTICS=true
```

## Security Best Practices

### ✅ Do's
- Use separate API keys for each environment when possible
- Regularly rotate API keys (quarterly or after any security incident)
- Use GitHub's built-in secret masking (secrets are automatically hidden in logs)
- Document which secrets are required for deployments

### ❌ Don'ts  
- Never commit API keys to your repository
- Don't share secrets via chat, email, or other insecure channels
- Don't use production keys in development environments
- Don't store secrets in issue comments or pull request descriptions

## Troubleshooting

### Build Fails with "Missing Environment Variable"
**Symptom:** Build fails with errors about missing `VITE_BUGSNAG_API_KEY`

**Solution:**
1. Verify the secret name exactly matches what's in the workflow
2. Check that the secret value is not empty
3. Ensure the workflow file has the correct secret reference

### Bugsnag Not Receiving Data
**Symptom:** No errors/performance data appearing in Bugsnag dashboard

**Solution:**
1. Verify the API key is correct and active in Bugsnag
2. Check that error tracking is enabled in the environment
3. Test with a manual error to confirm integration works

### Secret Not Available in Workflow
**Symptom:** Workflow shows secret as empty or undefined

**Solution:**
1. Ensure secret is added at the repository level (not organization level)
2. Check for typos in secret name
3. Verify the workflow has proper syntax: `${{ secrets.SECRET_NAME }}`

## Testing Secret Configuration

### Local Testing
Create a `.env.local` file with your development values:
```bash
VITE_BUGSNAG_API_KEY=your-development-key-here
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

### Staging Testing
After configuring secrets, push to `develop` branch and verify:
1. Build completes successfully
2. Staging deployment receives the correct environment variables
3. Bugsnag dashboard shows staging environment data

### Production Testing
After configuring secrets, push to `main` branch and verify:
1. Production build completes successfully  
2. Production deployment receives the correct environment variables
3. Bugsnag dashboard shows production environment data

## Maintenance

### Monthly Checklist
- [ ] Review secret usage in Bugsnag dashboard
- [ ] Check for any unauthorized access patterns
- [ ] Verify all environments are reporting correctly
- [ ] Update secrets if rotating API keys

### Security Incident Response
If an API key is compromised:
1. Immediately rotate the key in Bugsnag
2. Update the GitHub secret with the new key
3. Trigger a new deployment to use the updated key
4. Monitor for any unauthorized usage of the old key

---

**Last Updated:** January 2025  
**Owner:** DevOps Team  
**Related Documents:** 
- [Bugsnag Setup Guide](BUGSNAG_SETUP.md)
- [Monitoring Setup Guide](MONITORING_SETUP.md)