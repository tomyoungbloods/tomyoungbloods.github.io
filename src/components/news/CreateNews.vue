<template>
    <div id="new-news">
        <h3>Create News Item</h3>
        <div class="row">
           <form @submit.prevent="saveNews" class="col s12">
                <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="news_id" required>
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
                        <input type="file" @change="uploadImage" required>
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
import firebase, { storage } from 'firebase'

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
    methods : {
        saveNews(){
            db.collection('news').add({
                news_id: this.news_id,
                news_author: this.news_author,
                news_image: this.news_image,
                news_title: this.news_title,
                news_text: this.news_text,
                news_time: this.news_time
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
            },
            uploadImage(e) {

                let file = e.target.files[0]

                var storageRef = firebase.storage().ref('news/' + file.name)

                let uploadTask = storageRef.put(file);

                storageRef.put(file);

                    uploadTask.on('state_changed', (snapshot) =>{

                }, (error) => {
                // Handle unsuccessful uploads
                }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.news_image = downloadURL;
                    console.log('File available at', downloadURL);
                });
                });
                }
            }
}






</script>