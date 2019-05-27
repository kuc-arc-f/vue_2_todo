<template>
<div>
    <div class="container">
        <!-- -->
        <div class="div_news_rows" style="width:100%;">
            <h1 class="" style="font-size: 42px;">&nbsp;{{ item.title }}
            </h1>
            <p>date:&nbsp; {{ item.date_str }}</p>
            <div v-if="complete_name">
                <hr />
                <h3 style="color: green; ">[ {{ complete_name }} ]</h3>
            </div>
            <hr />
            <div class="entry-content">
                <div id="post_item" v-html="item.content"></div>
            </div>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import firebase from 'firebase'
import marked from  'marked'
import {Mixin} from '../../mixin'
//import NavUser from '../../components/Layouts/NavUser'
import Footer from '../../components/Layouts/Footer'

export default {
    mixins:[Mixin],
    components: { Footer },
    created() {
        this.database = firebase.firestore()
        this.TBL_BLOGS = this.sysConst.TBL_BLOGS;
        // get_complete_name
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
            baseUrl : '',
            TBL_BLOGS : '',
            complete_name : '',
        }
    },
    mounted: function() {
        this.getItem()
    },
    methods: {
        getItem: function() {
            var docRef = this.database.collection(this.TBL_BLOGS).doc( this.$route.params.id )
            var self = this
            docRef.get().then(function(doc) {
                var dat = doc.data()
                var dt = dat.up_date.toDate()
                var dt_str = dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate()
                console.log( dt_str )
                dat.date_str = dt_str
                dat.content = marked(dat.content)
                self.item =  dat
                self.complete_name = self.get_complete_name(dat.complete)
                console.log(self.complete_name)
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


