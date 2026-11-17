# Connect the website to Google Drive and Google Sheets

You do this **once**. After that, you only upload files to Drive and type in the
Sheet. The website updates by itself. Students can only **view and download**.
They can never upload or change anything.

---

## Part 1: Google Drive folders (notes, papers, documents)

1. Open **drive.google.com** and make a folder called `BDA Website`.
2. Inside it, make these folders:
   - `Notes`
   - `Important Questions`
   - `Documents`
3. Share each folder like this:
   right-click the folder > **Share** > under *General access* choose
   **Anyone with the link** > role **Viewer** > **Copy link** > **Done**.
4. Open `data.js` and paste each link in the `GOOGLE` section:

```js
notes: [
  { label: "Lecture notes", folder: "PASTE NOTES FOLDER LINK HERE" }
],
questions: [
  { label: "Question papers & important question PDFs", folder: "PASTE LINK" }
],
documents: [
  { label: "Documents", folder: "PASTE LINK" }
],
```

**Want one folder per unit?** Add more lines, one per unit:

```js
notes: [
  { label: "Unit 1", folder: "LINK OF UNIT 1 FOLDER" },
  { label: "Unit 2", folder: "LINK OF UNIT 2 FOLDER" }
],
```

**Daily use:** drag files into the folder (works from the phone's Google Drive app too).
They appear on the website automatically. Delete a file in Drive and it disappears.

---

## Part 2: Google Sheet (notices and important questions)

1. Open **sheets.google.com** and create a new sheet called `BDA Website Data`.
2. Make **2 tabs** at the bottom, named **exactly**:
   `Notices`, `ImpQuestions`
3. Type the headings in **row 1** of each tab:

**Notices**

| Date | Title | Message | Pinned | File |
|---|---|---|---|---|
| 17/11/2026 | Unit 2 notes uploaded | Check the Notes page | yes | (optional Drive file link) |

**ImpQuestions**

| Module | Question | Marks | Tag |
|---|---|---|---|
| 1 | Explain the 5 Vs of Big Data. | 10 | Very important |
| 2 | Explain HDFS write flow. | 10 | Repeated |

4. Share the sheet: **Share** > *General access* > **Anyone with the link** > **Viewer** > **Copy link**.
5. Paste the link in `data.js`:

```js
sheet: "PASTE GOOGLE SHEET LINK HERE",
```

**Daily use:** add a row in a tab and refresh the website. It updates within a minute or two.

---

## Part 3 (optional): nicer file cards with a search box

Without this step, each Drive folder shows inside a Google Drive box. That still
works: students click a file to view it and can download it from there.

With an API key, every file gets its own colourful card with **View** and
**Download** buttons, plus a **search box**:

1. Go to **console.cloud.google.com** (sign in with the same Google account).
2. Top bar > **Select a project** > **New project** > name `bda-website` > **Create**.
3. Search for **Google Drive API** > open it > **Enable**.
4. Left menu > **APIs & Services** > **Credentials** > **Create credentials** > **API key**. Copy it.
5. (Recommended) Click the key > *API restrictions* > **Restrict key** > tick **Google Drive API** > **Save**.
6. Paste it in `data.js`:

```js
apiKey: "PASTE API KEY HERE",
```

---

## Checklist if something does not show

- Is the folder or sheet shared as **Anyone with the link: Viewer**?
- Are the tab names spelled exactly `Notices` and `ImpQuestions`?
- Is row 1 the heading row?
- Did you save `data.js` and refresh the page (Ctrl + F5)?
- If the website is online (GitHub/Netlify), did you upload the new `data.js`?
  (You only need to do this once, after pasting the links.)
