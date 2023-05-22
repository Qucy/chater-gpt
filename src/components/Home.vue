<template>
  <!--<div class="home">
    
  </div> -->
  <el-container class="home-container">
    <!-- Header -->
    <el-header>
        <div>
            <img src="../assets/logo2.png">
        </div>
        <el-button type="info" @click="logout" plain>Logout</el-button>
    </el-header>
    <!-- Body -->
    <el-container>
      <!-- Aside area -->
      <el-aside :width="isCollapse ? '64px' : '260px'">
        <div class="toggle-button" @click="toggleCollapes">|||</div>
        <!-- Menu --> 
        <el-menu
            active-text-color="#409EFF"
            background-color="#222021"
            text-color="#fff"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
        >
            <!-- Level 1 menu -->
            <el-sub-menu :index="menu.id + ''" v-for="menu in menuList" :key="menu.id">
            <!-- Level 1 menu template -->
            <template #title>
                <!-- Level 1 menu icon -->
                <el-icon>
                <component :is="menu.icon"/>
                </el-icon>
                <!-- Level 1 menu title -->
                <span>{{ menu.name }}</span>
            </template>
            <!--Level 2 menu -->
            <el-menu-item :index="submenu.path" v-for="submenu in menu.children" :key="submenu.id">
                <!-- Level 2 menu template -->
                <template #title>
                    <!-- Level 2 menu icon -->
                    <el-icon>
                        <component :is="submenu.icon"/>
                    </el-icon>
                    <!-- Level 2 menu title -->
                    <span>{{ submenu.name }}</span>
                </template>
            </el-menu-item>
            </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- Main -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Home',
    data() {
        return {
            menuList: [],
            isCollapse: false,
        }
    },
    methods: {
      // logout
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      // get menu list
      async getMenuList() {
        // recieve data from API
        const {data: res} = await this.$axios.get('menus')
        // conver to JSON object
        const menus = JSON.parse(JSON.stringify(res))
        // success
        if (menus.meta.status == 200) {
          this.menuList = menus.data
        }
        // error
        else{
            ElMessage({ message: res.meta.message, type: 'error' })
        }
      },
      // toggle menu
      toggleCollapes() {
        this.isCollapse = !this.isCollapse
      }
    },
    created() {
      this.getMenuList()
    }
  }
</script>


<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: black;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        > span {
            margin-left: 15px;
        }
        > img {
            width: 200px;
            height: 50px;
            margin-left: 10px;
        }
    }
}

.el-aside {
    background-color: #222021;
    .el-menu {
        border-right: 0px;
    }

}

.el-main {
    background-color: #eaedf1;
}

.toggle-button {
    background-color: #272424;
    text-align: center;
    line-height: 50px;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #3a3d41;
    }
}
  
</style>