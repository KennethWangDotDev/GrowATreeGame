<template>
    <div class="micromanagement">
        
        <ProgressSection 
            :progress="'create_worker'"
            :unlock="'micromanagement'"
            :unlockValue="1"
            :label="'Create Worker'"
            :desc="'Workers allow you to automate tasks.'"
            :cost="1"
            :speed="1">
        </ProgressSection>
    
    </div>
</template>

<script>
import ProgressSection from '../components/ProgressSection.vue';

export default {
  components: {
    ProgressSection,
  },
}

</script>
