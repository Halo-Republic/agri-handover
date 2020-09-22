<template>
  
      <!-- <span>{{ params.value }} Hello</span> -->
      <vs-button @click="cartButtonClicked(params)">Add</vs-button>
  
</template>

<script>
    export default {
        name: 'CellRendererAddStore',
        computed: {
          chipColor() {
            return (value) => {
              if(value === "active") return "success"
              else if(value === "blocked") return "danger"
              else if(value === "deactivated") return "warning"
              else "primary"
            }
          }
        },
        methods: {
          addParams(params){
            console.log('hwerer', params)
          },
           additemInCart(item) {
      console.log('dispataching', item)
      this.$store.dispatch("eCommerce/additemInCart", item);
    },
    cartButtonClicked(item) {
      this.additemInCart(item.data);
      this.successUpload()
      // if (this.isInCart(item.objectID))
      //   this.$router.push("/apps/eCommerce/checkout");
      // else this.additemInCart(item);
    },
        }
    }
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
  &.vs-chip-success {
    background: rgba(var(--vs-success),.15);
    color: rgba(var(--vs-success),1) !important;
    font-weight: 500;
  }
  &.vs-chip-warning {
    background: rgba(var(--vs-warning),.15);
    color: rgba(var(--vs-warning),1) !important;
    font-weight: 500;
  }
  &.vs-chip-danger {
    background: rgba(var(--vs-danger),.15);
    color: rgba(var(--vs-danger),1) !important;
    font-weight: 500;
  }
}
</style>
