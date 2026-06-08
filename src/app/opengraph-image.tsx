import { ImageResponse } from "next/og";

export const alt = "廣岡晃一 | Backend Engineer Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const interData = await fetch(
    "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO · BACKEND ENGINEER · FULL-STACK
          </span>
        </div>

        {/* main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "108px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            廣岡
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "108px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            晃一
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            {["Python", "Django", "DRF", "React", "Flutter", "AWS"].map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.15)",
              fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            koichi.hirooka.me/portfolio
          </span>
        </div>

        {/* decorative line */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "2px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
