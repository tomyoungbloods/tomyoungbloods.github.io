<template>
    <div id="new-item">
        <h3>Create News Item</h3>
        <div class="row">
            <form @submit.prevent="saveEmployee" class="col s12">
                <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="employee_id" required>
                        <label>Employee ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="name" required>
                        <label>Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="dept" required>
                        <label>Department</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field colo s12">
                        <input type="text" v-model="position" required>
                        <label>Position</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from '../firebaseInit'
export default {
    dept: 'new-item',
    data(){
        return{
          employee_id: null,
          name: null,
          dept: null,
          position: null  
        }
    }
    }
</script>