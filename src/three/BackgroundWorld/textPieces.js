
import * as BAS from "three-bas";
import * as THREE from "three";
export function createTextPieces(text, fontParam) {
    var geometry = generateTextGeometry(text, fontParam);

    BAS.Utils.separateFaces(geometry);
    return new TextAnimation(geometry);
}

//mathematical details of the animation

function generateTextGeometry(text, params) {
    var geometry = new THREE.TextGeometry(text, params);

    geometry.computeBoundingBox();

    geometry.userData = {};
    geometry.userData.size = {
        width: geometry.boundingBox.max.x - geometry.boundingBox.min.x,
        height: geometry.boundingBox.max.y - geometry.boundingBox.min.y,
        depth: geometry.boundingBox.max.z - geometry.boundingBox.min.z
    };

    var anchorX = geometry.userData.size.width * -params.anchor.x;
    var anchorY = geometry.userData.size.height * -params.anchor.y;
    var anchorZ = geometry.userData.size.depth * -params.anchor.z;
    var matrix = new THREE.Matrix4().makeTranslation(anchorX, anchorY, anchorZ);

    geometry.applyMatrix(matrix);
    return geometry;
}

////////////////////
// CLASSES
////////////////////

function TextAnimation(textGeometry) {
    var bufferGeometry = new BAS.ModelBufferGeometry(textGeometry);

    var aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
    var aCentroid = bufferGeometry.createAttribute('aCentroid', 3);
    var aControl0 = bufferGeometry.createAttribute('aControl0', 3);
    var aControl1 = bufferGeometry.createAttribute('aControl1', 3);
    var aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);

    var faceCount = bufferGeometry.faceCount;
    var i, i2, i3, i4, v;

    var size = textGeometry.userData.size;

    var maxDelayX = 2.0;
    var maxDelayY = 0.25;
    var minDuration = 2;
    var maxDuration = 80;
    var stretch = 0.25;

    this.animationDuration = maxDelayX + maxDelayY + maxDuration - 3;

    for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < faceCount; i++ , i2 += 6, i3 += 9, i4 += 12) {
        var face = textGeometry.faces[i];
        var centroid = BAS.Utils.computeCentroid(textGeometry, face);

        // animation
        var delayX = Math.max(0, (centroid.x / size.width) * maxDelayX);
        var delayY = Math.max(0, (1.0 - (centroid.y / size.height)) * maxDelayY);
        var duration = THREE.Math.randFloat(minDuration, maxDuration);

        for (v = 0; v < 6; v += 2) {
            aAnimation.array[i2 + v] = delayX + delayY + Math.random() * stretch;
            aAnimation.array[i2 + v + 1] = duration;
        }

        // centroid
        for (v = 0; v < 9; v += 3) {
            aCentroid.array[i3 + v] = centroid.x;
            aCentroid.array[i3 + v + 1] = centroid.y;
            aCentroid.array[i3 + v + 2] = centroid.z;
        }

        // ctrl
        var c0x = centroid.x + THREE.Math.randFloat(40, 120);
        var c0y = centroid.y + size.height * THREE.Math.randFloat(0.0, 12.0);
        var c0z = THREE.Math.randFloatSpread(120);

        var c1x = centroid.x + THREE.Math.randFloat(80, 120) * -1;
        var c1y = centroid.y + size.height * THREE.Math.randFloat(0.0, 12.0);
        var c1z = THREE.Math.randFloatSpread(120);

        for (v = 0; v < 9; v += 3) {
            aControl0.array[i3 + v] = c0x;
            aControl0.array[i3 + v + 1] = c0y;
            aControl0.array[i3 + v + 2] = c0z;

            aControl1.array[i3 + v] = c1x;
            aControl1.array[i3 + v + 1] = c1y;
            aControl1.array[i3 + v + 2] = c1z;
        }

        // end position
        var x, y, z;

        x = centroid.x + THREE.Math.randFloatSpread(120);
        y = centroid.y + size.height * THREE.Math.randFloat(0.0, 12.0);
        z = THREE.Math.randFloat(-20, 20);

        for (v = 0; v < 9; v += 3) {
            aEndPosition.array[i3 + v] = x;
            aEndPosition.array[i3 + v + 1] = y;
            aEndPosition.array[i3 + v + 2] = z;
        }
    }

    var material = new BAS.BasicAnimationMaterial({
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {
            uTime: {
                type: 'f',
                value: 0
            }
        },
        vertexFunctions: [
            BAS.ShaderChunk['cubic_bezier'],
            BAS.ShaderChunk['ease_out_cubic']
        ],
        vertexParameters: [
            'uniform float uTime;',
            'attribute vec2 aAnimation;',
            'attribute vec3 aCentroid;',
            'attribute vec3 aControl0;',
            'attribute vec3 aControl1;',
            'attribute vec3 aEndPosition;'
        ],
        vertexInit: [
            'float tDelay = aAnimation.x;',
            'float tDuration = aAnimation.y;',
            'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
            'float tProgress = tTime / tDuration;'
        ],
        vertexPosition: [
            'vec3 tPosition = transformed - aCentroid;',
            'tPosition *= 1.0 - tProgress;',
            'tPosition += aCentroid;',
            'tPosition += cubicBezier(tPosition, aControl0, aControl1, aEndPosition, tProgress);',
            'transformed = tPosition;'
        ]
    });

    THREE.Mesh.call(this, bufferGeometry, material);

    this.frustumCulled = false;
}
TextAnimation.prototype = Object.create(THREE.Mesh.prototype);
TextAnimation.prototype.constructor = TextAnimation;

Object.defineProperty(TextAnimation.prototype, 'time', {
    get: function () {
        return this.material.uniforms['uTime'].value;
    },
    set: function (v) {
        this.material.uniforms['uTime'].value = this.animationDuration * v;
    }
});