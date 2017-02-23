angular.module("ABMangularPHP")
.directive("directiva", function()
{
	return function(scope, element, attrs)
	{
		return template:"<div style='backgroundColor:Gray'>{{texto}}</div>",
				restrict:"EAC",
				scope:{texto: '='} 
				;
	}
});