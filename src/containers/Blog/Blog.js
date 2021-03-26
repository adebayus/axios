import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
// import axios from 'axios'
import './Blog.css';
import post from '../../components/Post/Post';

import axios from '../../axios'

class Blog extends Component {

    state = {
        posts : [],
        selectedPostId: null
    }


    componentDidMount(){
        const posts = axios.get('/posts')
            .then((result) => {
                const postSlice = result.data.slice(0,4);
                const updatedPost = postSlice.map( post => {
                    return {
                        ...post,
                        auhor: 'max'
                    }
                })
                this.setState({
                    posts: updatedPost
                })
                console.log(result)
            } )
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        })
    }

    render () {
        const posts = this.state.posts.map( (post) => {
            return <Post key={post.id} title={post.title} clicked={ () => this.postSelectedHandler(post.id)} author={post.author}/>
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;