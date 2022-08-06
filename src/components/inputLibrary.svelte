<script>
  import {
    Popup,
    Button,
    Page,
    Navbar,
    NavRight,
    Link,
    List,
    ListInput,
    Card,
    CardContent,
    f7,
  } from "framework7-svelte";
  import { postLibrary } from "../js/api";

  export let popupOpened;
  let name, email, libraryName;

  const saveLibrary = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        email
      )
    ) {
      f7.dialog.alert("Invalid email", "");
      return;
    }
    if (name || email || libraryName) {
      f7.dialog.preloader;
      const body = {
        name,
        email,
        libraryName,
      };
      name = "";
      email = "";
      libraryName = "";
      const resp = postLibrary(body);
      f7.dialog.close();
      f7.dialog.alert(
        resp.description ? resp.description : "server timeout",
        ""
      );
    } else {
      f7.dialog.alert("Please fill all field", "");
    }
  };
</script>

<Popup
  class="demo-popup"
  opened={popupOpened}
  onPopupClosed={() => (popupOpened = false)}
>
  <Page>
    <Navbar title="New Library">
      <NavRight>
        <Link popupClose>Close</Link>
      </NavRight>
    </Navbar>
    <Card>
      <CardContent>
        <!-- name, username, email -->
        <List inlineLabels noHairlinesMd>
          <ListInput label="Name" type="text" bind:value={name} />
          <ListInput label="E-mail" type="email" bind:value={email} />
          <ListInput
            label="Library Name"
            type="text"
            bind:value={libraryName}
          />
          <Button outline on:click={saveLibrary}>Save</Button>
        </List>
      </CardContent>
    </Card>
  </Page>
</Popup>
