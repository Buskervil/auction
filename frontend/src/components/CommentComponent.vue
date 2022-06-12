<template>
  <div class="comment">
    <div class="d-flex">
      <p class="h5">{{ comment.owner }}</p>
      <p>Оценка: {{ comment.rating }}/5</p>
    </div>
    <p>{{ comment.comment }}</p>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  data() {
    return {};
  },
  props: {
    comment: Object,
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.good-link {
  text-decoration: none;
  cursor: pointer;
}
.good-card {
  position: relative;
}

.auction-label {
  position: absolute;
  top: 0;
  right: 0;
  transform: rotate(-90deg);
  transform-origin: top right;
  background-color: #212529;
  color: white;
  text-align: center;
  border-radius: 4px;

  padding: 10px;
  padding-bottom: 0;
}
.d-flex {
  p {
    margin-right: 10px;
  }
}

.comment {
  margin-bottom: 40px;
  p {
    text-align: justify;
  }
}
</style>
