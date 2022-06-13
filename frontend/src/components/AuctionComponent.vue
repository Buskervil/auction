<template>
  <div class="auction">
    <h5>Активный аукцион</h5>
    <div v-if="user.id != mutableAuction.owner" class="row">
      <div class="col-4">
        Окончание: {{ getDate(mutableAuction.closed_at) }}
      </div>

      <div
        v-if="new Date(mutableAuction.closed_at) > new Date()"
        class="mb-3 form-floating col-6 offset-4"
      >
        <input
          type="number"
          class="form-control"
          id="bet"
          placeholder="1000"
          v-model="bet"
          v-bind:class="{ 'is-invalid': invalidFeedback }"
        />
        <label for="bet" class="form-label bet-field">Сумма ставки</label>
        <div class="invalid-feedback">
          {{ invalidFeedback }}
        </div>
      </div>
      <div class="col-2" v-if="new Date(mutableAuction.closed_at) > new Date()">
        <button v-on:click="createBet" class="btn btn-dark">
          Сделать ставку
        </button>
      </div>
      <p class="col-3" v-if="new Date(mutableAuction.closed_at) <= new Date()">
        Аукцион окончен
      </p>
    </div>

    <ul
      v-for="(bet, index) in mutableAuction.bets"
      v-bind:key="index"
      class="list-group list-group-horizontal"
    >
      <li
        class="list-group-item"
        v-bind:class="{ 'text-success': bet.owner == user.username }"
      >
        {{ bet.owner }}
      </li>
      <li
        class="list-group-item"
        v-bind:class="{ 'text-success': bet.owner == user.username }"
      >
        {{ bet.price }}
      </li>
      <li
        class="list-group-item"
        v-bind:class="{ 'text-success': bet.owner == user.username }"
      >
        {{ getDate(bet.created_at) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Bet } from "../api/bet";
import { Auction } from "../api/auction";
export default {
  name: "AuctionComponent",
  data() {
    return {
      bet: 0,
      invalidFeedback: "",
      mutableAuction: this.auction,
      interval: "",
    };
  },
  props: {
    auction: Object,
  },
  computed: {
    user() {
      return this.$store.state.user;
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
    createBet() {
      var bets = this.auction ? this.auction.bets.map((b) => +b.price) : [];
      bets.push(this.mutableAuction.min_price);
      var maxBet = Math.max(...bets);

      if (this.bet > maxBet) {
        Bet.create(this.auction.id, this.bet).then(() => {
          this.updateAuction().then(() => this.updateMinBet());
        });
        this.invalidFeedback = "";
        this.updateAuction();
      } else this.invalidFeedback = "Ваша ставка слишком маленькая";
    },
    updateAuction() {
      return Auction.get(this.mutableAuction.id).then((response) => {
        if (response.status == 200) this.mutableAuction = response.data;
      });
    },
    updateMinBet() {
      console.log("определяю минимальную ставку");
      var bets = this.mutableAuction
        ? this.mutableAuction.bets.map((b) => +b.price)
        : [];
      if (this.mutableAuction) bets.push(this.mutableAuction.min_price);
      console.log(bets);
      this.bet = Math.max(...bets) + 100;
    },
  },
  created() {
    this.updateMinBet();
  },
  mounted: function () {
    if (this.mutableAuction.id) {
      this.updateAuction();
      this.interval = setInterval(this.updateAuction, 2000);
    }
  },
  beforeUnmount: function () {
    this.mutableAuction = {};
    clearInterval(this.interval);
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
