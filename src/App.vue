<template>
  <article id="app">

    <header class="w-100">
      <b-navbar toggleable="md" variant="primary">
        <b-nav-text>
          <h1 class="text-white">Bootstrap Vue</h1>
        </b-nav-text>
      </b-navbar>
    </header>

    <div class="content-wrapper">

      <nav class="menu bg-dark">
          <b-nav vertical >
            <b-nav-item to="/" :exact="true">Home</b-nav-item>
            <b-nav-item to="/users" :extact="true">Users</b-nav-item>
          </b-nav>
      </nav>
      

      <section class="main-content">
        <router-view/>
      </section>

    </div>

  </article>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import './styles/index.scss';

  .content-wrapper {
    display: flex;
  }
  .menu {
    width:15%;
    min-height: 700px;
    flex-grow: 0;
    .nav-link {
      color: $light;
      &.active, &:hover {
        text-decoration: underline;
      }
    }
  }
  .main-content {
    flex-grow: 1;
    padding: 2em;
  }
</style>
