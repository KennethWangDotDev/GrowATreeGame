<template>
    <div class="resources">
        <h1 class="title">Resources:</h1>
        <table>
            <tbody>
                <tr class="resource-row">
                    <td>Nutrient</td>
                    <td>{{ nutrients }}</td>
                </tr>
                <tr class="resource-row">
                    <td>Nutrient</td>
                    <td>{{ nutrients }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  computed: {
    nutrients() {
      return this.$store.state.resources.nutrients;
    }
  }
}
</script>
