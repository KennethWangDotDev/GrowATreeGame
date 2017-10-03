<template>
    <div class="notifications">
        <h1 class="title">Log:</h1>
        <transition-group name="notifications-list" tag="ul">
            <li v-for="notification in notifications" v-text="notification" v-bind:key="notification"></li>
        </transition-group>
    </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  }
}
</script>
