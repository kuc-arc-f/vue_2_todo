<template>
    <div>
        <div class="container">
            <flash-message></flash-message>
            <!-- -->
            <h1>Todos - index</h1>
            <hr />
            <router-link :to="'/todos/new/'" class="btn btn-primary"> add </router-link><br />
            <br />
            <div v-if="complete==0">
                <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active">未完</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" v-on:click="set_complete(1)">完了済</a>
                </li>
                </ul>
            </div>
            <div v-else>
                <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" v-on:click="set_complete(0)">未完</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active">完了済</a>
                </li>
                </ul>              
            </div>
            <!-- -->
            <table class="table">
            <thead>
            <tr>
                <!--
                <th scope="col">id</th>
                -->
                <th scope="col">title</th>
                <th scope="col">date</th>
                <th scope="col">action</th>
            </tr>
            </thead>
            <tbody v-for="blog in blogs" v-bind:key="blog.id">
            <tr>
                <td>
                    <h3>
                    <router-link :to="'/todos/show/' + blog.id" >{{ blog.title }}</router-link>
                    </h3>
                </td>
                <td>{{ blog.up_date }}</td>
                <td>&nbsp;<router-link :to="'/todos/edit/' + blog.id" class="btn btn-outline-primary"> edit </router-link>
                </td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {Mixin} from '../../mixin'
import flashMessage from '../../components/Layouts/FlashMessage'
//import navbar from '../../components/Layouts/Navbar'

export default {
  mixins:[Mixin],
  components: { flashMessage },
  created () {
    this.database = firebase.firestore()
    this.baseUrl = this.sysConst.API_BASE;
    this.site_name = this.sysConst.SITE_NAME;
    this.TBL_BLOGS = this.sysConst.TBL_BLOGS;
//    console.log( this.baseUrl )
    this.getTasks(0)
  },
  data () {
    return {
        blogs: [],
        user_id : '',
        baseUrl : '',
        site_name : '',
        TBL_BLOGS : '',
        complete : 0,
    }
  },
  methods: {
    getTasks(complete) {
        var items = []
        var self = this
//        this.database.collection( this.TBL_BLOGS ).where("complete", "==", 0 )
        this.database.collection( this.TBL_BLOGS ).orderBy("up_date", "desc")
        .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //console.log(doc.id, " => ", doc.data())
                var item = doc.data()
                if(item.complete == complete){
                    var dt = item.up_date.toDate()
                    var dt_str = dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate()
                    //var time = dt.getHours() + ':' + dt.getMinutes()
                    //console.log( item.title +', ' + item.complete + ',' +  dt_str +' ' +time )
                    items.push({
                        id : doc.id,
                        title : item.title,
                        content : item.content,
                        up_date : dt_str
                    })            
                }
            })
            self.blogs = items
        })        
    },
    set_complete(value) {
        console.log(value)
        this.complete = value
        this.getTasks(value)
    }
  }
}
</script>
<!-- -->
<style>
</style>
