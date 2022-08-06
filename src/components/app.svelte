<script>
  import { onMount } from "svelte";
  import { getDevice } from "framework7/lite-bundle";
  import { darkTheme, notLogin } from "../js/store";
  import { getData, login } from "../js/api";
  import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Page,
    Navbar,
    Toolbar,
    Link,
    Block,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListInput,
    ListButton,
    BlockFooter,
  } from "framework7-svelte";
  import cordovaApp from "../js/cordova-app";

  import routes from "../js/routes";
  import store from "../js/store";

  const device = getDevice();
  // Framework7 Parameters
  let f7params = {
    name: "libsysfo-admin", // App name
    theme: "auto", // Automatic theme detection

    id: "io.libsysfoadmin.myapp", // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,
    // Register service worker (only on production build)
    serviceWorker:
      process.env.NODE_ENV === "production"
        ? {
            path: "/service-worker.js",
          }
        : {},

    // Input settings
    input: {
      scrollIntoViewOnFocus: device.cordova && !device.electron,
      scrollIntoViewCentered: device.cordova && !device.electron,
    },
    // Cordova Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };
  // Login screen demo data
  let indicator = "",
    password = "";

  onMount(() => {
    notLogin.set(localStorage.getItem("account-credential") == null);
    if (localStorage.getItem("account-credential")) {
      getData();
    }
    f7ready(() => {
      // Init cordova APIs (see cordova-app.js)
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }

      // Call F7 APIs here

      if (localStorage.getItem("theme") === "dark") {
        darkTheme.set(true);
      }
    });
  });
</script>

<svelte:head>
  <script>
    try {
      const { matches: isDarkMode } = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const theme = localStorage.getItem("theme");
      const opposite = theme === "dark" ? "light" : "dark";
      document.documentElement.classList.add(theme);
      document.documentElement.classList.remove(opposite);
    } catch (err) {
      console.error(err);
    }
  </script>
</svelte:head>

<App {...f7params}>
  <!-- Left panel with cover effect-->
  <Panel left cover dark>
    <View>
      <Page>
        <Navbar title="Left Panel" />
        <Block>Left panel content goes here</Block>
      </Page>
    </View>
  </Panel>

  <!-- Right panel with reveal effect-->
  <Panel right reveal dark>
    <View>
      <Page>
        <Navbar title="Right Panel" />
        <Block>Right panel content goes here</Block>
      </Page>
    </View>
  </Panel>

  <!-- Views/Tabs container -->
  <Views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <Toolbar tabbar labels bottom>
      <Link
        tabLink="#view-home"
        tabLinkActive
        iconIos="f7:building_columns_fill"
        iconAurora="f7:building_columns_fill"
        iconMd="material:location_city"
        text="Library"
      />
      <Link
        tabLink="#view-about"
        iconIos="f7:bubble_left_bubble_right_fill"
        iconAurora="f7:bubble_left_bubble_right_fill"
        iconMd="material:question_answer"
        text="Feedback"
      />
      <Link
        tabLink="#view-third-party"
        iconIos="f7:circle_grid_hex"
        iconAurora="f7:circle_grid_hex"
        iconMd="material:token"
        text="Third Party Jobs"
      />
    </Toolbar>

    <View id="view-home" main tab tabActive url="/library/" />
    <View id="view-about" name="about" tab url="/feedback/" />
    <View id="view-third-party" name="thirdparty" tab url="/third-party/" />
  </Views>

  <LoginScreen id="my-login-screen" bind:opened={$notLogin}>
    <View>
      <Page loginScreen>
        <LoginScreenTitle>Login</LoginScreenTitle>
        <List form>
          <ListInput
            type="text"
            name="username"
            placeholder="Email / username"
            bind:value={indicator}
          />
          <ListInput
            type="password"
            name="password"
            placeholder="Your password"
            bind:value={password}
          />
        </List>
        <List>
          <ListButton
            title="Sign In"
            onClick={() => login({ indicator, password })}
          />
        </List>
        <BlockFooter>
          Some text about login information.<br />Click "Sign In" to close Login
          Screen
        </BlockFooter>
      </Page>
    </View>
  </LoginScreen>
</App>
