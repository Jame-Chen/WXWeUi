<template>
  <div class="content">
    <center>{{nickName}}</center>
    <center>
      <img :src="imgUrl" />
    </center>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    nickName: {
      type: String,
      required: true
    }
  },
  methods: {},
  mounted() {}
};
</script>