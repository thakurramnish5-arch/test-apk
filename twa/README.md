# Android app (TWA)

The "Download App" button on Android phones downloads
`public/app/salooni-transport.apk`. That APK is built from this folder: a
Trusted Web Activity (generated with Bubblewrap) that opens
`https://saloonitransport.in` full-screen, with no browser bar.

- Package: `in.saloonitransport.app`
- Site config: `twa-manifest.json` and `app/build.gradle` (`hostName`)
- Ownership proof: `public/.well-known/assetlinks.json` (signing key SHA-256)

## Build / update the APK

```bash
bash twa/build-apk.sh
```

Then commit `public/app/salooni-transport.apk` and deploy. Web content changes
never need a new APK, because the app always loads the live site. Rebuild only
when the domain, name or icon changes, and bump `appVersionCode` in
`app/build.gradle` first.

## Signing key: back it up

`android.keystore` and its password (`keystore.env`) are git-ignored. Keep a
private copy, for example in a password manager. If the key is lost, phones with
the app installed cannot update it, and `assetlinks.json` has to change.

## Changing the domain

Update `host` in `twa-manifest.json`, `hostName` in `app/build.gradle`, and
`NEXT_PUBLIC_SITE_URL`. Then rebuild.
