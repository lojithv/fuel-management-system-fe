import { setSubStationCache, setUserCache } from "@/store/auth-store";
import "@/styles/globals.css";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    console.log("on load")
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    if (user) {
      setUserCache(user)
      if (user.userType === "Super_Admin") {
        router.push("/dashboard");
      } else if (user.userType === "Admin") {
        const substationData = localStorage.getItem("substation")
        const substation = substationData ? JSON.parse(substationData) : null;
        setSubStationCache(substation)
        router.push("/substation-dashboard");
      }
    }
  },[]);
  

  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
