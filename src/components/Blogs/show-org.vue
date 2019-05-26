<template>
    <div>
    <NavUser />
    <div class="container">
        <h1>{{ item.title }}</h1>
        <p style="margin-bottom: 20px;">Date: {{ item.date_str }}</p>
        <hr />
        <div id="post_item" v-html="item.content"></div>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import marked from  'marked'
import {Mixin} from '../../mixin'
//import navbar from '../../components/Layouts/Navbar'
import NavUser from '../../components/Layouts/NavUser'

export default {
    mixins:[Mixin],
    components: { NavUser },
    created() {
        this.database = firebase.firestore()
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
            baseUrl : '',
        }
    },
    mounted: function() {
        this.getItem()
    },
    methods: {
        getItem: function() {
            var docRef = this.database.collection("blogs").doc( this.$route.params.id )
            var self = this
            docRef.get().then(function(doc) {
                var dat = doc.data()
                var dt = dat.up_date.toDate()
                var dt_str = dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate()
                console.log( dt_str )
                dat.date_str = dt_str
                dat.content = marked(dat.content)
                self.item =  dat
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })            
        },
    }
}
</script>
<!-- -->
<style>
div#post_item > p > img{
    max-width : 100%;
    height : auto;
}
div#post_item > hr {
  height: 1px;
  background-color: #000;
  border: none;
}
</style>


