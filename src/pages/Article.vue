<template>
  <div class="content">
    <ul v-if="displayList">
      <li v-for="article in articles">
        <router-link :to="{path: '/article/list/' + article.id }">{{ article.type }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import articles from '../storage/articles'
  export default {
    data(){
      return {
        articles: articles,
        displayList: true
      }
    },
    beforeRouteLeave: function(to, from, next){
      // this.displayList = false;
      // console.log(this);
      next();
    }
  }
</script>