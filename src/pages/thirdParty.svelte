<script>
  import { Row, Col, Button, Page, List, ListItem } from "framework7-svelte";
  import { thirdPartyData } from "../js/store";
  import { isoToDmy } from "../js/utility";
  import { getData } from "../js/api";

  import Header from "../components/header.svelte";
</script>

<Page name="feedback">
  <Header title="Third Party Jobs" />
  <Row>
    <Col width={80} />
    <Col width={20}>
      <Button
        fill
        iconF7="arrow_clockwise_circle"
        tooltip="refresh"
        on:click={async () => {
          getData();
        }}
      />
    </Col>
  </Row>
  <List mediaList>
    {#if $thirdPartyData.data && $thirdPartyData.data.thirdParty}
      {#each $thirdPartyData.data.thirdParty as t}
        <ListItem
          title={t.job}
          after={isoToDmy(t.CreatedAt, "dd-mmmm-yyyy hh:MM:ss ")}
          subtitle={t.destination}
          text={t.responseBody}
        />
      {/each}
    {/if}
  </List>
</Page>
