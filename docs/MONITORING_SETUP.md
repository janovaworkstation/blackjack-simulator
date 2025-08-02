# Monitoring & Observability Setup

This document outlines the complete monitoring and observability stack for the Blackjack Strategy Simulator.

## Overview

The application uses a **three-layer monitoring approach** providing comprehensive coverage:

1. **User Experience Monitoring** - Bugsnag/SmartBear Insight Hub
2. **Availability Monitoring** - UptimeRobot  
3. **Deployment Monitoring** - Netlify (built-in)

## 1. Error & Performance Monitoring (Bugsnag)

### What It Monitors
- JavaScript errors and exceptions
- Unhandled promise rejections  
- Core Web Vitals (LCP, FID, CLS)
- Page load performance
- Network request timing
- User session stability

### Configuration
```bash
# Environment Variables
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_BUGSNAG_API_KEY=your_api_key_here
```

### Features
- **Automatic Error Capture**: All unhandled errors
- **Performance Budgets**: Alerts when metrics exceed thresholds
- **Environment Separation**: development/staging/production
- **User Context**: Session tracking and user identification
- **Real-time Alerts**: Email notifications for critical issues

### Dashboard Access
- Login to [bugsnag.com](https://bugsnag.com)
- View errors by environment
- Monitor performance trends
- Set up additional alert channels

## 2. Uptime Monitoring (UptimeRobot)

### What It Monitors
- Site availability (HTTP response codes)
- Response time monitoring
- SSL certificate expiration
- DNS resolution

### Configuration
- **Monitor Type**: HTTP(S)
- **URL**: `https://blackjack-simulator.netlify.app` (production only)
- **Check Interval**: 5 minutes
- **Timeout**: 30 seconds
- **Alert Contacts**: Email notifications

### Setup Instructions

1. **Create Account**
   - Go to [uptimerobot.com](https://uptimerobot.com)
   - Sign up for free account (50 monitors included)

2. **Add Monitor**
   - Click "Add New Monitor"
   - Select "HTTP(s)" monitor type
   - Enter production URL
   - Set check interval to 5 minutes
   - Add email for alerts

3. **Configure Alerts**
   - Alert when: Monitor goes DOWN
   - Alert when: Monitor comes back UP
   - Delivery method: Email
   - Optional: Create public status page

### Why Only Production?
- **Local development**: Cannot be monitored externally
- **Staging/develop**: Frequent deployments cause false alarms
- **Production**: Only environment that affects real users

## 3. Deployment Monitoring (Netlify)

### What It Monitors
- Build success/failure
- Deploy status
- CDN performance
- Domain configuration

### Features (Automatic)
- **Build Notifications**: Email alerts for failed deployments
- **Deploy Previews**: Automatic testing of pull requests
- **Performance Analytics**: Built-in site analytics
- **SSL Monitoring**: Automatic certificate renewal

### Dashboard Access
- Login to [netlify.com](https://netlify.com)
- View deploy history
- Monitor build times
- Check site analytics

## Alert Strategy

### Critical Alerts (Immediate Action)
- Site completely down (UptimeRobot)
- High error rate affecting >50% users (Bugsnag)
- Failed production deployment (Netlify)

### Warning Alerts (Monitor)
- Performance degradation (Bugsnag)
- Individual JavaScript errors (Bugsnag)
- Slow response times (UptimeRobot)

### Alert Channels
- **Email**: Primary notification method
- **Bugsnag Dashboard**: Error details and stack traces
- **UptimeRobot Dashboard**: Uptime statistics
- **Netlify Dashboard**: Deployment status

## Monitoring Environments

### Development (localhost)
- **Bugsnag**: Enabled for testing error tracking
- **UptimeRobot**: Not applicable (localhost not accessible)
- **Netlify**: Local development server

### Staging (develop branch)
- **Bugsnag**: Enabled with "staging" environment tag
- **UptimeRobot**: Not monitored (frequent changes)
- **Netlify**: Automatic deploys from develop branch

### Production (main branch)
- **Bugsnag**: Enabled with "production" environment tag
- **UptimeRobot**: Monitored every 5 minutes
- **Netlify**: Automatic deploys from main branch

## Troubleshooting

### Common Issues

1. **Bugsnag Not Receiving Errors**
   - Check API key is set correctly
   - Verify `VITE_ENABLE_ERROR_TRACKING=true`
   - Ensure domain is not blocking external requests

2. **UptimeRobot False Alarms**
   - Check if site is actually down
   - Verify monitor URL is correct
   - Consider increasing timeout if needed

3. **Missing Performance Data**
   - Verify `VITE_ENABLE_PERFORMANCE_MONITORING=true`
   - Check browser supports Performance Observer API
   - Ensure sufficient traffic for meaningful metrics

### Testing Monitoring

#### Test Error Tracking
```javascript
// Trigger test error (temporary)
throw new Error('Test error for monitoring verification');
```

#### Test Uptime Monitoring
- Temporary deploy broken version
- Verify UptimeRobot detects downtime
- Fix and verify recovery alert

## Best Practices

### Error Tracking
- Monitor error trends, not just individual errors
- Set up alerts for error spikes (>10% of sessions)
- Regularly review and fix common errors
- Use error context to understand user impact

### Performance Monitoring
- Set realistic performance budgets
- Monitor Core Web Vitals trends
- Investigate performance regressions quickly
- Test performance on various devices/networks

### Uptime Monitoring
- Monitor only production environment
- Set reasonable check intervals (5 minutes)
- Create public status page for transparency
- Document incident response procedures

## Cost Overview

### Free Tier Limits
- **Bugsnag**: 7,500 events/month, 30-day retention
- **UptimeRobot**: 50 monitors, 5-minute intervals
- **Netlify**: 100GB bandwidth, 300 build minutes

### Monitoring Budget
- All monitoring tools are within free tier limits
- Total cost: $0/month for current usage
- Upgrade triggers: High traffic or more detailed monitoring needs

## Security & Privacy

### Data Collection
- **Bugsnag**: Error messages, stack traces, basic user info
- **UptimeRobot**: Response times, availability status
- **Netlify**: Build logs, deployment status

### Privacy Compliance
- No personal user data collected by default
- Error tracking can be disabled per environment
- All monitoring respects user privacy settings

## Future Enhancements

### Potential Additions
- **Slack Integration**: Real-time alerts in team chat
- **Custom Dashboards**: Grafana or similar visualization
- **Business Metrics**: Track simulation usage patterns
- **A/B Testing**: Monitor feature performance
- **Log Aggregation**: Centralized logging with ELK stack

### Upgrade Triggers
- High traffic requiring more detailed analytics
- Team growth needing better collaboration tools
- Compliance requirements for enhanced monitoring
- Performance optimization needs requiring deeper insights