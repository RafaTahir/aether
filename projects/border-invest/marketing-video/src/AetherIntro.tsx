import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  Easing,
} from "remotion";
import { ding, whoosh } from "@remotion/sfx";

const palette = {
  bg: "#0d0a06",
  bgElevated: "#171108",
  paper: "#f7f1e6",
  gold: "#f4c94f",
  bright: "#ffe59a",
  muted: "#c8b99a",
  mutedDark: "#8d7d61",
  ink: "#1a140b",
};

const serif = "Georgia, 'Times New Roman', serif";
const sans = "Arial, Helvetica, sans-serif";
const mono = "'IBM Plex Mono', Consolas, monospace";

export function AetherIntro() {
  return (
    <AbsoluteFill style={{ background: palette.bg, fontFamily: sans }}>
      <Sequence from={0} durationInFrames={120} premountFor={30}>
        <FadeScene duration={120}>
          <HookScene />
        </FadeScene>
      </Sequence>
      <Sequence from={120} durationInFrames={150} premountFor={30}>
        <FadeScene duration={150}>
          <ProblemScene />
        </FadeScene>
      </Sequence>
      <Sequence from={270} durationInFrames={300} premountFor={30}>
        <FadeScene duration={300}>
          <ProductScene />
        </FadeScene>
      </Sequence>
      <Sequence from={570} durationInFrames={180} premountFor={30}>
        <FadeScene duration={180}>
          <ProofScene />
        </FadeScene>
      </Sequence>
      <Sequence from={750} durationInFrames={150} premountFor={30}>
        <FadeScene duration={150}>
          <CloseScene />
        </FadeScene>
      </Sequence>
    </AbsoluteFill>
  );
}

function FadeScene({
  children,
  duration,
}: {
  children: React.ReactNode;
  duration: number;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 18, Math.max(18, duration - 20), duration],
    [0, 1, 1, 0],
    { easing: Easing.inOut(Easing.cubic), extrapolateRight: "clamp" }
  );
  const translateY = interpolate(frame, [0, 20], [20, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity, transform: `translateY(${translateY}px)` }}>
      {children}
    </AbsoluteFill>
  );
}

function HookScene() {
  const frame = useCurrentFrame();
  const reveal = spring({ frame, fps: 30, config: { damping: 200 } });
  const lineWidth = interpolate(reveal, [0, 1], [0, 620], {
    extrapolateRight: "clamp",
  });
  return (
    <SceneFrame>
      <div style={{ position: "absolute", top: 94, left: 120 }}>
        <Eyebrow>AETHER / PROJECT CAPITAL</Eyebrow>
        <div
          style={{
            marginTop: 42,
            color: palette.gold,
            fontFamily: serif,
            fontSize: 132,
            letterSpacing: "-0.065em",
            lineHeight: 0.82,
            opacity: reveal,
          }}
        >
          Aether
        </div>
        <div
          style={{
            width: lineWidth,
            height: 3,
            marginTop: 42,
            background: palette.gold,
          }}
        />
        <div
          style={{
            maxWidth: 780,
            marginTop: 48,
            color: palette.paper,
            fontFamily: serif,
            fontSize: 68,
            letterSpacing: "-0.045em",
            lineHeight: 0.98,
            opacity: reveal,
          }}
        >
          Projects worth crossing borders for.
        </div>
        <div
          style={{
            maxWidth: 700,
            marginTop: 28,
            color: palette.muted,
            fontSize: 27,
            lineHeight: 1.4,
            opacity: interpolate(reveal, [0.2, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Capital with context. The room where operators, evidence, and progress
          stay attached to the decision.
        </div>
      </div>
      <Constellation progress={reveal} />
      <FooterLabel>ONE PROJECT ROOM / MANY REASONS TO TRUST IT</FooterLabel>
    </SceneFrame>
  );
}

function ProblemScene() {
  const frame = useCurrentFrame();
  const reveal = spring({ frame, fps: 30, config: { damping: 200 } });
  const labels = ["INVESTORS", "GRANTS", "CSR"];
  return (
    <SceneFrame paper>
      <Audio src={whoosh} volume={0.18} />
      <div style={{ position: "absolute", top: 120, left: 120 }}>
        <Eyebrow dark>THE TRANSLATION TAX</Eyebrow>
        <h2
          style={{
            maxWidth: 760,
            margin: "40px 0 0",
            color: palette.ink,
            fontFamily: serif,
            fontSize: 84,
            fontWeight: 500,
            letterSpacing: "-0.055em",
            lineHeight: 0.94,
          }}
        >
          Good projects are forced to translate themselves three ways.
        </h2>
        <div
          style={{
            width: interpolate(reveal, [0, 1], [0, 110], {
              extrapolateRight: "clamp",
            }),
            height: 4,
            marginTop: 42,
            background: palette.gold,
          }}
        />
        <p
          style={{
            maxWidth: 720,
            margin: "34px 0 0",
            color: "#655945",
            fontSize: 28,
            lineHeight: 1.4,
          }}
        >
          One project becomes an investor memo, a grant application, and a CSR
          report. The work stays the same. The trust layer does not.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: 170,
          right: 140,
          width: 620,
          height: 620,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "grid",
            width: 188,
            height: 188,
            placeItems: "center",
            border: `3px solid ${palette.gold}`,
            borderRadius: 999,
            background: palette.gold,
            color: palette.ink,
            fontFamily: serif,
            fontSize: 38,
            textAlign: "center",
            transform: "translate(-50%, -50%)",
          }}
        >
          The
          <br />
          operator
        </div>
        {labels.map((label, index) => {
          const positions = [
            { top: 10, left: 0 },
            { top: 0, right: 0 },
            { bottom: 26, right: 10 },
          ][index];
          const opacity = interpolate(
            frame,
            [20 + index * 12, 40 + index * 12],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          return (
            <div
              key={label}
              style={{
                position: "absolute",
                ...positions,
                minWidth: 190,
                padding: "18px 22px",
                border: "1px solid rgba(139,106,34,.42)",
                background: "rgba(255,255,255,.48)",
                color: "#775718",
                fontFamily: mono,
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.1em",
                opacity,
                textAlign: "center",
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
      <FooterLabel dark>01 / THE PROBLEM / FRAGMENTED CAPITAL</FooterLabel>
    </SceneFrame>
  );
}

function ProductScene() {
  const frame = useCurrentFrame();
  const phase = frame < 132 ? 0 : 1;
  const localFrame = phase === 0 ? frame : frame - 132;
  const reveal = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 200 },
  });
  const screenshot =
    phase === 0 ? "assets/aether-home.png" : "assets/aether-project-room.png";
  const eyebrow = phase === 0 ? "THE WEDGE" : "THE DECISION SURFACE";
  const headline =
    phase === 0
      ? "A catalog of project rooms, not a token list."
      : "A project room holds the whole case.";
  const tags =
    phase === 0
      ? ["10 PROJECT ROOMS", "8 MARKETS"]
      : ["TERMS", "EVIDENCE", "ACTION"];
  return (
    <SceneFrame>
      <Audio src={whoosh} volume={0.16} />
      <BrowserFrame src={screenshot} reveal={reveal} />
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 120,
          width: 470,
          opacity: reveal,
        }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          style={{
            margin: "28px 0 0",
            color: palette.paper,
            fontFamily: serif,
            fontSize: 58,
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 1.02,
          }}
        >
          {headline}
        </h2>
        <div
          style={{
            width: 90,
            height: 3,
            marginTop: 32,
            background: palette.gold,
          }}
        />
        <div style={{ display: "grid", gap: 14, marginTop: 42 }}>
          {tags.map((tag, index) => (
            <div
              key={tag}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                color: index === 0 ? palette.bright : palette.muted,
                fontFamily: mono,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.1em",
                opacity: interpolate(
                  frame,
                  [24 + index * 10, 42 + index * 10],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                ),
              }}
            >
              <span style={{ color: palette.gold }}>0{index + 1}</span>
              {tag}
            </div>
          ))}
        </div>
      </div>
      <FooterLabel>02 / PRODUCT / FROM BRIEF TO ROOM</FooterLabel>
    </SceneFrame>
  );
}

function ProofScene() {
  const frame = useCurrentFrame();
  const reveal = spring({ frame, fps: 30, config: { damping: 200 } });
  const metrics = [
    ["100", "release path / deposited"],
    ["60", "release path / released"],
    ["50", "safety path / refunded"],
  ];
  return (
    <SceneFrame paper>
      <Audio src={whoosh} volume={0.14} />
      <div style={{ position: "absolute", top: 120, left: 120 }}>
        <Eyebrow dark>WHY SOLANA</Eyebrow>
        <h2
          style={{
            maxWidth: 1000,
            margin: "40px 0 0",
            color: palette.ink,
            fontFamily: serif,
            fontSize: 78,
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 0.98,
          }}
        >
          Use the chain for the movement record, not the whole product.
        </h2>
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 150,
          left: 120,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {metrics.map(([value, label], index) => {
          const opacity = interpolate(
            frame,
            [30 + index * 12, 52 + index * 12],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          const scale = interpolate(reveal, [0, 1], [0.92, 1], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={label}
              style={{
                padding: "26px 28px",
                border: "1px solid rgba(26,20,11,.16)",
                background: "rgba(255,255,255,.42)",
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  color: palette.gold,
                  fontFamily: mono,
                  fontSize: 76,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  marginTop: 18,
                  color: "#655945",
                  fontFamily: mono,
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
      <FooterLabel dark>03 / PROOF / SEPARATE DEVNET SMOKE PATHS</FooterLabel>
    </SceneFrame>
  );
}

function CloseScene() {
  const frame = useCurrentFrame();
  const reveal = spring({ frame, fps: 30, config: { damping: 200 } });
  return (
    <SceneFrame>
      <Audio src={ding} volume={0.12} />
      <div style={{ position: "absolute", top: 130, left: 120 }}>
        <Eyebrow>THE NEXT ROOM</Eyebrow>
        <h2
          style={{
            maxWidth: 980,
            margin: "42px 0 0",
            color: palette.paper,
            fontFamily: serif,
            fontSize: 96,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            lineHeight: 0.92,
            opacity: reveal,
          }}
        >
          Make the first corridor trustworthy.
        </h2>
        <div
          style={{
            width: 120,
            height: 4,
            marginTop: 44,
            background: palette.gold,
          }}
        />
        <p
          style={{
            maxWidth: 820,
            margin: "34px 0 0",
            color: palette.muted,
            fontSize: 30,
            lineHeight: 1.35,
            opacity: reveal,
          }}
        >
          Five operators. Three funder partners. One capital lane.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 150,
          color: palette.bright,
          fontFamily: mono,
          fontSize: 22,
          letterSpacing: "0.08em",
          opacity: reveal,
        }}
      >
        AETHER-SIX-AZURE-ONE.VERCEL.APP
      </div>
      <FooterLabel>SOLANA DEVNET / CAPITAL WITH CONTEXT</FooterLabel>
    </SceneFrame>
  );
}

function BrowserFrame({ src, reveal }: { src: string; reveal: number }) {
  const frame = useCurrentFrame();
  const scale = interpolate(reveal, [0, 1], [0.94, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 122,
        left: 100,
        width: 1050,
        height: 690,
        overflow: "hidden",
        border: `1px solid ${palette.gold}`,
        background: "#080604",
        boxShadow: "0 30px 90px rgba(0,0,0,.5)",
        opacity: reveal,
        transform: `scale(${scale})`,
        transformOrigin: "left center",
      }}
    >
      <div
        style={{
          display: "flex",
          height: 46,
          alignItems: "center",
          gap: 8,
          padding: "0 18px",
          borderBottom: "1px solid rgba(244,201,79,.25)",
          background: "#161009",
        }}
      >
        {[palette.gold, "#c8b99a", "#8d7d61"].map((color) => (
          <span
            key={color}
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              background: color,
              opacity: 0.85,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 18,
            color: palette.mutedDark,
            fontFamily: mono,
            fontSize: 12,
          }}
        >
          aether / project room
        </span>
      </div>
      <Img
        src={staticFile(src)}
        style={{
          display: "block",
          width: "100%",
          height: "calc(100% - 46px)",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 18,
          bottom: 18,
          padding: "8px 10px",
          border: "1px solid rgba(244,201,79,.5)",
          background: "rgba(13,10,6,.9)",
          color: palette.bright,
          fontFamily: mono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Live product capture
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: palette.gold,
          transform: `scaleX(${interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" })})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

function Constellation({ progress }: { progress: number }) {
  const nodes = [
    ["PROJECTS", 1310, 220],
    ["CAPITAL", 1600, 300],
    ["EVIDENCE", 1360, 700],
    ["PROGRESS", 1610, 720],
  ] as const;
  return (
    <div
      style={{
        position: "absolute",
        top: 180,
        right: 160,
        width: 580,
        height: 580,
        opacity: progress,
      }}
    >
      <svg
        viewBox="0 0 580 580"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        aria-hidden="true"
      >
        <circle
          cx="290"
          cy="290"
          r="180"
          fill="none"
          stroke={palette.gold}
          strokeWidth="2"
          opacity=".4"
        />
        <circle
          cx="290"
          cy="290"
          r="235"
          fill="none"
          stroke={palette.gold}
          strokeWidth="1"
          strokeDasharray="2 12"
          opacity=".45"
        />
        {[
          "M290 290 C190 225 110 170 30 120",
          "M290 290 C390 225 470 175 550 125",
          "M290 290 C185 350 105 405 30 470",
          "M290 290 C395 350 475 410 550 470",
        ].map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={palette.gold}
            strokeWidth="2"
            opacity=".5"
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "grid",
          width: 220,
          height: 220,
          placeItems: "center",
          border: `2px solid ${palette.gold}`,
          borderRadius: 999,
          background: palette.gold,
          color: palette.ink,
          fontFamily: serif,
          fontSize: 38,
          textAlign: "center",
          transform: "translate(-50%, -50%)",
        }}
      >
        Capital
        <br />
        with context.
      </div>
      {nodes.map(([label, left, top]) => (
        <div
          key={label}
          style={{
            position: "absolute",
            top: top - 180,
            left: left - 1180,
            minWidth: 155,
            padding: "16px 22px",
            border: "1px solid rgba(244,201,79,.35)",
            background: "rgba(255,255,255,.035)",
            color: palette.bright,
            fontFamily: mono,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function SceneFrame({
  children,
  paper = false,
}: {
  children: React.ReactNode;
  paper?: boolean;
}) {
  return (
    <AbsoluteFill
      style={{
        background: paper ? palette.paper : palette.bg,
        color: paper ? palette.ink : palette.paper,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        color: dark ? "#8b6a22" : palette.gold,
        fontFamily: mono,
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function FooterLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: 120,
        bottom: 52,
        left: 120,
        display: "flex",
        justifyContent: "space-between",
        color: dark ? "#907f61" : palette.mutedDark,
        fontFamily: mono,
        fontSize: 13,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}
