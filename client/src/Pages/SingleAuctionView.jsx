//TODO
// I need a method that gives me the details of an auction when I ask for them given it's AuctionID
// adapt this file for use here as a single auction page view
// reusing since the routing makes this tricky
//
// import * as React from "react";
// import {useParams} from "react-router-dom";
// import {addReply, getPost, getReplies} from "../Database/DatabaseMethods";
// import Post from "./Post";
// import Reply from "./Reply";
// import {Component} from "react";
// import ReplyEditor from "./ReplyEditor";
// import './styles/PostEditor.css';
//
// function withParams(Component) {
//     return props => <Component {...props} params={useParams()} />;
// }
//
// class SinglePostPage extends Component {
//     constructor(props) {
//         super(props);
//
//         const { postID } = this.props.params;
//
//         this.state = {
//             postID: postID,
//             post: [],
//             replies: [],
//         }
//
//         this.addReply = this.addReply.bind(this);
//     }
//
//     async addReply(reply) {
//         await addReply(this.state.postID, reply);
//         this.setState({
//             replies: await getReplies(this.state.postID)
//         });
//     }
//
//     async componentDidMount() {
//         const parentPost = await getPost(this.state.postID);
//         if(parentPost != null)
//             this.setState({
//                 post: parentPost,
//                 replies: await getReplies(parentPost.documentID)
//             });
//     }
//
//     render() {
//         return (
//             <div>
//                 <Post post={this.state.post}/>
//                 <h4 className="post-editor-subject">{'Replies:'}</h4>
//                 {this.state.replies.map((reply, idx) => {
//                     return (
//                         <Reply key={idx} post={reply}/>
//                     )
//                 })}
//                 <ReplyEditor addPost={this.addReply}/>
//             </div>
//         );
//     }
// }
//
// export default withParams(SinglePostPage);