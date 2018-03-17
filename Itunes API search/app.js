let app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.search = function(value){
        if (value === undefined) {
            value = '';
        }
    $scope.searchtext = value 
    $http.get("https://itunes.apple.com/search?term="+$scope.searchtext).then(function(response) {
    $scope.bands = []; 
    for (let i = 0; i < response.data.resultCount; i++) {
    $scope.bands.push({  
        artist:response.data.results[i].artistName,
        track:response.data.results[i].trackName,
        collection:response.data.results[i].collectionName,
        genre:response.data.results[i].primaryGenreName,
        image:response.data.results[i].artworkUrl100,
        index:i,
        cssClass:plusIconClass
    });
 }
}, function(response) {
        $scope.content = "ERROR:Something went wrong";
    });
   
}

let plusIconClass  = "glyphicon glyphicon-plus";
let minusIconClass  = "glyphicon glyphicon-minus";

$scope.loadBandInfo = function (index) {  
    $scope.bandInfo = []; 
          
    $http.get("https://itunes.apple.com/search?term="+$scope.searchtext).then(function (response) {
        for (let i = 0; i < response.data.resultCount; i++) {
            if (index === i) {
            $scope.bandInfo.push({
                collPrice:response.data.results[index].collectionPrice,
                priceForTrack:response.data.results[index].trackPrice,
                trackAmount:response.data.results[index].trackCount,
                trackDuration:response.data.results[index].trackTimeMillis
        });
    }
    }
    },function(response) {
        $scope.content = "ERROR:Something went wrong";
    });
}

    let previousBand = [];
    $scope.changeClass = function (index) {
        let currentClass = $scope.bands[index].cssClass;
        $scope.bands[index].cssClass = (currentClass === plusIconClass) ? minusIconClass : plusIconClass;
    }
    $scope.changeAfterCollapse = function(index){
        let currentBand = $scope.bands[index];
        if (previousBand != null && previousBand.cssClass === minusIconClass && previousBand.index != currentBand.index ) {
            $scope.bands[previousBand.index].cssClass = plusIconClass;
        }
        previousBand = currentBand;
    }

});