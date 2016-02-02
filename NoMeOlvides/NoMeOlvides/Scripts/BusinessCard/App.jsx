

var webcamManager = new WebcamManager({
    cameraTagId: 'myCamera',
    resultTagId: 'myResult',
    photoBooth: 'myphotoBooth',
    preTakeButtonsId: 'preTakeButtons',
    postTakeButtonsId: 'postTakeButtons',
    // TODO: TDD !!!!
    previewSnapshot: 'previewSnapshot',
    cancelPreview: 'cancelPreview',
    savePhoto: 'savePhoto'
}
    , {
        width: 320,
        height: 240,
        dest_width: 320,
        dest_height: 240,
        crop_width: 240,
        crop_height: 240,
        image_format: 'png',
        jpeg_quality: 90,
        flip_horiz: false
    }
    , false
);

//////$("#previewSnapshot").bind("click", webcamManager, webcamManager.previewSnapshot);
//////$("#cancelPreview").bind("click", webcamManager, webcamManager.cancelPreview);
//////$("#savePhoto").bind("click", webcamManager, webcamManager.savePhoto);

webcamManager.attachCamera();

var CommentBox = React.createClass({
    render: function() {
        return (
          <div className="commentBox">
            Hello, world! I am a CommentBox.
          </div>
      );
    }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);