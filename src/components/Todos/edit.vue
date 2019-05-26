<template lang="html">
    <div>
    <div class="container">
        <div id="flash_message" v-if="message">
            <span >
                <h3 id="h3_msg" style="margin : 15px;">{{ message }}</h3>
            </span>
        </div>
        <!-- -->        
        <h1>Todos - edit</h1>
        <div class="form-group">
            <label for="TopicTitle">タイトル</label>
            <input type="text" class="form-control" id="title" v-model="title" >
        </div>
        <div class="form-group">
            <label for="TopicContent">content</label>
            <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
        </div>
        <button v-on:click="updateTask" class="btn btn-primary">更新</button>
        <hr />
        <div v-if="complete==0">
            <button v-on:click="set_complete(1);" class="btn btn-outline-success" >完了登録</button>
        </div>
        <div v-else>
            <button v-on:click="set_complete(0);" class="btn btn-outline-success" >未完に戻す</button>            
        </div>
        <hr />
        <button v-on:click="deleteTask" class="btn btn-danger">削除</button>

    </div>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import firebase from 'firebase'
//import navbar from '../../components/Layouts/Navbar'

export default {
    mixins:[Mixin],
    created() {
        this.database = firebase.firestore()
        this.baseUrl = this.sysConst.API_BASE;
        this.page_id = this.$route.params.id
        this.TBL_BLOGS = this.sysConst.TBL_BLOGS;
    },
    data() {
        return {
            title:'',
            content:'',
            complete : 0,
            baseUrl : '',
            page_id: 0,
            message : '',
            TBL_BLOGS : '',
        }
    },
    mounted: function() {
        this.getItem();
    },
    methods: {
        getItem: function() {
            var docRef = this.database.collection(this.TBL_BLOGS).doc( this.$route.params.id )
            var self = this
            docRef.get().then(function(doc) {
                var dat = doc.data()
                console.log(dat )
                self.title = dat.title
                self.content = dat.content
                self.complete = dat.complete
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })            
        },
        updateTask: function () {
            var self = this
            var docRef = this.database.collection(this.TBL_BLOGS).doc( this.$route.params.id );
            docRef.update({
                title: self.title,
                content: self.content
            })
            .then(function() {
                self.message = '更新が完了しました。'
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            })            
        },
        set_complete: function (value) {
            var self = this
            var docRef = this.database.collection(this.TBL_BLOGS).doc( this.$route.params.id );
            docRef.update({
                complete: value
            })
            .then(function() {
                self.message = '更新が完了しました。'
                console.log("Document successfully updated!");
                self.$router.push('/todos')
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            })            
        },
        deleteTask: function () {
            var self = this
            var docRef = this.database.collection(this.TBL_BLOGS).doc(this.$route.params.id)
            docRef.delete().then(function() {
                console.log("Document successfully deleted!")
                self.$router.push('/blogs')
            }).catch(function(error) {
                console.error("Error removing document: ", error)
            })            
        }
    }
}
</script>
