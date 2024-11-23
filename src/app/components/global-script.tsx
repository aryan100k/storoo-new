import { GoogleAnalytics } from "@next/third-parties/google";
import { GOOGLE_TAG_ID } from "@/lib/constants";

export const GlobalScript = () => {
  return (
    <>
      <GoogleAnalytics gaId={GOOGLE_TAG_ID} />
    </>
  );
};
