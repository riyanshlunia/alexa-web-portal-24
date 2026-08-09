"use client"

import Image from "next/image"

const CANVAS_WIDTH = 1440
const SECTION_TOP = 4679
const SECTION_BOTTOM = 5814
const CANVAS_BOTTOM_PADDING = 200
const CANVAS_HEIGHT =
  SECTION_BOTTOM - SECTION_TOP + CANVAS_BOTTOM_PADDING

const toLocal = (figmaTop: number) =>
  figmaTop - SECTION_TOP

const ACCENT_RED = "#C32325"
const DESCRIPTION_COLOR = "#FFFFFF"
const FONT_FAMILY =
  "var(--font-formula1), var(--font-montserrat-alternates), sans-serif"

const HEADING = {
  left: 427,
  top: toLocal(4679),
  width: 587,
  height: 86,
  fontSize: 72,
}

const TITLE_FONT_SIZE = 36
const TITLE_HEIGHT = 43
const DESCRIPTION_FONT_SIZE = 22
const TEXT_GAP = 8

const ICON_SIZE = 130
const ICON_GAP = 24

const MOBILE_BADGE_SIZE = 56
const MOBILE_TEXT_GAP = 16
const MOBILE_RIGHT_PADDING = 16

const MOBILE_CANVAS_WIDTH = 393
const MOBILE_CANVAS_HEIGHT = 743
const MOBILE_SECTION_TOP = 3885

const toLocalMobile = (figmaTop: number) =>
  figmaTop - MOBILE_SECTION_TOP

const MOBILE_BG_BOX = {
  left: 0,
  top: toLocalMobile(3664),
  width: 393,
  height: 952,
}

const MOBILE_HERO_PHOTO_BOX = {
  left: 0,
  top: toLocalMobile(3664),
  width: 393,
  height: 376,
}

const MOBILE_CARD_BOX = {
  left: 18,
  top: toLocalMobile(3992),
  width: 357,
  height: 636,
}

const MOBILE_SPINE = {
  left: 35,
  top: toLocalMobile(3980),
  length: 578.6711580507234,
}

const MOBILE_SPINE_GRADIENT =
  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 7.8%, rgba(255,255,255,0.8) 92.07%, rgba(255,255,255,0) 100%)"

const MOBILE_DOT_OUTER = 10.079
const MOBILE_DOT_INNER = 6.551
const MOBILE_DOT_STROKE = 0.504

const MOBILE_STUBS = [
  {
    id: "registration",
    left: 36,
    top: toLocalMobile(4021.22),
    width: 59.92930603027344,
  },
  {
    id: "email",
    left: 35,
    top: toLocalMobile(4145.59),
    width: 60.926990509765625,
  },
  {
    id: "tests",
    left: 35,
    top: toLocalMobile(4269.61),
    width: 60.92686080932617,
  },
  {
    id: "interviews",
    left: 35,
    top: toLocalMobile(4393.64),
    width: 60.926780700683594,
  },
  {
    id: "welcome",
    left: 35,
    top: toLocalMobile(4517.67),
    width: 61,
  },
]

const BADGE_RING_RATIO = 115 / 130
const BADGE_GLOW_RATIO = 81 / 130
const BADGE_RING_STROKE_RATIO = 4.18523 / 115

const DESKTOP_BADGE_RING_SIZE =
  ICON_SIZE * BADGE_RING_RATIO

const BADGE_ASSETS = {
  registration: {
    icon: "/recruitments26/registration-icon.svg",
    glow: "/recruitments26/registration-glow.svg",
    progress: 20,
  },
  email: {
    icon: "/recruitments26/email-icon.svg",
    glow: "/recruitments26/email-glow.svg",
    progress: 40,
  },
  tests: {
    icon: "/recruitments26/tests-icon.svg",
    glow: "/recruitments26/tests-glow.svg",
    progress: 60,
  },
  interviews: {
    icon: "/recruitments26/interviews-icon.svg",
    glow: "/recruitments26/interviews-glow.svg",
    progress: 80,
  },
  welcome: {
    icon: "/recruitments26/welcome-icon.svg",
    glow: "/recruitments26/welcome-glow.svg",
    progress: 100,
  },
}

const REGISTRATION = {
  id: "registration",
  number: "01",
  title: "Registration",
  description:
    "Fill the form below by entering required details to get your journey started!",
  icon: {
    left: 306,
    top: toLocal(4874),
    size: 134.28,
  },
  titleBox: {
    left: 460,
    top: toLocal(4877),
    width: 255,
  },
  descBox: {
    left: 460,
    top: toLocal(4877) + TITLE_HEIGHT + TEXT_GAP,
    width: 344,
    height: 78,
  },
}

const BOXED_STEPS = [
  {
    id: "email",
    number: "02",
    title: "Email",
    description:
      "Keep yourself up to date by checking your registered email on the regular. (Sneak a peek in the spam folder too)",
    iconLeft: 63,
    textLeft: 63 + ICON_SIZE + ICON_GAP,
    top: toLocal(5152),
    titleWidth: 344,
    descWidth: 344,
    descHeight: 130,
    gap: 7,
  },
  {
    id: "tests",
    number: "03",
    title: "Tests/Tasks",
    description:
      "Let the fire in you be kindled. Showcase your talent through tests or tasks to make your mark among the competitors.",
    iconLeft: 873,
    textLeft: 873 + ICON_SIZE + ICON_GAP,
    top: toLocal(5261),
    titleWidth: 253,
    descWidth: 344,
    descHeight: 130,
    gap: 8,
  },
  {
    id: "interviews",
    number: "04",
    title: "Interviews",
    description:
      "You are just one step away. Keep calm and get ready for a small, casual interview.",
    iconLeft: 109,
    textLeft: 249.03,
    top: toLocal(5586),
    titleWidth: 344,
    descWidth: 344,
    descHeight: 104,
    gap: 7,
  },
  {
    id: "welcome",
    number: "05",
    title: "Welcome",
    description:
      "Look at that! You are now officially a part of the Alexa Developers SRM family. Much surprises await on the other side!",
    iconLeft: 831,
    textLeft: 971.03,
    top: toLocal(5633),
    titleWidth: 193,
    descWidth: 344,
    descHeight: 130,
    gap: 8,
  },
]

const ALL_STEPS = [
  {
    id: "registration",
    number: REGISTRATION.number,
    title: REGISTRATION.title,
    description: REGISTRATION.description,
  },
  ...BOXED_STEPS.map((step) => ({
    id: step.id,
    number: step.number,
    title: step.title,
    description: step.description,
  })),
]

const TRACK_SECTOR_WIDTH = 623.2455444335938
const TRACK_SECTOR_HEIGHT = 980.4003295898438
const TRACK_SECTOR_LEFT = 408
const TRACK_SECTOR_TOP = toLocal(4947)

const CONNECTOR_NODE_OUTER = 16.5
const CONNECTOR_NODE_INNER = 10.4

function boxedStepIconCenter(id: string) {
  const step = BOXED_STEPS.find((s) => s.id === id)!

  return {
    x: step.iconLeft + ICON_SIZE / 2,
    y: step.top + ICON_SIZE / 2,
  }
}

const CONNECTOR_DEFS = [
  {
    id: "registration",
    box: {
      left: 376,
      top: toLocal(5003),
    },
    dot: {
      x: 340.49,
      y: 105.03,
    },
    joint: {
      x: 102,
      y: 104.5,
    },
    target: {
      x:
        REGISTRATION.icon.left +
        REGISTRATION.icon.size / 2,
      y:
        REGISTRATION.icon.top +
        REGISTRATION.icon.size / 2,
    },
  },
  {
    id: "email",
    box: {
      left: 116,
      top: toLocal(5312),
    },
    dot: {
      x: 536.566,
      y: 105.033,
    },
    joint: {
      x: 100.639,
      y: 104.424,
    },
    target: boxedStepIconCenter("email"),
  },
  {
    id: "tests",
    box: {
      left: 724,
      top: toLocal(5421),
    },
    dot: {
      x: 8.716,
      y: 105.017,
    },
    joint: {
      x: 122.13,
      y: 104.407,
    },
    target: boxedStepIconCenter("tests"),
  },
  {
    id: "interviews",
    box: {
      left: 170,
      top: toLocal(5728),
    },
    dot: {
      x: 327.13,
      y: 105.99,
    },
    joint: {
      x: 107,
      y: 104.5,
    },
    target: boxedStepIconCenter("interviews"),
  },
  {
    id: "welcome",
    box: {
      left: 548,
      top: toLocal(5781),
    },
    dot: {
      x: 8.517,
      y: 105.036,
    },
    joint: {
      x: 236.4,
      y: 104.56,
    },
    target: boxedStepIconCenter("welcome"),
  },
]

const round2 = (n: number) =>
  Math.round(n * 100) / 100

const CONNECTORS = Object.fromEntries(
  CONNECTOR_DEFS.map((def) => {
    const dotAbs = {
      x: def.box.left + def.dot.x,
      y: def.box.top + def.dot.y,
    }

    const jointAbs = {
      x: def.box.left + def.joint.x,
      y: dotAbs.y,
    }

    const targetVec = {
      x: def.target.x - jointAbs.x,
      y: def.target.y - jointAbs.y,
    }

    const targetAngle =
      (Math.atan2(
        targetVec.y,
        targetVec.x
      ) *
        180) /
      Math.PI

    const targetLen =
      Math.hypot(
        targetVec.x,
        targetVec.y
      ) -
      DESKTOP_BADGE_RING_SIZE / 2

    return [
      def.id,
      {
        dot: {
          x: round2(dotAbs.x),
          y: round2(dotAbs.y),
        },
        joint: {
          x: round2(jointAbs.x),
          y: round2(jointAbs.y),
        },
        angleDeg: round2(targetAngle),
        length: round2(targetLen),
      },
    ]
  })
)

function Layer({
  src,
  width,
  height,
  container,
}: {
  src: string
  width: number
  height: number
  container: number
}) {
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      unoptimized
      className="pointer-events-none absolute select-none"
      style={{
        left: (container - width) / 2,
        top: (container - height) / 2,
      }}
    />
  )
}

function ProgressRing({
  percent,
  container,
}: {
  percent: number
  container: number
}) {
  const ringSize =
    container * BADGE_RING_RATIO

  const strokeWidth =
    ringSize * BADGE_RING_STROKE_RATIO

  const center = ringSize / 2

  const radius =
    (ringSize - strokeWidth) / 2

  const circumference =
    2 * Math.PI * radius

  const filled =
    (percent / 100) * circumference

  const offset =
    (container - ringSize) / 2

  return (
    <svg
      width={ringSize}
      height={ringSize}
      viewBox={`0 0 ${ringSize} ${ringSize}`}
      className="pointer-events-none absolute select-none"
      style={{
        left: offset,
        top: offset,
      }}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#656565"
        strokeWidth={strokeWidth}
        fill="none"
      />

      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="white"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
        transform={`rotate(-90 ${center} ${center})`}
      />
    </svg>
  )
}

function StepBadge({
  stepId,
  number,
  title,
  size,
}: {
  stepId: keyof typeof BADGE_ASSETS
  number: string
  title: string
  size: number
}) {
  const assets = BADGE_ASSETS[stepId]

  const iconSize = Math.round(size * 0.42)

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
      aria-label={`Step ${number}: ${title}, ${assets.progress}% of the journey`}
    >
      <Layer
        src={assets.glow}
        width={size * BADGE_GLOW_RATIO}
        height={size * BADGE_GLOW_RATIO}
        container={size}
      />

      <ProgressRing
        percent={assets.progress}
        container={size}
      />

      <Image
        src={assets.icon}
        alt=""
        width={iconSize}
        height={iconSize}
        unoptimized
        className="relative z-10 pointer-events-none select-none"
      />
    </div>
  )
}

function StepTitle({
  text,
  width,
}: {
  text: string
  width: number
}) {
  return (
    <h3
      className="font-extrabold"
      style={{
        width,
        height: TITLE_HEIGHT,
        fontSize: TITLE_FONT_SIZE,
        lineHeight: 1,
        letterSpacing: 0,
        color: ACCENT_RED,
        fontFamily: FONT_FAMILY,
      }}
    >
      {text}
    </h3>
  )
}

function StepDescription({
  text,
  width,
  height,
  gap,
}: {
  text: string
  width: number
  height: number
  gap: number
}) {
  return (
    <p
      className="font-normal"
      style={{
        width,
        height,
        fontSize: DESCRIPTION_FONT_SIZE,
        lineHeight: 1.2,
        letterSpacing: 0,
        color: DESCRIPTION_COLOR,
        marginTop: gap,
        fontFamily: FONT_FAMILY,
      }}
    >
      {text}
    </p>
  )
}

export default function RoadToAlexa() {
  return (
    <section
      id="roadmap"
      className="relative w-full overflow-visible bg-black pt-32 lg:pt-48"
    >

      <div
  className="pointer-events-none absolute left-0 top-[-360px] z-0 hidden w-full lg:block"
  style={{
    height: "calc(100% + 355px)",
    backgroundImage:
      "url('/recruitments26/road-desktop-bg.svg')",
    backgroundSize: "100% auto",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
  }}
/>

      <div
  className="pointer-events-none absolute left-0 top-0 z-0 w-full lg:hidden"
  style={{
    height: "100%",
    backgroundImage:
      "url('/recruitments26/road-mobile-bg.svg')",
    backgroundSize: "100% auto",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
  }}
/>

      <div className="relative z-10 lg:hidden">
        <div className="px-6 pt-10">
          <h2
            className="mb-6 text-center text-4xl font-extrabold leading-none tracking-tight text-white"
            style={{
              fontFamily: FONT_FAMILY,
            }}
          >
            <span>Road to </span>
            <span style={{ color: ACCENT_RED }}>
              Alexa
            </span>
          </h2>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            containerType: "inline-size",
            aspectRatio: `${MOBILE_CANVAS_WIDTH} / ${MOBILE_CANVAS_HEIGHT}`,
          }}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              width: MOBILE_CANVAS_WIDTH,
              height: MOBILE_CANVAS_HEIGHT,
              transform:
                "scale(calc(100cqw / 393px))",
              transformOrigin: "top left",
            }}
          >
            <Image
              src="/recruitments26/mobile-hero-photo.svg"
              alt=""
              width={MOBILE_HERO_PHOTO_BOX.width}
              height={MOBILE_HERO_PHOTO_BOX.height}
              unoptimized
              className="pointer-events-none absolute select-none"
              style={{
                left: MOBILE_HERO_PHOTO_BOX.left,
                top: MOBILE_HERO_PHOTO_BOX.top,
              }}
            />

            <div
              className="absolute"
              style={{
                left: MOBILE_CARD_BOX.left,
                top: MOBILE_CARD_BOX.top,
                width: MOBILE_CARD_BOX.width,
                height: MOBILE_CARD_BOX.height,
                borderRadius: 32,
                backgroundColor:
                  "rgba(36, 36, 36, 0.15)",
                backdropFilter: "blur(5px)",
              }}
            />

            <div
              className="absolute"
              style={{
                left: MOBILE_SPINE.left,
                top: MOBILE_SPINE.top,
                width: 1,
                height: MOBILE_SPINE.length,
                background:
                  MOBILE_SPINE_GRADIENT,
              }}
            />

            {MOBILE_STUBS.map((stub) => {
              const step = ALL_STEPS.find(
                (s) => s.id === stub.id
              )!

              const badgeLeft =
                stub.left + stub.width

              const badgeTop =
                stub.top -
                MOBILE_BADGE_SIZE / 2

              const textLeft =
                badgeLeft +
                MOBILE_BADGE_SIZE +
                MOBILE_TEXT_GAP

              const textWidth =
                MOBILE_CANVAS_WIDTH -
                textLeft -
                MOBILE_RIGHT_PADDING

              return (
                <div key={stub.id}>
                  <div
                    className="absolute bg-white/60"
                    style={{
                      left: stub.left,
                      top: stub.top,
                      width: stub.width,
                      height: 1,
                    }}
                  />

                  <div
                    className="absolute rounded-full border"
                    style={{
                      left:
                        stub.left -
                        MOBILE_DOT_OUTER / 2,
                      top:
                        stub.top -
                        MOBILE_DOT_OUTER / 2,
                      width: MOBILE_DOT_OUTER,
                      height: MOBILE_DOT_OUTER,
                      borderWidth:
                        MOBILE_DOT_STROKE,
                      borderColor: "#FFFFFF",
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        left:
                          (MOBILE_DOT_OUTER -
                            MOBILE_DOT_INNER) /
                          2,
                        top:
                          (MOBILE_DOT_OUTER -
                            MOBILE_DOT_INNER) /
                          2,
                        width: MOBILE_DOT_INNER,
                        height: MOBILE_DOT_INNER,
                        backgroundColor:
                          "#D9D9D9",
                      }}
                    />
                  </div>

                  <div
                    className="absolute z-10"
                    style={{
                      left: badgeLeft,
                      top: badgeTop,
                    }}
                  >
                    <StepBadge
                      stepId={
                        stub.id as keyof typeof BADGE_ASSETS
                      }
                      number={step.number}
                      title={step.title}
                      size={MOBILE_BADGE_SIZE}
                    />
                  </div>

                  <div
                    className="absolute z-10"
                    style={{
                      left: textLeft,
                      top: badgeTop,
                      width: textWidth,
                    }}
                  >
                    <h3
                      className="mb-1.5 font-extrabold leading-none tracking-tight"
                      style={{
                        color: ACCENT_RED,
                        fontFamily: FONT_FAMILY,
                        fontSize: 20,
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="font-normal leading-snug"
                      style={{
                        color: DESCRIPTION_COLOR,
                        fontFamily: FONT_FAMILY,
                        fontSize: 14,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden lg:block">
        <div
          className="relative mx-auto w-full overflow-hidden"
          style={{
            containerType: "inline-size",
            aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
          }}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform:
                "scale(calc(100cqw / 1440px))",
              transformOrigin: "top left",
            }}
          >
            <Image
              src="/recruitments26/TRACK%20SECTOR.svg"
              alt=""
              width={TRACK_SECTOR_WIDTH}
              height={TRACK_SECTOR_HEIGHT}
              unoptimized
              className="pointer-events-none absolute z-5 select-none"
              style={{
                left: TRACK_SECTOR_LEFT,
                top: TRACK_SECTOR_TOP,
                width: TRACK_SECTOR_WIDTH,
                height: TRACK_SECTOR_HEIGHT,
              }}
            />

            {Object.entries(CONNECTORS).map(
              ([id, connector]) => (
                <div key={id}>
                  <div
                    className="pointer-events-none absolute z-8 select-none"
                    style={{
                      left: Math.min(
                        connector.dot.x,
                        connector.joint.x
                      ),
                      top: connector.dot.y,
                      width: Math.abs(
                        connector.joint.x -
                          connector.dot.x
                      ),
                      height: 0,
                      borderTopWidth: "2px",
                      borderTopStyle: "solid",
                      borderTopColor:
                        "rgba(255, 255, 255, 0.8)",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute z-8 select-none"
                    style={{
                      left: connector.joint.x,
                      top: connector.joint.y,
                      width: connector.length,
                      height: 0,
                      borderTopWidth: "2px",
                      borderTopStyle: "solid",
                      borderTopColor:
                        "rgba(255, 255, 255, 0.8)",
                      transformOrigin: "0% 50%",
                      transform: `rotate(${connector.angleDeg}deg)`,
                    }}
                  />

                  <div
                    className="pointer-events-none absolute z-8 rounded-full border select-none"
                    style={{
                      left:
                        connector.dot.x -
                        CONNECTOR_NODE_OUTER / 2,
                      top:
                        connector.dot.y -
                        CONNECTOR_NODE_OUTER / 2,
                      width:
                        CONNECTOR_NODE_OUTER,
                      height:
                        CONNECTOR_NODE_OUTER,
                      borderWidth: 1.1,
                      borderColor: "#FFFFFF",
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        left:
                          (CONNECTOR_NODE_OUTER -
                            CONNECTOR_NODE_INNER) /
                          2,
                        top:
                          (CONNECTOR_NODE_OUTER -
                            CONNECTOR_NODE_INNER) /
                          2,
                        width:
                          CONNECTOR_NODE_INNER,
                        height:
                          CONNECTOR_NODE_INNER,
                        backgroundColor:
                          "#D9D9D9",
                      }}
                    />
                  </div>
                </div>
              )
            )}

            <h2
              className="absolute z-20 whitespace-nowrap font-extrabold text-white"
              style={{
                left: HEADING.left,
                top: HEADING.top,
                width: HEADING.width,
                height: HEADING.height,
                fontSize: HEADING.fontSize,
                lineHeight: 1,
                letterSpacing: 0,
                fontFamily: FONT_FAMILY,
              }}
            >
              Road to{" "}
              <span style={{ color: ACCENT_RED }}>
                Alexa
              </span>
            </h2>

            <div
              className="absolute z-20"
              style={{
                left: REGISTRATION.icon.left,
                top: REGISTRATION.icon.top,
              }}
            >
              <StepBadge
                stepId="registration"
                number={REGISTRATION.number}
                title={REGISTRATION.title}
                size={REGISTRATION.icon.size}
              />
            </div>

            <div
              className="absolute z-20"
              style={{
                left: REGISTRATION.titleBox.left,
                top: REGISTRATION.titleBox.top,
              }}
            >
              <StepTitle
                text={REGISTRATION.title}
                width={REGISTRATION.titleBox.width}
              />
            </div>

            <div
              className="absolute z-20"
              style={{
                left: REGISTRATION.descBox.left,
                top: REGISTRATION.descBox.top,
              }}
            >
              <StepDescription
                text={REGISTRATION.description}
                width={REGISTRATION.descBox.width}
                height={REGISTRATION.descBox.height}
                gap={TEXT_GAP}
              />
            </div>

            {BOXED_STEPS.map((step) => (
              <div key={step.id}>
                <div
                  className="absolute z-20"
                  style={{
                    left: step.iconLeft,
                    top: step.top,
                  }}
                >
                  <StepBadge
                    stepId={
                      step.id as keyof typeof BADGE_ASSETS
                    }
                    number={step.number}
                    title={step.title}
                    size={ICON_SIZE}
                  />
                </div>

                <div
                  className="absolute z-20"
                  style={{
                    left: step.textLeft,
                    top: step.top,
                  }}
                >
                  <StepTitle
                    text={step.title}
                    width={step.titleWidth}
                  />
                </div>

                <div
                  className="absolute z-20"
                  style={{
                    left: step.textLeft,
                    top:
                      step.top +
                      TITLE_HEIGHT +
                      step.gap,
                  }}
                >
                  <StepDescription
                    text={step.description}
                    width={step.descWidth}
                    height={step.descHeight}
                    gap={step.gap}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
  className="mx-auto mt-8 lg:mt-16"
  style={{
    width: "calc(100% - 8rem)",
    height: "5px",
    backgroundColor: "#C32325",
  }}
/>
    </section>
  )
}
