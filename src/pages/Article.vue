<template>
  <div class="content">
    <ul>
      <li v-for="article in articles">
        <router-link :to="{path: '/article/list/'+ article.id }">{{ article.type }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import articles from '../storage/articles'
  export default {
    data(){
      return {
        articles: articles
      }
    }
  }
</script>