<script>
  import {
    Page,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
    f7,
  } from "framework7-svelte";
  import { feedbackData } from "../js/store";
  import { isoToDmy } from "../js/utility";
  import { getData, getWithAuths } from "../js/api";

  import Header from "../components/header.svelte";
</script>

<Page name="feedback">
  <Header title="Feedback" />
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
  <Row>
    <Col width={60} />
    {#if $feedbackData.data && $feedbackData.data.paginate}
      <Col width={20}>
        <Button
          fill
          iconF7="arrow_left"
          disabled={!$feedbackData.data.paginate.previousPage}
          on:click={async () => {
            const resp = await getWithAuths(
              $feedbackData.data.paginate.previousPage
            );
            if (resp.status == 200) {
              feedbackData.set(resp);
            } else {
              f7.dialog.alert("end of page", "");
            }
          }}
        />
      </Col>
      <Col width={20}>
        <Button
          fill
          iconF7="arrow_right"
          disabled={!$feedbackData.data.paginate.nextPage}
          on:click={async () => {
            const resp = await getWithAuths(
              $feedbackData.data.paginate.nextPage
            );
            if (resp.status == 200) {
              feedbackData.set(resp);
            } else {
              f7.dialog.alert("end of page", "");
            }
          }}
        />
      </Col>
    {/if}
  </Row>
  <List mediaList>
    {#if $feedbackData.data && $feedbackData.data.feedback}
      {#each $feedbackData.data.feedback as f}
        <ListItem
          title={f.name}
          after={isoToDmy(f.CreatedAt, "dd-mmmm-yyyy hh:MM:ss ")}
          subtitle={f.email ? f.email : "-"}
          text={f.message}
        />
      {/each}
    {/if}
  </List>
</Page>
