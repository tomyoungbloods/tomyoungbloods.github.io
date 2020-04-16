<template>
    <div id="new-dashboard">
        <h3>Dashboard News</h3>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>newssss</h4>
            </li>
            <li v-for="newsitems in news" v-bind:key="newsitems.id" class="collection-item">

                {{newsitems.news_author}} 
                -
                {{newsitems.news_title}}

                {{newsitems.news_id}}

                <router-link class="secondary-content" v-bind:to="{name: 'view-news', params: {news_id: newsitems.news_id}}">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>

        <div class="fixed-action-btn">
            <router-link to="/new-news" class="btn-floating btn-large red">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>

    </div>
</template>

<script>
import db from '../firebaseInit'
export default {
    data(){
        return{
            news: []
        }
    },

    created(){
        db.collection('news').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                'id' : doc.id,    
                'news_id' : doc.data().news_id,
                'news_author' : doc.data().news_author,
                'news_title' : doc.data().news_title,
                'news_text' : doc.data().news_text,
                'news_image' : doc.data().news_image,
                }
                this.news.push(data)
            })
        }
        
        )
    }
}
</script>