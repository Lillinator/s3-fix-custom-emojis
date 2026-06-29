# Discourse s3-fix-custom-emojis

A lightweight Discourse Theme Component to fix broken custom emojis when using Cloudflare R2 or other S3-compatible object storage.

## 👩‍💻 Overview
Currently, Discourse Core has a bug that breaks custom emojis uploaded to S3/Cloudflare R2 object storage buckets. 

This Theme Component intercepts the broken URLs *only* for custom emojis and instantly swaps them for your correct CDN domain. 

## ⚙️ Settings
Once installed, configure the two settings:

| Setting | Description | Example |
| :--- | :--- | :--- |
| `raw_s3_bucket_url` | The raw bucket URL that Discourse is leaking to the browser. You can find this by inspecting a broken/bypassed chat image. | `my-forum.s3.amazonaws.com` or `...eu.r2.cloudflarestorage.com` |
| `s3_cdn_url` | The exact domain you have configured in your Discourse `s3_cdn_url` setting. | `uploads.your-site.com` |

> **Note:** Do not include `https://` or trailing slashes in the settings - just use the raw domains.

***

**Support**: For issues or feature requests, please start a PR on this repo.  
