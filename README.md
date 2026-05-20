# sorrento

Simple restaurant website with a client-side reservation demo.

Quick start

1. Open `index.html` in your browser to view the site and reservation widget.
2. Make a reservation from the site — bookings are saved to `localStorage` (key `sorrento_bookings`).
3. Open `admin.html` to view and manage bookings (approve/reject/delete).

Next steps

- Connect `firebase-config.js` and update `assets/js/app.js` / `assets/js/admin.js` to persist bookings to Firestore.
- Add server-side email notifications via an SMTP service or Firebase Cloud Functions.

Firebase Cloud Functions (email notifications)

1. Install dependencies and deploy from `functions/`:

```bash
cd functions
npm install
# set SendGrid key in functions config: firebase functions:config:set sendgrid.key="YOUR_KEY"
firebase deploy --only functions
```

2. The function `onBookingCreated` sends an email when a new booking document is created. `onBookingStatusChange` sends emails when `status` is updated.

Admin authentication

- Add your Firebase web app config into `firebase-config.js` (set `window.FIREBASE_CONFIG`).
- Use the admin sign-in form on `admin.html` (requires an admin user created in Firebase Auth).

Emulator notes (recommended for local testing)

1. Install Firebase CLI and the emulators plugin if you haven't already:

```bash
npm install -g firebase-tools
firebase login
```

2. Start emulators from the project root:

```bash
cd "sorrento"
firebase emulators:start --only firestore,functions
```

3. While emulators run, the web app will connect to Firestore emulator if `FIREBASE_CONFIG` is set and the SDK points to localhost. You can test the functions locally and watch logs in the emulator UI (http://localhost:4000).


