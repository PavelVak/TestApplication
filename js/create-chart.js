var getChart = function (fCount, mCount, fPercent, mPercent) {
	return new CanvasJS.Chart("chartContainer",
		{
			title:{
				text: "Gender users"
			},
					animationEnabled: true,
			legend:{
				verticalAlign: "center",
				horizontalAlign: "left",
				fontSize: 20,
				fontFamily: "Arial"        
			},
			theme: "theme2",
			data: [{        
				type: "pie",       
				indexLabelFontFamily: "Arial",       
				indexLabelFontSize: 14,
				startAngle: 0,
				toolTipContent:" {label}% ({y})",
				dataPoints: [
					{  y: fCount, label: "Female " + fPercent},
					{  y: mCount, label: "Male " + mPercent},
				]
			}]
	});
};
	