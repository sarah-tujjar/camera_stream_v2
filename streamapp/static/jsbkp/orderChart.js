var chart    = document.getElementById('Orderchart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(25, 175, 147, 0.5)');
gradient.addColorStop(0.5, 'rgba(25, 175, 147, 0.25)');
gradient.addColorStop(1, 'rgba(25, 175, 147, 0)');


var data  = {
    labels: [ 'SaudiGlobal', 'SaudiIcon', 'BristolMyers', 'Sabic', 'Sdaia'],
    datasets: [{
			label: 'Custom Label Name',
			backgroundColor: gradient,
			pointBackgroundColor: 'white',
			borderWidth: 1,
			borderColor: '#1CB095',
			data: [10, 40, 80, 25, 65,34]
    }]
};


var options = {
	responsive: true,
	maintainAspectRatio: true,
	animation: {
		easing: 'easeInOutQuad',
		duration: 520
	},
	scales: {
		xAxes: [{
			gridLines: {
				color: 'rgba(25, 175, 147, 0.05)',
				lineWidth: 1
			}
		}],
		yAxes: [{
			gridLines: {
				// color: 'rgba(25, 175, 147, 0.08)',
				lineWidth: 1
			}
		}]
	},
	elements: {
		line: {
			tension: 0.4
		}
	},
	legend: {
		display: false
	},
	point: {
		backgroundColor: 'white'
	},
	tooltips: {
		titleFontFamily: 'Open Sans',
		backgroundColor: 'rgba(0,0,0,0.3)',
		titleFontColor: '',
		caretSize: 5,
		cornerRadius: 2,
		xPadding: 10,
		yPadding: 10
	}
};


var chartInstance = new Chart(chart, {
    type: 'polarArea',
    data: data,
		options: options
});