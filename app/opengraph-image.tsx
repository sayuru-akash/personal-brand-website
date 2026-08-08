import { ImageResponse } from "next/og";

export const alt =
  "Sayuru Akash Amarasinghe - Full-stack Developer and Musical Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#ffffff",
        color: "#171613",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(rgba(23,22,19,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(23,22,19,0.055) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        style={{
          width: 8,
          height: "100%",
          display: "flex",
          background: "#d63a2f",
        }}
      />
      <div
        style={{
          width: "61%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 36px 58px 58px",
        }}
      >
        <div style={{ display: "flex", color: "#d63a2f", fontSize: 28, fontWeight: 700 }}>
          Sayuru
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 0.98, fontWeight: 900 }}>
            Sayuru Akash
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 8,
              color: "#234fd5",
              fontSize: 60,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            Amarasinghe
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#6e675e", fontWeight: 600 }}>
          Full-stack Developer / Musical Artist / Founder
        </div>
      </div>
      <div
        style={{
          width: "39%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "#eef4ff",
          padding: "44px 36px 0",
        }}
      >
        <div
          style={{
            width: 390,
            height: 488,
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "2px solid #171613",
            borderRadius: "26px 26px 0 0",
            background: "#ffffff",
          }}
        >
          <div
            style={{
              width: 288,
              height: 288,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: "24px solid #d63a2f",
              color: "#171613",
              fontSize: 178,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            S
          </div>
          <div
            style={{
              position: "absolute",
              right: 28,
              top: 28,
              width: 16,
              height: 16,
              display: "flex",
              borderRadius: 999,
              background: "#234fd5",
            }}
          />
        </div>
      </div>
    </div>,
    size,
  );
}
