<template lang="html">
    <div class="container">
            <div class="form-group">
                <label for="TopicTitle">タイトル</label>
                <input type="text" class="form-control" id="title" v-model="title" >
            </div>
            <div class="form-group">
                <label for="TopicContent">content</label>
                <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
            </div>
            <button v-on:click="updateTask">投稿</button>
            <hr />
            <button v-on:click="deleteTask">[ delete ]</button>
    </div>
</template>

<script>
import axios from 'axios'
import {Mixin} from '../../mixin'
import jQuery from 'jquery'

export default {
    mixins:[Mixin],
    created() {
        this.baseUrl = this.sysConst.API_BASE;
    },
    data() {
        return {
            title:'',
            content:'',
            baseUrl : '',
        }
    },
    mounted: function() {
        this.getItem();
    },
    methods: {
        getItem: function() {
            var url = this.baseUrl +'blogs/api_view/'+ this.$route.params.id;
            var item = []
            axios.get(url )
            .then( ( res ) => {
                item = res.data;
                console.log(res.data.title )
                this.title = item.title
                this.content = item.content
            });                        
        },
        updateTask: function () {
            var hostUrl = this.baseUrl +'blogs/api_update/'+ this.$route.params.id;
            jQuery.ajax({
                url: hostUrl,
                type:'POST',
                dataType: 'json',
                data : {
                    'data[Blog][id]' : this.$route.params.id, 
                    'data[Blog][title]' : this.title, 
                    'data[Blog][content]' : this.content
                },
                timeout:3000,
            }).done(function(data) {
                console.log("ajax-ok");
                console.log(data);
            }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("ajax-error");
                console.log( errorThrown );
            })
        },
        deleteTask: function () {
            var url = this.baseUrl +'blogs/api_delete/'+ this.$route.params.id;
            axios.get(url).then(res => {
                console.log(res.data );
                if(res.data.ret == 1){
                    console.log(res.data.ret );
                }else{
                    console.log(res.data );
                }
            });            
        }
    }
}
</script>
