<template>
    <div id="new-news">
        <h3>Create News Item</h3>
        <div class="row">
           <form @submit.prevent="updateNews" class="col s12">
                <div class="row">
                    <div class="input-field colo s12">
                        <input disabled type="text" v-model="news_id" required>
                        <label>News ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="news_author" required>
                        <label>Auteur</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="news_image" required>
                        <label>News Image</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="news_title" required>
                        <label>Titel</label>
                    </div>
                </div>
                  <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="news_text" required>
                        <label>Bericht</label>
                    </div>
                </div>
                  <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="news_time" required>
                        <label>Datum Bericht</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/news" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from '../firebaseInit'
export default {
     dept: 'new-employee',
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
        updateNews () {
             db.collection('news').where('news_id', '==', this.$route.params.news_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        news_id: this.news_id,
                        news_author: this.news_author,
                        news_image: this.news_image,
                        news_title: this.news_title,
                        news_text: this.news_text,
                        news_time: this.news_time,
                    })
                    .then(() =>
                    {
                        this.$router.push({name: 'view-news', params: {news_id: this.news_id}})
                    })
                })
            })
        }
    }
    }
</script>