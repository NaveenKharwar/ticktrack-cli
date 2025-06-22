# Google Sheets API Setup for TickTrack CLI

This guide walks you through setting up Google Sheets API so that TickTrack CLI can log your ticket entries directly into a spreadsheet.

---

## Step 1: Create a Google Cloud Project

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click the **project dropdown** in the top navbar
3. Select **New Project**
4. Provide a name (e.g., `TickTrack Logger`)
5. Click **Create**

---

## Step 2: Enable the Google Sheets API

1. From the left menu, go to **APIs & Services → Library**
2. Search for `Google Sheets API`
3. Click on it and select **Enable**

> This step is required only once per project.

---

## Step 3: Create a Service Account

1. Navigate to **APIs & Services → Credentials**
2. Click **+ Create Credentials → Service Account**
3. Enter a name such as `ticktrack-writer`
4. Click **Create and Continue**
5. Skip role assignment and click **Done**

The service account will appear in the credentials list.

---

## Step 4: Create and Download a JSON Key

1. On the **Credentials** page, click your service account's name  
   (or go to **IAM & Admin → Service Accounts** and select it)
2. Open the **Keys** tab
3. Click **Add Key → Create new key**
4. Choose the **JSON** format and click **Create**

This will download a JSON file containing your credentials.

---

## Step 5: Add the Credentials to Your Project

1. Rename the downloaded file to `credentials.json`
2. Move it to the root of your project:

```

ticktrack-cli/
├── src/
├── credentials.json
├── .env
└── README.md

````

Make sure not to commit this file to version control.

---

## Step 6: Share Access with Your Google Sheet

1. Open the Google Sheet that you want to use for storing ticket logs
2. Click **Share**
3. Copy the service account email (e.g., `ticktrack-writer@your-project.iam.gserviceaccount.com`)
4. Paste it in the "Add people and groups" field
5. Set permission to **Editor**
6. Click **Send**

---

## Step 7: Add Your Sheet ID to Environment Variables

Create a `.env` file in the root directory and include the following:

```env
GOOGLE_SHEET_ID=your-google-sheet-id-here
````

> You can find the Sheet ID from the URL:
>
> `https://docs.google.com/spreadsheets/d/your-google-sheet-id/edit`

---

## Step 8: Run the CLI Application

Run the application using the following command:

```bash
npm run start
```

This will start the CLI and allow you to log tickets into the Google Sheet. A new sheet will be created for each day automatically, if one doesn’t already exist.

---

## Troubleshooting

| Issue                                 | Solution                                                  |
| ------------------------------------- | --------------------------------------------------------- |
| `Missing GOOGLE_SHEET_ID`             | Ensure your `.env` file is configured correctly           |
| `The caller does not have permission` | Verify that your sheet is shared with the service account |
| `credentials.json not found`          | Confirm the file exists in the root directory             |
| API quota exceeded                    | Limit frequent operations; check usage in Cloud Console   |

---

## Best Practices

* Do not commit `credentials.json` or `.env` to source control
* Rotate service account keys periodically
* Restrict access to the service account at the IAM level

---

## Resources

* [Google Sheets API Documentation](https://developers.google.com/sheets/api)
* [Google Cloud Console](https://console.cloud.google.com/)
* [Service Accounts Guide](https://cloud.google.com/iam/docs/service-accounts)

---

© 2025 TickTrack CLI — Developed by Naveen