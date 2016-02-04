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

class CommentList extends React.Component {
    render () {
        var commentNodes = this.props.data.map((comment) =>
            <li>{comment.Text}</li>
        );

        return <ol className="commentList">
            {commentNodes}
        </ol>;
    }
}

class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = { data: [{ Text: 'hola' }] };
        //this.setState(this.getInitialState());
    }

    //getInitialState() {
    //    return { data: [{Text: 'hola' }] };
    //}

    render() {
        return <div className="commentBox">
            <CommentList data={this.state.data} />
        </div>;
    }
}


//export default CommentBox;

(function () {
    'use strict';


React.render(
  <CommentBox />,
  document.getElementById('content')
);

})();