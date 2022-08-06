<script>
  import { Page, List, ListItem, Row, Col, Button } from "framework7-svelte";
  import { onMount } from "svelte";
  import { getLibrary } from "../js/api";
  import { librariesData } from "../js/store";

  import Header from "../components/header.svelte";
  import InputLibrary from "../components/inputLibrary.svelte";

  let popupOpened = false;

  onMount(() => {
    getLibrary();
  });
</script>

<InputLibrary bind:popupOpened />

<Page name="home">
  <Header title="Library List" />
  <Row>
    <Col width={80} />
    <Col width={20}>
      <Button
        fill
        iconF7="plus"
        on:click={async () => {
          popupOpened = true;
        }}
      />
    </Col>
  </Row>
  <List mediaList>
    {#if $librariesData.data && $librariesData.data.library}
      {#each $librariesData.data.library as l}
        <ListItem
          title={l.name}
          after="$15"
          subtitle={l.address}
          text={l.description}
        >
          <img slot="media" src={l.imagesMain} alt="" width="80" />
        </ListItem>
      {/each}
    {/if}
  </List>
</Page>
