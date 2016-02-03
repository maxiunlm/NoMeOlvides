// OLD
//var CommentBox = React.createClass({
//    render: function() {
//        return (
//          <div className="commentBox">
//            Hello, world! I am a CommentBox.
//          </div>
//      );
//    }
//});

//React.render(
//  <CommentBox />,
//  document.getElementById('content')
//);


//import React from 'react';
        
class CommentBox extends React.Component {
    render() {
        return <div className="commentBox">
            Hello, world! I am a CommentBox.
          </div>
        ;
    }
}


//export default CommentBox;

React.render(
  <CommentBox />,
  document.getElementById('content')
);