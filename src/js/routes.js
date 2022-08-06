import LibraryPage from "../pages/library.svelte";
import FeedBackPage from "../pages/feedback.svelte";
import ThirdPartyPage from "../pages/thirdParty.svelte";

var routes = [
  {
    path: "/library/",
    component: LibraryPage,
  },
  {
    path: "/feedback/",
    component: FeedBackPage,
  },
  {
    path: "/third-party/",
    component: ThirdPartyPage,
  },
];

export default routes;
