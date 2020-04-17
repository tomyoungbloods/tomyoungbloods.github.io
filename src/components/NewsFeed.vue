<template>
    <div id="new-feed">
        <h3>feed News</h3>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>newssss</h4>
            </li>
            <li v-for="newsitems in news" v-bind:key="newsitems.id" class="collection-item">

                <h1>{{newsitems.news_title}}</h1><br>
                {{newsitems.news_text}}

            </li>
        </ul>
    </div>
</template>

<script>
import db from './firebaseInit'
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