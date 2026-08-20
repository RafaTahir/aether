import { Composition } from "remotion";
import { AetherIntro } from "./AetherIntro";

export function RemotionRoot() {
  return (
    <Composition
      id="AetherIntro"
      component={AetherIntro}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
