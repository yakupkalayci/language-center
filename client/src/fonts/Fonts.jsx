import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={{
      "@font-face": [
        {
          fontFamily: "Delicious Handrawn",
          fontStyle: "normal",
          fontWeight: "400",
          fontDisplay: "swap",
          src: "url('../../fonts/Delicious_Handrawn/DeliciousHandrawn-Regular.ttf') format('truetype')",
        },
        {
          fontFamily: "Work Sans",
          fontStyle: "normal",
          fontWeight: "400",
          fontDisplay: "swap",
          src: "url('../../public/fonts/Work_Sans/static/WorkSans-Regular.ttf') format('truetype')",
        },
      ],
    }}
  />
);

export default Fonts;
