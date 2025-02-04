# 📑 GSheet Rest API

Simple yet deployable rest API for your Google Sheet. Turn your Google Sheet into API.

- API Doc: [gsheet-rest-api.vercel.app/docs](https://gsheet-rest-api.vercel.app/docs)

## Setup access

+ Enable Google Sheets API + Google Drive API in your Cloud Console
+ Create new service account
+ Add new keys in your service account
  - Download the JSON file, and put it in the `.env.local`. [Read this article](https://dev.to/vvo/how-to-add-firebase-service-account-json-files-to-vercel-ph5)
+ Grant your service account access to the speadsheet
  - Share the spreadsheet
  - Add people with email from your service account
  - Click "Copy link" button to get the `spreadsheetid` (e.g: If the link is `https://docs.google.com/spreadsheets/d/1-Qi5_aizQiNTMRBuqboory9Ba7lyonxCjDCogASdVdg/edit?usp=sharing` then the ID is `1-Qi5_aizQiNTMRBuqboory9Ba7lyonxCjDCogASdVdg`)

## Development

- Install dependencies

```bash
bun install
```

- Run project

```bash
bun run dev
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmazipan%2Fgsheet-rest-api)

Add environment variable `GOOGLE_CREDENTIALS` with your JSON from service account key.

## Limitations and Quota

[Following Google Sheets API documentation](https://developers.google.com/sheets/api/limits). This version of the Google Sheets API has a limit of 500 requests per 100 seconds per project, and 100 requests per 100 seconds per user. Limits for reads and writes are tracked separately. There is no daily usage limit.

Be mindful about this limitation, if you want to use this api as a backend for your frontend!

## Credits

- [melalj/gsheet-api](https://github.com/melalj/gsheet-api)
- [openais-io/sheepdb](https://github.com/openais-io/sheepdb)

---

ⓒ since 2025, By Irfan Maulana