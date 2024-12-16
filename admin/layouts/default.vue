<template>
  <v-app>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar
      v-if="!dontHaveScrollBarPage.includes(this.$route.path)"
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
      <template slot-scope="props" slot="links">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.icons'),
            icon: 'tim-icons icon-atom',
            path: '/icons'
          }"
        >
        </sidebar-item>
        <sidebar-item
            :link="{
            name: $t('sidebar.films'),
            icon: 'tim-icons icon-align-center',
            path: '/films'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.finance'),
            icon: 'tim-icons icon-bank',
            path: '/finance'
          }"
        >
        </sidebar-item>
        <sidebar-item
            :link="{
            name: $t('sidebar.users'),
            icon: 'tim-icons icon-single-02',
            path: '/users-management'
          }"
        ></sidebar-item>
        <sidebar-item
            :link="{
            name: $t('sidebar.schedule'),
            icon: 'tim-icons icon-laptop',
            path: '/icon-management'
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.notifications'),
            icon: 'tim-icons icon-bell-55',
            path: '/notifications'
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: $t('sidebar.userProfile'),
            icon: 'tim-icons icon-single-02',
            path: '/user' }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: $t('sidebar.regularTables'),
            icon: 'tim-icons icon-puzzle-10',
            path: '/regular'
          }"
        ></sidebar-item>

        <sidebar-item
          :link="{
            name: $t('sidebar.rtl'),
            icon: 'tim-icons icon-world',
            path: localePath('/rtl', 'ar') }"
        ></sidebar-item>
      </template>
    </side-bar>
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
<!--    <sidebar-share :background-color.sync="sidebarBackground"> </sidebar-share>-->
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div
        :class="{ content: !isFullScreenRoute }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <nuxt></nuxt>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!isFullScreenRoute"></content-footer>
    </div>
  </div>
  </v-app>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';
  import SidebarShare from '@/components/Layout/SidebarSharePlugin';
  import { mapMutations } from 'vuex';
  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from '@/components/Layout/DashboardNavbar.vue';
  import ContentFooter from '@/components/Layout/ContentFooter.vue';
  import DashboardContent from '@/components/Layout/Content.vue';
  import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      SlideYDownTransition,
      ZoomCenterTransition,
      SidebarShare
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary,
        dontHaveScrollBarPage: ['/login']
      };
    },
    computed: {
      isFullScreenRoute() {
        return this.$route.path === '/maps/full-screen'
      }
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      initScrollbar() {
        let docClasses = document.body.classList;
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function
          initScrollbar('sidebar');
          initScrollbar('main-panel');
          initScrollbar('sidebar-wrapper');

          docClasses.add('perfect-scrollbar-on');
        } else {
          docClasses.add('perfect-scrollbar-off');
        }
      },
      checkUserLogined() {
        if (!this.$store.state.userInfor.userInfor) {
          this.$router.push('/login');
        }
      }
    },
    mounted() {
      this.initScrollbar();
      document.body.classList.add('white-content');
      //this.checkUserLogined()
    }
  };
</script>
<style lang="scss">
  $scaleSize: 0.95;
  @keyframes zoomIn95 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    to {
      opacity: 1;
    }
  }

  .main-panel .zoomIn {
    animation-name: zoomIn95;
  }

  @keyframes zoomOut95 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-panel .zoomOut {
    animation-name: zoomOut95;
  }
</style>
