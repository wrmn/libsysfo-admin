<script>
  import {
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Button,
    f7,
  } from "framework7-svelte";
  import { darkTheme } from "../js/store";
  import { switchTheme } from "../js/utility";

  export let title;
</script>

<Navbar>
  <NavLeft>
    <Button
      on:click={() => {
        switchTheme();
        darkTheme.set(!$darkTheme);
      }}
    >
      <i class="icon f7-icons color-custom">
        {#if !$darkTheme}
          sun_min
        {:else}
          moon
        {/if}
      </i>
      <!-- moon -->
    </Button>
  </NavLeft>
  <NavTitle>
    {title}
  </NavTitle>
  <NavRight>
    <Button
      on:click={() => {
        f7.dialog.confirm("Logout user?", "", function () {
          localStorage.removeItem("account-credential");
          f7.dialog.alert("Logged Out", "Info", () => {
            window.location.reload();
          });
        });
      }}
    >
      <i class="icon f7-icons color-custom"> square_arrow_left </i>
      <!-- moon -->
    </Button>
  </NavRight>
</Navbar>
