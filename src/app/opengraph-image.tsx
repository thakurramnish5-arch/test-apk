import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

/**
 * The preview card shown when the site link is shared on WhatsApp,
 * Facebook and elsewhere. Inner pages inherit it.
 */
export const alt = `${siteConfig.brand.name} — vehicle booking in Salooni, Chamba`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/logo-mark.svg"), "utf8");
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1f5f4e 0%, #0f3129 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img src={markSrc} width={132} height={132} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1 }}>
              Salooni
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 9,
                color: "#F6AC2F",
              }}
            >
              TRANSPORT HUB
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.15 }}>
            Car, bus, pickup, truck, tractor &amp; JCB on hire
          </div>
          <div style={{ marginTop: 18, fontSize: 30, color: "#cfe7dd" }}>
            Experienced drivers · Fair local rates · Salooni, Chamba
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "12px 26px",
              borderRadius: 14,
              background: "#F6AC2F",
              color: "#0f3129",
            }}
          >
            Enquire on WhatsApp
          </div>
          <div style={{ display: "flex" }}>{siteConfig.contact.phoneDisplay}</div>
        </div>
      </div>
    ),
    size,
  );
}
