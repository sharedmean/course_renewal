<template>
  <v-app>
    <SiteHeader />
    <v-main>
      <v-container>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>

    <SiteFooter />
  </v-app>
</template>

<script>
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"

export default {
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif !important;
}
.app {
  padding: 20px;
}
</style>