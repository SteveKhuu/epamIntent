/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        document.addEventListener('resume', app.loadStatus, false);
        
        app.receivedEvent('deviceready');
        
        document.querySelector("#test").innerHTML = 'Your device is a ' + device.model;
        
        document.querySelector("#takeCapture").onclick = function(){
            navigator.camera.getPicture(function(){
                console.log('snap!');
            }, function(){
                console.log('uh oh');
            }, { quality: 50 });
        };
        
        window.plugins.webintent.getUri(function(url) {
            parseVariables(url);
        });
    },
    
    loadStatus: function(){
        window.plugins.webintent.getUri(function(url) {
            parseVariables(url);
        });
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function parseVariables(url){
    if(url){
        var urlLength = url.length;
        if(url.lastIndexOf('/') < urlLength - 1){
            var variableString = url.substring(url.lastIndexOf('/') + 1);
            var valuePairs = variableString.split('&');
            var valuePairString = '';
            
            [].forEach.call(valuePairs, function(valuePair){
                var valuePairTokens = valuePair.split('=');
                
                valuePairString += 'Key: ' + valuePairTokens[0] + ' Value: ' + valuePairTokens[1];
                valuePairString += ',';
            });
            
            valuePairString = valuePairString.slice(0, -1);
        }
        alert(valuePairString);
    }
}