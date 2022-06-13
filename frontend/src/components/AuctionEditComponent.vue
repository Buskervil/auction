<template>
  <div>
    Auction edit
    {{ mutableCount }}
    <button v-on:click="add"></button>
  </div>
</template>

<script>
export default {
  name: "AuctionEditComponent",
  data() {
    return {
      bet: 0,
      invalidFeedback: "",
      mutableAuction: this.auction,
      mutableCount: this.count,
      interval: "",
    };
  },
  props: {
    auction: Object,
    count: Number,
  },
  methods: {
    add() {
      this.mutableCount = this.mutableCount + 1;
    },
  },
};
</script>

<style></style>
