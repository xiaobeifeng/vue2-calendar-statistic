<template>
  <div class='calendar-card' :style="style">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'custom-calendar-card',
  props: {
    backgroundColor: {
      type: String
    },
    title: {
      type: String
    }
  },
  watch: {
    backgroundColor: value => {
      this.style = { 'background-color': value }
    }
  },
  data() {
    return {
      style: { 'background-color': this.backgroundColor }
    }
  }
}
</script>

<style scoped lang='less'>
.calendar-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 80px;
  border-radius: 10px;
  background-color: white;
  color: white;
}
</style>
