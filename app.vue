<template>
  <div>
    <header class="header">
      <img src="~/assets/images/logo.png" alt="logo" width="629" height="100">
    </header>
    <div class="container">
      <NuxtPage/>
    </div>
    <footer class="footer">
      <div class="footer_contents">
        Created by Yuichiro Yoshida
        <a
          class="footer_link"
          href="https://github.com/yuichiro-yoshida"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/yuichiro-yoshida
        </a>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.header,
.container {
  max-width: 1280px;
  padding: 20px 20px 0;
  margin: 0 auto;
}
.footer {
  margin: 80px 0 0;
  display: flex;
  justify-content: center;
  padding: 8px 0;
  background: #f7c3c3;

  &_link {
    @include link-effect;
    color: #0a95ff;
    margin: 0 0 0 8px;
  }
}
</style>