<template>
  <div class="auction">
    <h5>Активный аукцион</h5>
    <div class="row">
      <div class="mb-3 form-floating col-6 offset-4">
        <input
          type="number"
          class="form-control"
          id="bet"
          placeholder="1000"
          v-model="bet"
        />
        <label for="bet" class="form-label bet-field">Сумма ставки</label>
      </div>
      <div class="col-2">
        <button class="btn btn-dark">Сделать ставку</button>
      </div>
    </div>

    <ul
      v-for="(bet, index) in auction.bets"
      v-bind:key="index"
      class="list-group list-group-horizontal"
    >
      <li class="list-group-item">
        {{ bet.owner }}
      </li>
      <li class="list-group-item">
        {{ bet.price }}
      </li>
      <li class="list-group-item">
        {{ getDate(bet.created_at) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AuctionComponent",
  data() {
    return {
      bet: 0,
    };
  },
  props: {
    auction: Object,
  },
  computed: {
    currentUser() {
      return this.store.getters.user_id;
    },
  },
  methods: {
    getDate(data) {
      var options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      };
      var d = new Date(data);
      return d.toLocaleDateString("ru", options);
    },
  },
  created() {
    var bets = this.auction ? this.auction.bets.map((b) => +b.price) : [];
    this.bet = Math.max(...bets) + 100;
  },
};
</script>

<style lang="scss">
.list-group-item {
  width: 33.333%;
}
.bet-field {
  width: 60%;
}
</style>
