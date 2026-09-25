#!/usr/bin/env bash
# Builds the signed Android app and puts it where the website's
# "Download App" button serves it: public/app/salooni-transport.apk
#
# Usage (from the project root):  bash twa/build-apk.sh
# apksigner asks for the keystore password — it is in twa/keystore.env.
set -euo pipefail

cd "$(dirname "$0")"

export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export JAVA_HOME="${JAVA_HOME_17:-$(ls -d "$HOME"/.local/jdk/jdk-17* 2>/dev/null | head -1)}"
BUILD_TOOLS="$ANDROID_HOME/build-tools/35.0.0"
OUT="../public/app/salooni-transport.apk"

[ -f android.keystore ] || { echo "twa/android.keystore not found — restore it from your backup."; exit 1; }
[ -d "$JAVA_HOME" ] || { echo "JDK 17 not found. Set JAVA_HOME_17 to a JDK 17 folder."; exit 1; }

echo "==> Building release APK"
./gradlew assembleRelease --console=plain -q \
  -Porg.gradle.java.installations.paths="$JAVA_HOME" \
  -Porg.gradle.java.installations.auto-detect=false

UNSIGNED=app/build/outputs/apk/release/app-release-unsigned.apk
ALIGNED=app-release-aligned.apk
rm -f "$ALIGNED"
"$BUILD_TOOLS/zipalign" -p -f 4 "$UNSIGNED" "$ALIGNED"

echo "==> Signing (enter the keystore password from twa/keystore.env)"
mkdir -p "$(dirname "$OUT")"
"$BUILD_TOOLS/apksigner" sign --ks android.keystore --ks-key-alias salooni --out "$OUT" "$ALIGNED"
rm -f "$ALIGNED" "$OUT.idsig"

"$BUILD_TOOLS/apksigner" verify --print-certs "$OUT" | grep -i "SHA-256"
echo "==> Done: public/app/salooni-transport.apk ($(du -h "$OUT" | cut -f1))"
echo "    The SHA-256 above must match public/.well-known/assetlinks.json."
