;
(function () {
    'use strict'
    var canvasA = new fabric.Canvas('canvasA'),
        canvasB = new fabric.Canvas('canvasB');

    var shapes = document.querySelectorAll("[data-shape]"),
        activeObject,
        currentActiveObj,
        cnt = false;

    if (shapes.length > 0) {
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].addEventListener('click', addShapeToCanvas);
        }
    }

    function addShapeToCanvas(e) {
        e.preventDefault();
        var shape = this.getAttribute('data-shape');
        var config = {
            left: fabric.util.getRandomInt(0, canvasA.width - 50),
            top: fabric.util.getRandomInt(0, canvasA.height - 50),
            width: 50,
            height: 50,
            stroke: '#000000',
            fill: 'rgba(0,0,0,0)',
            hasControls: false
        };

        if (shape === 'Circle') {
            delete config.width;
            delete config.height;
            config.radius = '25';
        }

        canvasA.add(new fabric[shape](config));
        canvasA.renderAll();
    };

    canvasA.on({
        'object:moving': function (evt) {
            //activeObject  = Object.assign({}, this.getActiveObject());
            currentActiveObj = this.getActiveObject();
            activeObject = $.extend({}, currentActiveObj);
        },
        'object:added': function () {
            cnt = false;
        }
    });

    canvasB.on({
        'mouse:move': function (evt) {
            if (activeObject && activeObject.isMoving && !cnt) {
                activeObject.set({
                    'left': (evt.e.clientX - this._offset.left),
                    'top': (evt.e.clientY - this._offset.top)
                });

                this.add(activeObject);
                this.renderAll();

                canvasA.remove(currentActiveObj);
                canvasA.renderAll();
            }
        },
        'object:added': function () {
            cnt = true;
        }
    });
}());