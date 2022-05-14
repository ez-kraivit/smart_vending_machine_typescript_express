<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].dg5}">
    <ProcessDialogProduct></ProcessDialogProduct>
    <ProcessThankDialog></ProcessThankDialog>
    <Nuxt v-if="$vuetify.breakpoint.lgAndUp" />
    <v-container v-else class="justify-center"  fill-height  :style="{background: $vuetify.theme.themes['light'].dg5}" >
      <v-row no-gutters >
        <v-col class="text-center">
          <h1>ไม่รองรับ Mobile</h1>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
    }
  },
}
</script>
