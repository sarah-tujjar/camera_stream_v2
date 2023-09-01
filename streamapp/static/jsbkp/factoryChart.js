var chart    = document.getElementById('factorychart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(25, 175, 147, 0.5)');
gradient.addColorStop(0.5, 'rgba(25, 175, 147, 0.25)');
gradient.addColorStop(1, 'rgba(25, 175, 147, 0)');


var data  = {
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{
			label: 'Custom Label Name',
			backgroundColor: gradient,
			pointBackgroundColor: 'white',
			borderWidth: 1,
			borderColor: '#1CB095',
			data: [10, 40, 80, 25, 65,34,21,88,56,99,45,101]
    }]
};


var options = {
	responsive: true,
	maintainAspectRatio: true,
	animation: {
		easing: 'easeInOutQuad',
		duration: 520
	},
	// scales: {
	// 	xAxes: [{
	// 		gridLines: {
	// 			color: 'rgba(25, 175, 147, 0.05)',
	// 			lineWidth: 1
	// 		}
	// 	}],
	// 	yAxes: [{
	// 		gridLines: {
	// 			// color: 'rgba(25, 175, 147, 0.08)',
	// 			lineWidth: 1
	// 		}
	// 	}]
	// },
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
    type: 'bar',
    data: data,
		options: options
});



























                                                        

// <!-- Order Statistic section Start-->
// <div class="col-lg-3 col-md-3 col-xl-3 col-sm-12 col-12 citybck box">
// 	<p class="modal-title text-end pt-2">Order By Companies</p>
// 	<div class="row">
// 	  <div class=" col-lg-12 col-xl-12 col-md-12  col-sm-12 col-12  ">
// 		  <div class="row">
			
// 			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
// 					<canvas id="Orderchart"></canvas>
// 			</div>
// 		  </div>
// 	  </div>
// 	</div>
// </div>
// <!--Order Statistic section End-->