/**
 * Created by ALIENWARE-15 R2 on 2017/5/4.
 */

angular.module('app', [])
    .directive('myHeader', function () {
        return {
            template: `<header class="header">
				<a href="#">< 返回</a>
				<h3>{{vegetables}}</h3>
				<a href="#">●●●</a>
			</header>`,
            scope: {
                vegetables: '='
            }
        }
    })
    .directive('myContent', function ($timeout) {
        return {
            replace: true,
            template: `<div class="content">
				<ul class="left">
					<li ng-repeat="idx in data" index="{{$index}}" ng-click="fn($index)">{{idx.carte}}</li>
				</ul>
				<my-right data="data"></my-right>
			</div>`,
            scope: {
                data: '='
            },
            controller: function ($scope) {
                $scope.fn = function (ind) {
                    $scope.$broadcast('liidx', ind)
                }
            },
            link: function (scp, ele) {
                function liidx(ind) {
                    ele.find('li').removeClass('bg').eq(ind).addClass('bg');
                }

                $timeout(function () {
                    liidx(0)
                    ele.find('li').on('click', function () {
                        if (this.getAttribute('index')) {
                            var ind = this.getAttribute('index');
                            liidx(ind);
                        }
                    })
                }, 100)
            }
        }
    })
    .directive('myRight', function () {
        return {
            replace: true,
            template: `<ul class="right">
					<li ng-repeat="val in data[index].view">
						<div class="title">
							<p>{{val.name}}</p>
							<p class="price-bg">{{val.price|currency:'￥'}}</p>
						</div>
						<my-radio data="val.name"></my-radio>
					</li>
				</ul>`,
            scope: {
                data: '='
            },
            controller: function ($scope) {
                $scope.index = 0;
                $scope.$on('liidx', function (e, data) {
                    $scope.index = data;
                })
            }
        }
    })

    .directive('myFooter', function () {
        return {
            replace: true,
            template: `<footer class="footer">
                            购物车: {{sum}}
                        </footer>`
        }
    })

    .directive('myRadio', function () {
        return {
            replace: true,
            template: `<div class="radio" ng-class="{true:'rad-one',false:'rad-two'}[isrd]" ng-click="fn()"></div>`,
            controller: function ($scope, figure) {
                $scope.isrd = figure.cheack[$scope.data];
                $scope.fn = function () {
                    figure.cheack[$scope.data] = !figure.cheack[$scope.data];
                    $scope.isrd = figure.cheack[$scope.data];
                    figure.sum = figure.cheack[$scope.data] ? figure.sum + 1 : figure.sum - 1;
                    $scope.$emit('sum', figure.sum);
                }
            },
            scope: {
                data: '='
            }
        }
    })
    .controller("myTab", function ($scope, $http, figure) {
        $http.get('../data/package.json').success(function (data) {
            $scope.data = data;
        })
        $scope.$on('sum', function (e, data) {
            $scope.sum = data;
        });
        $scope.sum = figure.sum;
    })
    .value('figure', {
        sum: 0,
        cheack: {}
    })


