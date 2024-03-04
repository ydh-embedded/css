<head>
	<link rel="stylesheet" type="text/css" href="calendar.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="calendar.js"></script>
</head>

<div id="calendar" class="calendar">
	<div class="header">
		<div class="cal-nav">
			<input type="button" id="nav-button-prev" class="nav-button" value="<" onclick="javascript:calendar.prevMonth();">
			<input type="button" id="nav-button-next" class="nav-button" value=">" onclick="javascript:calendar.nextMonth();">
		</div>
		<div id="calendar-title" class="title">
		</div>
	</div>
	
	<table class="body">
		<tr class="weekdays">
			<td>SUN</td>
			<td>MON</td>
			<td>TUE</td>
			<td>WED</td>
			<td>THU</td>
			<td>FRI</td>
			<td>SAT</td>
		</tr>
		<tr>
			<td id="sun-1">
				<div id="sun-1-day" class="day-num"></div>
			</td>
			<td id="mon-1">
				<div id="mon-1-day" class="day-num"></div>
			</td>
			<td id="tue-1">
				<div id="tue-1-day" class="day-num"></div>
			</td>
			<td id="wed-1">
				<div id="wed-1-day" class="day-num"></div>
			</td>
			<td id="thu-1">
				<div id="thu-1-day" class="day-num"></div>
			</td>
			<td id="fri-1">
				<div id="fri-1-day" class="day-num"></div>
			</td>
			<td id="sat-1">
				<div id="sat-1-day" class="day-num"></div>
			</td>
		</tr>
		<tr>
			<td id="sun-2">
				<div id="sun-2-day" class="day-num"></div>
			</td>
			<td id="mon-2">
				<div id="mon-2-day" class="day-num"></div>
			</td>
			<td id="tue-2">
				<div id="tue-2-day" class="day-num"></div>
			</td>
			<td id="wed-2">
				<div id="wed-2-day" class="day-num"></div>
			</td>
			<td id="thu-2">
				<div id="thu-2-day" class="day-num"></div>
			</td>
			<td id="fri-2">
				<div id="fri-2-day" class="day-num"></div>
			</td>
			<td id="sat-2">
				<div id="sat-2-day" class="day-num"></div>
			</td>
		</tr>
		<tr>
			<td id="sun-3">
				<div id="sun-3-day" class="day-num"></div>
			</td>
			<td id="mon-3">
				<div id="mon-3-day" class="day-num"></div>
			</td>
			<td id="tue-3">
				<div id="tue-3-day" class="day-num"></div>
			</td>
			<td id="wed-3">
				<div id="wed-3-day" class="day-num"></div>
			</td>
			<td id="thu-3">
				<div id="thu-3-day" class="day-num"></div>
			</td>
			<td id="fri-3">
				<div id="fri-3-day" class="day-num"></div>
			</td>
			<td id="sat-3">
				<div id="sat-3-day" class="day-num"></div>
			</td>
		</tr>
		<tr>
			<td id="sun-4">
				<div id="sun-4-day" class="day-num"></div>
			</td>
			<td id="mon-4">
				<div id="mon-4-day" class="day-num"></div>
			</td>
			<td id="tue-4">
				<div id="tue-4-day" class="day-num"></div>
			</td>
			<td id="wed-4">
				<div id="wed-4-day" class="day-num"></div>
			</td>
			<td id="thu-4">
				<div id="thu-4-day" class="day-num"></div>
			</td>
			<td id="fri-4">
				<div id="fri-4-day" class="day-num"></div>
			</td>
			<td id="sat-4">
				<div id="sat-4-day" class="day-num"></div>
			</td>
		</tr>
		<tr>
			<td id="sun-5">
				<div id="sun-5-day" class="day-num"></div>
			</td>
			<td id="mon-5">
				<div id="mon-5-day" class="day-num"></div>
			</td>
			<td id="tue-5">
				<div id="tue-5-day" class="day-num"></div>
			</td>
			<td id="wed-5">
				<div id="wed-5-day" class="day-num"></div>
			</td>
			<td id="thu-5">
				<div id="thu-5-day" class="day-num"></div>
			</td>
			<td id="fri-5">
				<div id="fri-5-day" class="day-num"></div>
			</td>
			<td id="sat-5">
				<div id="sat-5-day" class="day-num"></div>
			</td>
		</tr>
	</table>
</div>

<script>
	var calendar = new Calendar();
	$(document).ready(
		function () {
			calendar.init();
			calendar.show();
		}
	);
</script>