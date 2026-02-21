# Privacy Policy for Save HTML as Markdown

**Last Updated:** February 21, 2026

## Overview

Save HTML as Markdown is committed to protecting your privacy. This extension processes all webpage content locally in your browser and does not collect, store, or transmit any user data.

## Data Collection

**We do not collect any user data.** Specifically:

- No personally identifiable information
- No browsing history
- No user activity or behavior tracking
- No authentication credentials
- No location data
- No financial information
- No health information

## How the Extension Works

Save HTML as Markdown:

1. **Runs locally**: All HTML-to-Markdown conversion happens entirely within your browser
2. **No external communication**: The extension does not connect to any external servers or services
3. **No data storage**: The extension does not use any persistent storage (no cookies, no local storage, no IndexedDB)
4. **User-initiated**: The extension only reads page content when you explicitly click the extension icon and choose to save

## Website Content

The extension reads the HTML content of the current webpage solely to convert it into a Markdown file. This content:

- Is processed entirely within your browser
- Is saved directly to your local computer via the browser's download API
- Is never transmitted to any external server or third party
- Is never stored by the extension beyond the active conversion

When the optional "Embed images as data URLs" feature is enabled, the extension fetches images from the URLs already present on the webpage to encode them inline in the Markdown file. These requests go only to the image sources already on the page — no external services are contacted.

## Permissions Explanation

### Content Scripts (`<all_urls>`)

The extension requires permission to inject a content script on any webpage so it can extract page content for Markdown conversion. The content script only sets up a message listener — it does not read or modify page content until you explicitly click the extension icon. Actual page access is gated by the `activeTab` permission.

### Active Tab (`activeTab`)

This permission allows the extension to read the content of the currently active tab when you click the extension icon. It is only used when you interact with the extension.

### Downloads (`downloads`)

This permission allows the extension to save the generated Markdown file to your computer using the browser's built-in download dialog.

## Third-Party Services

Save HTML as Markdown does not:

- Use any third-party analytics services
- Connect to any external APIs
- Share data with any third parties
- Include any tracking pixels or cookies
- Load any remote code or resources

## Data Security

Since no data is collected, stored, or transmitted, there are no data security concerns related to external storage or transmission. All processing occurs within your browser's secure environment.

## Children's Privacy

This extension does not knowingly collect any information from anyone, including children under the age of 13.

## Changes to This Privacy Policy

We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.

## Open Source

This extension is open source. You can review the complete source code at:
https://github.com/eupthere/save-html-as-markdown

## Contact

If you have any questions about this privacy policy, please open an issue on the GitHub repository:
https://github.com/eupthere/save-html-as-markdown/issues

## Your Consent

By using this extension, you consent to this privacy policy.
