<template>
    <div id="new-dashboard">
            <ul class="collection with-header">
                <li class="collection-header">
                    <h4>{{news_title}}</h4>
                </li>
                <li class="collection-item">News ID: {{news_id}}</li>
                <li class="collection-item">Schrijver: {{news_author}}</li>
                <li class="collection-item">News Image: 
                    {{news_image}}
                </li>
                <li class="collection-item">News Title: {{news_title}}</li>
                <li class="collection-item">News Text: {{news_text}}</li>
                <li class="collection-item">News Time: {{news_time}}</li>
            </ul>
            <img :src="news_image" style="width:100%;" alt="">

            <!-- <img src="https://firebasestorage.googleapis.com/v0/b/vue-news-70d59.appspot.com/o/news%2Fimage002.png?alt=media&token=c34b71b9-3901-4787-a781-6e93cd2fce43"> -->
            <router-link to="/news" class="btn grey">Back</router-link>
            <button @click="deleteNews" class="btn red">Delete</button>
                <div class="fixed-action-btn">
                <router-link v-bind:to="{ name: 'edit-news', params: {news_id: news_id}}" class="btn-floating btn-large red">
                    <i class="fa fa-pencil"></i>
                </router-link>
            </div>
        </div>
</template>

<script>
import db from '../firebaseInit'
export default {
    data(){
        return{
            news_id: null,
            news_author: null,
            news_image: null,
            news_title: null,
            news_text: null,
            news_time: null
            }
    },
    //Voordat de pagina geladen wordt haalt hij de data op. 
    beforeRouteEnter (to, from, next){
        db.collection('news').where('news_id', '==', to.params.news_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc =>{
                next(vm => {
                    vm.news_id = doc.data().news_id
                    vm.news_author = doc.data().news_author
                    vm.news_image = doc.data().news_image
                    vm.news_title = doc.data().news_title
                    vm.news_text = doc.data().news_text
                    vm.news_time = doc.data().news_time
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData (){
            db.collection('news').where('news_id', '==', this.$route.params.news_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.news_id = doc.data().news_id
                    this.news_author = doc.data().news_author
                    this.news_image = doc.data().news_image
                    this.news_title = doc.data().news_title
                    this.news_text = doc.data().news_text
                    this.news_time = doc.data().news_time
                })
            })
        },
        deleteNews () {
        if(confirm('Are you sure?')) {
            {
            db.collection('news').where('news_id', '==', this.$route.params.news_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                    this.$router.push('/news');
                })
            })
        }
        }
    }
    }
}
</script>

